import React from 'react';
import Square from '../classes/Square';
import SquareComponent from './SquareComponent';

interface BoardRowProps {
  squares: Square[];
  handleSquareClick: Function;
}

export default function BoardRow({ squares, handleSquareClick }: BoardRowProps) {
  return (
    <div className="board-row">
      {squares.map((square, index) => (
        <SquareComponent 
          key={index}
          row={square.row}
          column={square.column}
          className={square.className}
          piece={square.piece}
          name={square.name}
          handleSquareClick={handleSquareClick}
        />
      ))}
    </div>
  )
}
