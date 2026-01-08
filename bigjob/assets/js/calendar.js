// Gestion calendar : sélection -> créer demande (localStorage), clic événement -> annuler si possible.

document.addEventListener('DOMContentLoaded', function () {
    console.log('FullCalendar:', typeof FullCalendar);
    if (typeof FullCalendar === 'undefined') {
        alert("FullCalendar non chargé");
        return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Veuillez vous connecter.');
        window.location.href = 'login.html';
        return;
    }

    // Bornes autorisées
    const MIN_TIME = '08:00';
    const MAX_TIME = '20:00';

    // Constantes demi‑journée
    const AM_START = '08:00';
    const AM_END = '12:00';
    const PM_START = '13:00';
    const PM_END = '17:00';

    const todayISO = new Date().toISOString().split('T')[0];
    const toISO = (dateStr, timeStr) => `${dateStr}T${timeStr}:00`;
    const timeStr = (d) => d.toTimeString().slice(0, 5);

    function getAllRequests() { return JSON.parse(localStorage.getItem('requests') || '[]'); }
    function saveRequests(list) { localStorage.setItem('requests', JSON.stringify(list)); }
    function pendingCountForUser() {
        return getAllRequests().filter(r => String(r.userId) === String(user.id) && r.status === 'pending').length;
    }
    function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }

    function getUserEvents() {
        return getAllRequests()
            .filter(r => String(r.userId) === String(user.id))
            .map(r => {
                const titleBase = r.status === 'approved' ? 'Présence validée' : r.status === 'pending' ? 'En attente' : 'Refusée';
                const color = r.status === 'approved' ? '#16a34a' : r.status === 'pending' ? '#facc15' : '#ef4444';
                if (r.kind === 'half') {
                    const s = r.period === 'AM' ? AM_START : PM_START;
                    const e = r.period === 'AM' ? AM_END : PM_END;
                    return { id: String(r.id), title: `${titleBase} (${r.period === 'AM' ? 'Matin' : 'Après-midi'})`, start: toISO(r.date, s), end: toISO(r.date, e), color };
                }
                return { id: String(r.id), title: `${titleBase} (${r.startTime}–${r.endTime})`, start: toISO(r.date, r.startTime), end: toISO(r.date, r.endTime), color };
            });
    }

    function addPresenceRequestHalfDay(dateStr, period) {
        if (dateStr < todayISO) { alert("Date passée non autorisée."); return false; }
        if (pendingCountForUser() >= 5) { alert("Limite de 5 demandes en attente atteinte."); return false; }

        const list = getAllRequests();
        const aStart = period === 'AM' ? AM_START : PM_START;
        const aEnd = period === 'AM' ? AM_END : PM_END;

        if (list.some(r => r.userId == user.id && r.date === dateStr && r.kind === 'half' && r.period === period && r.status === 'pending')) {
            alert("Vous avez déjà une demande en attente pour cette période."); return false;
        }
        const conflict = list.some(r => r.userId == user.id && r.date === dateStr && r.status === 'pending' && (
            r.kind === 'time' ? overlaps(aStart, aEnd, r.startTime, r.endTime) : r.kind === 'half' && r.period === period
        ));
        if (conflict) { alert("Chevauchement avec une autre demande en attente."); return false; }

        const req = { id: Date.now(), userId: user.id, nom: user.nom || '', prenom: user.prenom || '', date: dateStr, kind: 'half', period, status: 'pending' };
        list.push(req); saveRequests(list);

        calendar.addEvent({ id: String(req.id), title: 'En attente ' + (period === 'AM' ? '(Matin)' : '(Après-midi)'), start: toISO(dateStr, aStart), end: toISO(dateStr, aEnd), color: '#facc15' });
        return true;
    }

    function addPresenceRequestTime(dateStr, startTime, endTime) {
        if (dateStr < todayISO) { alert("Date passée non autorisée."); return false; }
        if (pendingCountForUser() >= 5) { alert("Limite de 5 demandes en attente atteinte."); return false; }
        if (startTime < MIN_TIME || endTime > MAX_TIME) { alert("Créneau hors des heures autorisées (08:00–20:00)."); return false; }
        if (endTime <= startTime) { alert("Heure de fin invalide."); return false; }
        // durée min 1h
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);
        const mins = (eh * 60 + em) - (sh * 60 + sm);
        if (mins < 60) { alert("Durée minimale 1h."); return false; }

        const list = getAllRequests();
        const conflict = list.some(r => r.userId == user.id && r.date === dateStr && r.status === 'pending' && (
            r.kind === 'half'
                ? overlaps(startTime, endTime, r.period === 'AM' ? AM_START : PM_START, r.period === 'AM' ? AM_END : PM_END)
                : overlaps(startTime, endTime, r.startTime, r.endTime)
        ));
        if (conflict) { alert("Chevauchement avec une autre demande en attente."); return false; }

        const req = { id: Date.now(), userId: user.id, nom: user.nom || '', prenom: user.prenom || '', date: dateStr, kind: 'time', startTime, endTime, status: 'pending' };
        list.push(req); saveRequests(list);

        calendar.addEvent({ id: String(req.id), title: `En attente (${startTime}–${endTime})`, start: toISO(dateStr, startTime), end: toISO(dateStr, endTime), color: '#facc15' });
        return true;
    }

    function cancelRequest(id) {
        const list = getAllRequests();
        const idx = list.findIndex(r => String(r.id) === String(id));
        if (idx === -1) return false;
        const today = new Date().toISOString().split('T')[0];
        if (list[idx].date < today || list[idx].status !== 'pending') return false;
        list.splice(idx, 1); saveRequests(list); return true;
    }

    // Modal de demande
    function ensureModal() {
        let modal = document.getElementById('request-modal');
        if (modal) return modal;
        modal = document.createElement('div');
        modal.id = 'request-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-md rounded shadow p-4">
          <h3 class="text-lg font-semibold mb-3">Demande de présence</h3>
          <form id="request-form" class="space-y-3">
            <div>
              <label class="block text-sm font-medium">Date</label>
              <input id="req-date" type="date" class="mt-1 w-full border rounded p-2" readonly />
            </div>
            <div>
              <label class="block text-sm font-medium">Type</label>
              <select id="req-type" class="mt-1 w-full border rounded p-2">
                <option value="half">Demi‑journée</option>
                <option value="time">Créneau horaire</option>
              </select>
            </div>
            <div id="half-fields" class="flex items-center gap-2">
              <label class="text-sm">Période</label>
              <select id="req-period" class="border rounded p-2 w-full">
                <option value="AM">Matin (08:00–12:00)</option>
                <option value="PM">Après‑midi (13:00–17:00)</option>
              </select>
            </div>
            <div id="time-fields" class="hidden grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm">Début (08:00–20:00)</label>
                <input id="req-start" type="time" min="${MIN_TIME}" max="${MAX_TIME}" step="1800" class="mt-1 w-full border rounded p-2" />
              </div>
              <div>
                <label class="block text-sm">Fin (≥ 1h après)</label>
                <input id="req-end" type="time" min="${MIN_TIME}" max="${MAX_TIME}" step="1800" class="mt-1 w-full border rounded p-2" />
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <button type="button" id="req-cancel" class="px-3 py-2 bg-gray-200 rounded">Annuler</button>
              <button type="submit" class="px-3 py-2 bg-blue-600 text-white rounded">Envoyer</button>
            </div>
            <p class="text-xs text-gray-500">Autorisé: Lundi à Samedi, 08:00–20:00. Durée minimale 1h. Limite 5 demandes en attente.</p>
          </form>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        return modal;
    }

    function openRequestModal(dateStr, initialStart, initialEnd, isAllDay) {
        const modal = ensureModal();
        const form = modal.querySelector('#request-form');
        const typeSel = modal.querySelector('#req-type');
        const halfFields = modal.querySelector('#half-fields');
        const timeFields = modal.querySelector('#time-fields');
        const dateInput = modal.querySelector('#req-date');
        const periodSel = modal.querySelector('#req-period');
        const startInput = modal.querySelector('#req-start');
        const endInput = modal.querySelector('#req-end');
        const cancelBtn = modal.querySelector('#req-cancel');

        dateInput.value = dateStr;
        // Préselection selon la vue
        typeSel.value = isAllDay ? 'half' : 'time';
        halfFields.classList.toggle('hidden', typeSel.value !== 'half');
        timeFields.classList.toggle('hidden', typeSel.value !== 'time');

        // Clamp heures
        const clamp = (t) => Math.max(
            Number(MIN_TIME.replace(':', '')),
            Math.min(Number(MAX_TIME.replace(':', '')), Number(String(t || MIN_TIME).replace(':', '')))
        );

        if (initialStart) {
            const s = clamp(initialStart);
            startInput.value = `${String(s).padStart(4, '0').slice(0, 2)}:${String(s).padStart(4, '0').slice(2)}`;
        } else {
            startInput.value = MIN_TIME;
        }
        if (initialEnd) {
            const e = clamp(initialEnd);
            endInput.value = `${String(e).padStart(4, '0').slice(0, 2)}:${String(e).padStart(4, '0').slice(2)}`;
        } else {
            endInput.value = '09:00';
        }

        typeSel.onchange = () => {
            const half = typeSel.value === 'half';
            halfFields.classList.toggle('hidden', !half);
            timeFields.classList.toggle('hidden', half);
        };
        cancelBtn.onclick = () => { modal.classList.add('hidden'); };

        form.onsubmit = (e) => {
            e.preventDefault();
            // Dimanche interdit (garde)
            const d = new Date(dateStr);
            if (d.getDay() === 0) { alert("Dimanche non autorisé."); return; }

            let ok = false;
            if (typeSel.value === 'half') {
                ok = addPresenceRequestHalfDay(dateStr, periodSel.value);
            } else {
                const s = startInput.value;
                const r = endInput.value;
                ok = addPresenceRequestTime(dateStr, s, r);
            }
            if (ok) { modal.classList.add('hidden'); alert('Demande envoyée.'); }
        };

        modal.classList.remove('hidden');
    }

    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay,timeGridWeek,timeGridDay' },
        selectable: true,
        selectMirror: true,
        hiddenDays: [0],               // Dimanches cachés
        slotDuration: '00:30:00',
        slotMinTime: `${MIN_TIME}:00`,
        slotMaxTime: `${MAX_TIME}:00`,
        nowIndicator: true,
        selectAllow: function (selectInfo) {
            const startDateISO = selectInfo.start.toISOString().split('T')[0];
            const isSunday = selectInfo.start.getDay() === 0;
            const isPastDay = startDateISO < todayISO;
            return !isSunday && !isPastDay;
        },
        validRange: { start: todayISO },
        select: function (info) {
            const dateStr = info.startStr.split('T')[0];
            if (info.start.getDay() === 0) { alert("Impossible de demander une présence le dimanche."); calendar.unselect(); return; }
            // Ouvre le formulaire au lieu de créer directement
            if (info.allDay) {
                openRequestModal(dateStr, null, null, true);
            } else {
                openRequestModal(dateStr, timeStr(info.start), timeStr(info.end), false);
            }
            calendar.unselect();
        },
        events: getUserEvents(),
        eventClick: function (info) {
            const reqId = info.event.id;
            const requests = getAllRequests();
            const req = requests.find(r => String(r.id) === String(reqId));
            const today = new Date().toISOString().split('T')[0];

            if (req && req.status === 'pending' && req.date >= today) {
                if (confirm('Annuler cette demande en attente ?')) {
                    if (cancelRequest(req.id)) { info.event.remove(); alert('Demande annulée.'); }
                    else { alert('Impossible d’annuler.'); }
                }
            } else if (req) {
                const detail = req.kind === 'half'
                    ? `${req.date} (${req.period === 'AM' ? 'Matin' : 'Après-midi'})`
                    : `${req.date} (${req.startTime}–${req.endTime})`;
                alert(`Date : ${detail}\nStatut : ${req.status}`);
            } else {
                alert('Demande introuvable.');
            }
        }
    });

    calendar.render();

    const legend = document.createElement('div');
    legend.className = 'mt-4 flex gap-4 justify-center text-sm';
    legend.innerHTML = `
    <span class="flex items-center"><span class="w-3 h-3 bg-green-600 inline-block mr-2 rounded"></span>Validée</span>
    <span class="flex items-center"><span class="w-3 h-3 bg-yellow-400 inline-block mr-2 rounded"></span>En attente</span>
    <span class="flex items-center"><span class="w-3 h-3 bg-red-500 inline-block mr-2 rounded"></span>Refusée</span>`;
    calendarEl.parentNode.appendChild(legend);
});