import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';
import Board from '../classes/Board';
import Square from '../classes/Square';
import BoardComponent from './BoardComponent';

const initialBoard = new Board();
const initialLegalMoves: Square[] = [];
const initialPosition = {row: 99, column: 99}

export default function Game() {
  const [board, setBoard] = useState(initialBoard.squares);
  const [sideToMove, setSideToMove] = useState('white');
  const [legalMoves, setLegalMoves] = useState(initialLegalMoves);
  const [lastPositionClicked, setLastPositionClicked] = useState(initialPosition);

  function handleSquareClick(row: number, column: number) {
    console.log(`clicked on: ${board[row][column].name}`);
    const clickedSquare: Square = board[row][column];

    if (clickedSquare.piece === null) {
      // empty square => move piece if legal
      if (legalMoves.includes(clickedSquare)) {
        // move piece
      }
    } else if (clickedSquare.piece) {

      // clicked on a piece
      const piece = clickedSquare.piece;

      if (piece.color === sideToMove) {
        // clicked your own piece => display legal moves if not already shown
        if (clickedSquare.row === lastPositionClicked.row && clickedSquare.column === lastPositionClicked.column) {
          console.log('repeat click');
          return; // repeat click on same piece
        } else {
          console.log('new piece');
          const moves = piece.getMoves(board);
          const newBoard = board.slice();

          newBoard.forEach(row => {
            row.forEach(square => {
              square.resetDisplay();
            });
          });

          moves.forEach(move => {
            newBoard[move.row][move.column].displayAsLegalMove();
          });

          setBoard(newBoard);
          setLegalMoves(moves);
        }
      } else {
        // clicked opponent's piece => capture if legal

      }
    }

    setLastPositionClicked({row, column});
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
