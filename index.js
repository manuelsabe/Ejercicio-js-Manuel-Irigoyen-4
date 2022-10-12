const resultContainer = document.getElementById("result-container");
const form = document.getElementById("form");
const input = document.querySelector(".form__input");

const fetchPokemon = async (number) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

const renderPokemon = (pokemon) => {
  const { name, sprites, height, weight, types } = pokemon;

  return `
        <div class="poke">
            <img src="${sprites.other.home.front_default}" />
            <h2>${name.toUpperCase()}</h2>
            <div class="tipo-poke">
            ${types
              .map((tipo) => {
                return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
              })
              .join("")}
                
            </div>
            <p class="height">Height: ${height / 10}m.</p>
            <p class="weight">Weight: ${weight / 10}kg.</p>
        </div>
  `;
};

const showEmptyError = () => {
  resultContainer.innerHTML = `
        <div class="pokemon-container">
            <i class="fa-solid fa-triangle-exclamation error"></i>
            <h2 class="error-title"> Por favor, ingrese un número para que podamos buscar al Pokemón en la Pokedex.
            </h2>
        </div>
  `;
};

const renderResult = async (pokemon) => {
  const newPokemon = await pokemon;
  if (!newPokemon) {
    resultContainer.innerHTML = `<div class="pokemon-container">
            <i class="fa-solid fa-triangle-exclamation error"></i>
            <h2 class="error-title"> No existe un Pokemón con ese número en la Pokedex.</h2>
            <p>Realice una nueva busqueda.</p>
        </div>`;
  } else {
    resultContainer.innerHTML = renderPokemon(newPokemon);
  }
};

const submitSearch = (e) => {
  e.preventDefault();
  const searchedValue = input.value;
  if (!searchedValue) {
    showEmptyError();
    return;
  }
  const searchedPokemon = fetchPokemon(Number(searchedValue));
  renderResult(searchedPokemon);
  form.reset();
};

const init = () => {
  form.addEventListener("submit", submitSearch);
};

init();
