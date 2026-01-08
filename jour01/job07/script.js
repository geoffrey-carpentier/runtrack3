
function jourtravaille(date) {
    let jour = date.getDate();
    let mois = date.getMonth() + 1;  // getMonth() retourne 0-11, donc +1
    let annee = date.getFullYear();
    let jourSemaine = date.getDay();  // 0=Dimanche, 6=Samedi

    // Liste des jours fériés en 2020 (format MM-DD)
    let joursFeries = [
        "01-01",  // Nouvel An
        "04-13",  // Lundi de Pâques
        "05-01",  // Fête du Travail
        "05-08",  // Victoire 1945
        "05-21",  // Ascension
        "06-01",  // Pentecôte
        "07-14",  // Fête Nationale
        "08-15",  // Assomption
        "11-01",  // Toussaint
        "11-11",  // Armistice
        "12-25"   // Noël
    ];

    let dateStr = (mois < 10 ? "0" : "") + mois + "-" + (jour < 10 ? "0" : "") + jour;

    if (joursFeries.includes(dateStr)) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié`);
    } else if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end`);
    } else {
        console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé`);
    }
}

// Exemples de test
jourtravaille(new Date(2020, 0, 1));   // Jour férié
jourtravaille(new Date(2020, 5, 9));   // Jour travaillé
jourtravaille(new Date(2020, 5, 13));  // Week-end (samedi)





// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job07> node script.js"




//! Methode 2

async function jourtravaille(date) {
    let Jour = date.getDate();
    let Joursemaine = date.getDay();
    let Jsemaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    let Mois = date.getMonth(); // Les mois sont indexés de 0 à 11
    let Nmois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    let Annee = date.getFullYear();
    const response = await fetch(`https://calendrier.api.gouv.fr/jours-feries/metropole/${Annee}.json`);
    const joursFeries = await response.json();
    let dateCompare = `${Annee}-${String(Mois+1).padStart(2, "0")}-${String(Jour).padStart(2, "0")}`;
    if (dateCompare in joursFeries) {
        console.log(`Le, ${Jsemaine[Joursemaine]} ${Jour} ${Nmois[Mois]} ${Annee} est un jour férié`);
    }
    else if (Joursemaine === 0 || Joursemaine === 6) {
        console.log(`Non, ${Jsemaine[Joursemaine]} ${Jour} ${Nmois[Mois]} ${Annee} est un week-end`);
    }
    else {
        console.log(`Oui, ${Jsemaine[Joursemaine]} ${Jour} ${Nmois[Mois]} ${Annee} est un jour travaillé`);
    }
}
