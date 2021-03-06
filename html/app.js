// Initial DOM
let betAmount = document.getElementById('betAmount');
let betPrint = document.getElementById('betAmmountPrint')
let welcomeMessage = document.querySelector('.welcomeMessage')
// gets bet number as a value
// let walletAmountNumber = document.getElementById('walletAmount').innerHTML
// gets html line
let walletAmount = document.getElementById('walletAmount')
let winnerText = document.getElementById('winner')
console.log(winnerText)
let backCard = document.createElement("img")
backCard.src="./cards/RED_BACK.svg"
// player DOM
let playerCards = document.getElementById('playerCards')
let hitButton = document.getElementById('hit')
let standButton = document.getElementById('stand')
let userCards = document.querySelector('.userCards')
let playerScore = document.getElementById('playerScore')
let playerHitCard = document.getElementById('playerHitCard')
let newGame = document.getElementById('newGame')
let userCardIMG = document.querySelector('.userCardIMG')
// computer DOM 
let computerCards = document.querySelector('.gameplay')
let computerCardsDisplay = document.getElementById('computerCardsDisplay')
let computerScore = document.getElementById('computerScore')
let computerCardIMG = document.getElementById('computerPicture')

// gameplay DOM
let gameplay = document.querySelector('.gameplay');
gameplay.style.display = 'none';

// Global variables
let gameStarted = false;
let playerDealtCards = [];
let dealerCards = [];
let playerWin = false;
let dealerScore = 0;
let userScore = 0;
let updatedWallet =0;
let deck = [];
let scoreValue = 0;
let betValue = 0;
let wallet = 100;

walletAmount.innerHTML = wallet
// changes bet value to the number player requested but doesnt envoke til button clicked
function getBetAmount(){
    betPrint.innerHTML = `Player Bets ${betAmount.value}$`
    return betValue = betAmount.value;
}

// Bet number is submitted wallet is updated and welcome message disappears
betButton.addEventListener('click', () => {
    getBetAmount();
    if(betValue > 0) {
    welcomeMessage.style.display = 'none';
    gameplay.style.display = 'inline';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    newGame.style.display = 'none';
    computerScore.style.display = 'none';
    updatedWallet = wallet - betValue;
    walletAmount.innerHTML = updatedWallet;
    dealCards();
    gameStarted = true;
    savage21();
    } else {
        alert('You must place a bet')
    }
})
// betValue is now the ammount the player chose

// Card deck
// https://www.programiz.com/javascript/examples/shuffle-card used as reference to create deck
let suit = ['H', 'S', 'C', 'D']
let rank = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
let score = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]



// Creating the deck with suit, rank, and scores
function makeDeck(){
for (let i = 0; i<suit.length; i++) {
    for(let j=0; j<rank.length; j++){
        let card = {
            suit: suit[i],
            rank: rank[j],
            score: score[j]
        };
        deck.push(card);
        }
    }
    console.log(deck)
    return deck;
}

//  deck should have 52 cards
// shuffle deck
function shuffle(deck){
for (let i=0; i<deck.length; i++) {
    let random = Math.floor(Math.random() *52);
    let deckshuffle = deck[i];
    deck[i] = deck[random];
    deck[random] = deckshuffle;
    // console.log(deck[random])
}
}

// deck is now random

// Score function with ace
function scoreCalculation(cardsInHand) {
    scoreValue = 0;
    console.log(cardsInHand)
    for (let i=0; i<cardsInHand.length; i++){
        let card = cardsInHand[i];
        console.log(card)
        scoreValue += card.score;
        console.log(scoreValue)
        if(card.rank === 'A') {
            if(userScore <= 10){
                card.score = 11;
                scoreValue += card.score -1;
                console.log(scoreValue)
            } else if(userScore > 21){
                scoreValue += card.score - 11;
            } 
        } 
    }
    console.log(scoreValue)
    return scoreValue
    
}


// getScore
function getScore(){
    dealerScore = scoreCalculation(dealerCards)
    console.log(dealerScore)
    userScore = scoreCalculation(playerDealtCards)
    console.log(userScore)
}

// displays score
function scoreDisplay(){
    computerScore.innerHTML = `Dealer Score: ${dealerScore}`
    playerScore.innerHTML = `Player Score: ${userScore}`
}
    let computerIMG;
    
