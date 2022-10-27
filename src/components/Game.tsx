import React, { useState } from 'react';
import Board from '../classes/Board';
import BoardComponent from './BoardComponent';

const initialBoard = new Board();

export default function Game() {
  const [board, setBoard] = useState(initialBoard.squares);

  console.log(board);

  return (
    <div className="game">
      <BoardComponent board={board} />
    </div>
  )
}
