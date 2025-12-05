
function changeBgColor(color) {
    let zone = document.getElementById('zone');
    zone.style.backgroundColor = color;
    
    // Bonus : texte blanc si couleur foncée
    if (color === 'blue' || color === 'green') {
        zone.style.color = 'white';
    } else {
        zone.style.color = 'black';
    }
}