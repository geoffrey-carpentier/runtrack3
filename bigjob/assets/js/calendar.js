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

    function getAllRequests() {
        return JSON.parse(localStorage.getItem('requests') || '[]');
    }
    function saveRequests(list) {
        localStorage.setItem('requests', JSON.stringify(list));
    }
    function getUserEvents() {
        return getAllRequests()
            .filter(r => String(r.userId) === String(user.id))
            .map(r => ({
                id: String(r.id),
                title: r.status === 'approved' ? 'Présence validée' : r.status === 'pending' ? 'En attente' : 'Refusée',
                start: r.date,
                color: r.status === 'approved' ? '#16a34a' : r.status === 'pending' ? '#facc15' : '#ef4444'
            }));
    }
    function addPresenceRequest(dateStr) {
        const today = new Date().toISOString().split('T')[0];
        if (dateStr < today) { alert("Date passée non autorisée."); return false; }
        const requests = getAllRequests();
        if (requests.some(r => String(r.userId) === String(user.id) && r.date === dateStr)) {
            alert("Demande déjà existante pour cette date."); return false;
        }
        const req = { id: Date.now(), userId: user.id, nom: user.nom || '', prenom: user.prenom || '', date: dateStr, status: 'pending' };
        requests.push(req); saveRequests(requests); return true;
    }
    function cancelRequest(id) {
        const list = getAllRequests();
        const idx = list.findIndex(r => String(r.id) === String(id));
        if (idx === -1) return false;
        const today = new Date().toISOString().split('T')[0];
        if (list[idx].status !== 'pending' || list[idx].date < today) return false;
        list.splice(idx, 1); saveRequests(list); return true;
    }

    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay' // nouvelles vues
        },
        selectable: true,
        selectMirror: true,
        validRange: { start: new Date().toISOString().split('T')[0] },
        select: function (info) {
            if (confirm(`Soumettre une demande pour le ${info.startStr} ?`)) {
                if (addPresenceRequest(info.startStr)) {
                    calendar.addEvent({ id: String(Date.now()), title: 'En attente', start: info.startStr, color: '#facc15' });
                    alert('Demande envoyée.');
                }
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
                alert(`Date : ${req.date}\nStatut : ${req.status}`);
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