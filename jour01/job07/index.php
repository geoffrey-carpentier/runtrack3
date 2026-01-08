<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 01 - Job 07</title>
    <script src="./script.js"></script> <!-- Inclusion du fichier JS externe -->
</head>

<body>
    <h1>Les jours fériés/travaillés/week-end en JS</h1>

    <p>" Créez une fonction “jourtravaille” qui prend en paramètre une date au format Date. Si la
        date correspond à un jour férié de l’année 2020, la fonction affiche “Le $jour $mois
        $année est un jour férié”. Si elle correspond à un samedi ou un dimanche, alors le
        message affiché est “Non, $jour $mois $année est un week-end”, sinon afficher “Oui,
        $jour $mois $année est un jour travaillé”.</p>

    <form>
        <label for="dateInput">Choisissez une date :</label>
        <input type="date" id="dateInput" name="dateInput">
        <button type="button" onclick="jourtravaille(new Date(document.getElementById('dateInput').value))">Vérifier le jour</button>
    </form>
    
</body>

</html>