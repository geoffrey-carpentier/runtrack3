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

// === Minuteur ===
let tempsMinuteur = 300; // secondes (05:00 par défaut)
let minuteurInterval = null;
let minuteurEnMarche = false;

// Affiche le minuteur au format MM:SS
function afficherMinuteur() {
    const m = Math.floor(tempsMinuteur / 60);
    const s = tempsMinuteur % 60;
    document.getElementById('minuteur-affichage').textContent = `${formatNumber(m)}:${formatNumber(s)}`;
}

// Active/désactive les contrôles selon l'état
function majEtatMinuteur() {
    document.getElementById('minuteur-moins').disabled = minuteurEnMarche || tempsMinuteur <= 0;
    document.getElementById('minuteur-plus').disabled = minuteurEnMarche;
    document.getElementById('minuteur-input').disabled = minuteurEnMarche;
    document.getElementById('minuteur-start').disabled = minuteurEnMarche || tempsMinuteur <= 0;
    document.getElementById('minuteur-stop').disabled = !minuteurEnMarche;
    document.getElementById('minuteur-reset').disabled = minuteurEnMarche || tempsMinuteur === 300; // 05:00 (5minutes) par défaut, à définir pour reset 
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
    tempsMinuteur = 300; // Temps par défaut après reset.
    document.getElementById('minuteur-input').value = 5;
    afficherMinuteur();
    majEtatMinuteur();
    document.getElementById('minuteur-alert').hidden = true;
}

// Incrémente/décrémente de 1 minute
function augmenterMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.min(5999, tempsMinuteur + 30); // max 99:59
    document.getElementById('minuteur-input').value = Math.floor(tempsMinuteur / 60);
    afficherMinuteur();
    majEtatMinuteur();
}
function diminuerMinuteur() {
    if (minuteurEnMarche) return;
    tempsMinuteur = Math.max(0, tempsMinuteur - 60);
    document.getElementById('minuteur-input').value = Math.floor(tempsMinuteur / 60);
    afficherMinuteur();
    majEtatMinuteur();
}

// Saisie directe (validation sur Entrée)
document.getElementById('minuteur-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        let val = parseInt(this.value, 10);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 99) val = 99;
        tempsMinuteur = val * 60;
        afficherMinuteur();
        majEtatMinuteur();
        this.blur();
    }
});

// Boutons
document.getElementById('minuteur-moins').addEventListener('click', diminuerMinuteur);
document.getElementById('minuteur-plus').addEventListener('click', augmenterMinuteur);
document.getElementById('minuteur-start').addEventListener('click', demarrerMinuteur);
document.getElementById('minuteur-stop').addEventListener('click', arreterMinuteur);
document.getElementById('minuteur-reset').addEventListener('click', resetMinuteur);

// Initialisation minuteur
afficherMinuteur();
majEtatMinuteur();
document.getElementById('minuteur-alert').hidden = true;

// Modules horloge | minuteur | chrono | réveil à venir.