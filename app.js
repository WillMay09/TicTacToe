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
    
  
  let winner = false;
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

    
    playGame.updateTile(activePlayer, index);//updating tile with activePlayer(either X or O)
    
    
    playGame.printBoard();
    
    setWinner();
    switchTurns();
   
    //const updateLocation = writePlayerMove(currentPlayer, playerLocation);

  }

  const setWinner = () => {//checks for a winner, sets the variable to true if there is a winner

    if(playGame.checkwin(activePlayer) === true){
        winner = playGame.checkwin(activePlayer);
    };
    console.log(winner);


  }

  const getWinner = () => {//returns the winner variable

    
    return winner;
    

  }

 
 
    
return{


    getWinner,switchTurns, updateboard, getActivePlayer, getBoard : playGame.getBoard
}


}
function ScreenController(){
    const startGame = gameController();
    
    const tiles = document.querySelectorAll('.tile');
    const title = document.querySelector('.title');
    const headerElement = document.querySelector('header');
    tiles.forEach(tile =>{

        tile.addEventListener('click',(event)=>{

            const cell = event.target;//get clicked on cell
            const index = cell.getAttribute('data-index');//get index specific cell
            if(!cell.textContent){//if the cell is not filled
                
                cell.textContent = startGame.getActivePlayer();//update html for X or O in the tile clicked on
                startGame.updateboard(index);//update backend board
                displayWinner()//check for winner
                
                


                
            }
            

        })


    })

    const displayWinner = () =>{

        const playerWon = startGame.getWinner();
        console.log(`playerWon variable ${playerWon}`);
        if(playerWon === true){
            startGame.switchTurns();
            animateWinner(startGame.getActivePlayer());
        }


    }

    const animateWinner = (winner) =>{

        title.textContent = `${winner}'s wins!`;
        headerElement.classList.remove('animate');


       
            headerElement.classList.add('animate')
        



    };


    //startGame.playRound();



}

ScreenController();



