import React from 'react';
import Square from '../classes/Square';
import BoardRow from './BoardRow';

interface BoardComponentProps {
  board: Square[][];
}

export default function BoardComponent({ board }: BoardComponentProps) {
  return (
    <div className="board">
      {board.map((squares, index) => (
        <BoardRow
          key={index}
          squares={squares}
        />
      ))}
    </div>
  )
}
