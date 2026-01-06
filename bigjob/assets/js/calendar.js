document.addEventListener('DOMContentLoaded', function () {
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
        locale: 'fr'
    });
    calendar.render();
});