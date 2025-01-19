const gameContainer = document.querySelector("#gameContainer");
const Ximg = '<img src="./o.png" class="squareImg"></img>';
let playerTurn = true;
let gameState = ["","","","","","","","",""];
let gameOver = false;
let xWins = JSON.parse(sessionStorage.getItem("xWins")) || 0 ;
let oWins = JSON.parse(sessionStorage.getItem("oWins")) || 0 ;
let ties = JSON.parse(sessionStorage.getItem("ties")) || 0 ;
document.querySelector(".xWins").innerHTML = `Wins by X: ${xWins}`;
document.querySelector(".oWins").innerHTML = `Wins by O: ${oWins}`;
document.querySelector(".ties").innerHTML = `Ties: ${ties}`;

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

const blockWin = () =>{
    const winPatterns = [
        // rows
        [0,1,2], [3,4,5], [6,7,8],
        // columns
        [0,3,6],[1,4,7], [2,5,8],
        //diagonls
        [0,4,8], [2,4,6]
    ]

    for (let pattern of winPatterns){
        let xCount = 0;
        let emptyCount = 0;
        let blockIndex;

        pattern.forEach((index) => {
            if (gameState[index] === "x"){
                xCount++;
            }
            if (gameState[index] === ''){
                emptyCount++;
                blockIndex = index;
            } 
        });

        if (xCount === 2 && emptyCount === 1 && blockIndex !== undefined){
            return blockIndex;
        }
    }
}

const computerMove = () =>{
   
    let blockIndex = blockWin();

    if (blockIndex !== undefined){
        gameState[blockIndex] = 'o';
        squaresArray.forEach((square) => {
            setTimeout(()=>{
               if (square.dataset.number == blockIndex){
                square.classList.add('o');
                playerTurn = true;
                } 
            }, 500)
        })
        return
    } else{
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
            setTimeout(()=>{
            if (square.dataset.number == randomIndex){
                square.classList.add('o');
                playerTurn = true;
                } 
            }, 500)
        })

    }
    
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
        const gameTied = gameState.every(square => square === 'o' || square === 'x');

        if (playerWin){
            gameOver = true;

            document.querySelector(".winner").innerHTML = "You won!";
            xWins++;
            sessionStorage.setItem("xWins", JSON.stringify(xWins));
            document.querySelector(".xWins").innerHTML = `Wins by X: ${xWins}`;
            
            document.querySelector(".playAgain").style.display = "block";
            return
        } else if (computerWin){
            gameOver = true;
            oWins++;

            document.querySelector(".winner").innerHTML = "You have lost!";
            document.querySelector(".oWins").innerHTML = `Wins by O: ${oWins}`;
            document.querySelector(".playAgain").style.display = "block";

            sessionStorage.setItem("oWins", JSON.stringify(oWins));
            
            return
        } 
        
        if (gameTied){
            gameOver = true;
            ties++;
            document.querySelector(".winner").innerHTML = "The game has tied!";
            document.querySelector(".ties").innerHTML = `Ties: ${ties}`;
            document.querySelector(".playAgain").style.display = "block";
            sessionStorage.setItem("ties", JSON.stringify(ties));
            return
        }
    }

    const gameTie = gameState.every(square => square !== "");
    if (gameTie){
        console.log('the game is tied');
        gameOver = true;
        document.querySelector(".playAgain").style.display = "block";
    }
}

const playerMove = (e) =>{
    // if its empty and its players turn, add x
    e.target.classList.add("x");
    playerTurn = false;
    
    updateGamestate();
}

gameContainer.addEventListener('click', (e) =>{
    if (playerTurn === false || gameOver === true || e.target.classList.contains('x') || e.target.classList.contains('o')){
        return
    } 
    // player makes a move
    playerMove(e);
    
    checkWin();
    //computer makes a move
    if (gameOver === false){
        computerMove();
        checkWin();
    }
    //check for a winner
    
    if(e.target.id === "restart"){
        location.reload();
    }
    
});

document.getElementById("restart").addEventListener('click', () =>{
    location.reload();
});