const createDiv = (country, container) =>{
    const newDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const countryName = document.createElement("h2");
    const newImg = document.createElement("img");
    const buttonDiv = document.createElement("div");
    const favorite = document.createElement("button");
    const button = document.createElement("button");

    buttonDiv.className = "buttonDiv";
    button.className = "button";
    newDiv.className = "country";
    newImg.className = "flag";
    nameDiv.className = "nameDiv";
    countryName.className = "countryName";
    favorite.className = "favorite";

    favorite.innerHTML = "❤";
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

const closeButton = (popup, layer) =>{
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    popup.appendChild(closeButton);
    closeButton.addEventListener("click", () =>{
        popup.classList.add("hidden");
        layer.classList.add("hidden");
    });  
}

export {createDiv, closeButton};