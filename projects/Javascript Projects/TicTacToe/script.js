const gameContainer = document.querySelector("#gameContainer");
const Ximg = '<img src="./o.png" class="squareImg"></img>';
let playerTurn = true;

for (let i = 9; i > 0; i--){
    const square = `
        <div class="square border" data-number=${i}>
        
        </div>
    `

    gameContainer.insertAdjacentHTML('afterbegin', square);
}


const squaresArray = [...document.querySelectorAll(".square")]


gameContainer.addEventListener('click', (e) =>{
    let randomNumber = Math.ceil(Math.random() * 9)
    console.log("random number is " + randomNumber);
    console.log(e);
    if (e.target.classList.contains("x") || e.target.classList.contains("o")){
        return
    }

    if (playerTurn === true && e.target.classList.contains("square")) {
        e.target.classList.add("x")
        playerTurn = false;
        setTimeout(()=>{
            squaresArray.forEach((square)=>{
                if (square.dataset.number == randomNumber && square.classList.contains("o") || square.classList.contains("x")){
                    randomNumber = randomNumber + 1
                } else{
                    square.classList.add("o");
                }
            })
            playerTurn = true;
        }, 500)
    }
    
});