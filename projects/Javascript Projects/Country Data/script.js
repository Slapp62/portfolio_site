let allCountriesArr = [];
const countriesContainer = document.querySelector('.countriesContainer');
let favoriteCountriesArr = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
let favoritesBeingShown = false;


const getCountryData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        allCountriesArr = [...data];
        allCountriesArr.sort((a, b) => a.name.common.localeCompare(b.name.common));
        console.log(allCountriesArr);
    } catch (error) {
        console.log(error);
    }
}

const createCountryCards = (country) => {
    const card = `
        <div class="countryCard card col-md-3 col-sm-12">
            <img src="${country.flags.png}" class="card-img-top w-100" alt="flag">
            <div class="card-body">
                <h4 class="card-title">${country.name.common}</h4>
                <p class="card-text">Population: ${country.population.toLocaleString()}</p>
                <p class="card-text">Continent: ${country.region}</p>
                <p class="card-text">Capital: ${country.capital}</p>
                <div class="card-footer text-center">
                    <button class="button btn btn-primary info" data-country='${country.name.common}'>More Info</button>
                    <button class="btn btn-danger" data-country='${country.name.common}'><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>  
        </div>
    `

    

    countriesContainer.insertAdjacentHTML('beforeend', card);
    const wasFavorite = document.querySelector(`button[data-country="${country.name.common}"] i`)
        if (favoriteCountriesArr.includes(country.name.common)){
            wasFavorite.classList.add('fa-solid');
        };
}

countriesContainer.addEventListener("click", (e) =>{
    console.log(e);
    if (e.target.innerHTML === "More Info"){
        document.querySelector('#contrast-layer').classList.remove("hidden");
        const clickedCountryData = allCountriesArr.find(country => country.name.common === e.target.dataset.country);
        console.log(clickedCountryData);
        popupDiv(clickedCountryData)
    } 

    if (e.target.closest('button').querySelector("i")){
        e.target.closest('button').querySelector("i").classList.toggle("fa-solid");

        if (e.target.closest('button').querySelector("i").classList.contains("fa-solid")){

            if (favoriteCountriesArr.includes(e.target.closest('button').dataset.country)){
                return
            } else {
                favoriteCountriesArr.push(e.target.closest('button').dataset.country);
                localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountriesArr));
                console.log(`favorite countries: ${favoriteCountriesArr}`);
            }
            
        } else {
            favoriteCountriesArr = favoriteCountriesArr.filter(country => country !== e.target.closest('button').dataset.country);
            localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountriesArr));

            if (favoritesBeingShown === true){
                e.target.closest('.countryCard').classList.add("hidden");
            }
        }
        
        
    }

    if (e.target.innerHTML === "Close"){
        e.target.closest('.popupContainer').classList.add("hidden");
        document.querySelector('#contrast-layer').classList.add("hidden");
    }
});

const popupDiv = (country) =>{
    const languageKey = Object.keys(country.languages)[0];
    
    const innerCurrencyObjKey = Object.keys(country.currencies)[0];
    const innerCurrencyObj = country.currencies[innerCurrencyObjKey];
    const innerCurrencyKey = Object.keys(innerCurrencyObj)[0];
    console.log(innerCurrencyKey);
    
    // const primCurrencyName = country.currencies[innerCurrencyObj];
    // const primCurrencyKey = Object.keys(primCurrencyName)[0];

    const popup = 
    `
        <div class="popupContainer"> 
        
            <h2 class="text-center"> ${country.name.common}</h2>
            
            <h4>Primary Language: ${country.languages[languageKey]}</h4>
            <h4>Primary Currency: ${innerCurrencyObj[innerCurrencyKey]}</h4>
            <h4>Timezone: ${country.timezones[0]}</h4>

            <button class="btn close">Close</button>
        
        </div>
    `
    

    countriesContainer.insertAdjacentHTML("afterbegin", popup);
}

const searchCountry = (searchTerm) => {
    if (!searchTerm || searchTerm === '') {
        const continent = document.querySelector('#continent').value;
        return filterByContinent(continent);
    } else {
        return allCountriesArr.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()
        ));
    }
    
}

// search by country
document.getElementById('search').addEventListener('input', () => {
    favoritesBeingShown = false;
    const searchTerm = document.getElementById('search').value;
    const searchedCountry = searchCountry(searchTerm);
    
    countriesContainer.innerHTML = '';
    
    if (searchedCountry.length === 0) {
        countriesContainer.innerHTML = '<h2>No Countries Found</h2>';
    } else{
        searchedCountry.forEach(country => {
            createCountryCards(country);
        }); 
    }
})

const filterByContinent = (continent) => {
    if (continent === 'all') return allCountriesArr;
    
    return allCountriesArr.filter(country => 
        country.continents[0].toLowerCase().includes(continent.toLowerCase())
    );
}

const continentDropdown = document.getElementById('continent');
continentDropdown.addEventListener("change", () =>{
    favoritesBeingShown = false;
    const selectedRegion = continentDropdown.value;
    const countriesInRegion = filterByContinent(selectedRegion);
    countriesContainer.innerHTML = '';
    countriesInRegion.forEach(country =>{
        createCountryCards(country);
    })
});

document.getElementById("show-favorites").addEventListener("click", () =>{
    favoritesBeingShown = true;
    if (continent === 'blank') return;
    let favoriteCountriesDataArr = allCountriesArr.filter(country => favoriteCountriesArr.includes(country.name.common));
    countriesContainer.innerHTML = '';
    favoriteCountriesDataArr.forEach(country =>{
        createCountryCards(country);
    })
});

const createCountryPage = () => {
    allCountriesArr.forEach(country => {
        createCountryCards(country);
    });
}

getCountryData();
