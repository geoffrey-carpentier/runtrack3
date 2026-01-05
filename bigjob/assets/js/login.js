// Sélection du formulaire
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupération des valeurs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation simple
    if (!email || !password) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    // Ici, tu pourrais ajouter une vérification contre le fichier users.json via fetch (en front uniquement)
    // Exemple de message de succès
    alert('Connexion réussie (test) !');
    // Redirection ou traitement supplémentaire ici
  });
}