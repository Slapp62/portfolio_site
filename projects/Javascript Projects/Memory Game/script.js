const colorArr = ["red", "blue", "green", "yellow", "orange", "violet", "aqua", "magenta"];
const doubleColorArr = colorArr.concat(colorArr);
let flippedArr = [];
let memorizedArr = [];
const container = document.querySelector(".container");
container.style.display = "none";
let memoryTime = 1000;
const buttonsContainer = document.getElementById("buttonsContainer");
const diffButtons = document.getElementsByClassName("diffButtons");
const finishedGame = document.getElementById("finishedGame");
const playAgain = document.getElementById("playAgain");

const difficultySelect = (event) =>{
    const selectedDifficulty = event.target.innerHTML;

    if (selectedDifficulty === "Easy"){
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
    square.setAttribute("color", randomcolor)
    container.appendChild(square);
 
    

    square.addEventListener("click", () =>{
        if (flippedArr.length >= 2){
            return
        }
        
        if (memorizedArr.includes(square)){
            return
        }

        square.style.backgroundColor = randomcolor;
        flippedArr.push(square);

        if (flippedArr.length === 2){
             if (flippedArr[0].getAttribute("color") === flippedArr[1].getAttribute("color")){
                memorizedArr.push(...flippedArr)
                if (memorizedArr.length === 16){
                    container.style.display = "none";
                    finishedGame.classList.remove("hidden")
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
