
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const search = document.querySelector('.search');
const result = document.querySelector('.result');
const blur = document.querySelector('.blur.hide');
const error = document.querySelector('.error');
let character = '';
let hpCharacters = []; //En tom array

//Detta händer när du skriver i searchbar
input.addEventListener('keyup', (e) => { //När användarens tangenttryck är klart aktiveras funktionen
    const searchString = e.target.value.toLowerCase(); //Ändrar alla karaktärer i sökningen till lowercase 

    const filteredCharacters = hpCharacters.filter((character) => {
        return ( //Filtrering av listan när man söker - filtrerar på alla egenskaper i varje kort
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) ||
            character.species.toLowerCase().includes(searchString) ||
            character.ancestry.toLowerCase().includes(searchString) ||
            character.patronus.toLowerCase().includes(searchString) ||
            character.wand.wood.toLowerCase().includes(searchString) ||
            character.actor.toLowerCase().includes(searchString) 
        );
    });
    displayCharacters(filteredCharacters); //Returnerar karaktär-funktionen, men nu filtrerad
});

//Hämtar karaktärerna från API
const loadCharacters = async () => {
    try { //Testar kodblocket så att det inte dyker upp några error
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) { //Hur error hanteras
        error.innerHTML = "404 Failed to load the page" //Meddelande som dyker upp om sidan mysslyckas att ladda
    }
};

//Visar karaktärerna och deras egenskaper i kort
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            
            return `<li class="character">
                <h2>${character.name}</h2>
                <p class="house">Elevhem: ${character.house}</p>
                <p class="species">Art: ${character.species}</p>
                <p class="ancestry">Härkomst: ${character.ancestry}</p>
                <p class="wand">Trollstav: ${character.wand.wood}</p>
                <p class="patronus">Patronus: ${character.patronus}</p>
                <p class="actor">Skådespelare: ${character.actor}</p>
                <img src="${character.image}"></img>
            </li>`;
        })
        
        .join('');
    result.innerHTML = htmlString;

    character = document.querySelectorAll('.character');

    // När du trycker på ett karaktärskort (li.character) expanderar kortet
    character.forEach(expand);

    function expand(character) {
        character.addEventListener('click', () => { 
            // Toggle active-class för karaktärskorten och ger en suddig bakgrunden till resten av sidan
                character.classList.toggle('active'); 
                blur.classList.toggle('hide');
        }) 
    }
}

loadCharacters(); //Kör funktionen som hämtar karaktärerna
