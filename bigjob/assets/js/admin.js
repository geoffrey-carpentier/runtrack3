// Fonctions de vérification des rôles (admin/modo)
function roleOf(u) {
    return (u && u.role ? String(u.role) : 'user').toLowerCase();
}
function isAdmin(user) {
    return roleOf(user) === 'admin';
}
function isModerator(user) {
    const r = roleOf(user);
    return r === 'admin' || r === 'moderator';
}

// Récupération de l'utilisateur connecté (sessionStorage ou localStorage selon ton choix)
const user = JSON.parse(localStorage.getItem("currentUser"));

// Affichage conditionnel du panneau admin
document.addEventListener('DOMContentLoaded', async function () {
    let current = null;
    try { current = JSON.parse(localStorage.getItem('currentUser')); } catch (_) { current = null; }
    const currentRole = roleOf(current);

    if (!current || (currentRole !== 'admin' && currentRole !== 'moderator')) {
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
        const section = document.querySelector('section:first-of-type');
        section.classList.add('bg-white', 'shadow-lg', 'rounded-lg');

        const tbody = document.getElementById('requestsTable');
        tbody.innerHTML = '';
        requests
            .filter(r => r.status === 'pending')
            .forEach(r => {
                const user = users.find(u => String(u.id) === String(r.userId));
                const tr = document.createElement('tr');
                tr.classList.add('border-b', 'hover:bg-gray-50');
                tr.innerHTML = `
          <td class="px-4 py-3 font-medium text-gray-800">${user ? `${user.nom || ''} ${user.prenom || ''}` : 'Inconnu'}</td>
          <td class="px-4 py-3 text-gray-700">${r.date}</td>
          <td class="px-4 py-3"><span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">En attente</span></td>
          <td class="px-4 py-3 space-x-2">
            <button data-id="${r.id}" class="approve px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs font-medium">✓ Accepter</button>
            <button data-id="${r.id}" class="deny px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs font-medium">✕ Refuser</button>
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
        if (currentRole !== 'admin') {
            section.classList.add('hidden');
            return;
        }

        section.classList.remove('hidden');
        section.classList.add('bg-gradient-to-br', 'from-indigo-50', 'to-purple-50', 'shadow-lg', 'rounded-lg', 'border', 'border-indigo-200', 'p-6');

        const thead = section.querySelector('thead');
        if (thead) {
            thead.innerHTML = `
                <tr class="border-b-2 border-indigo-300 bg-indigo-100">
                    <th class="px-4 py-3 text-left font-bold text-indigo-900">Utilisateur</th>
                    <th class="px-4 py-3 text-left font-bold text-indigo-900">Email</th>
                    <th class="px-4 py-3 text-left font-bold text-indigo-900">Rôle</th>
                    <th class="px-4 py-3 text-left font-bold text-indigo-900">Gestion des rôles</th>
                    <th class="px-4 py-3 text-left font-bold text-red-900">⚠ Zone Admin (irréversible)</th>
                </tr>
            `;
        }

        const tbody = document.getElementById('usersTable');
        tbody.innerHTML = '';

        const rolePriority = (r) => {
            const rl = (r || 'user').toLowerCase();
            return rl === 'admin' ? 0 : rl === 'moderator' ? 1 : 2;
        };
        const sortedUsers = [...users].sort((a, b) => rolePriority(a.role) - rolePriority(b.role));

        sortedUsers.forEach(u => {
            const uRole = roleOf(u);
            const tr = document.createElement('tr');
            tr.classList.add('border-b', 'hover:bg-white/40', 'transition');
            const isCurrentUser = String(u.id) === String(current.id);
            const isAdminUser = uRole === 'admin';
            const isModeratorUser = uRole === 'moderator';
            const isUser = uRole === 'user';

            const canPromoteMod = !isCurrentUser && isUser;
            const canPromoteAdmin = !isCurrentUser && !isAdminUser;
            const canDemoteToUser = !isCurrentUser && isModeratorUser;
            const canDelete = !isCurrentUser && !isAdminUser;

            tr.innerHTML = `
      <td class="px-4 py-3 font-medium text-gray-800">${u.nom || ''} ${u.prenom || ''}</td>
      <td class="px-4 py-3 text-sm text-gray-600">${u.email || ''}</td>
      <td class="px-4 py-3">
        <span class="px-3 py-1 rounded-full text-xs font-bold ${isAdminUser ? 'bg-red-100 text-red-700' : isModeratorUser ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }">
          ${u.role || 'user'}
        </span>
      </td>
      <td class="px-4 py-3 space-x-2">
        ${canPromoteMod
                    ? `<button data-id="${u.id}" class="promote-mod px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs font-medium">→ Modérateur</button>`
                    : `<button disabled class="px-3 py-2 bg-gray-200 text-gray-400 rounded text-xs font-medium cursor-not-allowed">→ Modérateur</button>`
                }
        ${canDemoteToUser
                    ? `<button data-id="${u.id}" class="demote-user px-3 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition text-xs font-medium">← Utilisateur</button>`
                    : `<button disabled class="px-3 py-2 bg-gray-200 text-gray-400 rounded text-xs font-medium cursor-not-allowed">← Utilisateur</button>`
                }
      </td>
      <td class="px-4 py-3">
        ${canDelete
                    ? `<button data-id="${u.id}" class="delete px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition text-xs font-medium mr-2">Supprimer</button>`
                    : `<button disabled class="px-3 py-2 bg-gray-200 text-gray-400 rounded text-xs font-medium cursor-not-allowed mr-2">Supprimer</button>`
                }
        ${canPromoteAdmin
                    ? `<button data-id="${u.id}" class="promote-admin px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition text-xs font-bold">⚠ Administrateur</button>`
                    : `<button disabled class="px-3 py-2 bg-gray-200 text-gray-400 rounded text-xs font-medium cursor-not-allowed">⚠ Administrateur</button>`
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
                if (roleOf(target) !== 'user') { alert('Promotion invalide.'); return; }
                changeRoleGuarded(target, 'moderator');
            }

            if (e.target.classList.contains('promote-admin')) {
                if (roleOf(target) === 'admin') { alert('Déjà administrateur.'); return; }
                const message = `⚠ ATTENTION : Cette action est IRRÉVERSIBLE ⚠\n\nVous allez promouvoir ${target.nom || ''} ${target.prenom || ''} au rôle d'administrateur.\n\nCette action ne peut pas être annulée. Êtes-vous certain ?`;
                if (confirm(message)) {
                    changeRoleGuarded(target, 'admin');
                }
            }

            if (e.target.classList.contains('demote-user')) {
                if (roleOf(target) !== 'moderator') { alert('Rétrogradation invalide.'); return; }
                changeRoleGuarded(target, 'user');
            }

            if (e.target.classList.contains('delete')) {
                if (roleOf(target) === 'admin') { alert('Impossible de supprimer un administrateur.'); return; }
                if (confirm(`Supprimer définitivement ${target.nom || ''} ${target.prenom || ''} ?`)) deleteUser(target.id);
            }
        });
    }

    // Garde centrale (vérifie toutes les règles critiques)
    function changeRoleGuarded(targetUser, newRole) {
        if (currentRole !== 'admin') { alert('Réservé aux administrateurs.'); return; }
        if (String(targetUser.id) === String(current.id)) { alert('Action interdite sur vous-même.'); return; }
        if (roleOf(targetUser) === 'admin' && newRole !== 'admin') { alert('On ne peut pas retirer les privilèges d’un administrateur.'); return; }
        // Eviter no-op (même rôle)
        if (roleOf(targetUser) === roleOf({ role: newRole })) { alert('Rôle inchangé.'); return; }
        // Règles de transition autorisées
        const targetRole = roleOf(targetUser);
        const allowed = (targetRole === 'user' && (newRole === 'moderator' || newRole === 'admin'))
            || (targetRole === 'moderator' && (newRole === 'user' || newRole === 'admin'))
            || (targetRole === 'admin' && newRole === 'admin');
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