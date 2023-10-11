import "./Tetris.css";

import { useRef } from "react";

import Board from "../components/Board";
import GameController from "./GameController";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import HeldPreview from "./HeldPreview";
import TouchTest from "./TouchTest";

import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer} from "../hooks/usePlayer";
import { heldTetromino } from "../business/PlayerController";

const Tetris = ({rows, columns, setGameOver}) => {
    const inputRef = useRef(null);
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board] = useBoard({ 
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared
     });

    return (
        <div className="Tetris">
            <Board board={board} handleClick={() => inputRef.current.focus()} />
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
            <HeldPreview heldTetromino={heldTetromino} />
            <TouchTest />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setGameOver={setGameOver}
                setPlayer={setPlayer}
                inputRef={inputRef}
                console={console}
                />
        </div>
    )
};

export default Tetris;