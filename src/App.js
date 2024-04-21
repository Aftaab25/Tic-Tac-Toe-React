import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function onSquareClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => onSquareClick(0)} />
        <Square value={squares[1]} handleClick={() => onSquareClick(1)} />
        <Square value={squares[2]} handleClick={() => onSquareClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} handleClick={() => onSquareClick(3)} />
        <Square value={squares[4]} handleClick={() => onSquareClick(4)} />
        <Square value={squares[5]} handleClick={() => onSquareClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} handleClick={() => onSquareClick(6)} />
        <Square value={squares[7]} handleClick={() => onSquareClick(7)} />
        <Square value={squares[8]} handleClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}
