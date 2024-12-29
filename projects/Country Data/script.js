const container = document.getElementById("container");



const getData = () =>{
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', "https://restcountries.com/v3.1/all");
        request.send();

        request.onload = () => {
            if (request.status === 200){
                const countryData = JSON.parse(request.response);
                resolve(countryData);
            } else{
                reject('Error');
            }
        }
    });
}

const createDiv = (countryData) =>{
    countryData.sort((a, b) => {
        if (a.name.common < b.name.common) {
            return -1;
        }
        if (a.name.common > b.name.common) {
            return 1;
        }
        return 0;
    });
    
    countryData.forEach(country => {
        const newDiv = document.createElement("div");
        const newImg = document.createElement("img");
        const buttonDiv = document.createElement("div");
        const button = document.createElement("button");
        buttonDiv.className = "buttonDiv";
        button.className = "button";
        newDiv.className = "country";
        newImg.className = "flag";
        newImg.src = country.flags.png;
        newImg.loading = "lazy";
        newDiv.appendChild(newImg);
        newDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(button);
        button.innerHTML = country.name.common;
        button.setAttribute("data-country",country.name.common);
        container.appendChild(newDiv);
    });
    
}

const createCountryDivs = () =>{
    getData()
        .then((countryData) => {
            createDiv(countryData);
            buttonFunc();
        }) 
        .catch((error) => {
            console.error(error)});
}

const buttonFunc = () => {
    const buttons = document.getElementsByClassName("button");
    const popup = document.getElementById("popup");
    const closeButton = document.createElement("button")
    closeButton.innerHTML = "button";
    popup.appendChild(closeButton);

    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () =>{
            popup.classList.remove("hidden");
        });
    });

    closeButton.addEventListener("click", () =>{
        popup.classList.add("hidden");
    });
};



createCountryDivs();
