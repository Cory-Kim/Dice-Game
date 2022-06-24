// you
const $playerDice1          = $('#pDice1');
const $playerDice2          = $('#pDice2');
const $playerRoundScore     = $('#pRoundScore');
const $playerTotalScore     = $('#pTotalScore');

// opponent
const $opponentDice1        = $('#oDice1');
const $opponentDice2        = $('#oDice2');
const $opponentRoundScore   = $('#oRoundScore');
const $opponentTotalScore   = $('#oTotalScore');

// buttons
const $newGameButton        = $('#newGame');
const $rollDiceButton       = $('#rollDice');

// default photos and subtitles
$playerDice1.append(`<div><img id="player_3d_blackDice1" src="./images/3d_blackdice.jpg" width="40%" height="40%"></div>`);
$playerDice2.append(`<div><img id="player_3d_blackDice2" src="./images/3d_blackdice.jpg" width="40%" height="40%"></div>`);
$playerRoundScore.append(`<div>Score this <br> Round</div>`);
$playerTotalScore.append(`<div>Total <br> Score</div>`);

$opponentDice1.append(`<div style="margin-top: 10%"><img id="player_3d_redDice1" src="./images/3d_reddice.png" width="30%" height="30%"></div>`);
$opponentDice2.append(`<div style="margin-top: 10%"><img id="player_3d_redDice2" src="./images/3d_reddice.png" width="30%" height="30%"></div>`);
$opponentRoundScore.append(`<div>Score this <br> Round</div>`);
$opponentTotalScore.append(`<div>Total <br> Score</div>`);

class Dice
{
    constructor(number, color, diceNumber)
    {
        this.number     = number;
        this.color      = color;
        this.diceNumber = diceNumber;
    }

    // display random dice photo
    displayDice(place)
    {
        let output = place.html("");
        place.append(`<div>Dice #${this.diceNumber}</div>`);
        place.append(`<img src="./images/${this.color}dice_${randomNumber}.png" width="60" height="60" style="margin-top: 10%">`);
        return output;
    }

}

class Player extends Dice
{
    constructor(roundScore, totalScore)
    {
        super();
        this.roundScore = roundScore;
        this.totalScore = totalScore;
    }

    // display round score
    displayRoundScore(place)
    {
        let output = place.html("");
        place.append(`<div>Score this <br> Round</div>`);
        place.append(`<div class="score">${ this.roundScore }</div>`);
        return output;
    }

    // display total score
    displayTotalScore(place)
    {
        let output = place.html("");
        place.append(`<div>Total<br>Score</div>`);
        place.append(`<div class="score">${this.totalScore}</div>`);
    }

}

// get random dice number
function throwDice()
{
    rNumberOneToSix = Math.floor(Math.random() * 6) + 1;
    return rNumberOneToSix;
}

// adjust round score according to the game rule
function gameRule(num1, num2)
{
    let roundScore;

    if ((num1 == 1) || (num2 == 1)) {
        roundScore = 0;
    }

    else if (num1 == num2) {
        roundScore = (num1 + num2) * 2;
    }

    else {
        roundScore = num1 + num2;
    }

    return roundScore;
}

// display result message on the screen
function result(yourScore, opponentScore)
{
    if (yourScore > opponentScore) {
        console.log("you won");
        $("#myPopup, #xbutton").addClass('show');
        $('#myPopup').html(`You won! <br> Click 'New Game' to play new game. `);
    }

    else if (opponentScore > yourScore) {
        console.log("opponent won");
        $("#myPopup, #xbutton").addClass('show');
        $('#myPopup').html(`Opponent won! <br> Click 'New Game' to play new game.`);
    }

    else {
        console.log("Draw");
        $("#myPopup, #xbutton").addClass('show');
        $('#myPopup').html(`It's Draw! <br> Click 'New Game' to play new game.`);
    }
}

// random dice number variable
let randomNumber = throwDice();

// array for player's round scores
let playerRoundScores = [];

// array for opponent's round scores
let opponentRoundScores = [];

