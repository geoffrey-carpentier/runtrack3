function addText(e) {
    ? //Si
    keylogger.value + e.key + e.key
    : //Sinon
    keylogger.value + e.key;
}// Window keypress (Event e) => fonction (Event e)
window.addEventListener('keypress', (e) => addText(e)); //Ecouter