// cards are dealt
function dealCards() {
    makeDeck();
    shuffle(deck);
    playerDealtCards = [deck.shift(), deck.shift()]
    dealerCards = [deck.shift(), deck.shift()]
    getScore();
    scoreDisplay();
    computerCardIMG.append(backCard);
    computerIMG = document.createElement("img");
    computerIMG.src = `./cards/${dealerCards[0].rank}${dealerCards[0].suit}.svg`;
    let computerIMG2 = document.createElement("img");
    computerIMG2.src = `./cards/${dealerCards[1].rank}${dealerCards[1].suit}.svg`
    computerCardIMG.append(computerIMG2)
    // computerCardsDisplay.innerHTML = `${dealerCards[0].rank} of ${dealerCards[0].suit} & ${dealerCards[1].rank} of ${dealerCards[1].suit}`
    // playerCards.innerHTML = `${playerDealtCards[0].rank} of ${playerDealtCards[0].suit} & ${playerDealtCards[1].rank} of ${playerDealtCards[1].suit}`
    let cardIMG = document.createElement("img");
    cardIMG.src = `./cards/${playerDealtCards[0].rank}${playerDealtCards[0].suit}.svg`
    userCardIMG.append(cardIMG)
    let cardIMG2 = document.createElement("img");
    cardIMG2.src = `./cards/${playerDealtCards[1].rank}${playerDealtCards[1].suit}.svg`
    userCardIMG.append(cardIMG2)
}
let newCard = deck.shift();
// hit button
hitButton.addEventListener('click', () => {
    if (gameStarted === true) {
    newCard = deck.shift();
    playerDealtCards.push(newCard);
    }
    getScore();
    scoreDisplay();
    busted();
    let hitCardIMG = document.createElement("img");
    hitCardIMG.src = `./cards/${newCard.rank}${newCard.suit}.svg`
    userCardIMG.append(hitCardIMG)
    // playerCards.append(` & ${newCard.rank} of ${newCard.suit}`)
    // playerHitCard.innerHTML = `New Card: ${playerDealtCards[playerDealtCards.length-1].rank} of ${playerDealtCards[playerDealtCards.length-1].suit}`
})

standButton.addEventListener('click', ()=> {
    gameOver();
    while (dealerScore <= 16) {
        newCard = deck.shift();
        dealerCards.push(newCard);
        getScore();
        let computerHit = document.createElement("img");
        computerHit.src = `./cards/${newCard.rank}${newCard.suit}.svg`
        computerCardIMG.append(computerHit)
        // if (dealerScore <= 16) {
        //     newCard = deck.shift();
        //     dealerCards.push(newCard);
        //     getScore();
        //     scoreDisplay();
        //     computerCardsDisplay.append(` & ${newCard.rank} of ${newCard.suit}`)
        // }
    } 
    backCard.replaceWith(computerIMG)
    getScore();
    scoreDisplay();
    busted();
    gameWinner();
})

function gameOver(){
    hitButton.style.display = 'none'
    standButton.style.display = 'none'
    newGame.style.display ='inline'
    computerScore.style.display = 'inline';
    winnerText.style.display = 'inline';
}

// Check to see if user card is over 21
function busted(){
    if(userScore>21) {
        gameStarted = false;
        gameOver();
        winnerText.innerHTML = "Player Busted"
        winningWallet();
        backCard.replaceWith(computerIMG)
        return
    } else if(dealerScore>21) {
        gameStarted = false;
        playerWin = true;
        winningWallet();
        gameOver();
        winnerText.innerHTML = "Dealer Busted Player Wins"
        backCard.replaceWith(computerIMG)
        return
    }
    savage21();
}
// 21 check
function savage21(){
    if (userScore === 21) {
        gameStarted = false;
        playerWin = true;
        winningWallet();
        gameOver();
        winnerText.innerHTML = "Player Wins"
        backCard.replaceWith(computerIMG)
        return
    } else if (dealerScore === 21) {
        gameStarted = false;
        gameOver();
        winnerText.innerHTML = "Dealer Wins"
        winningWallet();
        backCard.replaceWith(computerIMG)
    }
}

// check for game winner
function gameWinner() {
    if (userScore>dealerScore) {
        gameOver();
        winnerText.innerHTML = "Player Wins"
        playerWin = true;
        winningWallet();
        } else if (userScore<dealerScore && gameStarted === true) {
            gameOver();
            winnerText.innerHTML = "Dealer Wins"
            winningWallet();
        } else if (userScore === dealerScore){
            gameOver();
            winnerText.innerHTML = "Tie"
            winningsWallet = wallet + betValue
    }
}

// wallet update
function winningWallet(){
    if(playerWin === true){
        let winnings = betAmount.value*2;
        winningsWallet = updatedWallet + winnings
        walletAmount.innerHTML = winningsWallet
        if(userScore === 21) {
            let winnings = betAmount.value*3;
        winningsWallet = updatedWallet + winnings
        walletAmount.innerHTML = winningsWallet
        }
    } else {
        winningsWallet = updatedWallet
        
    }
}
let winningsWallet;
// new Game
newGame.addEventListener('click', () =>{
    welcomeMessage.style.display = null;
    gameplay.style.display = 'none';
    gameStarted = false;
    deck = [];
    playerDealtCards = [];
    dealerCards = [];
    playerWin = false;
    dealerScore = 0;
    userScore = 0;
    updatedWallet = 0;
    betValue = 0;
    scoreValue = 0;
    playerHitCard.innerHTML = ''
    wallet = winningsWallet   
    walletAmount.innerHTML = `${wallet}`
    computerCardIMG.innerHTML = ''
    userCardIMG.innerHTML = ''
    computerCardsDisplay.innerHTML = ''
    winnerText.innerHTML = ''
})