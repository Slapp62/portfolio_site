const gameContainer = document.querySelector("#gameContainer");
const Ximg = '<img src="./o.png" class="squareImg"></img>';
let playerTurn = true;
let gameState = ["","","","","","","","",""]


for (let i = 8; i > -1; i--){
    const square = `
        <div class="square border" data-number=${i}></div>
    `
    gameContainer.insertAdjacentHTML('afterbegin', square);
}

const squaresArray = [...document.querySelectorAll(".square")]

const updateGamestate = () => {
    squaresArray.forEach((square) =>{
        // check for x in UI and update GS
        if (square.classList.contains("x")){
            gameState[square.dataset.number] = "x";
        }

         // check for o in UI and update GS
        if (square.classList.contains("o")){
            gameState[square.dataset.number] = "o";
        }
    });
}

const computerMove = () =>{
    // find empty square
    let emptySquares = [];
    for (let i = 0; i < gameState.length; i++){
        if (gameState[i] === ""){
            emptySquares.push(i);
        }
    }
    // generate random square for move
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    
    // update game state
    gameState[randomIndex] = "o";

    // find and enter O in UI
    squaresArray.forEach((square) => {
        if (square.dataset.number == randomIndex){
            square.classList.add('o');
        }
    })
    updateGamestate();
}
const checkWin = () =>{
    const winPatterns = [
        // rows
        [0,1,2], [3,4,5], [6,7,8],
        // columns
        [0,3,6],[1,4,7], [2,5,8],
        //diagonls
        [0,4,8], [2,4,6]
    ]

    for (let pattern of winPatterns){
        const gamePattern = pattern.map(index => gameState[index])
        const playerWin = gamePattern.every(square => square === 'x');
        const computerWin = gamePattern.every(square => square === 'o');
        
        if (playerWin){
            console.log("Player has won!")
            return
        } else if (computerWin){
            console.log("Computer has won!")
            return
        }
    }
}

const playerMove = (e) =>{
    // check if its the computers turn or if the square is full
    if (playerTurn = false || e.target.classList.contains('x') || e.target.classList.contains('o')){
        return
    } else {
        // if its empty and its players turn, add x
        e.target.classList.add("x");
        playerTurn = false;
    } 
    updateGamestate();
}

gameContainer.addEventListener('click', (e) =>{
    // player makes a move
    playerMove(e);

    //check for a winner
    checkWin();

    //computer makes a move
    computerMove();

    //check for a winner
    checkWin();
    
});

