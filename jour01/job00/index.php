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

        <div class="links">
            <a href="Jour 1 - Hello JS.pdf" class="pdf-link"><i class="fas fa-file-pdf"></i> Télécharger le PDF du cours</a>
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