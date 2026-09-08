<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 04 - Job 03 : Filtrage Pokémon</title>
    <link rel="stylesheet" href="../job00/style.css">
</head>

<body>
    <div class="container">
        <h2>Job 03 - Filtrage Pokémon</h2>

        <!-- Formulaire de filtrage -->
        <form id="filterForm">
            <label>
                ID :
                <input type="text" id="filterId">
            </label>

            <label>
                Nom :
                <input type="text" id="filterName">
            </label>

            <label>
                Type :
                <select id="filterType">
                    <option value="">-- Tous les types --</option>
                </select>
            </label>

            <button type="button" id="filterButton">Filtrer</button>
        </form>

        <!-- Tableau d'affichage des résultats -->
        <table id="results" class="pokemon-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Type</th>
                </tr>
            </thead>

            <tbody id="resultsBody">
                <tr>
                    <td colspan="3">Utilisez le formulaire pour filtrer les Pokémon</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script src="./script.js"></script>
</body>

</html>