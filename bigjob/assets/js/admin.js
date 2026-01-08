// Fonctions de vérification des rôles (admin/modo)
function isAdmin(user) {
    return user && user.role === "admin";
}
function isModerator(user) {
    return user && (user.role === "moderator" || user.role === "admin");
}

// Récupération de l'utilisateur connecté (sessionStorage ou localStorage selon ton choix)
const user = JSON.parse(localStorage.getItem("currentUser"));

// Affichage conditionnel du panneau admin
document.addEventListener('DOMContentLoaded', async function () {
    const current = JSON.parse(localStorage.getItem('currentUser'));
    if (!current || (current.role !== 'admin' && current.role !== 'moderator')) {
        alert('Accès refusé.');
        window.location.href = 'index.html';
        return;
    }

    // Charge users depuis localStorage ou fallback JSON
    async function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.length ? users : [];
    }

    function loadRequests() {
        return JSON.parse(localStorage.getItem('requests') || '[]');
    }
    function saveRequests(list) {
        localStorage.setItem('requests', JSON.stringify(list));
    }
    function saveUsers(list) {
        localStorage.setItem('users', JSON.stringify(list));
    }

    const users = await loadUsers();
    let requests = loadRequests();

    // Rendu des demandes
    function renderRequests() {
        const tbody = document.getElementById('requestsTable');
        tbody.innerHTML = '';
        requests
            .filter(r => r.status === 'pending')
            .forEach(r => {
                const user = users.find(u => String(u.id) === String(r.userId));
                const tr = document.createElement('tr');
                tr.innerHTML = `
          <td class="px-3 py-2">${user ? `${user.nom || ''} ${user.prenom || ''}` : 'Inconnu'}</td>
          <td class="px-3 py-2">${r.date}</td>
          <td class="px-3 py-2">En attente</td>
          <td class="px-3 py-2 space-x-2">
            <button data-id="${r.id}" class="approve px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Accepter</button>
            <button data-id="${r.id}" class="deny px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Refuser</button>
          </td>
        `;
                tbody.appendChild(tr);
            });

        tbody.addEventListener('click', function (e) {
            const id = e.target.dataset.id;
            if (!id) return;
            if (e.target.classList.contains('approve')) updateRequest(id, 'approved');
            if (e.target.classList.contains('deny')) updateRequest(id, 'refused');
        });
    }

    function updateRequest(id, status) {
        const idx = requests.findIndex(r => String(r.id) === String(id));
        if (idx === -1) return;
        requests[idx].status = status;
        saveRequests(requests);
        renderRequests();
    }

    // Rendu des utilisateurs (admin only)
    function renderUsers() {
        const section = document.getElementById('admin-users-section');
        if (current.role !== 'admin') {
            section.classList.add('hidden');
            return;
        }
        section.classList.remove('hidden');

        const tbody = document.getElementById('usersTable');
        tbody.innerHTML = '';
        users.forEach(u => {
            const tr = document.createElement('tr');
            const isCurrentUser = String(u.id) === String(current.id);
            const isAdmin = u.role === 'admin';
            const isModerator = u.role === 'moderator';
            const isUser = u.role === 'user';

            // Règles d'affichage des boutons
            const canPromoteMod = !isCurrentUser && isUser;             // user -> moderator
            const canPromoteAdmin = !isCurrentUser && !isAdmin;         // user/mod -> admin (admin only section déjà)
            const canDemoteToUser = !isCurrentUser && isModerator;      // moderator -> user
            const canDelete = !isCurrentUser && !isAdmin;               // jamais supprimer un admin

            tr.innerHTML = `
      <td class="px-3 py-2">${u.nom || ''} ${u.prenom || ''}</td>
      <td class="px-3 py-2">${u.email || ''}</td>
      <td class="px-3 py-2">
        <span class="px-2 py-1 rounded text-xs ${isAdmin ? 'bg-red-100 text-red-800' : isModerator ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
          ${u.role || 'user'}
        </span>
      </td>
      <td class="px-3 py-2 space-x-2">
        ${canPromoteMod
                    ? `<button data-id="${u.id}" class="promote-mod px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Promouvoir mod</button>`
                    : `<button disabled class="px-2 py-1 bg-gray-400 text-white rounded text-xs cursor-not-allowed" title="${isUser ? 'Action interdite' : 'Déjà mod/admin'}">Promouvoir mod</button>`
                }
        ${canPromoteAdmin
                    ? `<button data-id="${u.id}" class="promote-admin px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">Promouvoir admin</button>`
                    : `<button disabled class="px-2 py-1 bg-gray-400 text-white rounded text-xs cursor-not-allowed" title="${isAdmin ? 'Déjà admin' : 'Action interdite'}">Promouvoir admin</button>`
                }
        ${canDemoteToUser
                    ? `<button data-id="${u.id}" class="demote-user px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">Rétrograder user</button>`
                    : `<button disabled class="px-2 py-1 bg-gray-400 text-white rounded text-xs cursor-not-allowed" title="${isAdmin ? 'Impossible sur admin' : 'Déjà user'}">Rétrograder user</button>`
                }
        ${canDelete
                    ? `<button data-id="${u.id}" class="delete px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Supprimer</button>`
                    : `<button disabled class="px-2 py-1 bg-gray-400 text-white rounded text-xs cursor-not-allowed" title="${isAdmin ? 'Impossible de supprimer un admin' : 'Action interdite'}">Supprimer</button>`
                }
      </td>
    `;
            tbody.appendChild(tr);
        });

        tbody.addEventListener('click', function (e) {
            const id = e.target.dataset.id;
            if (!id || e.target.disabled) return;

            const target = users.find(u => String(u.id) === String(id));
            if (!target) return;
            if (String(target.id) === String(current.id)) {
                alert('Action interdite sur votre propre compte.');
                return;
            }

            if (e.target.classList.contains('promote-mod')) {
                // user -> moderator seulement
                if (target.role !== 'user') { alert('Promotion invalide.'); return; }
                changeRoleGuarded(target, 'moderator');
            }

            if (e.target.classList.contains('promote-admin')) {
                // user/mod -> admin (seulement admin courant)
                if (target.role === 'admin') { alert('Déjà administrateur.'); return; }
                changeRoleGuarded(target, 'admin');
            }

            if (e.target.classList.contains('demote-user')) {
                // moderator -> user seulement
                if (target.role !== 'moderator') { alert('Rétrogradation invalide.'); return; }
                changeRoleGuarded(target, 'user');
            }

            if (e.target.classList.contains('delete')) {
                if (target.role === 'admin') { alert('Impossible de supprimer un administrateur.'); return; }
                if (confirm(`Supprimer ${target.nom || ''} ${target.prenom || ''} ?`)) deleteUser(target.id);
            }
        });
    }

    // Garde centrale (vérifie toutes les règles critiques)
    function changeRoleGuarded(targetUser, newRole) {
        if (current.role !== 'admin') { alert('Réservé aux administrateurs.'); return; }
        if (String(targetUser.id) === String(current.id)) { alert('Action interdite sur vous-même.'); return; }
        if (targetUser.role === 'admin' && newRole !== 'admin') { alert('On ne peut pas retirer les privilèges d’un administrateur.'); return; }
        // Eviter no-op (même rôle)
        if (targetUser.role === newRole) { alert('Rôle inchangé.'); return; }
        // Règles de transition autorisées
        const allowed = (targetUser.role === 'user' && (newRole === 'moderator' || newRole === 'admin'))
            || (targetUser.role === 'moderator' && (newRole === 'user' || newRole === 'admin'))
            || (targetUser.role === 'admin' && newRole === 'admin');
        if (!allowed) { alert('Transition de rôle non autorisée.'); return; }

        changeRole(targetUser.id, newRole);
    }

    function changeRole(id, role) {
        const idx = users.findIndex(u => String(u.id) === String(id));
        if (idx === -1) return;
        const oldRole = users[idx].role;
        users[idx].role = role;
        saveUsers(users);
        console.log(`Rôle changé : ${users[idx].email || users[idx].id} ${oldRole} → ${role}`);
        renderUsers();
    }

    function deleteUser(id) {
        const idx = users.findIndex(u => String(u.id) === String(id));
        if (idx === -1) return;
        const deleted = users.splice(idx, 1)[0];
        saveUsers(users);
        console.log(`Utilisateur supprimé : ${deleted.email}`);
        renderUsers();
    }

    renderRequests();
    renderUsers();
});