//Tic tac toe game

const gameBoard = () =>{

    const rows = 3;

    const cols = 3;

    const board = [];

    //create 2d array for the gameboard
    for(let i =0; i<rows; i++){
        board[i] = [];
        for(let j =0; j<cols; j++){
            board[i].push(Cell());


        };

    };

    const printBoard = () =>{

        const boardWithVal = board.map((row)=>row.map((cell)=>cell.getValue()));
        console.log(boardWithVal);

    }

    //takes the index present on each html div and translates this number into a location on the 2d array
    const updateTile = (activePlayer,index) =>{

        const playerLocation = translateIndex(index) 

        board[playerLocation.row][playerLocation.col].changeValue(activePlayer);

       

    }
    

    const checkwin = (activePlayer) =>{

        //diagonal
        if((board[0][0].getValue() === activePlayer && board[1][1].getValue() === activePlayer && board[2][2].getValue() === activePlayer) || 
        (board[0][2].getValue() === activePlayer && board[1][1].getValue() === activePlayer && board[2][0].getValue() === activePlayer)){

            return true;
         //horizontal 
        }else if((board[0][0].getValue() === activePlayer && board[0][1].getValue() === activePlayer && board[0][2].getValue() === activePlayer) || 
        (board[1][0].getValue() === activePlayer && board[1][1].getValue() === activePlayer && board[1][2].getValue() === activePlayer) || 
        (board[2][0].getValue() === activePlayer && board[2][1].getValue() === activePlayer && board[2][2].getValue() === activePlayer) ){

                return true;
         //vertical
        }else if((board[0][0].getValue() === activePlayer && board[1][0].getValue() === activePlayer && board[2][0].getValue() === activePlayer) || 
        (board[0][1].getValue() === activePlayer && board[1][1].getValue() === activePlayer && board[2][1].getValue() === activePlayer)|| 
        (board[0][2].getValue() === activePlayer && board[1][2].getValue() === activePlayer && board[2][2].getValue() === activePlayer)){

            return true;

        }else{

            return false;
        }




    }
    //sets all values of the 2d array to 1
    const reset = () =>{

        board.map((row) =>{ row.map((cell) => {cell.changeValue("1")})});


    }

    

    return{

        printBoard, updateTile, checkwin, reset


    }




}

//each cell is contained within an index of the board 2d array
const Cell = () => {
    let value ="1";
    const getValue = ()=>value;
    const changeValue =(player)=>{
        
        value = player;

    };

    return{

        changeValue, getValue

    }


}

const translateIndex = (index) =>{
    let row;
    let col;

        switch(index){

            case '1':
                row = 0;
                col = 0;
                break;
            case '2':
                row = 0;
                col = 1;
                break;

            case '3':
                row = 0;
                col = 2;
                break;
                
            case '4':
                row = 1;
                col = 0;
                break;
                
            case '5':
                row = 1;
                col = 1;
                break;
            case '6':
                row = 1;
                col = 2;
                break;
                
            case '7':   
                row = 2;
                col = 0;
                break;
            case '8':
                row = 2;
                col = 1;
                break;
            case '9':
                row = 2;
                col = 2;
                break;
            default:

             console.log("A tile was not pressed")


        }

       
    return{
        row,
        col
    };


}


//controls flow of the game
const gameController = () => {

   
    const playGame = gameBoard();
    let winner = false;
    const players = ["X", "O"];
    let activePlayer = players[0];//X's always starts

 
    const getActivePlayer = () => activePlayer;


    const switchTurns = () => {

        if(activePlayer === players[0]){
            activePlayer = players[1];
            console.log("O's turn");
        }else{
            activePlayer = players[0];
            console.log("X's turn");
        }
    }
    //sets the winner back to false and calls the reset method
    const newGame = () =>{

            activePlayer = players[0];
            winner = false;
            playGame.reset();
    }

  //updates the cells in the 2d array with either X or O
  //calls setWinner to check if a player won and updates the players turn with switchTurns
    const updateboard = (index) => {

        playGame.updateTile(activePlayer, index);
        playGame.printBoard();
        setWinner();
        switchTurns();
        
    }
//checks for a winner, sets the variable to true if there is a winner
    const setWinner = () => {
        if(playGame.checkwin(activePlayer) === true){
            winner = playGame.checkwin(activePlayer);
        };
        //console.log(winner);

    }
//returns the winner variable
    const getWinner = () => {
        return winner;
    }

 
 
    
    return{


        getWinner,switchTurns, updateboard, getActivePlayer, newGame
    }


}

//connects the backend logic of the game to the UI
function ScreenController(){
    const startGame = gameController();
    const tiles = document.querySelectorAll('.tile');
    const title = document.querySelector('.title');
    const resetButton = document.querySelector('.reset');
    let activeGame = true;

    //event listener on each tile
    //when a tile is clicked, startGame object updates the backend logic writing X or O on the clicked tile
    //calls displayWinner to display the winner to the user if the winner variable returns true
    tiles.forEach(tile =>{

        tile.addEventListener('click',(event)=>{

            if(!activeGame) return;

            const cell = event.target;//get clicked on cell
            const index = cell.getAttribute('data-index');//get index specific cell
            if(!cell.textContent){//if the cell is not filled
                
                cell.textContent = startGame.getActivePlayer();//update html for X or O in the tile clicked on
                startGame.updateboard(index);//update backend board
                displayWinner()
            }
        })
    })

    //reset button calls resetGame
    resetButton.addEventListener('click', (event)=>{

            resetGame();

    });

/////////////////////Methods////////////////////////////////////

//grabs winner variable from startGame
//if the variable is true, stops the player from clicking on tiles and calls animateWinner
    const displayWinner = () =>{

        const playerWon = startGame.getWinner();
        console.log(`playerWon variable ${playerWon}`);
        if(playerWon === true){
            activeGame = false;
            startGame.switchTurns();
            animateWinner(startGame.getActivePlayer());
        }


    }
    //Changes the DOM to display the winner
    const animateWinner = (winner) =>{
        title.textContent = `${winner}'s wins!`;
       // headerElement.classList.remove('animate');
        // headerElement.classList.add('animate')

    };
    //resets the DOM tiles and backend logic using startGame.newGame()
    const resetGame = () =>{
        if(!activeGame){
            activeGame = true;
        }
        title.textContent = 'Welcome to TicTacToe';
        startGame.newGame();
        tiles.forEach(tile=>{

            tile.textContent = '';
        });

    };

}

ScreenController();



