
setInterval(() => {
    const time = new Date();
    const idLink = document.getElementById("jerusalem");
    idLink.innerHTML = time.toLocaleTimeString();
})

setInterval(() => {
    const time = new Date();
    time.setHours(time.getHours() - 7);
    const idLink = document.getElementById("new_york");
    idLink.innerHTML = time.toLocaleTimeString();
})

setInterval(() => {
    const time = new Date();
    time.setHours(time.getHours() + 7);
    const idLink = document.getElementById("tokyo");
    idLink.innerHTML = time.toLocaleTimeString();
})

setInterval(() => {
    const time = new Date();
    time.setHours(time.getHours() - 2);
    const idLink = document.getElementById("london");
    idLink.innerHTML = time.toLocaleTimeString();
})

setInterval(() => {
    const time = new Date();
    time.setHours(time.getHours() + 3.5);
    time.setMinutes(time.getMinutes() + 30);
    const idLink = document.getElementById("new_delhi");
    idLink.innerHTML = time.toLocaleTimeString();
})

const flagInDiv = (country, divId) =>{
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.onload = () =>{
        const countryData = JSON.parse(request.response);
        const flag = countryData[0].flags.png;
        const selectedDiv = document.getElementById(divId);
        selectedDiv.style.backgroundImage = `url(${flag})`;
        selectedDiv.style.backgroundSize = "cover";
        selectedDiv.style.backgroundPosition = "center";
    }
    
}

flagInDiv("USA", "ny");
flagInDiv("Japan", "jpn");
flagInDiv("India", "ind");
flagInDiv("Britain", "lnd");
flagInDiv("Israel", "jlm");
