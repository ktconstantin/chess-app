import React, { useState } from 'react';
import Board from '../classes/Board';
import Piece from '../classes/Piece';
import Square from '../classes/Square';
import BoardComponent from './BoardComponent';
import CapturedPieces from './CapturedPieces';

const initialBoard = new Board();
const initialLegalMoves: Square[] = [];
const initialPosition = {row: 99, column: 99}
//const initialCapturedPieces: Piece[] = [];
const initialCapturedPieces: {black: Piece[], white: Piece[]} = {black: [], white: []};
const initialPromotionOptions: Piece[] = [];

export default function Game() {
  const [board, setBoard] = useState(initialBoard.squares);
  const [sideToMove, setSideToMove] = useState('white');
  const [legalMoves, setLegalMoves] = useState(initialLegalMoves);
  const [lastPositionClicked, setLastPositionClicked] = useState(initialPosition);
  const [capturedPieces, setCapturedPieces] = useState(initialCapturedPieces);
  const [canPromote, setCanPromote] = useState(false);
  const [promotionPosition, setPromotionPosition] = useState(initialPosition);
  const [promotionOptions, setPromotionOptions] = useState(initialPromotionOptions);

  function changeSideToMove() {
    if (sideToMove === 'white') {
      setSideToMove('black');
    } else if (sideToMove === 'black') {
      setSideToMove('white');
    }
  }

  // function addCapturedPiece(piece: Piece) {
  //   //const newCapturedPieces = capturedPieces.slice();

  //   const newCapturedBlackPieces = capturedPieces.black.slice();
  //   const newCapturedWhitePieces = capturedPieces.white.slice();

  //   if (piece.color === 'black') {
  //     newCapturedBlackPieces.push(piece);
  //   } else if (piece.color === 'white') {
  //     newCapturedWhitePieces.push(piece);
  //   }

  //   setCapturedPieces({
  //     black: newCapturedBlackPieces,
  //     white: newCapturedWhitePieces,
  //   });

  //   // newCapturedPieces.push(piece);
  //   // setCapturedPieces(newCapturedPieces);
  // }

  function resetAllSquares() {
    const newBoard = board.slice();

    newBoard.forEach(row => {
      row.forEach(square => {
        square.resetDisplay();
      });
    });

    setBoard(newBoard);
  }

  // function handlePromotionSelect(value: string) {
  //   const [color, type] = [value.split(' ')[0], value.split(' ')[1]];
  //   const newCapturedPieces = Object.assign({}, capturedPieces);
  //   const newBoard = board.slice();

  //   let newPiece;

  //   if (color === 'black') {
  //     const indexToSplice = newCapturedPieces.black.findIndex(piece => piece.type === type);
  //     newPiece = newCapturedPieces.black.splice(indexToSplice, 1)[0];
  //   } else {
  //     const indexToSplice = newCapturedPieces.white.findIndex(piece => piece.type === type);
  //     newPiece = newCapturedPieces.black.splice(indexToSplice, 1)[0];
  //   }

  //   newBoard[promotionPosition.row][promotionPosition.column].setPiece(newPiece);
  //   setBoard(newBoard);
  //   setCapturedPieces(newCapturedPieces);
  //   setPromotionPosition(initialPosition);
  //   setCanPromote(false);
  // }

  function handleCapturedPieceClick(index: number, color: string, type: string) {
    const sideToPromote = board[promotionPosition.row][promotionPosition.column].piece?.color;

    if (!canPromote || sideToPromote !== color) {
      return;
    } else {
      const newBoard = board.slice();
      const newCapturedPieces = Object.assign({}, capturedPieces);

      let pieceToPlace;
      if (color === 'black') {
        pieceToPlace = newCapturedPieces.black[index];
      } else {
        pieceToPlace = newCapturedPieces.white[index];
      }

      newBoard[promotionPosition.row][promotionPosition.column].setPiece(pieceToPlace);

      setCanPromote(false);
      setPromotionPosition(initialPosition);
      setPromotionOptions(initialPromotionOptions);

      setBoard(newBoard);
      setCapturedPieces(newCapturedPieces);
    }
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

      if (piece.canPromote()) {
        // display menu to select captured piece to promote pawn to

      }

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
          const newCapturedPieces = Object.assign({}, capturedPieces);

          // capture piece => add to captured pieces
          const pieceToCapture = clickedSquare.piece;

          // is game over?
          if (pieceToCapture.type === 'king') {
            alert(`${sideToMove} wins!`);
          }

          pieceToCapture.setAsCaptured();

          if (pieceToCapture.color === 'black') {
            newCapturedPieces.black.push(pieceToCapture);
          } else {
            newCapturedPieces.white.push(pieceToCapture);
          }

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
    if (piece.hasMoved === false) piece.setHasMoved();
    newBoard[to.row][to.column].setPiece(piece);

    // check for pawn promotion
    if (piece.type === 'pawn') {
      if (
        (piece.color === 'black' && to.row === 7) || 
        (piece.color === 'white' && to.row === 0)) {
          
          //promote
          setCanPromote(true);
          setPromotionPosition({row: to.row, column: to.column});

          // let promotionOptions;

          // if (piece.color === 'black') {
          //   promotionOptions = capturedPieces.black;
          // } else {
          //   promotionOptions = capturedPieces.white;
          // }

          // setPromotionOptions(promotionOptions);
      }
    }

    setBoard(newBoard);
  }

  // function handleCapturedPieceClick(index: number, color: string, type: string) {
  //   if (!canPromote || sideToMove !== color) {
  //     return;
  //   } else {
  //     const newBoard = board.slice();
  //     const newCapturedPieces = Object.assign({}, capturedPieces);

  //     let targetPiece;

  //     if (color === 'black') {
  //       targetPiece = newCapturedPieces.black.splice(index, 1);
  //     } else if (color === 'white') {
  //       targetPiece = newCapturedPieces.white.splice(index, 1);
  //     }

  //     setCapturedPieces(newCapturedPieces);

  //     if (targetPiece) {
  //       const pieceToPlace = targetPiece[0];

  //       newBoard[promotionPosition.row][promotionPosition.column].setPiece(pieceToPlace);
        
  //       setPromotionPosition(initialPosition);
  //       setCapturedPieces(newCapturedPieces);
  //       setBoard(newBoard);
  //     }
  //   }
  // }

  return (
    <div className="game">
      <h2>{`${sideToMove[0].toUpperCase()}${sideToMove.slice(1)}'s turn`}</h2>
      <div className="board-container">
        <BoardComponent 
          board={board}
          handleSquareClick={handleSquareClick}
        />
        {/*capturedPieces.length > 0 && <CapturedPieces pieces={capturedPieces} />*/}
        <CapturedPieces 
          black={capturedPieces.black}
          white={capturedPieces.white}
          canPromote={canPromote}
          handleCapturedPieceClick={handleCapturedPieceClick}
        />
      </div>
    </div>
  )
}
