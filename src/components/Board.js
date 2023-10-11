import "./Board.css";

import BoardCell from "../components/BoardCell";

const Board = ({ board, handleClick}) => {

    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

    return (
        <div className="Board" style={boardStyles} onClick={handleClick}>
            {board.rows.map((row, y) => 
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
        )}
        </div>
    );
};


export default Board;