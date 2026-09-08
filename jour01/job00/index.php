<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 1 - Hello JS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <h1>Jour 1 - Hello JS</h1>
        <p>Bienvenue sur la page du Jour 1 : Introduction à JavaScript !</p>

        <section id="intro">
            <h2>Jour 1 - Hello JS Que la force soit avec toi …</h2>
        </section>

        <section id="job00">
            <h2>Job 00</h2>
            <p>Créez sur github un répertoire nommé “runtrack3”. Dans ce répertoire, créez un dossier “jour01”, partagez le avec deepthoughtlaplateforme. Pour chaque job, créez un dossier “jobXX” où XX est le numéro du job. N’oubliez pas d’envoyer vos modiﬁcations dès qu’un job est avancé ou terminé et mettez des commentaires explicites lors de vos commits.</p>
        </section>

        <section id="job01">
            <h2>Job 01</h2>
            <p>Créez un ﬁchier index.php contenant les balises html de base (doctype, html, head, body). Dans la balise head, ajoutez une ligne de code javascript permettant d’aﬃcher une popup qui contient le texte “Hello Javascript!”.</p>
            <p>(fenêtre popup):<br>"Cette page indique<br>Hello Javascript !<br>(bouton [OK])"</p>
        </section>

        <section id="job02">
            <h2>Job 02</h2>
            <p>Récupérez une copie de votre ﬁchier index.php. Créez un ﬁchier script.js. Modiﬁez vos ﬁchiers de sorte à ce que l’aﬃchage de la popup se fasse maintenant dans le ﬁchier script.js.</p>
        </section>

        <section id="job03">
            <h2>Job 03</h2>
            <p>Récupérez une copie de vos ﬁchiers index.php et script.js. Modiﬁer l’aﬃchage de sorte à ce que le message ne soit plus écrit dans une popup mais dans la console web. Assurez-vous que tout est bien fonctionnel.</p>
            <p>(dans console)<br>Hello Javascript !                            index.html:9</p>
        </section>

        <section id="job04">
            <h2>Job 04</h2>
            <p>Maintenant que vous savez comment inclure du javascript et que vous maitrisez la console web, vous allez pouvoir explorer davantage la syntaxe, la grammaire et le lexique du langage javascript.</p>
            <p>Pour l’ensemble des exercices suivants, vous devez rendre un ﬁchier script.js contenant le rendu de l’exercice et un ﬁchier index.php qui l’inclut.</p>
            <p>Déclarez une fonction “bissextile” qui prend en paramètre une variable “année”. Si l’année est bissextile, la fonction retourne true, sinon elle retourne false.</p>
        </section>

        <section id="job05">
            <h2>Job 05</h2>
            <p>Créez une fonction “aﬃcherjourssemaines”. Cette fonction ne prend pas de paramètre. Créez un tableau de strings “jourssemaines” qui contient l’ensemble des jours de la semaine, du Lundi au Dimanche. Ensuite à l’aide d’une boucle for (for!) aﬃchez un par un ces jours:</p>
            <p>(dans console)<br>"Lundi<br>Mardi<br>Mercredi<br>Jeudi<br>Vendredi<br>Samedi<br>Dimanche<br>> "</p>
        </section>

        <section id="job06">
            <h2>Job 06</h2>
            <p>Créez une fonction ﬁzzbuzz qui ne prend pas de paramètre. Dans cette fonction, aﬃchez dans la console web les nombres de 1 à 151. Remplacez certains nombres par un mot selon les conditions suivantes :</p>
            <ul>
                <li>Si le nombre est un multiple de 3, aﬃchez “Fizz”.</li>
                <li>Si le nombre est un multiple de 5, aﬃchez “Buzz”.</li>
                <li>Si le nombre est un multiple de 3 et de 5, aﬃchez “FizzBuzz”.</li>
            </ul>
        </section>

        <section id="job07">
            <h2>Job 07</h2>
            <p>Créez une fonction “jourtravaille” qui prend en paramètre une date au format Date. Si la date correspond à un jour férié de l’année 2020, la fonction aﬃche “Le $jour $mois $année est un jour férié”. Si elle correspond à un samedi ou un dimanche, alors le message aﬃché est “Non, $jour $mois $année est un week-end”, sinon aﬃcher “Oui, $jour $mois $année est un jour travaillé”.</p>
            <p>$jour correspond au numéro du jour, $mois au mois et $année à l’année. Les jours fériés sont référencés sur <a href="https://demarchesadministratives.fr/actualites/calendrier-des-jours-feries-2019-2020-2021">ce lien</a>.</p>
            <p>Exemple :</p>
            <p>(dans console)<br>"Le samedi 1 janvier 2022 est un jour férié index.html : 20<br>Oui, jeudi 9 juin 2022 est un jour férié index.html : 26<br>Non, samedi 25 juin 2022 est un week-end index.html : 23"</p>
        </section>

        <section id="job08">
            <h2>Job 08</h2>
            <p>Créez une fonction “sommenombrespremiers” qui prend en paramètres deux variables. Si ces deux variables sont des nombres premiers, alors la fonction retourne leur somme. Sinon, la fonction retourne false.</p>
        </section>

        <section id="job09">
            <h2>Job 09</h2>
            <p>Créez une fonction “tri” qui prend en paramètres un tableau de nombres nommé “numbers” et une variable “order” qui contient “asc” ou “desc”. A l’aide de la fonction sort() d’un algorithme développé par vos soins, cette fonction doit trier le tableau dans l’ordre ascendant ou décroissant, selon le paramètre passé, puis retourner le tableau.</p>
        </section>

        <section id="rendu">
            <h2>Rendu</h2>
            <p>Le projet est à rendre sur https://github.com/prenom-nom/runtrack3. Dossiers “jourXX” -> “jobXX”. Fichiers nommés index.php et script.js. Pensez à donner les droits sur le répertoire à deepthoughtlaplateforme !</p>
        </section>

        <section id="competences">
            <h2>Compétences visées</h2>
            <ul>
                <li>Utiliser la console</li>
                <li>Créer des fonctions en javascript</li>
                <li>Utiliser les boucles en javascript</li>
                <li>Algorithmie</li>
            </ul>
        </section>

        <section id="api">
            <h2>API</h2>
            <p><a href="https://calendrier.api.gouv.fr/jours-feries/metropole/${anne}.json">https://calendrier.api.gouv.fr/jours-feries/metropole/${anne}.json</a></p>
        </section>

        <div class="links">
            <a href="Jour 1 - Hello JS.pdf" class="pdf-link"><i class="fas fa-file-pdf"></i> Télécharger le PDF</a>
            <a href="https://github.com/geoffrey-carpentier/runtrack3" class="github-link"><i class="fab fa-github"></i> Voir le repo GitHub</a>
        </div>

        <button onclick="helloJS()">Cliquez pour dire Hello JS !</button>
    </div>

    <script>
        function helloJS() {
            alert("Hello JS !");
        }
    </script>
</body>

</html>