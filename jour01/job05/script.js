function afficherjourssemaines() {  // La fonction ne prend pas de paramètre
    // let permet 
    let jourssemaines = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    for (let i = 0; i < jourssemaines.length; i++) {
        console.log(jourssemaines[i]);
    }
}
afficherjourssemaines();  // Appel de la fonction pour afficher les jours
// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job05> node script.js"