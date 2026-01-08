// Fonction permettant d'extraire et retourner une valeur depuis une chaîne JSON en fonction d'une clé

function jsonValueKey(jsonString, key) {   // Fonction jsonValueKey : prend en paramètres une chaîne JSON et une clé
    
    const obj = JSON.parse(jsonString); // Convertit la chaîne JSON en objet JavaScript
   
    return obj[key];  // Retourne la valeur de la clé demandée
}

// On peut tester (console) ce que renvoi la fonction pour la clé "city" avec la chaîne JSON donnée:
console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', 'city')); // Renvoie "Marseille"

// On peut aussi définir 'exempleJson' telle qu'elle contient la chaîne JSON précédente:
const exempleJson = '{ "name": "La Plateforme_", "address": "8 rue d\'hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019" }';

// On teste (console) cette fois ce que renvoie la fonction avec 'exempleJson' et la clé 'city':
console.log(jsonValueKey(exempleJson, 'city')); // Renvoie toujours "Marseille"


// Afficher les résultats dans la page
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = `
    <h2>Exemples d'utilisation de jsonValueKey()</h2>
    <p><strong>JSON :</strong> ${exempleJson}</p>
    <p><strong>jsonValueKey(json, "city") :</strong> ${jsonValueKey(exempleJson, 'city')}</p>
 
`;