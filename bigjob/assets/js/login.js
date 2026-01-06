// Vérifie le format général de l'email
function isValidEmail(email) {
  // Regex simple pour le format général
  const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

// Vérifie le domaine spécifique
function isLaPlateformeEmail(email) {
  return email.endsWith("@laplateforme.io");
}

// Gestion du formulaire de connexion
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Validation format email
    if (!isValidEmail(email)) {
      alert("Format d'email invalide");
      return;
    }
    // Validation domaine
    if (!isLaPlateformeEmail(email)) {
      alert("Seuls les emails @laplateforme.io sont acceptés");
      return;
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

    // Recherche de l'utilisateur
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert("Identifiants incorrects.");
      return;
    }

    // Stockage de l'utilisateur connecté
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirection selon le rôle
    if (user.role === 'admin' || user.role === 'moderator') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'calendar.html';
    }
  });
});