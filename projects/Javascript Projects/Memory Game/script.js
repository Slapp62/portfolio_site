const colorArr = ["red", "blue", "green", "yellow", "orange", "violet", "aqua", "magenta"];
const doubleColorArr = colorArr.concat(colorArr);

let flippedArr = [];
let memorizedArr = [];
let memoryTime = 1000;
let matchesMade = 0;
let matchesRemaining = 8;

const container = document.querySelector(".container");
const buttonsContainer = document.getElementById("diffSelect");
const diffButtons = document.getElementsByClassName("diffButton");
const trackerDiv = document.getElementById('matchTracker');
const gameEnd = document.getElementById("gameEnd");
const playAgain = document.querySelector("#restart");

container.style.display = 'none';

const difficultySelect = (event) =>{
    const selectedDifficulty = event.target.innerHTML;

    if (selectedDifficulty == "Easy"){
    memoryTime = 1500;
    } else if (selectedDifficulty === "Medium"){
    memoryTime = 1000;
    } else if (selectedDifficulty === "Hard"){
    memoryTime = 300;
    } 

    document.getElementById('startSound').play();
    buttonsContainer.style.display = "none";
    container.style.display = "grid";
}

for (const button of diffButtons){
    button.addEventListener("click", difficultySelect);
}

playAgain.addEventListener("click", ()=>{
    location.reload();
});

const matchTracker = () => {
    trackerDiv.innerHTML = '';
    matchesMade++;
    matchesRemaining--;
    const counter = `
        <h2 class="start-regular">You made ${matchesMade} match(es). Only ${matchesRemaining} to go!</h2>
    `
    trackerDiv.insertAdjacentHTML("beforeend", counter);
}



for (i = 0; i < 16; i++){
    const randomNum = Math.floor(Math.random() * doubleColorArr.length);
    const randomcolor = doubleColorArr[randomNum];
    doubleColorArr.splice(randomNum, 1);

    const newSquare = () => {
        const square = `
            <div class="square question" data-number=${i} data-color=${randomcolor}></div>
        `
        container.insertAdjacentHTML("beforeend", square);
    }

    newSquare();
    
    let square = document.querySelector(`.square[data-number="${i}"]`);
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

        square.classList.remove("question");
        square.style.backgroundColor = randomcolor;
        flippedArr.push(square);

        if (flippedArr.length === 2){
             if (flippedArr[0].getAttribute("data-color") === flippedArr[1].getAttribute("data-color")){
                memorizedArr.push(...flippedArr)
                if (memorizedArr.length === 16){
                    setTimeout(() =>{
                        matchTracker.style.display = 'none';
                        container.style.display = "none";
                        gameEnd.classList.remove("hidden")
                        return
                    }, 1000);
                }

                
                flippedArr = [];
                matchTracker();
                document.getElementById('matchSound').play();
                console.log(memorizedArr);
                return
            }

            setTimeout(() =>{
                for (const square of flippedArr){
                    square.classList.add("question");
                    square.style.backgroundColor = "darkgray";
                }
                
                flippedArr = [];
            }, memoryTime);
        }
    });
}
