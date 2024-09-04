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

    const updateTile = (activePlayer,index) =>{

        const playerLocation = translateIndex(index) 

        board[playerLocation.row][playerLocation.col].changeValue(activePlayer);



    }
    const getBoard = () => board;

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

    const reset = () =>{

        board.map((row) =>{ row.map((cell) => {cell.changeValue("1")})});


    }

    

    return{

        printBoard, updateTile, checkwin, reset


    }




}

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



const gameController = () => {

   
    const playGame = gameBoard();
    
  

  const players = ["X", "O"];

  let activePlayer = players[0];

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

  const newGame = () =>{

        activePlayer = players[0];
        playGame.reset();
  }

  const updateboard = (index) => {

    //const playerLocation =  playerTurn();

    //console.log(playerLocation);
    //for testing
    playGame.updateTile(activePlayer, index);
    playGame.printBoard();
    switchTurns();
   
    //const updateLocation = writePlayerMove(currentPlayer, playerLocation);


  }

  const playRound = () => {

    
    return playGame.checkwin(activePlayer);
    

  }

 
 
    
return{


    playRound, updateboard, getActivePlayer, getBoard : playGame.getBoard
}


}
function ScreenController(){
    const startGame = gameController();
    const gameBoard = document.querySelector('.gameBoard');
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile =>{

        tile.addEventListener('click',(event)=>{

            const cell = event.target;
            const index = cell.getAttribute('data-index');
            if(!cell.textContent){

                cell.textContent = startGame.getActivePlayer();
                startGame.updateboard(index);
                displayWinner()
                


                
            }
            

        })


    })

    const displayWinner = () =>{

        const playerWon = startGame.playRound();

        if(playerWon){

            console.log(`Player ${startGame.getActivePlayer()}'s won`);
        }


    }


    //startGame.playRound();



}

ScreenController();