$rollDiceButton.click(function ()
{

    // show shaking dice animation
    $('img').addClass("shake");
    
    // after 2sec, display random dice photo
    setTimeout(function ()
    {
        $("#myPopup, #xbutton").removeClass('show');
        $('img').removeClass("shake");

        // player's first dice throw value
        let playerFirstThrow = randomNumber;
        
        // your dice #1
        const dice1 = new Dice(randomNumber,"black", 1);
        $playerDice1.append(dice1.displayDice($playerDice1));

        // your dice #2
        randomNumber = throwDice();
        const dice2 = new Dice(randomNumber, "black", 2);
        $playerDice2.append(dice2.displayDice($playerDice2));
        // player's second dice throw value
        let playerSecondThrow = randomNumber;

        // Player's score this round
        let playerRoundScore = gameRule(playerFirstThrow, playerSecondThrow);

        // push players' round scores to the array
        playerRoundScores.push(playerRoundScore);
        let playerTotalScore = 0;
        // Add players' round scores in the array
        for (let i = 0; i < playerRoundScores.length; i++){
            playerTotalScore += playerRoundScores[i];
        }

        // initiate player object
        const player1 = new Player(playerRoundScore, playerTotalScore);
        // attach round score
        $playerRoundScore.append(player1.displayRoundScore($playerRoundScore));
        // attach total score
        $playerTotalScore.append(player1.displayTotalScore($playerTotalScore));


        // opponent's dice #1
        randomNumber = throwDice();
        const dice3 = new Dice(randomNumber, "red", 1);
        $opponentDice1.append(dice3.displayDice($opponentDice1));
        // opponent's first dice throw value;
        let opponenetFirstThrow = randomNumber;

        // opponent's dice #2
        randomNumber = throwDice();
        const dice4 = new Dice(randomNumber, "red", 2);
        $opponentDice2.append(dice4.displayDice($opponentDice2));
        // opponent's second dice throw value;
        let opponenetSecondThrow = randomNumber;

        // Opponent's score this round
        let opponentRoundScore = gameRule(opponenetFirstThrow, opponenetSecondThrow);

        // push opponents' round scores to the array
        opponentRoundScores.push(opponentRoundScore);
        let opponentTotalScore = 0;
        // Add opponents' round scores in the array
         for (let i = 0; i < opponentRoundScores.length; i++){
             opponentTotalScore += opponentRoundScores[i];
         }

        // initiate player object
        const opponent1 = new Player(opponentRoundScore, opponentTotalScore);
        // attach round score
        $opponentRoundScore.append(opponent1.displayRoundScore($opponentRoundScore));
        // attach total score
        $opponentTotalScore.append(opponent1.displayTotalScore($opponentTotalScore));

        // if 3 rounds are played, results message will appear
        // using number of elements in the array to tell if 3 games are played or not.
        if (playerRoundScores.length == 3 && opponentRoundScores.length == 3) {
            result(playerTotalScore, opponentTotalScore); 
            // erase everyting in the arrays
            // reset array so next three rounds of games can be played.
            playerRoundScores   = [];
            opponentRoundScores = [];
        }

    }, 2000);
});

$newGameButton.click(function ()
{

    // click new button will remove result message
    $("#myPopup, #xbutton").removeClass('show');

    // erase everyting in the arrays
    playerRoundScores   = [];
    opponentRoundScores = [];

    // default photos and subtitles
    $playerDice1.html(`<div> Dice #1</div>`);
    $playerDice1.append(`<div><img id="player_3d_blackDice1" src="./images/3d_blackdice.jpg" width="40%" height="40%"></div>`);
    $playerDice2.html(`<div> Dice #2</div>`);
    $playerDice2.append(`<div><img id="player_3d_blackDice2" src="./images/3d_blackdice.jpg" width="40%" height="40%"></div>`);
    $playerRoundScore.html(`<div>Score this <br> Round</div>`);
    $playerTotalScore.html(`<div>Total <br> Score</div>`);

    $opponentDice1.html(`<div>Dice #1</div>`);
    $opponentDice1.append(`<div style="margin-top: 10%"><img id="player_3d_redDice1" src="./images/3d_reddice.png" width="30%" height="30%"></div>`);
    $opponentDice2.html(`<div>Dice #2</div>`);
    $opponentDice2.append(`<div style="margin-top: 10%"><img id="player_3d_redDice2" src="./images/3d_reddice.png" width="30%" height="30%"></div>`);
    $opponentRoundScore.html(`<div>Score this <br> Round</div>`);
    $opponentTotalScore.html(`<div>Total <br> Score</div>`);
});
        
// by clicking X button on the result message, the result message will disappear
$('#xbutton').click(function ()
{
    $("#myPopup, #xbutton").removeClass('show');
});

