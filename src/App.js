import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ isXNext, currentSquares, onPlay }) {
  function onSquareClick(i) {
    if (currentSquares[i] || checkWinner(currentSquares)) return;

    const nextSquares = currentSquares.slice();
    nextSquares[i] = isXNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = checkWinner(currentSquares);
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
        <Square
          value={currentSquares[0]}
          handleClick={() => onSquareClick(0)}
        />
        <Square
          value={currentSquares[1]}
          handleClick={() => onSquareClick(1)}
        />
        <Square
          value={currentSquares[2]}
          handleClick={() => onSquareClick(2)}
        />
      </div>

      <div className="board-row">
        <Square
          value={currentSquares[3]}
          handleClick={() => onSquareClick(3)}
        />
        <Square
          value={currentSquares[4]}
          handleClick={() => onSquareClick(4)}
        />
        <Square
          value={currentSquares[5]}
          handleClick={() => onSquareClick(5)}
        />
      </div>

      <div className="board-row">
        <Square
          value={currentSquares[6]}
          handleClick={() => onSquareClick(6)}
        />
        <Square
          value={currentSquares[7]}
          handleClick={() => onSquareClick(7)}
        />
        <Square
          value={currentSquares[8]}
          handleClick={() => onSquareClick(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove, setCurrMove] = useState(0);

  const isXNext = currMove % 2 === 0 ? true : false;
  const currentSquares = history[currMove];

  function handleGameOnClick(nextSquares) {
    const nextHistory = [...history.slice(0, currMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to Game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            isXNext={isXNext}
            currentSquares={currentSquares}
            onPlay={handleGameOnClick}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

// Function to Check Winner
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
