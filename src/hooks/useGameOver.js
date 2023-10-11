import { useState, useCallback } from "react";

export const useGameOver = () => {
    const [gameOver, setGameOver] = useState(true);

    const resetGameover = useCallback(() => {
        setGameOver(false);

    }, []);

    return [gameOver, setGameOver, resetGameover]

};