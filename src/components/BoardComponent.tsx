import React from 'react';
import Square from '../classes/Square';
import BoardRow from './BoardRow';

interface BoardComponentProps {
  board: Square[][];
  handleSquareClick: Function;
}

export default function BoardComponent({ board, handleSquareClick }: BoardComponentProps) {
  return (
    <div className="board">
      {board.map((squares, index) => (
        <BoardRow
          key={index}
          squares={squares}
          handleSquareClick={handleSquareClick}
        />
      ))}
    </div>
  )
}
