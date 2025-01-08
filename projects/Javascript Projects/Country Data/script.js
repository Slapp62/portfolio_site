let allCountriesArr = [];
const countriesContainer = document.querySelector('.countriesContainer');
let favoriteCountriesArr = JSON.parse(localStorage.getItem('favoriteCountries')) || [];

onload

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
                <p class="card-text">Capital: ${country.capital}</p>
                <div class="card-footer text-center">
                    <button class="button btn btn-primary info" data-country='${country.name.common}'>More Info</button>
                    <button class="btn btn-danger" data-country='${country.name.common}'><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>  
        </div>
    `
   
    countriesContainer.insertAdjacentHTML('beforeend', card);

}

countriesContainer.addEventListener("click", (e) =>{
    console.log(e);
    if (e.target.innerHTML === "More Info"){
        const clickedCountryData = allCountriesArr.find(country => country.name.common === e.target.dataset.country);
        console.log(clickedCountryData);
        popupDiv(clickedCountryData)

    } 

    if (e.target.closest('button').querySelector("i")){
        e.target.closest('button').querySelector("i").classList.toggle("fa-solid");

        if (e.target.closest('button').querySelector("i").classList.contains("fa-solid")){
            favoriteCountriesArr.push(e.target.closest('button').dataset.country);
            localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountriesArr));
        } else {
            favoriteCountriesArr = favoriteCountriesArr.filter(country => country !== e.target.closest('button').dataset.country);
            localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountriesArr));
        }
        
        console.log(`favorite countries: ${favoriteCountriesArr}`);
    }

    if (e.target.innerHTML === "Close"){
        document.querySelector('.popupContainer').className = "hidden";

    }
});

const popupDiv = (country) =>{
    const popup = `
        <div class="popupContainer"> 
        
            <h2 class="text-center"> ${country.name.common}</h2>

            <h4>Population: ${country.population}</h4>
            <h4>Capital: ${country.capital[0]}</h4>
            <h4>Primary Language: ${country.name.common}</h4>
            <h4>Primary Currency: ${country.name.common}</h4>
            <h4>Timzone: ${country.timezones[0]}</h4>

            <button class="btn close">Close</button>
        
        </div>
    `
    

    countriesContainer.insertAdjacentHTML("afterbegin", popup);
}

const searchCountry = (searchTerm) => {
    if (!searchTerm) return allCountriesArr;
    const searchedCountry = allCountriesArr.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()
    ));
    return searchedCountry;
}

// search by country
document.getElementById('search').addEventListener('input', () => {
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
    const filteredCountry = allCountriesArr.filter(country => 
        country.continents[0].toLowerCase().includes(continent.toLowerCase())
    );
    return filteredCountry;
}

const continentDropdown = document.getElementById('continent');
continentDropdown.addEventListener("change", () =>{
    const selectedRegion = continentDropdown.value;
    const countriesInRegion = filterByContinent(selectedRegion);
    countriesContainer.innerHTML = '';
    countriesInRegion.forEach(country =>{
        createCountryCards(country);
    })
});

document.getElementById("show-favorites").addEventListener("click", () =>{
    let favoriteCountriesDataArr = allCountriesArr.filter(country => favoriteCountriesArr.includes(country.name.common));
    countriesContainer.innerHTML = '';
    favoriteCountriesDataArr.forEach(country =>{
        createCountryCards(country);
    })
});

const createCountryPage = () => {
    allCountriesArr.forEach(country => {
        createCountryCards(country);
        const wasFavorite = document.querySelector(`button[data-country="${country.name.common}"] i`)
        if (favoriteCountriesArr.includes(country.name.common)){
            wasFavorite.classList.add('fa-solid');
         };
    });
}

getCountryData().then(() => {
    createCountryPage();
});
