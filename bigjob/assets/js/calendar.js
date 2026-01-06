document.addEventListener('DOMContentLoaded', function () {
    // Vérifie que FullCalendar est bien chargé
    if (typeof FullCalendar === "undefined") {
        alert("Erreur : FullCalendar n'est pas chargé !");
        return;
    }

    // Récupère l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Veuillez vous connecter.");
        window.location.href = "login.html";
        return;
    }

    // Récupère les demandes de présence de l'utilisateur depuis le localStorage
    function getUserEvents() {
        const requests = JSON.parse(localStorage.getItem("requests")) || [];
        // On ne garde que les demandes de l'utilisateur courant
        return requests
            .filter(r => r.userId === user.id)
            .map(r => ({
                id: r.id,
                title: r.status === "approved" ? "Présence validée" : r.status === "pending" ? "En attente" : "Refusée",
                start: r.date,
                color: r.status === "approved" ? "#22c55e" : r.status === "pending" ? "#facc15" : "#ef4444"
            }));
    }

    // Ajoute une nouvelle demande de présence
    function addPresenceRequest(dateStr) {
        const today = new Date().toISOString().split('T')[0];
        if (dateStr < today) {
            alert("Impossible de demander une présence pour une date passée.");
            return;
        }
        let requests = JSON.parse(localStorage.getItem("requests")) || [];
        // Vérifie si une demande existe déjà pour cette date
        if (requests.some(r => r.userId === user.id && r.date === dateStr)) {
            alert("Vous avez déjà fait une demande pour cette date.");
            return;
        }
        // Crée la demande
        const newRequest = {
            id: Date.now(),
            userId: user.id,
            nom: user.nom + " " + user.prenom,
            date: dateStr,
            status: "pending"
        };
        requests.push(newRequest);
        localStorage.setItem("requests", JSON.stringify(requests));
        alert("Demande de présence envoyée !");
    }

    // Initialise le calendrier
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        // Permet à l'utilisateur de sélectionner une date
        select: function (info) {
            // info.startStr contient la date sélectionnée (format YYYY-MM-DD)
            addPresenceRequest(info.startStr);
            // Recharge les événements pour afficher la nouvelle demande
            calendar.removeAllEvents();
            calendar.addEventSource(getUserEvents());
        },
        // Charge les événements de l'utilisateur
        events: getUserEvents(),
        // Désactive la sélection de dates passées
        validRange: {
            start: new Date().toISOString().split('T')[0]
        },
        // Personnalisation de l'affichage
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        locale: 'fr',
        eventClick: function(info) {
            // Récupère la demande liée à l'événement cliqué
            const requests = JSON.parse(localStorage.getItem("requests")) || [];
            const request = requests.find(r => r.id == info.event.id);

            // Vérifie si la demande est annulable
            const today = new Date().toISOString().split('T')[0];
            if (request && request.status === "pending" && request.date >= today) {
                if (confirm("Voulez-vous annuler cette demande de présence ?")) {
                    // Supprime la demande
                    const newRequests = requests.filter(r => r.id != info.event.id);
                    localStorage.setItem("requests", JSON.stringify(newRequests));
                    // Rafraîchit le calendrier
                    info.event.remove();
                    alert("Demande annulée !");
                }
            } else {
                // Affiche les détails si non annulable
                alert(
                    `Date : ${request.date}\nStatut : ${request.status === "approved" ? "Validée" : request.status === "pending" ? "En attente" : "Refusée"}`
                );
            }
        },
    });
    calendar.render();

    // Légende sous le calendrier
    const legend = document.createElement('div');
    legend.className = "flex gap-4 mt-4";
    legend.innerHTML = `
        <span class="flex items-center"><span class="w-4 h-4 bg-green-500 inline-block mr-2 rounded"></span>Validée</span>
        <span class="flex items-center"><span class="w-4 h-4 bg-yellow-400 inline-block mr-2 rounded"></span>En attente</span>
        <span class="flex items-center"><span class="w-4 h-4 bg-red-500 inline-block mr-2 rounded"></span>Refusée</span>
    `;
    calendarEl.parentNode.appendChild(legend);
});