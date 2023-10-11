import Menu from "../components/Menu";
import Tetris from "../components/Tetris";

import { useGameOver } from "../hooks/useGameOver";


const Game = ({ rows, columns }) => {
    const [gameOver, setGameOver, resetGameover] = useGameOver();
    const start = () => {
        resetGameover();
    };

    return (
    <div className="Game">
        {gameOver ? (
            <Menu onClick={start}/> 
        ) : (
            <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
        )}
    </div>
    );
};
export default Game;