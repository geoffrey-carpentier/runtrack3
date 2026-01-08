<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 2 - JS++</title>
    <link rel="stylesheet" href="style.css">
    <script src="./script.js" defer></script>
</head>
<body>
    <header>
        <h1>Jour 2 - JS++ - Aller plus loin avec Javascript</h1>
    </header>

    <main>
        <section id="job00">
            <h2>Job 00</h2>
            <p>Dans le répertoire de rendu “runtrack3”, créez un dossier “jour02”. Pour chaque job, créez un dossier “jobXX” où XX est le numéro du job. N’oubliez pas d’envoyer vos modiﬁcations dès qu’un job est avancé ou terminé et mettez des commentaires explicites.</p>
            <p>Pour chacun des jobs, vous devez rendre un ﬁchier index.php et un ﬁchier script.js. Votre ﬁchier index.php doit contenir les balises html de base et inclure votre script.js. Vos ﬁchiers doivent contenir uniquement ce qui est spéciﬁé dans les jobs.</p>
            <p>Hier vous avez vu comment fonctionne javascript, comment inclure des ﬁchiers .js, créer des fonctions, des variables, des boucles etc… Aujourd’hui, vous allez explorer les fonctionnalités qui sont intéressantes pour enrichir vos pages web et les rendre plus dynamiques.</p>
        </section>

        <section id="job01">
            <h2>Job 01</h2>
            <p>Créez un 'article' ayant comme id “citation” et contenant le texte suivant : "La vie a beaucoup plus d’imagination que nous”. Créez un 'button' ayant comme id “button”. Lorsque l’on clique sur le bouton, récupérez le contenu de l’élément ayant comme id “citation” et aﬃchez le contenu dans la console de développement. La fonction de récupération et d’aﬃchage doit se nommer “citation()”.</p>
        </section>

        <section id="job02">
            <h2>Job 02</h2>
            <p>Créez une balise 'button' ayant comme id “button”. Lorsque l’on clique dessus, un 'article' contenant le texte suivant est ajouté au contenu de la page : “L'important n'est pas la chute, mais l'atterrissage.” Si on clique à nouveau sur ce bouton, l’article disparaît. L’apparition / Disparition doivent être gérées dans une fonction nommée “showhide()”.</p>
        </section>

        <section id="job03">
            <h2>Job 03</h2>
            <p>Créez une balise 'button' ayant comme id “button”. Créez une balise 'p' ayant comme id “compteur” et contenant “0”. Ce contenu doit évoluer proportionnellement au nombre d'événements click reçu par le bouton. ATTENTION : Vous ne devez pas utiliser “onclick()” dans votre html. La fonction permettant d’effectuer la modiﬁcation doit s'appeler “addone()”.</p>
        </section>

        <section id="job04">
            <h2>Job 04</h2>
            <p>Créez un 'textarea' dont l’id est “keylogger”. Chaque fois que l’utilisateur tape une lettre sur son clavier (a-z), celle-ci est ajoutée dans le textarea (même si le focus en cours n’est pas le textarea). Si le focus en cours est dans le textarea, la lettre doit être ajoutée deux fois.</p>
        </section>

        <section id="job05">
            <h2>Job 05</h2>
            <p>Créez un ﬁchier style.css. Déﬁnissez la taille minimale de votre body à 4096px. Ajoutez un 'footer' qui prend toute la largeur de votre page en position : ﬁxed en bas de votre fenêtre. De la même façon qu’une barre de chargement, la couleur du footer doit évoluer en fonction du pourcentage de scrolling.</p>
        </section>

        <section id="job06">
            <h2>Job 06</h2>
            <p>Par défaut, votre index.php n’a pas de contenu. Lorsqu’un utilisateur effectue un code konami, la page devient stylisée, aux couleurs de <a href="https://laplateforme.io">La Plateforme_</a>.</p>
        </section>

        <section id="rendu">
            <h2>Rendu</h2>
            <p>Le projet est à rendre sur https://github.com/geoffrey-carpentier/runtrack3. Dossiers “jourXX” -> “jobXX”. Les fichiers doivent être nommés 'index.php' et 'script.js'. Pensez à donner les droits sur le répertoire à deepthoughtlaplateforme !</p>
        </section>

        <section id="competences">
            <h2>Compétences visées</h2>
            <ul>
                <li>Créer des fonctions en javascript</li>
                <li>Manipuler le DOM</li>
                <li>Utiliser des événements en JS</li>
                <li>Algorithmie</li>
            </ul>
        </section>

        <section id="base-connaissances">
            <h2>Base de connaissances</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript">Documentation officielle javascript</a></li>
                <li><a href="https://www.w3schools.com/js/">Tutoriel Javascript</a></li>
                <li><a href="https://www.jesuisundev.com/bien-debuter-en-javascript/#:~:text=Pour%20bien%20d%C3%A9buter%20en%20javascript%20il%20est%20important%20de%20ma%C3%AEtriser,coup%20d'%C5%93il%20au%20code.">Bien débuter en Javascript</a></li>
                <li><a href="https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/Events">Introduction aux événements en JS</a></li>
            </ul>
        </section>
    </main>

</body>
</html>