let keylogger = document.getElementById("keylogger");

function addText(e) {
    e.preventDefault();
    if (e.key.match(/[a-z]/)) {  // Vérifie si c'est une lettre a-z
        if (document.activeElement === keylogger) {
            keylogger.value += e.key + e.key;  // Ajoute deux fois si focus dans textarea
        } else {
            keylogger.value += e.key;  // Ajoute une fois sinon
        }
    }
}
console.log(keylogger);

window.addEventListener('keypress', addText);