const page = document.getElementById("page-container");
const builder = document.getElementById('builder-container');
const bkgSelect = document.getElementById("bkgColor-select");
const hdrSelect = document.getElementById("hdr-select");
const hdrClear = document.getElementById("hdr-clear");
const elementAdd = document.getElementById("element-add");
let createdElement;
const createdElementArr = [];
const elementSave = document.getElementById("element-save");
const elementRemove = document.getElementById("element-remove");
const elementLoad = document.getElementById("element-load");
const elementRight = document.getElementById("element-right");
const elementDown = document.getElementById("element-down");
const elementCenter = document.getElementById("element-center");
const textCenter = document.getElementById("text-center");
const download = document.getElementById("page-download");
const hamburger = document.querySelector('.hamburger');

let currentMargin;
// Load Session Storage Element
// *Need to check if it saves all elements.
const load = () => {
    const storedElementArr = sessionStorage.getItem("element");
    const revivedElementArr = JSON.parse(storedElementArr);
    for (i = 0; i < revivedElementArr.length; i++){
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = revivedElementArr[i];
        const revivedElement = tempDiv.firstChild;
        page.appendChild(revivedElement);
        createdElementArr.push(revivedElement);
    } 
}

const moveElement = (event) => {
    const clickedId = event.target.id;

    switch(clickedId){
        case "element-right":
            currentMargin = parseInt(createdElement.style.marginLeft) || 0;
            createdElement.style.marginLeft = `${currentMargin +10}px`;
            break;
        case "text-center":
            createdElement.style.textAlign = "center";
            break;
        case "element-center":
            createdElement.style.marginInline = "auto";
            break;
        case "element-down":
            currentMargin = parseInt(createdElement.style.marginTop) || 0;
            createdElement.style.marginTop = `${currentMargin +10}px`;
    }
}

// Change Background Color
const bkgColor = () =>{
    const chosenColor = document.getElementById("page-bkgColor").value;
    page.style.backgroundColor = chosenColor;
}
bkgSelect.addEventListener("click", bkgColor);


const addElement = () => {
    const elementType = document.getElementById("element-type").value;
    const elementWidth = document.getElementById("element-width").value;
    const elementHeight = document.getElementById("element-height").value;
    const elementContent = document.getElementById("element-content").value;
    const elementBkgColor = document.getElementById("element-bkgColor").value;
    const elementTxtColor = document.getElementById("element-txtColor").value;
    const elementTxtSize = document.getElementById("element-txtSize").value;
    const elementPadding = document.getElementById("element-padding").value;
    const elementMargin = document.getElementById("element-margin").value;

    const newElement = document.createElement(elementType);
    newElement.style.width = elementWidth ? `${elementWidth}px` : "auto";
    newElement.style.height = elementHeight ? `${elementHeight}px` : "auto";
    newElement.style.backgroundColor = elementBkgColor;
    newElement.style.color = elementTxtColor;
    newElement.style.fontSize =  elementTxtSize ? `${elementTxtSize}px` : "inherit";
    newElement.style.padding = elementPadding;
    newElement.style.margin = elementMargin;
    newElement.innerHTML = elementContent;
    createdElement = newElement;
    page.appendChild(newElement);
    createdElementArr.push(createdElement);
    console.log(createdElementArr);
    
}

const saveElement = () => {
    const outerHtmlArr = [];
    for (i = 0; i < createdElementArr.length; i++){
        const currentElement = createdElementArr[i].outerHTML;
        outerHtmlArr.push(currentElement);
    }    
    sessionStorage.setItem("element", JSON.stringify(outerHtmlArr));
}

const removeElement = () => {
    const currentElement = createdElementArr.pop();
    page.removeChild(currentElement); 
}

const createDownload = (content, filename) =>{
    const blob = new Blob([content], {type:'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

const downloadPage = () => {
    const newPage = page.outerHTML;
    createDownload(newPage, "New_Page(created with Simcha Lapp's Page Builder).html");
}

elementAdd.addEventListener("click", addElement);
elementSave.addEventListener("click", saveElement);
elementRemove.addEventListener("click", removeElement)
elementLoad.addEventListener("click", load);
elementRight.addEventListener("click", moveElement);
elementCenter.addEventListener("click", moveElement);
elementDown.addEventListener("click", moveElement);
textCenter.addEventListener("click", moveElement);
download.addEventListener("click", downloadPage);