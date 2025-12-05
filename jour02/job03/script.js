function addOne() {
    let compteur = document.getElementById("compteur");
    let nbClics = parseInt(compteur.textContent);
    compteur.textContent = nbClics + 1;
}

document.getElementById("button").addEventListener("click", addOne);