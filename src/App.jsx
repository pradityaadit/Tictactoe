import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
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

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0); // Skor X
  const [oScore, setOScore] = useState(0); // Skor O

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    return () => {
      const nextSquares = squares.slice();

      nextSquares[i] = xIsNext ? "X" : "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    };
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    alert("Winner: " + winner);

    // Update skor jika ada pemenang
    if (winner === "X") {
      setXScore(xScore + 1); // Tambah skor X
    } else if (winner === "O") {
      setOScore(oScore + 1); // Tambah skor O
    }
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const resetScore = () => {
    setXScore(0);
    setOScore(0);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <>
      <h1>ADITT IMOET</h1>
      <div>{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={handleClick(0)} />
        <Square value={squares[1]} onSquareClick={handleClick(1)} />
        <Square value={squares[2]} onSquareClick={handleClick(2)} />
        <Square value={squares[3]} onSquareClick={handleClick(3)} />
        <Square value={squares[4]} onSquareClick={handleClick(4)} />
        <Square value={squares[5]} onSquareClick={handleClick(5)} />
        <Square value={squares[6]} onSquareClick={handleClick(6)} />
        <Square value={squares[7]} onSquareClick={handleClick(7)} />
        <Square value={squares[8]} onSquareClick={handleClick(8)} />
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={resetScore}>Reset Score</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        Skor X: {xScore} | Skor O: {oScore}
      </div>
    </>
  );
}
