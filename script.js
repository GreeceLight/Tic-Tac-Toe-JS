const gameBoard = document.querySelector(".game");
const player1Val = document.querySelector(".player1Name")
const player2Val = document.querySelector(".player2Name")
const newGameButton = document.querySelector("#newGameButton")
const startGameButton = document.querySelector("#startGameButton")

const newGame = (() =>{
    let gameBlockArray = []
    const setBoard = () => {
        for(let i = 1; i <= 9; i++){
         const gameBlock = document.createElement("li");
         gameBlock.className = "gameBlock";
         gameBlock.textContent = "X"
         settingBlockStates(gameBlock, i);
         //have a function that gives each li an event listener for a click to
         //change the current state of the block
         //must check on which player's turn it is to see if the block will have
         //X's or O's
         gameBoard.appendChild(gameBlock);
        }
        console.log(gameBlockArray);
    }

    const settingBlockStates = (newBlock, number) =>{
        //putting the current states of each block into an object which will
        //then be put into the gameBlockArray array
        const block = {
            xBlock : newBlock,
            number : number,
            toPlayer : null
        }
        gameBlockArray.push(block);
        
    }
    return {setBoard};
});

const playerCreator = ((pName, pSign) =>{
    let player = {
        playerName : pName,
        playerSign : pSign
    }

    function introduce (){
        console.log(player.playerName, player.playerSign);
    }
    return {introduce, player}
})

const beginGame = () => {
    player1 =playerCreator(player1Val.value, "X");
    player2 =playerCreator(player2Val.value, "O");
};

newGameButton.addEventListener("click", (Event) => newGame().setBoard());
startGameButton.addEventListener("click", beginGame)