// Horloge numérique

// Fonctions utilitaires
function formatNumber(n) { return n < 10 ? '0' + n : n; }

// Navigation SPA
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-' + btn.dataset.view).classList.add('active');
    });
});

// Horloge numérique (HH:MM:SS, heure française, MAJ chaque seconde)
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

// Lancer la mise à jour de l'horloge toutes les secondes
setInterval(afficherHorloge, 1000);
afficherHorloge(); // affichage immédiat au chargement

// === Minuteur amélioré ===
let tempsMinuteur = 300; // secondes (05:00 par défaut)
let minuteurInterval = null;
let minuteurEnMarche = false;

// Affiche le minuteur au format HH:MM:SS ou MM:SS si < 1h
function afficherMinuteur() {
    let h = Math.floor(tempsMinuteur / 3600);
    let m = Math.floor((tempsMinuteur % 3600) / 60);
    let s = tempsMinuteur % 60;
    let affichage = h > 0
        ? `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
        : `${formatNumber(m)}:${formatNumber(s)}`;
    document.getElementById('minuteur-affichage').textContent = affichage;
}

// Met à jour les champs HH/MM/SS selon la valeur du minuteur
function setMinuteurInputsFromSeconds(sec) {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;
    document.getElementById('minuteur-hh').value = formatNumber(h);
    document.getElementById('minuteur-mm').value = formatNumber(m);
    document.getElementById('minuteur-ss').value = formatNumber(s);
}

// Récupère la valeur totale en secondes depuis les champs
function getMinuteurSecondsFromInputs() {
    let h = parseInt(document.getElementById('minuteur-hh').value, 10) || 0;
    let m = parseInt(document.getElementById('minuteur-mm').value, 10) || 0;
    let s = parseInt(document.getElementById('minuteur-ss').value, 10) || 0;
    h = Math.max(0, Math.min(99, h));
    m = Math.max(0, Math.min(59, m));
    s = Math.max(0, Math.min(59, s));
    return h * 3600 + m * 60 + s;
}

// Active/désactive les contrôles selon l'état
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

// Démarre le minuteur
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

// Arrête le minuteur
function arreterMinuteur() {
    minuteurEnMarche = false;
    clearInterval(minuteurInterval);
    majEtatMinuteur();
}

// Remet à zéro (5:00)
function resetMinuteur() {
    arreterMinuteur();
    tempsMinuteur = 300;
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
    document.getElementById('minuteur-alert').hidden = true;
}

// Incrémente/décrémente de 30 secondes
function augmenterMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.min(359999, tempsMinuteur + 30);
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
}
function diminuerMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.max(0, tempsMinuteur - 30);
    setMinuteurInputsFromSeconds(tempsMinuteur);
    afficherMinuteur();
    majEtatMinuteur();
}

// Validation sur Entrée ou blur
['minuteur-hh', 'minuteur-mm', 'minuteur-ss'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            tempsMinuteur = getMinuteurSecondsFromInputs();
            setMinuteurInputsFromSeconds(tempsMinuteur);
            afficherMinuteur();
            majEtatMinuteur();
            this.blur();
        }
    });
    document.getElementById(id).addEventListener('blur', function () {
        tempsMinuteur = getMinuteurSecondsFromInputs();
        setMinuteurInputsFromSeconds(tempsMinuteur);
        afficherMinuteur();
        majEtatMinuteur();
    });
});

// Boutons
document.getElementById('minuteur-moins').addEventListener('click', diminuerMinuteur);
document.getElementById('minuteur-plus').addEventListener('click', augmenterMinuteur);
document.getElementById('minuteur-start').addEventListener('click', demarrerMinuteur);
document.getElementById('minuteur-stop').addEventListener('click', arreterMinuteur);
document.getElementById('minuteur-reset').addEventListener('click', resetMinuteur);

// Initialisation minuteur
setMinuteurInputsFromSeconds(tempsMinuteur);
afficherMinuteur();
majEtatMinuteur();
document.getElementById('minuteur-alert').hidden = true;

// Modules horloge | minuteur | chrono | réveil à venir.