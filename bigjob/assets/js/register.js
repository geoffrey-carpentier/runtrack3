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
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const nom = form.nom.value.trim();
        const prenom = form.prenom.value.trim();
        const age = parseInt(form.age.value, 10);

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
        // Validation autres champs
        if (!nom || !prenom || !password || isNaN(age)) {
            alert("Tous les champs sont obligatoires.");
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

        // Vérification unicité email
        if (users.some(u => u.email === email)) {
            alert("Cet email est déjà utilisé.");
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
        users.push(newUser);

        // Sauvegarde dans localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        window.location.href = "login.html";
    });
});