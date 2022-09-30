const gameBoard = document.querySelector(".game");
const player1Val = document.querySelector(".player1Name")
const player2Val = document.querySelector(".player2Name")
const startGameButton = document.querySelector("#startGameButton")

const newGame = (() =>{
    let gameBlockArray = [];
    players = playerCreator();

    
    function Block(newBlock, number) {
        this.elBlock = newBlock;
        this.number = number;
        this.sign = null;
    }
    
    const changeBlockStates = clickBlock => {
        clickBlock.elBlock.textContent = "Hi"
    }
    return{gameBlockArray, Block}
});

const setBoard = () => {
    console.log(newGame().gameBlockArray.length);
    if(newGame().gameBlockArray.length == 0){
        for(let i = 1; i <= 9; i++){
            const gameBlock = document.createElement("li");
            
            const block = new newGame.Block(gameBlock, i)
            gameBlockArray.push(block)
            gameBlock.addEventListener("click", (Event) => changeBlockStates(block))
            gameBlock.className = "gameBlock";
            gameBlock.textContent = "X"
            gameBoard.appendChild(gameBlock);
        }
    }else{}
    console.log(gameBlockArray.length);
}

const playerCreator = (() =>{
    player1 = {
        playerName : player1Val.value,
        playerSign : "X" 
    }
    player2 = {
        playerName : player2Val.value,
        playerSign : "O"
    }
    return playerArray = [player1, player2];
})

const beginGame = () => {
 setBoard();
};

startGameButton.addEventListener("click", beginGame)
