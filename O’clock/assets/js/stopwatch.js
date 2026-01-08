(function ($) {
    let isRunning = false;
    let startTime = 0;      // timestamp (performance.now) au dernier start
    let elapsed = 0;        // ms cumulés
    let rafId = null;
    let lapCount = 0;

    const pad2 = (n) => String(n).padStart(2, '0');
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const tenths = Math.floor((ms % 1000) / 100);
        return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}.${tenths}`;
    };

    function render() {
        if (!isRunning) return;
        const now = performance.now();
        elapsed = now - startTime;
        $('#stopwatch-display').text(formatTime(elapsed));
        rafId = requestAnimationFrame(render);
    }

    function start() {
        if (isRunning) return;
        isRunning = true;
        startTime = performance.now() - elapsed;
        $('#stopwatch-toggle').text('Stop');
        $('#stopwatch-lap, #stopwatch-reset').prop('disabled', false);
        rafId = requestAnimationFrame(render);
    }

    function stop() {
        if (!isRunning) return;
        isRunning = false;
        cancelAnimationFrame(rafId);
        // elapsed déjà mis à jour par render; on force une dernière maj
        $('#stopwatch-display').text(formatTime(elapsed));
        $('#stopwatch-toggle').text('Start');
    }

    function reset() {
        stop();
        elapsed = 0;
        lapCount = 0;
        $('#stopwatch-display').text('00:00:00.0');
        $('#stopwatch-lap').prop('disabled', true);
        $('#stopwatch-reset').prop('disabled', true);
        $('#stopwatch-laps').empty();
    }

    function addLap() {
        if (!isRunning && elapsed === 0) return;
        lapCount += 1;
        const timeStr = formatTime(elapsed);
        $('#stopwatch-laps').append(
            `<li><span>Tour ${lapCount}</span><strong>${timeStr}</strong></li>`
        );
    }

    $(function () {
        $('#stopwatch-toggle').on('click', () => (isRunning ? stop() : start()));
        $('#stopwatch-lap').on('click', addLap);
        $('#stopwatch-reset').on('click', reset);
    });
})(jQuery);