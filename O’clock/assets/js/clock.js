   //! ======================= !\\
  //!     Horloge numérique     !\\
 //! =========================== !\\

// Formater les nombres pour affichage cohérent sur l'horloge: sur 2 chiffres 

function formatNumber(n) { return n < 10 ? '0' + n : n; } // Si le nombre est <10, ajout d'un 0 devant (ex: 7 -> 07 )


// Gère la navigation SPA (Single Page App) : affiche la section demandée et active le bouton correspondant
 
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-' + btn.dataset.view).classList.add('active');
    });
});


//  Affiche l'heure (Europe/Paris) au format HH:MM:SS, mise à jour chaque seconde (GMT+1/2 géré automatiquement)

function afficherHorloge() {
    // Heure française (Europe/Paris, gère UTC+1/UTC+2 automatiquement)
    const maintenant = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Paris' };
    const [h, m, s] = new Intl.DateTimeFormat('fr-FR', options)
        .formatToParts(maintenant)
        .filter(p => p.type === 'hour' || p.type === 'minute' || p.type === 'second')
        .map(p => p.value.padStart(2, '0'));
    document.getElementById('horloge-affichage').textContent = `${h}:${m}:${s}`;
}
// Mise à jour de l'horloge toutes les secondes (1000 ms)
setInterval(afficherHorloge, 1000);
afficherHorloge(); // Affichage immédiat au chargement du DOM

//! ========== !\\
//!  Minuteur  !\\
//! ========== !\\

// Variables de gestion du minuteur
let tempsMinuteur = 300; // Durée du minuteur en secondes (ici, initialisé à 300 s par défaut -> 5 minutes)
let minuteurInterval = null; // Identifiant de l'intervalle de décompte
let minuteurEnMarche = false; // Indique si le minuteur est en cours d'exécution


//  Affiche le minuteur au format HH:MM:SS, ou MM:SS si moins d'une heure au compteur
 
