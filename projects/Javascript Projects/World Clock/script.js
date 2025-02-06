const clockIntervals = new Map();
const API_KEY = 'fcf85a09e3485e38f72aac87b74b4571'

document.addEventListener('DOMContentLoaded', () => {

    const defaultCitiesArr = ['JERUSALEM', 'TOKYO', 'LONDON', 'SINGAPORE', 'NEW YORK'];
    let cities = document.querySelectorAll('.cityBox');
    
    for (let i=0; i<defaultCitiesArr.length; i++){
        const cityName = cities[i].children[0].children[0];
        cityName.innerHTML = defaultCitiesArr[i];

        const timezone = moment.tz.names().find(timezone => timezone.toLowerCase().includes(defaultCitiesArr[i].toLowerCase()) || timezone.replace('_', ' ').toLowerCase().includes(defaultCitiesArr[i].toLowerCase()));
        
        const interval_ID = setInterval(() => {
            cities[i].children[0].children[1].innerHTML = moment().tz(timezone).format('HH:mm:ss');
        }, 1000)

        
        clockIntervals.set(cities[i], interval_ID);
        
        
        getWeatherData(defaultCitiesArr[i], cities[i])  
    }
    
})

const  getWeatherData = async (cityName, cityBox) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data) 
        updateWeatherData(data, cityBox);
    } catch (error){
        console.error('Fetch: error', error)
    };
}

const updateWeatherData = (data, cityBox) =>{
    const temp_p = cityBox.querySelector('.cityInfo .weather .temp');
    const icon_img = cityBox.querySelector('.weather .icon');
    const dscrptn_p = cityBox.querySelector('.weather .description');
    temp_p.innerHTML = Math.ceil(data.main.temp) + '℉';
    icon_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    dscrptn_p.innerHTML = data.weather[0].main;
}

document.querySelectorAll('.cityBox').forEach(box =>{
    box.querySelector('.input-form').addEventListener('submit', (e) =>{
        e.preventDefault();
        const cityInput = box.querySelector('.input-form .cityInput').value;
        
        updateClock(cityInput, box);
        getWeatherData(cityInput, box);       
    });
});

const updateClock = (cityInput, cityBox) =>{
    const cityName = cityBox.querySelector('h2');
    cityName.innerHTML = cityInput.toUpperCase();

    const timezone = moment.tz.names().find(timezone => timezone.toLowerCase().includes(cityInput.toLowerCase()) || timezone.replace('_', ' ').toLowerCase().includes(cityInput.toLowerCase()));

    if (!timezone || cityInput === '' || cityInput === null) {
        //cityName.style.color = "red";
        cityName.innerHTML = 'City Not Found/Invalid Entry';
        return;
    }

    if (clockIntervals.has(cityBox)){
        clearInterval(clockIntervals.get(cityBox))
    }

    const interval_ID = setInterval(() => {
        cityBox.querySelector(".time").innerHTML = moment().tz(timezone).format('HH:mm:ss');
    }, 1000)

    clockIntervals.set(cityBox, interval_ID);

    console.log(timezone);
    
}