import React from "react";
import { buildBoard } from "../business/Board";
import { transferToBoard } from "../business/Tetrominoes";
import BoardCell from "./BoardCell";
import "./Preview.css";





const HeldPreview = ({ heldTetromino }) => {



  if (!heldTetromino) {
    const emptyBoard = buildBoard({ rows: 5, columns: 5 });
   

    return (
      <div className="previewsContainer heldPreview">
        <h2>Hold</h2>
        <div className="previewsBox">
          <div className="previewBoard">
            {emptyBoard.rows.map((row, y) =>
              row.map((cell, x) => (
                <BoardCell key={x * emptyBoard.size.columns + x} cell={cell} />
              ))
            )}
          </div>
        </div>
        </div>
    );
  }

  const { shape, className } = heldTetromino;

  const board = buildBoard({ rows: 5, columns: 5 });

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape
  });


  return (
    
    <div className="previewsContainer heldPreview">
      <h2>Hold</h2>
      <div className="previewsBox">
        <div className="previewBoard">
          {board.rows.map((row, y) =>
            row.map((cell, x) => (
              <BoardCell key={x * board.size.columns + x} cell={cell} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};



export default HeldPreview;