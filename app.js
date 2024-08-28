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

    return{

        printBoard


    }




}

const Cell = () => {
    let value ="1";
    const getValue = ()=>value;
    const changeValue =(player)=>{
        
        if(player === "X"){

            value == "X";
        }else{

            value == "O";
        }

    };

    return{

        changeValue, getValue

    }


}

const playGame = gameBoard();
playGame.printBoard();
