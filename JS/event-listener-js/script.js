// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Sélectionner le bouton
    let bouton = document.getElementById('monBouton');
    
    // Ajouter un écouteur d'événement
    bouton.addEventListener('click', function() {
        let message = document.getElementById('message');
        message.textContent = 'Tu as cliqué !';
        message.style.color = '#E85D10';
        message.style.fontSize = '1.3em';
    });
    
});



