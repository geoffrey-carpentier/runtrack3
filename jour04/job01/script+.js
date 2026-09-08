// Script avancé de récupération d'un fichier .txt via Fetch API + affichage de son contenu dans le DOM
// ✅ Gestion des erreurs avec .catch()
// ✅ Vérification de la validité de la réponse HTTP
// ✅ Utilisation de 'DOMContentLoaded' pour s'assurer que le DOM est prêt avant d'attacher les écouteurs d'événements

document.addEventListener('DOMContentLoaded', function() {  // Attendre que le DOM soit complètement chargé avant d'exécuter le code
    
    // Récupérer le bouton avec l'id "button" du HTML
    const bouton = document.getElementById('button');

    bouton.addEventListener('click', function() { // Ecouteur d'événement: la fonction() fléchée s'execute après un "click" sur le bouton
              
        // Utiliser l'API Fetch pour récupérer le fichier expression.txt 
        fetch('./expression.txt')
            
            // .then() : traiter la réponse du serveur
            // 'response' contient les informations de la réponse HTTP
            .then(response => {
                // Vérifier que la réponse est valide (statut 200-299)
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
                }
                // Convertir le contenu en texte simple avec .text()
                return response.text();
            })
            
            // .then() : utiliser les données récupérées
            // 'data' contient le contenu du fichier expression.txt
            .then(data => {
                // Récupérer le paragraphe avec l'id "result"
                const paragraphe = document.getElementById('result');
                
                // Insérer le contenu du fichier dans le paragraphe
                paragraphe.textContent = data;
            })
            
            // .catch() : gérer les erreurs potentielles
            // Si Fetch échoue ou si la réponse n'est pas valide
            .catch(error => {
                // Afficher l'erreur dans la console du navigateur
                console.error('Erreur lors de la récupération du fichier:', error);
                
                // Afficher un message d'erreur dans le paragraphe
                document.getElementById('result').textContent = 
                    'Erreur : impossible de charger le fichier.';
            });
    });
});