

// Sélectionne l'élément HTML avec l'id "keylogger" ('textarea') et le stocke dans une variable.
// Cela permet de manipuler facilement le textarea plus tard dans le code.
// Cette ligne est exécutée au chargement du script, donc le DOM doit être prêt (grâce à 'defer' dans <script>).
let keylogger = document.getElementById("keylogger");

// Définit une fonction nommée 'addText' qui prend un paramètre 'e' (l'événement clavier).
// Cette fonction sera appelée chaque fois qu'une touche est pressée.
function addText(e) {
    
    // Empêche le comportement par défaut du navigateur pour cet événement.
    // Ex: si on presse une lettre dans un input, le navigateur l'ajoute automatiquement – ici, on prend le contrôle total pour gérer nous-mêmes l'ajout.
    // Utile pour éviter les conflits ou les ajouts inattendus.
    e.preventDefault();
    
    // Vérifie si la touche pressée est une lettre minuscule de a à z.
    // e.key contient le caractère de la touche 
    // .match(/[a-z]/) utilise une expression régulière (regex) pour tester si cela correspond à une lettre simple.
    // Si oui, on procède ; sinon, rien ne se passe (pas d'ajout pour chiffres, majuscules, etc.).
    if (e.key.match(/[a-z]/)) {
        
        // Vérifie si l'élément actuellement focus (actif) est le textarea 'keylogger'.
        // document.activeElement retourne l'élément qui a le focus (où le curseur est).
        // Si c'est le textarea, on ajoute la lettre deux fois.
        if (document.activeElement === keylogger) {
            keylogger.value += e.key + e.key;  // Concatène la lettre deux fois à la valeur existante du textarea.
        } else {
            // Sinon (focus ailleurs), ajoute seulement une fois.
            keylogger.value += e.key;  // Concatène la lettre une seule fois.
        }
    }
}

// Afficher l'élément 'keylogger' dans la console pour débogage.
// Utile pour vérifier que la sélection a fonctionné (textarea visible dans la console).
// Note : Cela s'exécute une fois au chargement, pas à chaque pression de touche.
console.log(keylogger);

// Ajout d'un écouteur d'événement sur la fenêtre  pour l'événement 'keypress'.
// 'keypress' est déclenché quand une touche est pressée et relâchée.
// La fonction 'addText' sera appelée à chaque 'keypress', avec l'événement comme argument.
window.addEventListener('keypress', addText);


//! Alternative

/*
const keylogger=- = document.getElementById("keylogger");

  if (keylogger) {
    function addText(e) {
      console.log(e);
        e.preventDefault();

        //* DEBUG * console.log(document.activeElement);

        //? Fonction ternaire
        //? Si on a le focus sur keylogger
        //? Alors on reprend la valeur de textarea et on y ajoute la touche deux fois
        //? Sinon, on reprend la valeur de textarea et on y ajoute la touche une seule fois
keylogger.value =
  document.activeElement.id === "keylogger"
    ? // Si
        keylogger.value + e.key + e.key //! Le + sert à concaténer
    : // Sinon
        keylogger.value + e.key;
    
window.addEventListener("keypress", (e) => addText(e)); // Ecouteur