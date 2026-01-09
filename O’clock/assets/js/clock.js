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

// Modules horloge | minuteur | chrono | réveil à venir.