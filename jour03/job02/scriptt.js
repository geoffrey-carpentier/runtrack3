// Fichier scriptt.js = code alternatif pour le jeu de l'arc-en-ciel: s'en inspirer, le comparer au fichier jour03\job02\script.js puis utiliser ce qui convient pour finaliser le jeu en corrigeant/améliorant le code existant. Penser à bien nettoyer le code final en supprimant les lignes inutiles ou en commentaire et à apporter les modifications conséquente aux autres fichiers si besoin (index.php, style.css).

const victoryCombination = [   // Tableau conditions de victoire
    "dropzone-1_arc1.png",
    "dropzone-2_arc2.png",
    "dropzone-3_arc3.png",
    "dropzone-4_arc4.png",
    "dropzone-5_arc5.png",
    "dropzone-6_arc6.png"
];

let currentCombination = [];  // Tableau de l'état actuel des pièces placées

function checkVictory() {
    if(

    ) currentCombination.length === 6
    && currentCombination.toString() === victoryCombination.toString() {
        alert("Félicitations ! Vous savez reconstituer un arc-en-ciel !");
    } else if (currentCombination.length === 6
        && currentCombination.toString() !== victoryCombination.toString() {
        alert("Quelle tristesse ! Essayez encore.");
    }
}

function randomizeDistribution() {
elementsImg = $(".draggable-box").find(
elementsImg.remove(); // Suppréssion de
// array des clé des éléments précédame


keyImage = Object.keys(elementsImg).fil


(item) => item != "length" && item !=



(keyImage).each(function () {
indexRandom = Math.floor(Math.random()* keyimage.length);
// On ajoute l'élément dans le DOM
$(".draggable-box").append($(elementsImg[keyImage[indexRandom]]));
// On retire la valeur du tableau keyImage
keyImage.splice(indexRandom, 1);
Initialisation de l'écouteur draggable
'".draggable-box").find("*").draggable({ revert: "invalid" });

cument).ready(function () {
Event Jquery on click
"#addButton").on("click", function () {
randomImage(); // Ramdom Image

Initialisation de l'écouteur draggable
'.draggable-box").find("*").draggable({ revert: "invalid" });
nitialisation de l'écouteur dropover
rop").on("dropover", function (event, ui) {
ple.log(event, ui);

hitialisation de l'écouteur dropdeactivate
con") on("drondeartivate"
function (event

ready() callback >on("click") callback
$(document).ready(function () {
// Initialisation de l'écouteur dropover
$(".drop").on("dropover", function (event, ui) {
console.log(event, ui);
});
// Initialisation de l'écouteur dropdeactivate
$("drop").on("dropdeactivate", function (event, ui) {
console.log(event, ui);
});
// Initialisation de l'écouteur droppable
$(".drop").droppable({
drop: function (event, ui) {
const { target, originalEvent } = event; // Object Event
const { draggable } = ui;
const idElementEvent = originalEvent.target.id; // id de l'éléments image
let imageElement = $( #${idElementEvent} ); // Element image

const fileName = draggable[0] ?. currentSrc ?. split(/(\\//)/g).pop(); // Récupèrer le
combinaisonActive.push(${target.id}_${fileName}); //Ajout de l'id du conteneur de
// DEBUG_Combinaison console.log(combinaisonActive);
checkVictory(); // Vérifie si le joueur gagne

$( #${target.id} )

.append(imageElement) // Ajoute l'élément dar
removeClass("ui-widget-content ui-dronnahle"):





let imageElement = $( #${idElementEvent} ); // Element image
const fileName = draggable[0] ?. currentSrc ?. split(/(\//)/g).pop();//
combinaisonActive.push( ${target.id}_${fileName}); // Ajout de l'id du

// DEBUG_Combinaison console.log(combinaisonActive);
checkingWinner(); // Vérifie si le joueur gagne
$( #${target.id}`)

. append(imageElement) // Ajoute l'élément dans le DOM
.removeClass("ui-widget-content ui-droppable");

// Définition de style pour ajuster l'image en Hauteur et largeur après le drop

$(`#${idElementEvent}` ).attr(

"style",

"width: 65px; heigth: 175px; margin:auto;"`
                );
            }
        });
    }