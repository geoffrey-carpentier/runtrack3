<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 04 - Fetch</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div class="header">
        <h1>Jour 04 - Fetch</h1>
        <p>Ce sujet est un hommage au grand Lucas Fetch !</p>
    </div>

    <div class="container">
        <h2>Job 00</h2>
        <p>
            Dans le répertoire de rendu <span class="highlight">"runtrack3"</span>, créez un dossier <span class="highlight">"jour04"</span>.
            Pour chaque job, créez un dossier <span class="highlight">"jobXX"</span> où XX est le numéro du job.
            N'oubliez pas d'envoyer vos modifications dès qu'un job est avancé ou terminé et mettez des commentaires explicites.
        </p>
        <p>
            Pour chacun des jobs, vous devez rendre un fichier <span class="highlight">index.php</span> et un fichier <span class="highlight">script.js</span>.
            Votre fichier index.php doit contenir les <span class="highlight">balises HTML</span> de base et inclure votre script.js.
            Vos fichiers doivent contenir <span class="highlight">uniquement ce qui est spécifié</span> dans les jobs.
        </p>
        <p>
            Vous voilà maintenant informés des différences entre JavaScript et jQuery, aussi bien dans l'utilisation que dans les fonctionnalités.
            Il y a cependant une facette très importante que vous n'avez pas vu et que nous allons aborder aujourd'hui :
            <span class="highlight">l'asynchrone et plus précisément AJAX Fetch.</span>
        </p>

        <h2><a href="../job01/">Job 01</a></h2>
        <p>
            Créez un <code>&lt;button&gt;</code> ayant comme <span class="highlight">id "button"</span>.
            Créez un fichier <span class="highlight">expression.txt</span> contenant votre expression favorite.
        </p>
        <p>
            Lorsqu'un utilisateur clique sur le bouton, à l'aide de <span class="highlight">Fetch</span>, récupérez le contenu du fichier expression.txt,
            placez le dans un paragraphe <code>&lt;p&gt;</code> et insérez le dans le <span class="highlight">corps de votre page</span>.
        </p>

        <h2><a href="../job02/">Job 02</a></h2>
        <p>
            Créez une fonction JavaScript <span class="highlight">"jsonValueKey()"</span> qui prend en paramètre une chaîne de caractères au format <span class="highlight">JSON</span> et une <span class="highlight">clé</span>.
            Cette fonction <span class="highlight">retourne</span> la valeur liée à cette clé dans la chaîne de caractères.
        </p>
        <h3>Par exemple :</h3>
        <p>si la string passée en paramètre est :</p>
        <code class="code-block">
            { name: "La Plateforme_", address: "8 rue d'hozier", city: "Marseille", nb_staff: "11", creation:"2019" }
        </code>
        <p>et la clé est <span class="highlight">"city"</span>, la fonction retourne <span class="highlight">"Marseille"</span>.</p>

        <h2><a href="../job03/">Job 03</a></h2>
        <p>
            Téléchargez le fichier suivant :
            <a href="https://drive.google.com/file/d/1hiOzUjgzH9iurgYPpiZ-3gyMAzLiy7W_/view" target="_blank"><span class="highlight">pokemon.json</span></a>
        </p>
        <p>Créez un <span class="highlight">formulaire</span> permettant de <span class="highlight">trier</span> ces données. Il doit contenir les <span class="highlight">champs</span> suivants :</p>
        <ul>
            <li><span class="highlight">id</span> (input type text)</li>
            <li><span class="highlight">nom</span> (input type text)</li>
            <li><span class="highlight">type</span> (liste déroulante <code>&lt;select&gt;</code>)</li>
            <li><span class="highlight">filtrer</span> (input type button)</li>
        </ul>
        <p>
            Lorsque l'on clique sur <span class="highlight">"filtrer"</span>, le script doit à l'aide de <span class="highlight">Fetch</span>,
            récupérer le <span class="highlight">contenu du fichier</span> et <span class="highlight">lister</span> les éléments répondant aux critères sélectionnés
            en les affichant sur une page HTML.
        </p>

        <h2><a href="../job04/">Job 04</a></h2>
        <p>
            Créez une <span class="highlight">base de données "utilisateurs"</span> contenant une table <span class="highlight">"utilisateurs"</span>
            et ayant comme <span class="highlight">champs "id", "nom", "prenom" et "email"</span>.
        </p>
        <p>Ajoutez des utilisateurs directement dans <span class="highlight">phpmyadmin</span>.</p>
        <p>
            Créez une page <span class="highlight">users.php</span> qui se connecte à la base de données, récupère l'ensemble des utilisateurs
            et affiche ces informations au format <span class="highlight">JSON</span>.
        </p>
        <p>
            Dans votre page <span class="highlight">index.php</span>, créez un tableau <code>&lt;table&gt;</code> permettant de contenir ces informations
            ainsi qu'un <code>&lt;button&gt;</code> <span class="highlight">"update"</span>.
            Lorsque l'on clique sur ce bouton, le tableau doit se mettre à jour et contenir l'ensemble des informations des utilisateurs présents dans la base de données.
        </p>
        <p>
            Vous pouvez <span class="highlight">tester votre code</span> en ajoutant/supprimant des utilisateurs à l'aide de <span class="highlight">phpmyadmin</span> entre deux clics.
        </p>

        <h2>Compétences visées</h2>
        <ul>
            <li>Utiliser la méthode fetch pour communiquer avec la base de donnée</li>
            <li>Comprendre et manipuler un JSON</li>
        </ul>

        <h2>Base de connaissances</h2>
        <ul>
            <li><a href="https://fr.wikipedia.org/wiki/JavaScript_Object_Notation" target="_blank">JavaScript Object Notation — Wikipédia</a></li>
            <li><a href="https://json.org/json-fr.html" target="_blank">Qu'est-ce qu'un JSON : définition</a></li>
            <li><a href="https://www.w3schools.com/js/js_json.asp" target="_blank">JSON Introduction</a></li>
            <li><a href="https://www.w3schools.com/php/php_json.asp" target="_blank">PHP and JSON</a></li>
            <li><a href="https://www.pierre-giraud.com/javascript-apprendre-coder-cours/api-fetch/" target="_blank">Présentation et utilisation de l'API Fetch en Javascript - Pierre Giraud</a></li>
            <li><a href="https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Utiliser Fetch - Référence Web API | MDN</a></li>
        </ul>

        <h2>Rendu</h2>
        <p>
            Le projet est à rendre sur <a href="https://github.com/geoffrey-carpentier/runtrack3" target="_blank">https://github.com/prenom-nom/runtrack3</a>.
            <br>
            Dossiers "jourXX" → "jobXX".
            <br>
            Fichiers nommés <span class="highlight">index.php</span> et <span class="highlight">script.js</span>
            <br>
            Pensez à donner les droits sur le répertoire à <span class="highlight">deepthoughtlaplateforme</span> !
        </p>
    </div>
</body>

</html>