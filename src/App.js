
import { useState } from "react"
import "./App.css"

function Square({ value, OnSquareClick }) { // функция 1 квадратик, внутри значение + функция при нажатии на квадратик 
  return (
    <button className="square" onClick={OnSquareClick} > {value}</button>
  )
}

export default function Board() {
  const [XisNext, SetXisNext] = useState(true)
  const [squares, Setsquares] = useState(Array(9).fill(null)) // создаем массив с 9 нулями - важно для опеределения победителя

  function HandleClick(i) {
    if ((squares[i]) || Winner(squares)) {
      // если уже что-то есть - скип и если уже победа - скип 
      return;
    }
    const NextSquares = squares.slice() // делаем копию массива (неизменяемость важно!)
    if (XisNext) { // если х следующтий то х
      NextSquares[i] = "X"
    }
    else {
      NextSquares[i] = "O" // если нет то ну нет
    }
    Setsquares(NextSquares) // обновляем массив 
    SetXisNext(!XisNext) // обновляем очередность 
  }
  const winner = Winner(squares); // упрощаем
  let status;
  if (winner) { // если победа то
    status = "Winner is " + (winner) // присваиваем победителя автомат
  } else { // иначе
    status = "Next move: " + (XisNext ? "X" : "O") // проверяем по функции - следующий х? если да,то х, иначе о
  }
  return (/*тут и ниже - обозначаеи номер квадрата, затем при нажатии на него, обновляем ранее созданный массив значением этого квадрата */
    <>
      <div className="status_game">{status}</div>
      <div className="game">
        <div className="board_row">
          <Square value={squares[0]} OnSquareClick={() => HandleClick(0)} />
          <Square value={squares[1]} OnSquareClick={() => HandleClick(1)} />
          <Square value={squares[2]} OnSquareClick={() => HandleClick(2)} />
        </div>
        <div className="board_row">
          <Square value={squares[3]} OnSquareClick={() => HandleClick(3)} />
          <Square value={squares[4]} OnSquareClick={() => HandleClick(4)} />
          <Square value={squares[5]} OnSquareClick={() => HandleClick(5)} />
        </div>
        <div className="board_row">
          <Square value={squares[6]} OnSquareClick={() => HandleClick(6)} />
          <Square value={squares[7]} OnSquareClick={() => HandleClick(7)} />
          <Square value={squares[8]} OnSquareClick={() => HandleClick(8)} /></div>
      </div>
    </>)
}
function Winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 4, 6],
    [2, 5, 8]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return (squares[a])
  }
}