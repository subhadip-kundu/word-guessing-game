const inputs = document.querySelector(".inputs");
const resetButton = document.querySelector(".reset-btn");
const hint = document.querySelector('.hint span');
const typingInput = document.querySelector('.typing-input');
const wrongLetter = document.querySelector('.wrong-letter span');
const guessLeft = document.querySelector('.guess-left span');


let word,maxGuesses;
let incorrects = [];
let corrects = [];

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)]; //Getting random object from wordList
    word = ranObj.word; //Getting word of random object
    maxGuesses = 8;incorrects = []; corrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses; 
    wrongLetter.innerText = incorrects; // Clear wrong values

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }

    inputs.innerHTML = html;

}

randomWord();

//Event on click reset button
resetButton.addEventListener('click', randomWord);

//Focus on the input field on keydown
document.addEventListener('keydown', () => {
    typingInput.focus();
});

// Function to interect with  user input

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)  && !corrects.includes(` ${key}`)) {
        if (word.includes(key)) { // If user letter found in the word
            for (let i = 0; i < word.length; i++) {
                // Showing matched letter in the input value
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll('input')[i].value = key;
                }
            }
        }
        else {
            maxGuesses--; // decrease the max incorrect guess by 1
            incorrects.push(` ${key}`); //Push all incorrect values on this array
        }
        wrongLetter.innerText = incorrects;
        guessLeft.innerText = maxGuesses;
    }
    typingInput.value = "";

    setTimeout(()=>{
        if(corrects.length === word.length){
            alert(`Congrats! You found the word ${word.toUpperCase()}`)
            randomWord() // Calling random function , so the game reset
        }
        else if(maxGuesses < 1){
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                // Showing matched letter in the input value
                inputs.querySelectorAll('input')[i].value = word[i];
            }
        }
    })
}


// Calling initGame on any input from the user
typingInput.addEventListener('input', initGame);