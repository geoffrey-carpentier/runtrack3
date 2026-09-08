//# Script permettant de récupérer et afficher un fichier texte via Fetch

// 'getElementById': Récupérer le bouton avec l'id "button" du 'document' HTML (fichier index.php)
// 'addEventListener': Ecouteur d'événement, la fonction() fléchée s'execute après un "click" sur le bouton
document.getElementById('button').addEventListener('click', function() {
    
    // Récupérer le fichier 'expression.txt' via Fetch
    fetch('./expression.txt')
        // .then() : traiter la réponse du serveur, convertir la réponse en texte
        .then(response => response.text())
        // Afficher le contenu dans le paragraphe avec l'id "result" 
        .then(data => {
            document.getElementById('result').textContent = data;
        });
});