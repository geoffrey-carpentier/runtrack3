(function ($) {
    let isRunning = false;
    let baseMs = 60_000;      // valeur saisie (ms)
    let remainingMs = baseMs; // reste à décompter
    let endAt = null;
    let intervalId = null;

    const pad2 = (n) => String(n).padStart(2, '0');

    function updateDisplay(ms = remainingMs) {
        const totalSec = Math.max(0, Math.ceil(ms / 1000));
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        $('#timer-display').text(`${pad2(m)}:${pad2(s)}`);
    }

    function showAlert(msg) {
        $('#timer-alert').text(msg).prop('hidden', false);
    }
    function hideAlert() {
        $('#timer-alert').prop('hidden', true);
    }

    function tick() {
        remainingMs = Math.max(0, endAt - Date.now());
        updateDisplay(remainingMs);
        if (remainingMs <= 0) {
            stop(true);
            showAlert('Temps écoulé !');
        }
    }

    function start() {
        if (isRunning || remainingMs <= 0) return;
        isRunning = true;
        hideAlert();
        endAt = Date.now() + remainingMs;
        $('#timer-toggle').text('Stop');
        $('#timer-reset').prop('disabled', false);
        intervalId = setInterval(tick, 200);
    }

    function stop(forceEnd = false) {
        if (!isRunning && !forceEnd) return;
        isRunning = false;
        clearInterval(intervalId);
        intervalId = null;
        if (!forceEnd) {
            remainingMs = Math.max(0, endAt - Date.now());
            updateDisplay();
        } else {
            remainingMs = 0;
            updateDisplay(0);
        }
        $('#timer-toggle').text('Start');
    }

    function reset() {
        stop();
        remainingMs = baseMs;
        updateDisplay();
        hideAlert();
        $('#timer-reset').prop('disabled', remainingMs === 0);
    }

    function setMinutesFromInput() {
        const mins = Math.min(999, Math.max(0, parseInt($('#timer-minutes').val(), 10) || 0));
        $('#timer-minutes').val(mins);
        baseMs = mins * 60_000;
        remainingMs = baseMs;
        reset();
    }

    $(function () {
        updateDisplay();

        $('#timer-toggle').on('click', () => (isRunning ? stop() : start()));
        $('#timer-reset').on('click', reset);

        $('#timer-minutes').on('change', setMinutesFromInput);
        $('.timer-inc').on('click', () => { $('#timer-minutes').val((i, v) => +v + 1); setMinutesFromInput(); });
        $('.timer-dec').on('click', () => { $('#timer-minutes').val((i, v) => Math.max(0, +v - 1)); setMinutesFromInput(); });
    });
})(jQuery);