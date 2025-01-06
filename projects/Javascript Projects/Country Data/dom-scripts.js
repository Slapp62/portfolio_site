const createDiv = (country, container) =>{
    const newDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const countryName = document.createElement("h2");
    const newImg = document.createElement("img");
    const unliked = document.createElement("i");
    const liked = document.createElement("i");
    const buttonDiv = document.createElement("div");
    const favorite = document.createElement("button");
    const button = document.createElement("button");

    buttonDiv.className = "buttonDiv";
    button.className = "button";
    newDiv.className = "country";
    newImg.className = "flag";
    nameDiv.className = "nameDiv";
    countryName.className = "countryName";
    
    unliked.className = "fa-regular fa-heart";  // unliked icon
    liked.className = "fa-solid fa-heart hidden";  // liked icon starts hidden

    favorite.className = "favorite";
    favorite.appendChild(unliked);  // Add unliked icon
    favorite.appendChild(liked);   // Add liked icon

    favoriteFunc(favorite);

    newImg.src = country.flags.png;
    newImg.loading = "lazy";
    countryName.innerHTML = country.name.common;
    button.innerHTML = "Stats";
    button.setAttribute("data-country",country.name.common);

    nameDiv.appendChild(countryName);
    newDiv.appendChild(nameDiv);
    newDiv.appendChild(newImg);
    newDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(favorite);
    container.appendChild(newDiv); 
}

const favoriteFunc = (button) => {
    button.addEventListener("click", () => {
        // Select the two icons inside the button
        const unlikedIcon = button.querySelector('.fa-regular');
        const likedIcon = button.querySelector('.fa-solid');
        
        // Toggle visibility of the icons
        unlikedIcon.classList.toggle("hidden");
        likedIcon.classList.toggle("hidden");
    });
};


const popupData = (countryData, popupDiv) => {
    const name = countryData.name.common;
    const capital = countryData.capital ? countryData.capital[0] : 'This country has no capital';
    const currencyKey = countryData.currencies ? Object.keys(countryData.currencies)[0] : null;
    const currency = currencyKey ? countryData.currencies[currencyKey].name : 'No currency available';
    const language = countryData.languages ? Object.values(countryData.languages)[0] : 'No language available';
    console.log(currencyKey);
    
    popupDiv.querySelector("#name").innerHTML = `${name}`;
    popupDiv.querySelector("#population").innerHTML = `Population: ${countryData.population.toLocaleString()}`;
    popupDiv.querySelector("#capital").innerHTML = `Capital: ${capital}`;
    popupDiv.querySelector("#currency").innerHTML = `Currency: ${currency}`;
    popupDiv.querySelector("#language").innerHTML = `Language: ${language}`;
};

const closeButton = (popupDiv, layer) =>{
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    popupDiv.appendChild(closeButton);
    closeButton.addEventListener("click", () =>{
        popupDiv.classList.add("hidden");
        layer.classList.add("hidden");
    });  
}

export {createDiv, closeButton, popupData};