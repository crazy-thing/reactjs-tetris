import { hasCollision, isWithinBoard } from "./Board";
import { Action } from "./Input";
import { rotate, randomTetromino } from "./Tetrominoes";


let heldTetromino = null;

const attemptRotation = ({ board, player, setPlayer, isPaused }) => {

  if (isPaused) {
    return;
  }

  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });
  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape
      }
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

let isGameOver = false;

export const getIsGameOver = () => {
  return isGameOver;
};

export const attemptMovement = ({
  board,
  action,
  player,
  setPlayer,
  setGameOver,
  isPaused
}) => {

  if (isPaused) {
    return;
  }

  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
    delta.row += 1;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board
  });

  isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setTimeout(() => {
      setGameOver(isGameOver);
    }, 100);
  }

if (action === Action.Hold) {
  if (!player.holdUsed && !player.holdRequested) {
    if (!heldTetromino) {
      heldTetromino = player.tetromino;
      setPlayer({
        ...player,
        tetromino: randomTetromino(),
        holdRequested: true,
        holdUsed: true
      });
    } else {
      const temp = heldTetromino;
      heldTetromino = player.tetromino;
      const isValidPosition = isWithinBoard({
        board,
        position: nextPosition,
        shape: temp.shape
      });
      if (isValidPosition) {
        setPlayer({
          ...player,
          tetromino: temp,
          position: nextPosition,
          holdRequested: true,
          holdUsed: true
        });
      } else {
        console.log("Can't hold here!");
        heldTetromino = temp;
      }
    }
  } else {
    console.log("Hold already used in this round!");

  }
} else {
  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
    holdRequested: false,
    holdUsed: player.holdUsed || player.holdRequested 
  });
}

return { heldTetromino };
};


export {heldTetromino};

export const resetHeldTetromino = () => {
  heldTetromino = null;
}

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
  isPaused
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer, isPaused });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver, isPaused });
  }
};