function afficherMinuteur() {
    let h = Math.floor(tempsMinuteur / 3600);
    let m = Math.floor((tempsMinuteur % 3600) / 60);
    let s = tempsMinuteur % 60;
    // Affichage adaptatif : HH:MM:SS si h > 0, sinon MM:SS
    let affichage = h > 0
        ? `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
        : `${formatNumber(m)}:${formatNumber(s)}`;
    document.getElementById('minuteur-affichage').textContent = affichage;
}


// Mise à jour des champs HH/MM/SS en fonction de la valeur du minuteur.

function setMinuteurInputsFromSeconds(sec) {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;
    document.getElementById('minuteur-hh').value = formatNumber(h);
    document.getElementById('minuteur-mm').value = formatNumber(m);
    document.getElementById('minuteur-ss').value = formatNumber(s);
}


// Calculer le temps du Timer en secondes depuis les valeur des champs HH/MM/SS.

function getMinuteurSecondsFromInputs() {
    let h = parseInt(document.getElementById('minuteur-hh').value, 10) || 0;
    let m = parseInt(document.getElementById('minuteur-mm').value, 10) || 0;
    let s = parseInt(document.getElementById('minuteur-ss').value, 10) || 0;
    h = Math.max(0, Math.min(99, h));
    m = Math.max(0, Math.min(59, m));
    s = Math.max(0, Math.min(59, s));
    return h * 3600 + m * 60 + s;
}


// Activer/désactiver les contrôles du minuteur selon l'état courant (boutons +/-/start/stop/reset et inputs HH/MM/SS)

function majEtatMinuteur() {
    document.getElementById('minuteur-moins').disabled = minuteurEnMarche || tempsMinuteur <= 0;
    document.getElementById('minuteur-plus').disabled = minuteurEnMarche;
    document.getElementById('minuteur-hh').disabled = minuteurEnMarche;
    document.getElementById('minuteur-mm').disabled = minuteurEnMarche;
    document.getElementById('minuteur-ss').disabled = minuteurEnMarche;
    document.getElementById('minuteur-start').disabled = minuteurEnMarche || tempsMinuteur <= 0;
    document.getElementById('minuteur-stop').disabled = !minuteurEnMarche;
    document.getElementById('minuteur-reset').disabled = minuteurEnMarche || tempsMinuteur === 300;
}


// Démarrer le minuteur (lancer le décompte)

function demarrerMinuteur() {
    if (minuteurEnMarche || tempsMinuteur <= 0) return;
    minuteurEnMarche = true;
    majEtatMinuteur();
    document.getElementById('minuteur-alert').hidden = true;
    minuteurInterval = setInterval(() => {
        if (tempsMinuteur > 0) {
            tempsMinuteur--;
            afficherMinuteur();
            setMinuteurInputsFromSeconds(tempsMinuteur);
        }
        if (tempsMinuteur === 0) {
            arreterMinuteur();
            document.getElementById('minuteur-alert').hidden = false;
        }
    }, 1000);
}


// Arrêter le minuteur (le mettre en pause)

function arreterMinuteur() {
    minuteurEnMarche = false;
    clearInterval(minuteurInterval);
    majEtatMinuteur();
}


// RESET: Remettre le minuteur à zéro (en fait à 05:00, par défaut)

function resetMinuteur() {
    arreterMinuteur();
    tempsMinuteur = 300; // Valeur par défaut pour la fonction RESET du timer (en secondes)
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
    document.getElementById('minuteur-alert').hidden = true;
}


// Incrémenter le minuteur de n secondes (max 99:59:59)

function augmenterMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.min(359999, tempsMinuteur + 30);  // ici, on ajoute 30 secondes à chaque clic (n=30)
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
}


// Décrémenter le minuteur de n secondes (min 0)

function diminuerMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.max(0, tempsMinuteur - 30); // ici, on soustrait 30 secondes à chaque clic (n=30)
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
}

// Validation sur Entrée ou blur pour chaque champ HH/MM/SS
['minuteur-hh', 'minuteur-mm', 'minuteur-ss'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { // La touche de validation est "Entrée"
            tempsMinuteur = getMinuteurSecondsFromInputs();
            setMinuteurInputsFromSeconds(tempsMinuteur);
            afficherMinuteur();
            majEtatMinuteur();
            this.blur(); // Après validation, on enlève le focus de l'input
        }
    });
    document.getElementById(id).addEventListener('blur', function () { //
        tempsMinuteur = getMinuteurSecondsFromInputs();
        setMinuteurInputsFromSeconds(tempsMinuteur);
        afficherMinuteur();
        majEtatMinuteur();
    });
});

// Gestion des boutons du minuteur (+/-, start, stop, reset)
document.getElementById('minuteur-moins').addEventListener('click', diminuerMinuteur);
document.getElementById('minuteur-plus').addEventListener('click', augmenterMinuteur);
document.getElementById('minuteur-start').addEventListener('click', demarrerMinuteur);
document.getElementById('minuteur-stop').addEventListener('click', arreterMinuteur);
document.getElementById('minuteur-reset').addEventListener('click', resetMinuteur);

// Initialisation du minuteur au chargement
setMinuteurInputsFromSeconds(tempsMinuteur);
afficherMinuteur();
majEtatMinuteur();
document.getElementById('minuteur-alert').hidden = true;

//! ============= !\\
//!  Chronomètre  !\\
//! ============= !\\

// Variables pour gestion du chronomètre
let tempsChrono = 0; // le nombre desecondes écoulées
let chronoInterval = null; // Identifiant de l'intervalle du chrono (null si le chrono est arrêté)
let chronoEnMarche = false; // Indicateur de l'état du chrono 
let tours = []; // Liste des temps de passage (tours)
let chronoEtat = "initial"; // Etat du chrono (états possible: "initial", "marche", "pause")


// Afficher le chrono au format HH:MM:SS

function afficherChrono() {
    let h = Math.floor(tempsChrono / 3600);
    let m = Math.floor((tempsChrono % 3600) / 60);
    let s = tempsChrono % 60;
    document.getElementById('chrono-affichage').textContent =
        `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`;

//# A VOIR:  Affichage adaptatif : HH:MM:SS si h > 0, sinon MM:SS
//     let affichage = h > 0
//         ? `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
//         : `${formatNumber(m)}:${formatNumber(s)}`;
//     document.getElementById('minuteur-affichage').textContent = affichage;
}




// Mise à jour des boutons du chrono selon l'état courant

function majEtatChrono() {
    document.getElementById('chrono-toggle').textContent =
        chronoEtat === "marche" ? "Arrêter" : (chronoEtat === "pause" ? "Reprendre" : "Démarrer");
    document.getElementById('chrono-tour').disabled = !chronoEnMarche;
    document.getElementById('chrono-reset').disabled = chronoEtat === "initial";
}

// Démarrer/reprendre le chrono
function demarrerChrono() {
    if (chronoEnMarche) return;
    chronoEnMarche = true;
    chronoEtat = "marche";
    majEtatChrono();
    chronoInterval = setInterval(() => {
        tempsChrono++;
        afficherChrono();
    }, 1000);
}

// Mettre le chrono en pause
function arreterChrono() {
    chronoEnMarche = false;
    chronoEtat = "pause";
    clearInterval(chronoInterval);
    majEtatChrono();
}


// Remet le chronomètre à zéro et efface les tours

function resetChrono() {
    arreterChrono();
    tempsChrono = 0;
    tours = [];
    chronoEtat = "initial";
    afficherChrono();
    majEtatChrono();
    document.getElementById('chrono-tours').innerHTML = "";
}


// Enregistre un tour (mémorise le temps au clic sur "Tour")

