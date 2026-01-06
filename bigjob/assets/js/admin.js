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
document.addEventListener('DOMContentLoaded', async () => {
    // Sécurité d'accès
    if (!isModerator(user)) {
        alert("Accès réservé aux modérateurs et administrateurs.");
        window.location.href = "index.html";
        return;
    }

    // Affichage conditionnel du panneau admin
    const adminPanel = document.getElementById("admin-panel");
    if (adminPanel) {
        adminPanel.style.display = isAdmin(user) ? "block" : "none";
    }

    // Chargement des utilisateurs
    let users = [];
    try {
        const stored = localStorage.getItem('users');
        if (stored) {
            users = JSON.parse(stored);
        } else {
            const res = await fetch('assets/data/users.json');
            users = await res.json();
        }
    } catch (err) {
        alert("Erreur lors du chargement des utilisateurs.");
        return;
    }

    // Affichage de la gestion des droits (admin uniquement)
    if (isAdmin(user)) {
        renderAdminTable(document.getElementById('usersTable'), users);
    }

    // Affichage de la gestion des demandes de présence (moderator ou admin)
    renderRequestsTable(document.getElementById('requestsTable'));
});

// Affichage de la table admin (gestion des droits)
function renderAdminTable(table, users) {
    if (!table) return;
    table.innerHTML = users.map(user => `
    <tr>
      <td>${user.nom} ${user.prenom}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        ${user.role !== "admin" ? `
          <button class="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onclick="promoteUser(${user.id})">Promouvoir admin</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteUser(${user.id})">Supprimer</button>
        ` : ""}
      </td>
    </tr>
  `).join('');
}

// Fonctions pour promouvoir ou supprimer un utilisateur
function promoteUser(id) {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.map(u => u.id === id ? { ...u, role: "admin" } : u);
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}

// Affichage des demandes de présence (backoffice)
function renderRequestsTable(table) {
    if (!table) return;
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const pending = requests.filter(r => r.status === "pending");
    table.innerHTML = pending.map(request => `
    <tr>
      <td>${request.nom}</td>
      <td>${request.date}</td>
      <td>${request.status}</td>
      <td>
        <button class="bg-green-500 text-white px-3 py-1 rounded mr-2" onclick="approveRequest(${request.id})">Accepter</button>
        <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="rejectRequest(${request.id})">Refuser</button>
      </td>
    </tr>
  `).join('');
}

// Approbation ou refus des demandes (conforme au guide)
function approveRequest(id) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests.find(r => r.id === id);
    if (request) {
        request.status = "approved";
        localStorage.setItem("requests", JSON.stringify(requests));
        location.reload();
    }
}
function rejectRequest(id) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests.find(r => r.id === id);
    if (request) {
        request.status = "rejected";
        localStorage.setItem("requests", JSON.stringify(requests));
        location.reload();
    }
}