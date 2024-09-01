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

    const updateTile = (activePlayer,playerLocation) =>{

        board[playerLocation.row][playerLocation.col].changeValue(activePlayer);



    }

    return{

        printBoard, updateTile


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

const playerTurn = () =>{
    let row;
    let col;
    document.addEventListener("keydown", (event)=>{

        switch(event.key){

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

             console.log("A key must be pressed")


        }

       

    });

    row = 0;
    col = 0;
    return{
        row,
        col
    };


}


const gameController = () => {

    const playGame = gameBoard();
    playGame.printBoard();
    
    
    
  

  const players = ["X", "O"];
  let activePlayer = players[0];

  const checkwin = () => {



  };

  const switchTurns = () => {



  }

  const updateboard = (activePlayer) => {

    const playerLocation =  playerTurn();

    console.log(playerLocation);
    playGame.updateTile(activePlayer, playerLocation);
    //const updateLocation = writePlayerMove(currentPlayer, playerLocation);


  }

 
  updateboard(activePlayer);
  playGame.printBoard();
    


 



    


}

gameController();


