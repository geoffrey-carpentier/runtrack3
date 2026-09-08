// Script de filtrage des données Pokémon via Fetch

let pokemonData = [];

// Récupérer les données Pokémon au chargement
document.addEventListener('DOMContentLoaded', function () {
    fetch('./pokemon.json')
        .then(response => response.json())
        .then(data => {
            pokemonData = data;
            populateTypeSelect();
        });
});

// Remplir le sélecteur avec les types uniques
function populateTypeSelect() {
    const allTypes = new Set();

    pokemonData.forEach(pokemon => {
        pokemon.type.forEach(t => allTypes.add(t));
    });

    const sortedTypes = Array.from(allTypes).sort();
    const typeSelect = document.getElementById('filterType');

    sortedTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

// Filtrer les données au clic du bouton
document.getElementById('filterButton').addEventListener('click', function () {
    const id = document.getElementById('filterId').value.toLowerCase();
    const name = document.getElementById('filterName').value.toLowerCase();
    const selectedType = document.getElementById('filterType').value;

    const filtered = pokemonData.filter(pokemon => {
        const matchId = id === '' || pokemon.id.toString().includes(id);

        const allNames = [
            pokemon.name.english,
            pokemon.name.japanese,
            pokemon.name.chinese,
            pokemon.name.french
        ].map(n => n.toLowerCase());
        const matchName = name === '' || allNames.some(n => n.includes(name));

        const matchType = selectedType === '' || pokemon.type.includes(selectedType);

        return matchId && matchName && matchType;
    });

    displayResults(filtered);
});

// Afficher les résultats dans le tableau
function displayResults(results) {
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = '';

    if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Aucun Pokémon trouvé</td></tr>';
        return;
    }

    results.forEach(pokemon => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="ID">${pokemon.id}</td>
            <td class="pokemon-name" data-label="Nom">
                <div><span class="flag">🇬🇧</span> ${pokemon.name.english}</div>
                <div><span class="flag">🇯🇵</span> ${pokemon.name.japanese}</div>
                <div><span class="flag">🇨🇳</span> ${pokemon.name.chinese}</div>
                <div><span class="flag">🇫🇷</span> ${pokemon.name.french}</div>
            </td>
            <td data-label="Type">${pokemon.type.join(', ')}</td>
        `;
        tbody.appendChild(tr);
    });
}