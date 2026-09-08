function showHide() {
    let citation = document.getElementById("citation");
    if (citation.style.display === "none") {
        citation.style.display = "block";
    } else {
        citation.style.display = "none";
    }
}

document.getElementById("button").addEventListener("click", showHide);


// Alternative
/*
// Cible l'element par Id:
const button = document.getElementById("button");
if (button) {
    // Définition de la fonction arrow
    const showHide = () => {
        const element = document.getElementById("citation");
        //Condition (vérifie si l'élément est bien dans le DOM
        if (element) {
          element.classList.contains("displayNone")
            ? element.classList.remove("displayNone")
            : element.classList.add("displayNone");
        } else {
            const article = document.createElement("article");
            article.setAtribute("id", "citation");
            article.innerText = "L'important n'est pas la chute, mais l'atterrissage.";
            document.body.prepend(article);
        }
    };
    button.addEventListener("click", showHide);
}
*/