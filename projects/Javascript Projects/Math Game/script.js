// universal variables
let count = 0;
let countCorrect = 0;
let symbolCorrect = '';
let countIncorrect = 0;
let lives = 5;
let startbtn = document.getElementById("start");
let givenEquation;
let correctAnswer;
let heart = "❤";
let selectedDifficulty = document.getElementById("diffSelect");
let opSelect = document.getElementById("opSelect");
let actualOperator;
let eachAnswerArr = [];

difficulty = () =>{
    if (selectedDifficulty.value === "easy") {
        document.getElementById("mode").innerHTML = 'Easy Mode';
    } else if (selectedDifficulty.value === "medium") {
        document.getElementById("mode").innerHTML = 'Medium Mode';
    } else if (selectedDifficulty.value === "hard") {
        document.getElementById("mode").innerHTML = 'Hard Mode';
    } 
} 

operator = () =>{
    let operator = ['+', '-', 'x', '/'];
    let randomOperator = operator[Math.floor(Math.random() * operator.length)];
    
    if (opSelect.value === "random"){
        actualOperator = randomOperator;
    } else if (opSelect.value === "subtraction"){
        actualOperator = "-";
    } else if (opSelect.value === "addition"){
        actualOperator = "+";
    } else if (opSelect.value === "multiplication"){
        actualOperator = "x";
    } else if (opSelect.value === "division"){
        actualOperator = "/";
    } 
}

document.getElementById("answerTable").style.display = "none";


const startPress = () =>{
    difficulty();
    operator();
    if (opSelect.value && selectedDifficulty.value){
        randomEquation();
        document.getElementById("gameDiv").style.display = "block";
        //document.getElementById("dropdowns").style.display = "none";
    } else {
        alert("Please select a difficulty and an operator.")
    }
}

startbtn.addEventListener("click", startPress);
// Commented out to prevent conflict with enter on Submit button.
// document.addEventListener("keydown", (e) =>{
//     if (e.key === "Enter"){
//         startPress();
//     }
// });
const randomNumber = (num1, num2) =>{
    const temp1 = Math.ceil(Math.random() * num1);
    const temp2 = Math.ceil(Math.random() * num2);
    return [temp1, temp2];
}

const randomEquation = () => {
    let temp1;
    let temp2;
    
    if (selectedDifficulty.value === "easy") {
        [temp1, temp2] = randomNumber(10, 10);
        document.getElementById("mode").innerHTML = 'Easy Mode';
    } else if (selectedDifficulty.value === "medium") {
        [temp1, temp2] = randomNumber(10, 100);
        document.getElementById("mode").innerHTML = 'Medium Mode';
    } else if (selectedDifficulty.value === "hard") {
        [temp1, temp2] = randomNumber(10, 1000);
        document.getElementById("mode").innerHTML = 'Hard Mode';
    } else {
        alert("Please Choose a Difficulty Level")
    }
    
    let num1;
    let num2;
    if (temp1 > temp2){
        num1 = temp1;
        num2 = temp2;
    } else {
        num1 = temp2;
        num2 = temp1;
    }
    let result;

    if (actualOperator === '/') {
        result = (num1 / num2).toFixed(1);
        result = parseFloat(result);
    } else if (actualOperator === "x") {
       result = num1 * num2;
    } else if (actualOperator === '-') {
       result = num1 - num2;
    } else if (actualOperator === '+') {
       result = num1 + num2;
    } else {
        console.log('Error');
    }

    correctAnswer = result;
    givenEquation = `${num1} ${actualOperator} ${num2} =`;
    document.getElementById("equation").innerHTML = givenEquation;
}

document.getElementById("lives").innerHTML = `Lives: ${heart.repeat(lives)}`;
document.getElementById("correct").innerHTML = `Correct:`;
document.getElementById("gameEnd").style.display = "none";



createTable = () => {
    const table = document.getElementById("answerTable");
    const row = document.createElement("tr");
    eachAnswerArr.forEach(value => {
        const cell = document.createElement("td");
        cell.innerHTML = value;
        row.appendChild(cell);
        table.appendChild(row);
    });
}
const submitPress = () => {
    const answerInput = document.getElementById("answer").value;
    const givenAnswer = Number(answerInput)
    if (answerInput.trim() === ""){
        alert("Please enter an answer.")
        return
    } else if (givenAnswer == correctAnswer) {
        symbolCorrect += "✅";
        countCorrect++;
        count++;
    } else{
        countIncorrect++;
        lives = lives - 1;
        document.getElementById("lives").innerHTML = `Lives: ${heart.repeat(lives)}`;
        count++;
    }

    document.getElementById("correct").innerHTML = `Correct: ${symbolCorrect}`;
    document.getElementById("answer").value = '';

    // added function so operator changes in case random is selected.
    operator();

    if (count === 10){
        document.getElementById("gameDiv").style.display = "none";
        document.getElementById("gameEnd").style.display = "block";
        document.getElementById("finalMessage").innerHTML =    
            `Good Job! You got ${countCorrect} correct and ${countIncorrect} incorrect.`;
    } else if (lives === 0){
        document.getElementById("gameDiv").style.display = "none";
        document.getElementById("finalMessage").innerHTML =    
            `Game Over. <br> You ran out of lives!`;
        document.getElementById("submit").style.display = "none";
        document.getElementById("gameEnd").style.display = "block";
        } 

    document.getElementById("answerTable").style.display = "block";
    eachAnswerArr = [count, givenEquation, correctAnswer, givenAnswer]
    createTable();
    randomEquation();
}
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", submitPress);
document.addEventListener("keydown", (e) => {
    const answerInput = document.getElementById("answer");
    if (e.key === "Enter" && document.activeElement === answerInput){
        submitPress();
    }
});







document.getElementById("restart").addEventListener("click", () => {
    location.reload();
});
