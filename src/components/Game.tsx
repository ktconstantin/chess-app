import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';
import Board from '../classes/Board';
import Piece from '../classes/Piece';
import Square from '../classes/Square';
import BoardComponent from './BoardComponent';

const initialBoard = new Board();
const initialLegalMoves: Square[] = [];
const initialPosition = {row: 99, column: 99}
const initialCapturedPieces: Piece[] = [];

export default function Game() {
  const [board, setBoard] = useState(initialBoard.squares);
  const [sideToMove, setSideToMove] = useState('white');
  const [legalMoves, setLegalMoves] = useState(initialLegalMoves);
  const [lastPositionClicked, setLastPositionClicked] = useState(initialPosition);
  const [capturedPieces, setCapturedPieces] = useState(initialCapturedPieces);

  function changeSideToMove() {
    if (sideToMove === 'white') {
      setSideToMove('black');
    } else if (sideToMove === 'black') {
      setSideToMove('white');
    }
  }

  function addCapturedPiece(piece: Piece) {
    const newCapturedPieces = capturedPieces.slice();
    newCapturedPieces.push(piece);
    setCapturedPieces(newCapturedPieces);
  }

  function removeCapturedPiece() {

  }

  function resetAllSquares() {
    const newBoard = board.slice();

    newBoard.forEach(row => {
      row.forEach(square => {
        square.resetDisplay();
      });
    });

    setBoard(newBoard);
  }

  function handleSquareClick(row: number, column: number) {
    console.log(`clicked on: ${board[row][column].name}`);
    const clickedSquare: Square = board[row][column];

    if (clickedSquare.piece === null) {
      // empty square => move piece if legal
      if (legalMoves.includes(clickedSquare)) {
        // move piece
        movePiece(
          {row: lastPositionClicked.row, column: lastPositionClicked.column}, 
          {row: clickedSquare.row, column: clickedSquare.column}
        );

        resetAllSquares();
        changeSideToMove();
        setLegalMoves(initialLegalMoves);
        setLastPositionClicked(initialPosition);
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

          resetAllSquares();

          moves.forEach(move => {
            newBoard[move.row][move.column].displayAsLegalMove();
          });

          setBoard(newBoard);
          setLegalMoves(moves);
        }
      } else {
        // clicked opponent's piece => capture if legal
        if (legalMoves.includes(clickedSquare)) {
          const newBoard = board.slice();
          const newCapturedPieces = capturedPieces.slice();

          // capture piece => add to captured pieces
          const pieceToCapture = clickedSquare.piece;
          newCapturedPieces.push(pieceToCapture);

          newBoard[clickedSquare.row][clickedSquare.column].removePiece();

          movePiece(
            {row: lastPositionClicked.row, column: lastPositionClicked.column}, 
            {row: clickedSquare.row, column: clickedSquare.column}
          );

          resetAllSquares();
          changeSideToMove();
          setLegalMoves(initialLegalMoves);
          setLastPositionClicked(initialPosition);

          setBoard(newBoard);
          setCapturedPieces(newCapturedPieces);
        }
      }
    }

    setLastPositionClicked({row, column});
  }

  function movePiece(from: {row: number, column: number}, to: {row: number, column: number}) {
    const newBoard = board.slice();

    const piece = newBoard[from.row][from.column].piece;
    if (piece === null) throw new Error('no piece to move');

    newBoard[from.row][from.column].removePiece();
    piece.setPosition({row: to.row, column: to.column});
    newBoard[to.row][to.column].setPiece(piece);

    setBoard(newBoard);
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
