let compteur = 0.2;
// let compteur = compteur * compteur

function incrementerCompteur() {
    compteur++;
    document.getElementById("compteur").textContent = compteur; 

}

function decrementerCompteur() {
    compteur--;
    document.getElementById("compteur").textContent = compteur; 
}   


function compteurCarré() {
    compteur = compteur * compteur;
    document.getElementById("compteur").textContent = compteur; 
}
function demiCompteur() {
    compteur = compteur / 2;
    document.getElementById("compteur").textContent = compteur; 
}
function compteurExponentiel() {
    compteur = Math.exp(compteur);
    document.getElementById("compteur").textContent = compteur; 
}  
function racineCarreeCompteur() {
    compteur = Math.sqrt(compteur);
    document.getElementById("compteur").textContent = compteur; 
}
function reinitialiserCompteur() {
    compteur = 0;
    document.getElementById("compteur").textContent = compteur; 
}