import React from 'react';
import Square from '../classes/Square';
import SquareComponent from './SquareComponent';

interface BoardRowProps {
  squares: Square[];
}

export default function BoardRow({ squares }: BoardRowProps) {
  return (
    <div className="board-row">
      {squares.map((square, index) => (
        <SquareComponent 
          key={index}
          className={square.className}
          piece={square.piece}
          name={square.name}
        />
      ))}
    </div>
  )
}
