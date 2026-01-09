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

// Les modules (horloge, minuteur, chrono, réveil) seront ajoutés ici, un par un.