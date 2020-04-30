// I referenced a YouTube video for around 50% of the logic used within this, this can be found here - https://www.youtube.com/watch?v=n_ec3eowFLQ


//Defining variables used within the below functions//
let turn;
let good;
let compTurn;
let intervalId;
let hardReset = true;
let sound = true;
let powerOn = false;
let playerWin;
let order = [];
let playerOrder = [];
let highlight;


//Defining constants used within the below functions//
const onButton = document.querySelector("#powerOn");
const startButton = document.querySelector("#start-button");
const hiScore = document.querySelector("#hiscore");
const counter = document.querySelector("#turn");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const topLeft = 1;
const topRight = 2;
const bottomLeft = 3;
const bottomRight = 4;


//Adding operations to the 'powerOn' button such as Count display and High Score display//
onButton.addEventListener('click', () => {
    if (onButton.checked) {
        powerOn = true;
        counter.innerHTML = "-";
        hiScore.innerHTML = 0;
        return;
    }
    powerOn = false;
    counter.innerHTML = "";
    resetColor();
    clearInterval(intervalId);
});
//Setting the powerOn button to allow the play function, this will also be available if the playerWin function has been reached//
startButton.addEventListener('click', () => {
    if (powerOn || playerWin) {
        start();
    }
});

//Setting up play function to act as constants throughout the game, this includes the random colour chosen by the computer, the turn array and setting other variables so that the player is not confused and the game is more readable//
function start () {
    playerWin = false;
    order = [];
    playerOrder = [];
    highlight = 0;
    intervalId = 0;
    turn = 1;
    counter.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    
    intervalId = setInterval(gameTurn, 800);
}

//Initially set the powerOn variable to false//
function gameTurn () {
    powerOn = false;
    
    //Goes on to confirm that it is the player turn when a colour has flashed, the game is powered on and it is no longer the computers turn//
    if (highlight == turn) {
        clearInterval(intervalId);
        compTurn = false;
        resetColor();
        powerOn = true;
    }
    
    //Computers turn will show the colour to be emulated by the player, it also increments the amount of colours shown if the player is successful in emulating the computer//
    if (compTurn) {
        resetColor();
        setTimeout(() => {
            switch(order[highlight]){ 
                case topLeft: 
                    one();
                break;
                case topRight: 
                    two();
                break;
                case bottomLeft: 
                    three();
                break;
                case bottomRight: 
                    four();
                break;
            }
            highlight++;
        }, 200);
    }
}

//The following functions (one, two, three and four) are to house porperties pertaining to clicking one of the four colours displayed in the game. This includes sound and colour.
function one() {
    if (sound) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    sound = true;
    green.style.backgroundColor = "lightgreen";
}

function two() {
    if (sound) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    sound = true;
    red.style.backgroundColor = "tomato";
}

function three() {
    if (sound) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    sound = true;
    yellow.style.backgroundColor = "yellow";
}

function four() {
    if (sound) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    sound = true;
    blue.style.backgroundColor = "lightskyblue";
}

//Function is called upon to reset the colours back to their default values, this happens in a number of areas in this file//
function resetColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    yellow.style.backgroundColor = "goldenrod";
    blue.style.backgroundColor = "darkblue";
}

//Function is called upon to show the 'highlight' or 'flash' colour of each colour, these appear when clicked or when used by the computer to show the player the order//
function flashColor() {
    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "tomato";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "lightskyblue";
}

//Next 4 functions are used to give player feedback on the area they have clicked, colour is 'flashed', audio is played, then the colour is reset using 'clearColour'//
green.addEventListener ('click', () => {
    if (powerOn) {
        playerOrder.push(topLeft);
        check();
        one();
        if (playerWin) {
            return;
        }
        setTimeout(() => {
            resetColor();
        }, 300);
    }
});

red.addEventListener ('click', () => {
    if (powerOn) {
        playerOrder.push(topRight);
        check();
        two();
        if (playerWin) {
            return;
        }
        setTimeout(() => {
            resetColor();
        }, 300);
    }
});

yellow.addEventListener ('click', () => {
    if (powerOn) {
        playerOrder.push(bottomLeft);
        check();
        three();
        if (playerWin) {
            return;
        }
        setTimeout(() => {
            resetColor();
        }, 300);
    }
});

blue.addEventListener ('click', () => {
    if (powerOn) {
        playerOrder.push(bottomRight);
        check();
        four();
        if (playerWin) {
            return;
        }
        setTimeout(() => {
            resetColor();
        }, 300);
    }
});

//This function is used to check the order length of the player vs. the computer. If the orders don't match then the game will go back to the 'start' function// 
function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length -1])
        good = false;
    //The player will trigger the function playerWin after 20 turns, or once the Count reads 20, the winGame function is defined later//
    if (playerOrder.length == 20 && good) {
        winGame();
        while (winGame()) {
            flashColor();
            resetColor();
        }
    }
    
    //good is when the order.length of the computer and player is the same, if this is not the case, the Count will highlight 'NO!' and the game will go back to the 'play' function, due to the hardReset variable//
    if (!good) {
        flashColor();
        counter.innerHTML = "NO!";
        setTimeout(() =>{
            counter.innerHTML = turn;
            resetColor();
            
            if (hardReset) {
                start();
            } else {
                compTurn = true;
                highlight = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        
        sound = false;
    }
    if (turn == playerOrder.length && good && !playerWin) {
        turn++;
            if (hiScore.innerHTML == playerOrder.length - 1) {
                hiScore.innerHTML++;
            }
        playerOrder = [];
        compTurn = true;
        highlight = 0;
        counter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}
//winGame is ran when the Count is equal to 20. When this is the case, the game will reset to powerOn=false, all colours will highlight and 'GZ!' will be displayed in the Count//
function winGame() {
    flashColor();
        counter.innerHTML = "GZ!";
        powerOn = false;
        playerWin = true;
}