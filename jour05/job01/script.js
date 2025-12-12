// Script de validation asynchrone pour les formulaires de connexion et inscription

// Récupérer le formulaire actuellement affiché
function getCurrentForm() {
    if (document.getElementById('connexionForm')) {
        return document.getElementById('connexionForm');
    }
    if (document.getElementById('inscriptionForm')) {
        return document.getElementById('inscriptionForm');
    }
    return null;
}

// Validation de l'email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validation du mot de passe (minimum 8 caractères, 1 lettre, 1 chiffre, 1 caractère spécial)
function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?]).{8,}$/;
    return regex.test(password);
}

// Validation du code postal (5 chiffres)
function validatePostalCode(postalCode) {
    const regex = /^\d{5}$/;
    return postalCode.trim().length === 0 || regex.test(postalCode);
}

// Validation de la longueur minimale (2 caractères)
function validateMinLength(value, minLength = 2) {
    return value.trim().length >= minLength;
}

// Validation de l'adresse (au moins 5 caractères)
function validateAddress(address) {
    return address.trim().length >= 5;
}

// Afficher un message d'erreur pour un champ
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Masquer le message d'erreur pour un champ
function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Validation en temps réel pour chaque champ
function setupRealTimeValidation() {
    const form = getCurrentForm();
    if (!form) return;

    // Email
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('email', 'Email is required');
            } else if (!validateEmail(this.value)) {
                showFieldError('email', 'Email format is invalid');
            } else {
                hideFieldError('email');
            }
        });

        emailField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('email', 'Email is required');
            } else if (!validateEmail(this.value)) {
                showFieldError('email', 'Email format is invalid');
            } else {
                hideFieldError('email');
            }
        });
    }

    // Mot de passe
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('password', 'Password is required');
            } else if (!validatePassword(this.value)) {
                showFieldError('password', 'Minimum eight characters, at least one letter, one number and one special character');
            } else {
                hideFieldError('password');
            }
        });

        passwordField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('password', 'Password is required');
            } else if (!validatePassword(this.value)) {
                showFieldError('password', 'Minimum eight characters, at least one letter, one number and one special character');
            } else {
                hideFieldError('password');
            }
        });
    }

    // Prénom (inscription seulement)
    const firstnameField = document.getElementById('firstname');
    if (firstnameField) {
        firstnameField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('firstname', 'Firstname is required');
            } else if (!validateMinLength(this.value, 2)) {
                showFieldError('firstname', 'Firstname is too short');
            } else {
                hideFieldError('firstname');
            }
        });

        firstnameField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('firstname', 'Firstname is required');
            } else if (!validateMinLength(this.value, 2)) {
                showFieldError('firstname', 'Firstname is too short');
            } else {
                hideFieldError('firstname');
            }
        });
    }

    // Nom (inscription seulement)
    const lastnameField = document.getElementById('lastname');
    if (lastnameField) {
        lastnameField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('lastname', 'Lastname is required');
            } else if (!validateMinLength(this.value, 2)) {
                showFieldError('lastname', 'Lastname is too short');
            } else {
                hideFieldError('lastname');
            }
        });

        lastnameField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('lastname', 'Lastname is required');
            } else if (!validateMinLength(this.value, 2)) {
                showFieldError('lastname', 'Lastname is too short');
            } else {
                hideFieldError('lastname');
            }
        });
    }

    // Confirmation du mot de passe (inscription seulement)
    const passwordConfirmField = document.getElementById('passwordConfirm');
    if (passwordConfirmField) {
        passwordConfirmField.addEventListener('blur', function () {
            const password = document.getElementById('password').value;
            if (this.value.trim() === '') {
                showFieldError('passwordConfirm', 'Password confirmation is required');
            } else if (this.value !== password) {
                showFieldError('passwordConfirm', 'Passwords do not match');
            } else {
                hideFieldError('passwordConfirm');
            }
        });

        passwordConfirmField.addEventListener('input', function () {
            const password = document.getElementById('password').value;
            if (this.value.trim() === '') {
                showFieldError('passwordConfirm', 'Password confirmation is required');
            } else if (this.value !== password) {
                showFieldError('passwordConfirm', 'Passwords do not match');
            } else {
                hideFieldError('passwordConfirm');
            }
        });
    }

    // Adresse (inscription seulement)
    const addressField = document.getElementById('address');
    if (addressField) {
        addressField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('address', 'Address is required');
            } else if (!validateAddress(this.value)) {
                showFieldError('address', 'Address is too short');
            } else {
                hideFieldError('address');
            }
        });

        addressField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('address', 'Address is required');
            } else if (!validateAddress(this.value)) {
                showFieldError('address', 'Address is too short');
            } else {
                hideFieldError('address');
            }
        });
    }

    // Code postal (inscription seulement)
    const postalcodeField = document.getElementById('postalcode');
    if (postalcodeField) {
        postalcodeField.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showFieldError('postalcode', 'Postal code is required');
            } else if (!validatePostalCode(this.value)) {
                showFieldError('postalcode', 'Postal code format is invalid');
            } else {
                hideFieldError('postalcode');
            }
        });

        postalcodeField.addEventListener('input', function () {
            if (this.value.trim() === '') {
                showFieldError('postalcode', 'Postal code is required');
            } else if (!validatePostalCode(this.value)) {
                showFieldError('postalcode', 'Postal code format is invalid');
            } else {
                hideFieldError('postalcode');
            }
        });
    }
}

