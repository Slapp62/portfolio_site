
const container = document.getElementById("container");
const buttons = document.getElementsByClassName("button");
const popup = document.getElementById("popup");
const layer = document.getElementById("contrast-layer");
const search = document.getElementById("search")
import { createDiv, closeButton } from "./dom-scripts.js";
const getData = async () =>{
    try{
        const request = await fetch("https://restcountries.com/v3.1/all");
        return await request.json();
    } catch (error){
        console.error("Failed to fetch countries", error);
    }
}

const allCountries = await getData();
let allCountriesArr = [...allCountries];
console.log(allCountriesArr);

const reset = () => {
   allCountriesArr = [...allCountries];
}

const searchFunc = (word) =>{
    allCountriesArr = allCountries.filter((country) =>{
        const name = country.name.common.toLowerCase();
        const formattedWord = word.toLowerCase();
        return name.includes(formattedWord);
    })
}

search.addEventListener('input', (event) => {
    reset();
    container.innerHTML = '';
    if (!event.target.value || event.target.value === ''){
        reset();
        createPage();
    } else {
        searchFunc(event.target.value);
        createPage();
    }
});



const popupData = (countryData) => {
    
    const name = countryData.name.common;
    const capital = countryData.capital ? countryData.capital[0] : 'This country has no capital';
    const currencyKey = countryData.currencies ? Object.keys(countryData.currencies)[0] : null;
    const currency = currencyKey ? countryData.currencies[currencyKey].name : 'No currency available';
    const language = countryData.languages ? Object.values(countryData.languages)[0] : 'No language available';
    console.log(currencyKey);
    
    document.getElementById("name").innerHTML = `${name}`;
    document.getElementById("population").innerHTML = `Population: ${countryData.population.toLocaleString()}`;
    document.getElementById("capital").innerHTML = `Capital: ${capital}`;
    document.getElementById("currency").innerHTML = `Currency: ${currency}`;
    document.getElementById("language").innerHTML = `Language: ${language}`;
};

const buttonFunc = () => {
    Array.from(buttons).forEach(button => {
        if (!button.getAttribute("data-listener")){
            button.addEventListener("click", (event) =>{
                const countryName = event.target.getAttribute("data-country");
                const countryData = allCountriesArr.find(country => country.
                name.common === countryName);
                popupData(countryData);
                
                popup.classList.remove("hidden");
                layer.classList.remove("hidden");
            });
            button.setAttribute("data-listener", "true")
        }
    });
};    

const createPage = () =>{
    allCountriesArr.sort((a, b) => {
        if (a.name.common < b.name.common) {
            return -1;
        }
        if (a.name.common > b.name.common) {
            return 1;
        }
        return 0;
    });
    
    allCountriesArr.forEach(country => {
        createDiv(country, container);
    }) 
    buttonFunc();
    closeButton(popup, layer);
}


createPage();