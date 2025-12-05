function showHide() {
    let citation = document.getElementById("citation");
    if (citation.style.display === "none") {
        citation.style.display = "block";
    } else {
        citation.style.display = "none";
    }
}

document.getElementById("button").addEventListener("click", showHide);