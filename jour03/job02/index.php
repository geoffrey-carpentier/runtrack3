<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Jour 3 - Job 02</title>

    <link rel="stylesheet" href="jquery-ui.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <main>
        <h1>Puzzle Rainbow</h1>

        <div class="controls">
            <button id="shuffle">Mélanger</button>
        </div>

        <!-- target (reconstitution) -->
        <div id="target" class="target" aria-label="Zone de reconstitution">
            <div class="slot" data-slot="1"></div>
            <div class="slot" data-slot="2"></div>
            <div class="slot" data-slot="3"></div>
            <div class="slot" data-slot="4"></div>
            <div class="slot" data-slot="5"></div>
            <div class="slot" data-slot="6"></div>
        </div>

        <!-- palette (départ) : images nommées arc1.png ... arc6.png dans folder img/ -->
        <div id="palette" class="palette" aria-label="Palette des pièces">
            <img src="img/arc1.png" data-order="1" alt="piece 1">
            <img src="img/arc2.png" data-order="2" alt="piece 2">
            <img src="img/arc3.png" data-order="3" alt="piece 3">
            <img src="img/arc4.png" data-order="4" alt="piece 4">
            <img src="img/arc5.png" data-order="5" alt="piece 5">
            <img src="img/arc6.png" data-order="6" alt="piece 6">
        </div>

        <p id="message" class="hidden" role="status">Vous avez gagné ! 🎉</p>
    </main>

    <script src="jquery-3.7.1.min.js"></script>
    <script src="jquery-ui.min.js"></script>
    <script src="script.js"></script>
</body>

</html>