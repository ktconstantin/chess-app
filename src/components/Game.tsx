import React, { useState } from 'react';
import Board from '../classes/Board';
import BoardComponent from './BoardComponent';

const initialBoard = new Board();



export default function Game() {
  const [board, setBoard] = useState(initialBoard.squares);
  const [sideToMove, setSideToMove] = useState('white');

  console.log(board);

  function handleSquareClick(row: number, column: number) {
    console.log(`clicked on: ${board[row][column].name}`);
  }

  return (
    <div className="game">
      <BoardComponent 
        board={board}
        handleSquareClick={handleSquareClick}
      />
    </div>
  )
}
