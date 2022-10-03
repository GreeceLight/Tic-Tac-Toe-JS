const gameBoard = document.querySelector(".game");
const player1Val = document.querySelector(".player1Name")
const player2Val = document.querySelector(".player2Name")
const newGameButton = document.querySelector("#newGameButton")
const startGameButton = document.querySelector("#startGameButton")
const playerTurnText = document.querySelector("#playerTurnText");

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
    player1Val.value = ""
    player2Val.value = ""
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
            clickedTile.sign = gameBoardProps.currentPlay;
            clickedTile.element.textContent = gameBoardProps.currentPlay;
            determineTurn();
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



startGameButton.addEventListener("click",setupGameBoard);
newGameButton.addEventListener("click", newGame);