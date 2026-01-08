(function ($) {
    const alarms = [];
    let alarmId = 0;
    let timer = null;

    const pad2 = (n) => String(n).padStart(2, '0');

    function nowInfo() {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();
        const msToday = ((h * 60 + m) * 60 + s) * 1000 + d.getMilliseconds();
        return { h, m, s, msToday };
    }

    function formatRemaining(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        if (h > 0) return `${h}h ${pad2(m)}m ${pad2(s)}s`;
        if (m > 0) return `${m}m ${pad2(s)}s`;
        return `${s}s`;
    }

    function renderList() {
        const { msToday } = nowInfo();
        $('#alarm-list').empty();
        alarms.forEach((a) => {
            const diff = a.targetMs - msToday;
            const passed = diff <= 0 || a.fired;
            const badgeClass = passed ? 'badge-past' : 'badge-future';
            const badgeText = passed ? 'passée' : `dans ${formatRemaining(diff)}`;
            const firedMark = a.fired ? ' 🔔' : '';
            $('#alarm-list').append(
                `<li><span>${pad2(a.h)}:${pad2(a.m)} - ${a.label}${firedMark}</span><span class="badge ${badgeClass}">${badgeText}</span></li>`
            );
        });
    }

    function showAlert(msg) {
        $('#alarm-alert').text(msg).prop('hidden', false);
        setTimeout(() => $('#alarm-alert').prop('hidden', true), 8000);
    }

    function checkAlarms() {
        const { msToday, h, m, s } = nowInfo();
        alarms.forEach((a) => {
            if (!a.fired && msToday >= a.targetMs) {
                a.fired = true;
                showAlert(`Alarme ${pad2(a.h)}:${pad2(a.m)} - ${a.label}`);
            }
        });
        renderList();
    }

    function addAlarm(h, m, label) {
        const targetMs = ((h * 60 + m) * 60) * 1000; // secondes 0
        alarms.push({ id: ++alarmId, h, m, label, targetMs, fired: false });
        renderList();
    }

    $(function () {
        $('#alarm-form').on('submit', function (e) {
            e.preventDefault();
            const time = $('#alarm-time').val(); // "HH:MM"
            const label = $('#alarm-label').val().trim();
            if (!time || !label) return;
            const [hStr, mStr] = time.split(':');
            const h = Number(hStr);
            const m = Number(mStr);
            if (Number.isNaN(h) || Number.isNaN(m)) return;
            addAlarm(h, m, label);
            this.reset();
        });

        timer = setInterval(checkAlarms, 1000);
        renderList();
    });
})(jQuery);