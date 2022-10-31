import React, { useState } from 'react';
import Piece from '../classes/Piece';
import CapturedPiece from './CapturedPiece';

interface CapturedPiecesProps {
  black: Piece[],
  white: Piece[],
  canPromote: boolean,
  handleCapturedPieceClick: Function,
}

export default function CapturedPieces({ 
  black, 
  white, 
  canPromote, 
  handleCapturedPieceClick,
 }: CapturedPiecesProps) {
  // const blackPieces = pieces.filter(piece => piece.color === 'black');
  // const whitePieces = pieces.filter(piece => piece.color === 'white');

  return (
    <div className="captured-pieces">
      <div className="captured-pieces__subcontainer">
        <h4>Captured by Black:</h4>
        <div className="captured-pieces__pieces-display">
          {white.length > 0 && white.map((piece, index) => (
            <CapturedPiece 
              key={index}
              index={index}
              color={piece.color}
              type={piece.type}
              handleCapturedPieceClick={handleCapturedPieceClick}
            />
          ))}
        </div>
      </div>

      <div className="captured-pieces__subcontainer">
        {canPromote && (
          <div>Click on a piece to promote your pawn to</div>
        )}
      </div>

      <div className="captured-pieces__subcontainer">
        <h4>Captured by White:</h4>
        <div className="captured-pieces__pieces-display">
          {black.length > 0 && black.map((piece, index) => (
            <CapturedPiece 
              key={index}
              index={index}
              color={piece.color}
              type={piece.type}
              handleCapturedPieceClick={handleCapturedPieceClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
