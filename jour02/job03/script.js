function addOne() {
    let compteur = document.getElementById("compteur");
    let nbClics = parseInt(compteur.textContent);
    compteur.textContent = nbClics + 1;
}

document.getElementById("button").addEventListener("click", addOne);

/* const button = document.getElementById("button"); // selecteur

if (button) {

function addOne() {
    const compteur = document.getElementById("compteur");

        if (compteur) {
       compteur.textContent(compteur.textContent++);
    }
       button.addEventListener("click", addOne); // ecouteur d'evenements