const colorArr = ["red", "blue", "green", "yellow", "orange", "violet", "aqua", "magenta"];
const doubleColorArr = colorArr.concat(colorArr);

let flippedArr = [];
let memorizedArr = [];
let memoryTime = 1000;

const container = document.querySelector(".container");
const buttonsContainer = document.getElementById("diffSelect");
const diffButtons = document.getElementsByClassName("diffButton");
const gameEnd = document.getElementById("gameEnd");
const playAgain = document.querySelector("#restart");

container.style.display = 'none';

const difficultySelect = (event) =>{
    const selectedDifficulty = event.target.innerHTML;

    if (selectedDifficulty == "Easy"){
    memoryTime = 2000;
    } else if (selectedDifficulty === "Medium"){
    memoryTime = 1000;
    } else if (selectedDifficulty === "Hard"){
    memoryTime = 500;
    } 

    buttonsContainer.style.display = "none";
    container.style.display = "grid";
}

for (const button of diffButtons){
    button.addEventListener("click", difficultySelect);
}

playAgain.addEventListener("click", ()=>{
    location.reload();
});



for (i = 0; i < 16; i++){
    const randomNum = Math.floor(Math.random() * doubleColorArr.length);
    const randomcolor = doubleColorArr[randomNum];
    doubleColorArr.splice(randomNum, 1);

    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = "darkgray"; 
    square.setAttribute("data-color", randomcolor);
    square.setAttribute("data-number", i);
    container.appendChild(square);
 
    square.addEventListener("click", (e) =>{
        // stops clicks after 2 cards
        if (flippedArr.length >= 2){
            return
        }

        // stops clicks when the same card is clicked twice
        if (flippedArr[0] && square.getAttribute('data-number') === flippedArr[0].getAttribute('data-number')){
            return
        }
        
        // stops clicks on matched cards
        if (memorizedArr.includes(square)){
            return
        }

        square.style.backgroundColor = randomcolor;
        flippedArr.push(square);

        if (flippedArr.length === 2){
             if (flippedArr[0].getAttribute("data-color") === flippedArr[1].getAttribute("data-color")){
                memorizedArr.push(...flippedArr)
                if (memorizedArr.length === 16){
                    container.style.display = "none";
                    gameEnd.classList.remove("hidden")
                    return
                }
                flippedArr = [];
                console.log(memorizedArr);
                return
            }

            setTimeout(() =>{
                flippedArr.forEach(square => square.style.backgroundColor = "darkgray"); 
                flippedArr = [];
            }, memoryTime);
        }
    });
   
}