// Valider le formulaire au soumission
function validateForm(form) {
    let isValid = true;
    let formErrors = [];

    // Récupérer tous les champs du formulaire
    const fields = form.querySelectorAll('input, textarea');

    fields.forEach(field => {
        const fieldId = field.id;
        const value = field.value.trim();

        // Validation générique pour les champs requis
        if (value === '') {
            showFieldError(fieldId, field.name.charAt(0).toUpperCase() + field.name.slice(1) + ' is required');
            isValid = false;
        }
    });

    // Validation spécifique par champ
    if (document.getElementById('email')) {
        const email = document.getElementById('email').value;
        if (email && !validateEmail(email)) {
            showFieldError('email', 'Email format is invalid');
            isValid = false;
        }
    }

    if (document.getElementById('password')) {
        const password = document.getElementById('password').value;
        if (password && !validatePassword(password)) {
            showFieldError('password', 'Minimum eight characters, at least one letter, one number and one special character');
            isValid = false;
        }
    }

    if (document.getElementById('firstname')) {
        const firstname = document.getElementById('firstname').value;
        if (firstname && !validateMinLength(firstname, 2)) {
            showFieldError('firstname', 'Firstname is too short');
            isValid = false;
        }
    }

    if (document.getElementById('lastname')) {
        const lastname = document.getElementById('lastname').value;
        if (lastname && !validateMinLength(lastname, 2)) {
            showFieldError('lastname', 'Lastname is too short');
            isValid = false;
        }
    }

    if (document.getElementById('passwordConfirm')) {
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        if (passwordConfirm && passwordConfirm !== password) {
            showFieldError('passwordConfirm', 'Passwords do not match');
            isValid = false;
        }
    }

    if (document.getElementById('address')) {
        const address = document.getElementById('address').value;
        if (address && !validateAddress(address)) {
            showFieldError('address', 'Address is too short');
            isValid = false;
        }
    }

    if (document.getElementById('postalcode')) {
        const postalcode = document.getElementById('postalcode').value;
        if (postalcode && !validatePostalCode(postalcode)) {
            showFieldError('postalcode', 'Postal code format is invalid');
            isValid = false;
        }
    }

    return isValid;
}

// Initialiser les formulaires au chargement
document.addEventListener('DOMContentLoaded', function () {
    setupRealTimeValidation();

    // Ajouter l'écouteur de soumission
    const connexionForm = document.getElementById('connexionForm');
    const inscriptionForm = document.getElementById('inscriptionForm');

    if (connexionForm) {
        connexionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm(this)) {
                alert('Formulaire de connexion valide !');
                // Ici, on pourrait envoyer les données à un serveur
            }
        });
    }

    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm(this)) {
                alert('Formulaire d\'inscription valide !');
                // Ici, on pourrait envoyer les données à un serveur
            }
        });
    }
});