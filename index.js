const container = document.getElementById("pokemon-container");
const input = document.getElementById("pokemon-number");
const button = document.getElementById("search-button");

button.addEventListener("click", () => {
    const pokemonNumber = input.value;
    if (!pokemonNumber) {
        showError("Por favor, ingresa un número válido.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró ningún Pokémon.");
            }
            return response.json();
        })
        .then(data => {
            renderPokemonCard(data);
        });
});

const renderPokemonCard = (pokemonData) => {
    const { name, types, height, weight, sprites } = pokemonData;
    const prokeType = types[0].type.name;
    const imgUrl = sprites.front_default;

    //utilizamos .toFixed() para redondear el resultado solo a 1 decimales
    const heightInMeters = (height / 10).toFixed(1);
    const weightInKilograms = (weight / 10).toFixed(1);

    const PokeCardHTML = `
        <div class="pokemon-card">
            <div class="poke-name-container">
                <h2 class="poke-name">${name}</h2>
            </div>
            <div class="poke-info-container">    
                <p class="poketype"><span>Primary Type:</span> ${prokeType}</p>
                <p class="poke-height"><span>Height:</span> ${heightInMeters} m</p>
                <p class="poke-weight"><span>Weight:</span> ${weightInKilograms} kg</p>
            </div>

            <div class="poke-img">
                <img src="${imgUrl}" alt="${name}">
            </div>
        </div>
    `;

    container.innerHTML = PokeCardHTML;
}

function showError(errorMessage) {
    const errorHTML = `<p class="error">${errorMessage}</p>`;
    container.innerHTML = errorHTML;
}