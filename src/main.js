const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
     electric: '#F4F703',
     normal: '#FEEED4',
     fire: '#FF1919',
     water: '#122BFF',
     ice: '#96E7FF',
     rock: '#878179',
     flying: '#C0D6FC',
     grass: '#088A01',
     psychic: '#664B96',
     ghost: '#494164',
     bug: '#B9F365',
     poison: '#3C0078',
     ground: '#4D3605',
     dragon: '#E9820D',
     steel: '#8C8C8C',
     figthing: '#DED3C2',
     defautl: '#FCEBCE',
};

const searchPokemon = event => {
    // cancela el submit del form
    event.preventDefault();
    const { value } = event.target.pokemon;
    // The Fetch provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses.
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}

const renderPokemonData = data => {
     const sprite = data.sprites.other.dream_world.front_default;
     const { stats, types } = data;
    console.log(data);
     
    //  property .textContent is all text contained by an element and all its children that are for formatting purposes only
     pokeName.textContent = data.name;
    //  Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
     pokeImg.setAttribute('src', sprite);
     pokeId.textContent = `Nº ${data.id}`;
     setCardColor(types);
     renderPokemonTypes(types);
     renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.defautl;
    pokeImg.style.background = `radial-gradient(${colorTwo} 13%, ${colorOne} 13%)`;
    pokeImg.style.backgroundSize = '5px 5px'
}

const renderPokemonTypes = types => {
    // The Element property innerHTML gets or sets the HTML or XML markup contained within the element.
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}