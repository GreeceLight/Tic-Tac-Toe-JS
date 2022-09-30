const gameBoard = document.querySelector(".game");

const startGame = (() =>{
    let gameBlockArray = []
    let players = {}
    const setBoard = () => {
        for(let i = 1; i <= 9; i++){
         const gameBlock = document.createElement("li");
         gameBlock.className = "gameBlock";
         gameBlock.textContent = "X"
         gameBlock.addEventListener("click", settingBlockStates)
         //have a function that gives each li an event listener for a click to
         //change the current state of the block
         //must check on which player's turn it is to see if the block will have
         //X's or O's
         gameBoard.appendChild(gameBlock);
        }
    }

    const settingBlockStates = () =>{
        //putting the current states of each block into an object which will
        //then be put into the gameBlockArray array
    }
    return {setBoard};
})

startGame().setBoard();