function enregistrerTour() {
    if (!chronoEnMarche) return;
    tours.push(tempsChrono);
    afficherTours();
}

// Affiche la liste des temps (tours) enregistrés
function afficherTours() {
    const ul = document.getElementById('chrono-tours');
    ul.innerHTML = "";
    tours.forEach((t, i) => {
        let h = Math.floor(t / 3600);
        let m = Math.floor((t % 3600) / 60);
        let s = t % 60;
        ul.innerHTML += `<li>Tour ${i + 1} <span>${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}</span></li>`;
    });
}

// Gestion des boutons du chrono (démarrer/arreter toogle)
document.getElementById('chrono-toggle').addEventListener('click', function () {
    if (chronoEtat === "initial" || chronoEtat === "pause") demarrerChrono();
    else arreterChrono();
});
document.getElementById('chrono-tour').addEventListener('click', enregistrerTour);
document.getElementById('chrono-reset').addEventListener('click', resetChrono);

// Initialisation du chrono au chargement de la page
afficherChrono();
majEtatChrono();

//! ====== !\\
//! Réveil !\\
//! ====== !\\

// Variables pour gestion des alarmes du réveil
let alarmes = []; // Liste des alarmes {heure: "HH:MM" | message: "...", passée | bouton X}
let reveilInterval = null; // Identifiant de l'intervalle de vérification

// Ajoute une alarme à la liste (reportée au lendemain si l'heure est déjà passée)

function ajouterAlarme(heure, message) {
    const now = new Date();
    let [h, m] = heure.split(':').map(Number);
    let alarmeDate = new Date(now);
    alarmeDate.setHours(h, m, 0, 0);
    if (alarmeDate <= now) {
        // Si l'heure est déjà passée aujourd'hui, la planifier pour demain
        alarmeDate.setDate(alarmeDate.getDate() + 1);
    }
    alarmes.push({ heure, message, declenchee: false, timestamp: alarmeDate.getTime() });
    afficherAlarmes();
}

// Affiche la liste des alarmes avec leur statut (passée ou dans XHeures-Yminutes)
function afficherAlarmes() {
    const ul = document.getElementById('reveil-list');
    ul.innerHTML = "";
    const now = Date.now();
    alarmes.forEach((a, i) => {
        let diff = Math.floor((a.timestamp - now) / 1000); // Différence en secondes
        let statut = "";
        if (a.declenchee) {
            statut = `<span class="badge badge-past">passée</span>`;
        } else if (diff > 0) {
            let hRest = Math.floor(diff / 3600);
            let mRest = Math.floor((diff % 3600) / 60) % 60;
            statut = `<span class="badge badge-future">dans ${hRest > 0 ? hRest + "h " : ""}${mRest}min</span>`;
        } else {
            statut = `<span class="badge badge-past">passée</span>`;
        }
        // Affichage HH:MM (prochaine occurrence)
        let d = new Date(a.timestamp);
        let hAff = formatNumber(d.getHours());
        let mAff = formatNumber(d.getMinutes());
        ul.innerHTML += `<li>
            <span>${hAff}:${mAff} - ${a.message}</span>
            ${statut}
            <button class="btn-suppr" data-index="${i}" title="Supprimer">&#10006;</button>
        </li>`;
    });
}

// Vérifie chaque seconde si une alarme doit se déclencher

function verifierAlarmes() {
    const now = Date.now();
    alarmes.forEach((a) => {
        // Si l'alarme n'a pas encore été déclenchée et que l'heure est atteinte
        if (!a.declenchee && Math.abs(a.timestamp - now) < 1000) {
            a.declenchee = true; // Marquer comme déclenchée
            afficherAlarmes();    // Mettre à jour la liste
            afficherAlerteReveil(a.message); // Afficher l'alerte
            // On NE SUPPRIME PLUS l'alarme, elle reste dans la liste avec le statut "passée"
        }
    });
}


// Affiche une alerte visuelle pour le réveil (message personnalisé)
function afficherAlerteReveil(msg) {
    const alertDiv = document.getElementById('reveil-alert');
    alertDiv.textContent = msg;
    alertDiv.hidden = false;
    setTimeout(() => { alertDiv.hidden = true; }, 8000);
}

// Suppression d'une alarme via un bouton X
document.getElementById('reveil-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-suppr')) {
        const idx = e.target.dataset.index;
        alarmes.splice(idx, 1);
        afficherAlarmes();
    }
});

// Gestion du formulaire d'ajout d'alarme
document.getElementById('reveil-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const heure = document.getElementById('reveil-heure').value;
    const message = document.getElementById('reveil-message').value.trim();
    if (!heure || !message) return;
    ajouterAlarme(heure, message);
    this.reset();
});

// Lancer la vérification cyclique des alarmes (toutes les secondes)
if (!reveilInterval) {
    reveilInterval = setInterval(verifierAlarmes, 1000);
}
