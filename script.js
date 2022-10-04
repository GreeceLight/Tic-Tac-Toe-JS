const gameBoard = document.querySelector(".game");
const player1Val = document.querySelector(".player1Name")
const player2Val = document.querySelector(".player2Name")
const newGameButton = document.querySelector("#newGameButton")
const startGameButton = document.querySelector("#startGameButton")
const playerTurnText = document.querySelector("#playerTurnText");
const saveNamesCheck = document.querySelector("#saveNames");

function Block(element, number, play) {
    this.element = element;
    this.number = number;
    this.play = play;
}

function Player(name, sign) {
    this.name = name;
    this.sign = sign;
    this.introduce = function(){console.log(this.name, this.sign);}
}

const gameBoardProps = {
    //Sets up variables for tiles, players and the current playing player
    players : [],
    boardTiles : [],
    currentPlay : null,
}

function newGame() {
    gameBoardProps.players = [];
    gameBoardProps.boardTiles = [];
    gameBoardProps.currentPlay = null;
    while (gameBoard.hasChildNodes()){
        gameBoard.removeChild(gameBoard.firstChild)
    }
    if(!saveNamesCheck.checked){
        player1Val.value = ""
        player2Val.value = ""
    }
    playerTurnText.textContent = "Who's it Gonna Be?"
}

const setupGameBoard = () =>{
    if(gameBoardProps.boardTiles.length == 0){
        for(let tileNum = 1; tileNum <= 9; tileNum++){
            const newTile = document.createElement("li");
            const tile = new Block(newTile, tileNum, null);
            gameBoardProps.boardTiles.push(tile);

            newTile.addEventListener("click",(Event)=> changeSigns(tile))
            newTile.className = "gameBlock";
            gameBoard.appendChild(newTile)
        }
    }

    function changeSigns(clickedTile){
        if(clickedTile.element.textContent == ""){
            clickedTile.play = gameBoardProps.currentPlay;
            clickedTile.element.textContent = gameBoardProps.currentPlay;
            // console.log(clickedTile.play);
            determineTurn();
            findWinner();
        };
    }
    
    const makePlayers = (()=> {
        //Makes the players using Player obj and puts them into array
        let player1 = new Player(player1Val.value, "X");
        let player2 = new Player(player2Val.value, "O");
        gameBoardProps.players.push(player1);
        gameBoardProps.players.push(player2);
    })();
    determineTurn();
    function determineTurn(){
        
        //Player 1 needs to go first
        //Player 2 needs to go after
        //Determine who's turn it currently is and display at the bottom
        //Determine who's turn it is next and change the sign to that
        switch(gameBoardProps.currentPlay){
            case null:
                gameBoardProps.currentPlay = "X";
                playerTurnText.textContent = `It is ${gameBoardProps.players[0].name}'s turn`;
                break;
            case "X":
                gameBoardProps.currentPlay = "O";
                playerTurnText.textContent = `It is ${gameBoardProps.players[1].name}'s turn`;
                break;
            case "O":
                gameBoardProps.currentPlay = "X";
                playerTurnText.textContent = `It is ${gameBoardProps.players[0].name}'s turn`;
                break;
        }
    }
}

const findWinner = () =>{
    //Need to check each possible outcome for case that one player has won
    //loop through the array checking for every possible outcome
    leftToRight(gameBoardProps.boardTiles);
    topToBottom(gameBoardProps.boardTiles);
    crissCross(gameBoardProps.boardTiles);
    if(gameBoardProps.boardTiles.length != 0) allTiles();

    function leftToRight(tiles){
        //Checks all possible moves from left to right
        //Need to check 1,2,3 for X O
        //Need to check 4,5,6 for X O
        //Need to check 7,8,9 for X O
        checkTiles(tiles, 0, 1, 2);
        checkTiles(tiles, 3, 4, 5);
        checkTiles(tiles, 6, 7, 8);
    }
    function topToBottom(tiles){
        //Checks all possible moves from top to bottom
        //Need to check 1,4,7 for X O
        //Need to check 2,5,8 for X O
        //Need to check 3,6,9 for X O
        checkTiles(tiles, 0, 3, 6);
        checkTiles(tiles, 1, 4, 7);
        checkTiles(tiles, 2, 5, 8);
    }
    function crissCross(tiles){
        //Checks all possible moves from corners to corners
        //Need to check 1,5,9 for X O
        //Need to check 3,5,7 for X O
        checkTiles(tiles, 0, 4, 8);
        checkTiles(tiles, 2, 4, 6);
    }
    function allTiles(){
        //Checks if all tiles are filled
        let tiles = 0
        for(let i = 0; i < 9; i++){
            if(gameBoardProps.boardTiles[i].play){
                tiles++
                if(tiles == gameBoardProps.boardTiles.length){
                    alert("You filled all the tiles! Nobody won :(")
                    newGame();
                }
            }
        }
    }

    function checkTiles(tilesArray, first, second, third){
        if(tilesArray[first].play == "O" && tilesArray[second].play == "O" && tilesArray[third].play == "O"){
            alert(`${gameBoardProps.players[1].name} Won!`);
            newGame();
        }
        else if(tilesArray[first].play == "X" && tilesArray[second].play == "X" && tilesArray[third].play == "X"){
            alert(`${gameBoardProps.players[0].name} Won!`);
            newGame();
        }
    }
}

startGameButton.addEventListener("click",setupGameBoard);
newGameButton.addEventListener("click", newGame);