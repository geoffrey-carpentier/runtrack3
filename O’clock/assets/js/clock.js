(function ($) {
    const pad = (n) => String(n).padStart(2, '0');

    function getFrenchTime() {
        const now = new Date();
        // Convertir en UTC+1 (France hors DST simple). Pour gérer l'heure d'été/hiver,
        // on peut remplacer par Intl.DateTimeFormat plus bas.
        const offsetMinutes = now.getTimezoneOffset(); // minutes from UTC
        const targetOffset = -60; // UTC+1 => -60 minutes vs UTC
        const diff = (targetOffset - offsetMinutes) * 60000;
        return new Date(now.getTime() + diff);
    }

    function renderClock() {
        const d = getFrenchTime();
        const h = pad(d.getHours());
        const m = pad(d.getMinutes());
        const s = pad(d.getSeconds());
        $('#clock-display').text(`${h}:${m}:${s}`);
        $('#alarm-clock-mirror').text(`${h}:${m}:${s}`); // miroir pour la section réveil
        requestAnimationFrame(renderClock);
    }

    $(function () {
        // Version alternative plus robuste avec Intl pour l'heure locale française :
        // const fmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris', hour12: false });
        // const renderClock = () => { $('#clock-display, #alarm-clock-mirror').text(fmt.format(Date.now())); requestAnimationFrame(renderClock); };

        renderClock();
    });
})(jQuery);