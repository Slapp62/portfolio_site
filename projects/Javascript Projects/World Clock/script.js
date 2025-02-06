const clockIntervals = new Map();
const API_KEY = 'fcf85a09e3485e38f72aac87b74b4571'

const  getWeatherData = async (cityName) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data) 
    } catch (error){
        console.error('Fetch: error', error)
    }
    ;
    
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultCitiesArr = ['Jerusalem', 'Tokyo', 'London', 'Singapore', 'New York'];
    let cities = document.querySelectorAll('.clockForm');
    //console.log(cities[0].children);
    
    for (let i=0; i<defaultCitiesArr.length; i++){
        const timezone = moment.tz.names().find(timezone => timezone.toLowerCase().includes(defaultCitiesArr[i].toLowerCase()) || timezone.replace('_', ' ').toLowerCase().includes(defaultCitiesArr[i].toLowerCase()));

        const interval_ID = setInterval(() => {
            cities[i].children[4].innerHTML = moment().tz(timezone).format('HH:mm:ss');
        }, 1000)
        
        clockIntervals.set(cities[i], interval_ID);
       cities[i].children[3].innerHTML = defaultCitiesArr[i];  
    }
    
})

document.querySelectorAll('.clockForm').forEach(clockForm =>{
    clockForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        const cityInput = clockForm.querySelector('.cityInput').value;
        
        updateClock(clockForm, cityInput);
        getWeatherData(cityInput);       
    });
});

const updateClock = (clockForm, cityInput) =>{
    const cityName = clockForm.querySelector('p');
    cityName.innerHTML = cityInput.toUpperCase();

    const timezone = moment.tz.names().find(timezone => timezone.toLowerCase().includes(cityInput.toLowerCase()) || timezone.replace('_', ' ').toLowerCase().includes(cityInput.toLowerCase()));

    if (!timezone || cityInput === '' || cityInput === null) {
        //cityName.style.color = "red";
        cityName.innerHTML = 'City Not Found/Invalid Entry';
        return;
    }

    if (clockIntervals.has(clockForm)){
        clearInterval(clockIntervals.get(clockForm))
    }

    const interval_ID = setInterval(() => {
        clockForm.querySelector(".time").innerHTML = moment().tz(timezone).format('HH:mm:ss');
    }, 1000)

    clockIntervals.set(clockForm, interval_ID);

    console.log(timezone);
    
}