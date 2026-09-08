function jsonValueKey(jsonString, key) {  // la fonction prend une chaine de caractère "jsonString" et une clé "key"
    try {
        const jsonObj = JSON.parse(jsonString);
        return jsonObj[key];
    } catch (error) {
        console.error("Invalid JSON string:", error);
        return null;
    } // convertir la chaîne JSON en objet et retourner la valeur associée à la clé
}

//* Exemple d'utilisation:

console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', 'city')); 

//* Exemples d'appels de la fonction avec différentes clés (différents cas de figure)

console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', 'nb_staff' , "name")); 
//? Ici la fonction ne retourne que la valeur de la première clé car les paramètres après la première clé sont ignorés

console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', "address" || "name")); 
//? Ici encore la fonction ne retourne que la valeur de la première clé car "||" est un opérateur logique, la clé "name" n'est pas évaluée 

console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', "address" && "name")); 
//? Ici c'est la valeur de la dernière clé qui est retournée car "&&" est un opérateur logique, c'est la clé "address" qui n'est pas évaluée   WHY???

// Pour obtenir plusieurs valeurs il faut appeler la fonction plusieurs fois avec des clés différentes
console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', 'address')); 
console.log(jsonValueKey('{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}', 'name'));



 
