function afficherPrenom() {
    // Récupérer la valeur de l'input
    let prenom = document.getElementById('prenom').value;
    
    console.log(prenom);
    
    // Afficher dans un paragraphe
    let resultat = document.getElementById('resultat');
    
    console.log(resultat.textContent);

    resultat.textContent = 'Bonjour ' + prenom + ' !';
    
    // Changer la couleur
    resultat.style.color = '#2C5AA0';
    resultat.style.fontSize = '1.5em';
}