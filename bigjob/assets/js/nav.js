// Récupère l'utilisateur connecté depuis le localStorage
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null; // Retourne l'objet utilisateur ou null (si non connecté)
}

// Génère le menu de navigation selon le rôle de l'utilisateur connecté
function renderNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const user = getCurrentUser();
    let links = `
    <li><a href="index.html" class="hover:underline">Accueil</a></li>
  `;

    if (!user) {
        links += `
      <li><a href="login.html" class="hover:underline">Connexion</a></li>
      <li><a href="register.html" class="hover:underline">Inscription</a></li>
    `;
    } else {
        links += `
      <li><a href="calendar.html" class="hover:underline">Calendrier</a></li>
    `;
        if (user.role === 'moderator' || user.role === 'admin') {
            links += `<li><a href="admin.html" class="hover:underline">Backoffice</a></li>`;
        }
        if (user.role === 'admin') {
            links += `<li><a href="admin.html" class="hover:underline">Admin</a></li>`;
        }
        links += `<li><a href="#" id="logout-link" class="hover:underline text-red-400">Déconnexion</a></li>`;
    }

    nav.innerHTML = links;

    // Gestion de la déconnexion
    const logout = document.getElementById('logout-link');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Exécute au chargement du DOM de la page
document.addEventListener('DOMContentLoaded', renderNav);