import {useState} from 'react';


function Square({value, onSquareClick}) {
  return (
  <button className="square" onClick={onSquareClick}>{value}</button>

  )
}




export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  {/** squares is the name of the array, and you use the setSquares to change the value of each index of the 
array */}

  const winners = calculateWinner(squares);
  let status;
  if (winners)
  {
    status = "Winner: " + winners;
  }
  else
  {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }


function handleClick(i)
{
    if (squares[i] || calculateWinner(squares))
    {
      return;
    }

    const nextSquare = squares.slice();
    /**
     * The reason why we create a copy of the array, edit it, then set the game board array equal to the copied
     * array is so that we have different states for each move that was made. By making this copy, we essentially
     * have a record of each move made.
     */
    if (xIsNext)
    nextSquare[i] = "X";
    else
    nextSquare[i] = "O";

    setSquares(nextSquare);
    setXIsNext(!xIsNext);
}

  return (
    <>

    {/** if you simply do onSquareClick = {handleClick(0)}, it will keep re-rendering itself because we
     * use setSqures in the handleClick function, which then re-renders the bord and re-calls handleClick again,
     * causing an infinite loop. Because we pass a value, it doesn't require a click to run, so to change that,
     * we can use an arrow function, which is a shorter way to define functions. When the square is clicked, 
     * the code after the => “arrow” will run, calling handleClick(0).
     */}

     <div className='status'>{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} onSquareClick = {() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick = {() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick = {() => handleClick(2)}/>
      </div>

      <div className="board-row">
        <Square value = {squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick = {() => handleClick(5)}/>
      </div>

      <div className="board-row">
        <Square value = {squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick = {() => handleClick(8)}/>
      </div>
    </>

  )
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}