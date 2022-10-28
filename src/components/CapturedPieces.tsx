import React from 'react';
import Piece from '../classes/Piece';
import CapturedPiece from './CapturedPiece';

interface CapturedPiecesProps {
  pieces: Piece[];
}

export default function CapturedPieces({ pieces }: CapturedPiecesProps) {
  const blackPieces = pieces.filter(piece => piece.color === 'black');
  const whitePieces = pieces.filter(piece => piece.color === 'white');

  return (
    <div className="captured-pieces">
      <div className="captured-pieces__subcontainer">
        <h4>Captured by Black:</h4>
        <div className="captured-pieces__pieces-display">
          {whitePieces.length > 0 && whitePieces.map((piece, index) => (
            <CapturedPiece 
              key={index}
              color={piece.color}
              type={piece.type}
            />
          ))}
        </div>
      </div>

      <div className="captured-pieces__subcontainer">
        <h4>Captured by White:</h4>
        <div className="captured-pieces__pieces-display">
          {blackPieces.length > 0 && blackPieces.map((piece, index) => (
            <CapturedPiece 
              key={index}
              color={piece.color}
              type={piece.type}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
