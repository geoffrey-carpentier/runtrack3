// Définir la séquence du code Konami : ↑ ↑ ↓ ↓ ← → ← → B A
// Utilise les noms des touches (e.key) pour 'keydown'.
// Ici, séquence classique du jeu Konami (souvent utilisée pour des easter eggs).
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Variable pour suivre l'index actuel dans la séquence.
// Commence à 0, incrémente à chaque touche correcte.
let index = 0;

// Ajoute un écouteur d'événement sur la fenêtre pour 'keydown'.
// 'keydown' est déclenché à l'appui de la touche (plus fiable que 'keypress' pour les flèches et lettres spéciales).
// La fonction anonyme (callback) sera appelée à chaque appui de touche.
window.addEventListener('keydown', function(e) {
    
    // Vérifie si la touche pressée (e.key) correspond à la touche attendue dans la séquence.
    // Si oui, incrémente l'index pour passer à la suivante.
    if (e.key === konamiCode[index]) {
        index++;  // Avance dans la séquence
        
        // Si l'index atteint la longueur de la séquence, le code est complet.
        // Applique alors les styles en ajoutant une classe CSS au body.
        if (index === konamiCode.length) {
            document.body.classList.add('konami');  // Ajoute la classe pour styliser
            index = 0;  // Réinitialise pour permettre de rejouer le code
        }
    } else {
        // Si la touche ne correspond pas, réinitialiser l'index à 0.
        // Cela permet de recommencer la séquence sans erreur.
        index = 0;
    }
});