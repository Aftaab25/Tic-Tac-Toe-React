import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function onSquareClick(i) {
    if (squares[i] || checkWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "X" : "O";

    setIsXNext(!isXNext);
    setSquares(nextSquares);
  }

  const winner = checkWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>

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

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
