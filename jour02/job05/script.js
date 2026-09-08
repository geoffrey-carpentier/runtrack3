window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;


    let red = Math.max(255 - (scrollPercent * 2.55), 0);
    let green = Math.min(scrollPercent * 2.55, 255);
    let color = `rgb(${Math.round(red)}, ${Math.round(green)}, 0)`;

    document.getElementById('footer').style.backgroundColor = color;
});

// Ajout d'un écouteur d'événement sur la fenêtre pour l'événement 'scroll'.
// --> lorsque que l'utilisateur fait défiler la page, la fonction anonyme (callback) sera exécutée.

window.addEventListener('scroll', function() {
    
    // Récupère la position verticale actuelle du scroll (en pixels) depuis le haut de la page.
    // window.pageYOffset: propriété qui donne le nombre de pixels dont la page a été scrollée verticalement.
    // Pour les navigateurs modernes, window.scrollY est équivalent, 
    // pageYOffset est plus largement compatible avec les anciens navigateurs.
    let scrollTop = window.pageYOffset;
    
    // Calcule la hauteur totale du document (du body) moins la hauteur de la fenêtre visible.
    // 'document.body.scrollHeight' donne la hauteur totale du contenu (y compris le hors écran).
    // window.innerHeight donne la hauteur de la fenêtre du navigateur (viewport).
    // La différence représente la distance maximale que l'on peut scroller.
    let docHeight = document.body.scrollHeight - window.innerHeight;
    
    // Calcul du % de scroll : (position actuelle / distance maximale) * 100.
    // Cela donne un nombre entre 0 (no scroll) et 100 (scroll max).
    // Si docHeight est 0 (pas de scroll possible), cela évitera une division par zéro implicitement, mais en pratique, avec min-height: 4096px, il y a du scroll.
    let scrollPercent = (scrollTop / docHeight) * 100;
    
    // La couleur évolue de rouge (0% scroll) à vert (100% scroll)
    let red = Math.max(255 - (scrollPercent * 2.55), 0);
    
    
    let green = Math.min(scrollPercent * 2.55, 255);
    
   
    let color = `rgb(${Math.round(red)}, ${Math.round(green)}, 0)`;
    
   
    document.getElementById('footer').style.backgroundColor = color;
});

 // Commentaire : La couleur évolue de rouge (0% de scroll) à vert (100% de scroll).
    // Nous allons calculer les composantes RGB pour passer de rouge pur (255, 0, 0) à vert pur (0, 255, 0).
    
    // Calcule la composante rouge : Elle diminue de 255 à 0 au fur et à mesure du scroll.
    // scrollPercent * 2.55 convertit le pourcentage en valeur RGB (100% = 255).
    // Math.max assure que la valeur ne descend pas en dessous de 0 (au cas où scrollPercent dépasse 100).

    // Calcule la composante verte : Elle augmente de 0 à 255 au fur et à mesure du scroll.
    // Math.min assure que la valeur ne dépasse pas 255 (au cas où scrollPercent dépasse 100).

     // Construit la chaîne de couleur RGB en utilisant les valeurs calculées.
    // Math.round arrondit les valeurs à l'entier le plus proche pour éviter les décimales (RGB accepte seulement des entiers 0-255).
    // Le bleu est fixé à 0 pour une transition rouge-vert.

     // Applique la couleur calculée au background du footer.
    // document.getElementById('footer') sélectionne l'élément HTML avec id="footer".
    // .style.backgroundColor modifie la propriété CSS background-color dynamiquement.