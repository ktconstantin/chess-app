import React from 'react';
import Piece from '../classes/Piece';

interface SquareComponentProps {
  className: string;
  piece: Piece | null;
  name: string;
}

export default function SquareComponent({ className, piece, name }: SquareComponentProps) {

  return (
    <div className={className}>
      {name}
    </div>
  )
}
