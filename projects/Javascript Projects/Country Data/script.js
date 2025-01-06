let allCountriesArr = [];
const countriesContainer = document.querySelector('.countriesContainer');


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
                    <button class="button btn btn-primary" id="info" >More Info</button>
                    <button class="btn btn-danger"><i class="fa-regular fa-heart"></i></button>
                    <button class="btn btn-danger hidden"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
    `

    countriesContainer.insertAdjacentHTML('beforeend', card);

    const infoButton = document.getElementById("info");
    infoButton.addEventListener("click", () =>{
        popupDiv(country);
    });
}

const searchCountry = (searchTerm) => {
    if (!searchTerm) return allCountriesArr;
    const searchedCountry = allCountriesArr.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()
    ));
    return searchedCountry;
}

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
    
})

const popupDiv = (country) =>{
    const popup = `
        <div class="form-control"> 
        
            <h2>${country.name.common}</h2>

            <h4>Pupulation: ${country.population}</h4>
            <h4>Capital: ${country.capital[0]}</h4>
            <h4>Primary Language: ${country.name.common}</h4>
            <h4>Primary Currency: ${country.name.common}</h4>
            <h4>Timzone: ${country.timezones[0]}</h4>

            <button>Close</button>
        
        </div>
    `
    countriesContainer.insertAdjacentHTML("beforeend", popup);

}

const createCountryPage = () => {
    allCountriesArr.forEach(country => {
        createCountryCards(country);
    });
}

getCountryData().then(() => {
    createCountryPage();
});
