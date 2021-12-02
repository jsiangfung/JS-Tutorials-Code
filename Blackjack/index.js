//game variables
let sum;
let hasBlackJack;
let isAlive;

//Elements from HTML doc
let message = document.getElementById("message-el");
let cardText = document.getElementById("card");
let sumText = document.getElementById("sum");
let drawBtn = document.getElementById("draw-button");
let startBtn = document.getElementById("start-button");

//Deck - note: the extra 10s after the first represent numerical values for the face cards
var deck = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var faceCards = ["10","J","Q","K"];

//Starts a fresh state of the game by resetting all variables to original
function startGame(){
    message.innerText = "Do you want to draw a new card? 🙂";
    startBtn.innerText = "Reset";
    cardText.innerText = "";
    sumText.innerText = "";
    sum = 0;
    hasBlackJack = false;
    isAlive = true;
    drawBtn.style.display = "inline";
    let i=0; 
}

// Draws a card from the pool, while updating card and sum
function drawCard(){
    let randomIndex = Math.floor(Math.random()*13);
    let newCard = deck[randomIndex];
    
    //add card to cardText
    if(newCard === 1){ //uses aceValue() to update value of newCard to either 1 or 11 
        newCard = aceValue();
        cardText.innerText += (" " + "A");
    }else if(newCard === 10){ //Chooses a random card from faceCards if newCard === 10, to add to text
        cardText.innerText += (" " + randomFace());
    } else{ //nums 2-9 get converted to string to add to text
        cardText.innerText += (" " + parseInt(newCard));
    }
    
    
    //Add card to sumText
    sum += newCard;
    sumText.innerText = sum;

    updateGameState();
}

// Ace is 11 if sum + 11 is 21 or less. Otherwise Ace is 1.
function aceValue(){ 
    if((sum+11)<= 21){ return 11;}
    else return 1;
}

// Returns a random face card
function randomFace(){
    return faceCards[Math.floor(Math.random()*4)];
}

// Updates the gamestate based on the sum value
function updateGameState(){
    if (sum <= 20) {//Game in progress
        message.innerText = "Do you want to draw a new card? 🙂";
    } else if (sum === 21) {//Game win
        message.innerText = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;

        startBtn.innerText = "Start";
        drawBtn.style.display = "none";
    } else {//Game lose
        
        //Ingame variables
        message.innerText = "You're out of the game! 😭";
        isAlive = false;

        //Buttons
        startBtn.innerText = "Start";
        drawBtn.style.display = "none";
    }
}


