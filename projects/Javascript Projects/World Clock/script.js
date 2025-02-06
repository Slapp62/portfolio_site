const clockIntervals = new Map();

document.addEventListener('DOMContentLoaded', () => {
    const defaultCitiesArr = ['Jerusalem', 'Tokyo', 'London', 'New Delhi', 'New York'];

})


document.querySelectorAll('.clockForm').forEach(clockForm =>{
    clockForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        const cityInput = clockForm.querySelector('.cityInput').value;
        
        console.log(clockForm);
        console.log(cityInput);
        updateClock(clockForm, cityInput);       
    });
});

const updateClock = (clockForm, cityInput) =>{
    const cityName = clockForm.querySelector('h2');
    cityName.innerHTML = cityInput;

    const timezone = moment.tz.names();
    console.log(timezone);
    
}