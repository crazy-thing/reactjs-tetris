import "./GameController.css";

import PauseMenu from "./PauseMenu";

import { Action, actionForKey, actionIsDrop } from "../business/Input";
import { playerController, getIsGameOver, resetHeldTetromino } from "../business/PlayerController";
import { checkScores } from "../business/Highscore";


import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";
import { usePause } from "../hooks/usePause";






const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  inputRef
}) => {
  const [isPaused, setIsPaused] = usePause();
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
      isPaused
    });
  };

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
   
    if (action === Action.Pause) {
      if (isPaused) {
        hidePauseMenu();
      } else {
        if (dropTime) {
          console.log("paused");
          pauseDropTime();
          setIsPaused(true);
        }
      }
  } else if (action === Action.Quit) {
      const newStats = gameStats; 
      localStorage.setItem("newStatsLocal", JSON.stringify(newStats));
      setGameOver(true);
      checkScores();
      resetHeldTetromino();
  } else {
      if (actionIsDrop(action)) pauseDropTime();
        handleInput({ action });
    }
  };
  
  const isGameOver = getIsGameOver();
  if (isGameOver) {
    const newStats = gameStats;
    localStorage.setItem("newStatsLocal", JSON.stringify(newStats));
    resetHeldTetromino();
    checkScores();
  };

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const hidePauseMenu = () => {
    console.log("unpaused");
    setIsPaused(false);
    resumeDropTime();
  };

  const reFocus = () => {
    const gameCon = document.querySelector(".GameController");
    gameCon.focus();
  }

  return (
    <div>
      {isPaused && ( <PauseMenu focusClick={reFocus}  resumeClick={hidePauseMenu}    />)}
      <input
        className="GameController"
        type="text"
        ref={inputRef}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        autoFocus
      />
    </div>
  );
};

export default GameController;