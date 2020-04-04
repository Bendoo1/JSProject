// I referenced a YouTube video for around 50% of the logic used within this, this can be found here - https://www.youtube.com/watch?v=n_ec3eowFLQ


//Defining variables used within the below functions//
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let hardReset = true;
let noise = true;
let on = false;
let win;

//Defining constants used within the below functions//
const counter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const hiScore = document.querySelector("#hiscore");

//Adding operations to the 'on' button such as Count display and High Score display//
onButton.addEventListener('click', () => {
    if (onButton.checked) {
        on = true;
        counter.innerHTML = "-";
        hiScore.innerHTML = 0;
        
    } else {
        on = false;
        counter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});
//Setting the on button to allow the play function, this will also be available if the win function has been reached//
startButton.addEventListener('click', () => {
    if (on || win) {
        play();
    }
});

//Setting up play function to act as constants throughout the game, this includes the random colour chosen by the computer, the turn array and setting other variables so that the player is not confused and the game is more readable//
function play () {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
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

//Initially set the on variable to false//
function gameTurn () {
    on = false;
    
    //Goes on to confirm that it is the player turn when a colour has flashed, the game is on and it is no longer the computers turn//
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    
    //Computers turn will show the colour to be emulated by the player, it also increments the amount of colours shown if the player is successful in emulating the computer//
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

//The following functions (one, two, three and four) are to house porperties pertaining to clicking one of the four colours displayed in the game. This includes sound and colour.
function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

//Function is called upon to reset the colours back to their default values, this happens in a number of areas in this file//
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

//Function is called upon to show the 'highlight' or 'flash' colour of each colour, these appear when clicked or when used by the computer to show the player the order//
function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

//Next 4 functions are used to give player feedback on the area they have clicked, colour is 'flashed', audio is played, then the colour is reset using 'clearColour'//
topLeft.addEventListener ('click', () => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener ('click', () => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener ('click', () => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener ('click', () => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

//This function is used to check the order length of the player vs. the computer. If the orders don't match then the game will go back to the 'play' function// 
function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length -1])
        good = false;
    //The player will win after 20 turns, or once the Count reads 20, the winGame function is defined later//
    if (playerOrder.length == 20 && good) {
        winGame();
        while (winGame()) {
            flashColor();
            clearColor();
        }
    }
    
    //good is when the order.length of the computer and player is the same, if this is not the case, the Count will flash 'NO!' and the game will go back to the 'play' function//
    if (!good) {
        flashColor();
        counter.innerHTML = "NO!";
        setTimeout(() =>{
            counter.innerHTML = turn;
            clearColor();
            
            if (hardReset) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        
        noise = false;
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
            if (hiScore.innerHTML == playerOrder.length - 1) {
                hiScore.innerHTML++;
            }
        playerOrder = [];
        compTurn = true;
        flash = 0;
        counter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}
//winGame is ran when the Count is equal to 20. When this is the case, the game will reset to on=false, all colours will flash and 'GZ!' will be displayed in the Count//
function winGame() {
    flashColor();
        counter.innerHTML = "GZ!";
        on = false;
        win = true;
}