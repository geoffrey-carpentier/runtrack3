// Vérifie le format général de l'email
function isValidEmail(email) {
  const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

// Vérifie le domaine spécifique à "La Plateforme"
function isLaPlateformeEmail(email) {
  return email.endsWith("@laplateforme.io");
}

// Gestion du formulaire d'inscription
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const emailError = document.getElementById('emailError');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const prenom = form.prenom.value.trim();
    const nom = form.nom.value.trim();
    const age = parseInt(form.age.value, 10);
    const email = form.email.value.trim();
    const password = form.password.value.trim();
 console.log("Valeurs du formulaire :", { prenom, nom, age, email, password });

    // Validation des champs
    if (!prenom || !nom || isNaN(age) || !email || !password) {
//* console.log("Erreur : champ manquant");
      alert("Tous les champs sont obligatoires.");
      return;
    }

    // Validation format email
    if (!isValidEmail(email)) {
//* console.log("Erreur : format email invalide", email);
      emailError.textContent = "Format d'email invalide";
      emailError.classList.remove('hidden');
      return;
    }

    // Validation domaine
    if (!isLaPlateformeEmail(email)) {
//* console.log("Erreur : domaine email invalide", email);
      emailError.textContent = "Seuls les emails @laplateforme.io sont acceptés";
      emailError.classList.remove('hidden');
      return;
    }

    // Chargement des utilisateurs existants
    let users = [];
    try {
      const stored = localStorage.getItem('users');
      if (stored) {
        users = JSON.parse(stored);
//* console.log("Utilisateurs chargés depuis localStorage :", users);
      } else {
        const res = await fetch('assets/data/users.json');
//* console.log("Réponse fetch :", res);
        users = await res.json();
//* console.log("Utilisateurs chargés depuis users.json :", users);
      }
    } catch (err) {
//* console.log("Erreur lors du chargement des utilisateurs :", err);
      alert("Erreur lors du chargement des utilisateurs.");
      return;
    }

    // Vérification unicité email
    if (users.some(u => u.email === email)) {
//*      console.log("Erreur : email déjà utilisé", email);
      emailError.textContent = "Cet email est déjà utilisé.";
      emailError.classList.remove('hidden');
      return;
    }

    // Création du nouvel utilisateur
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      email,
      nom,
      prenom,
      age,
      password,
      role: "user"
    };
//*    console.log("Nouvel utilisateur à ajouter :", newUser);

    users.push(newUser);

    // Sauvegarde dans localStorage
    localStorage.setItem('users', JSON.stringify(users));
//*    console.log("Utilisateurs après ajout :", users);

    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    window.location.href = "login.html";
  });
});