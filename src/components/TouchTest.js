import React, { useState } from 'react';
import "./Tetris.css"

const TouchTest = () => {
  const [tetrominoPosition, setTetrominoPosition] = useState({ x: 0, y: 0 });
  const [dragStartPosition, setDragStartPosition] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];
    setDragStartPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    if (!dragStartPosition) return;

    const touch = event.changedTouches[0];
    const dragDistanceX = touch.clientX - dragStartPosition.x;
    const dragDistanceY = touch.clientY - dragStartPosition.y;

    if (Math.abs(dragDistanceX) > Math.abs(dragDistanceY)) {
      // Horizontal movement
      const newX = tetrominoPosition.x + dragDistanceX;
      console.log("test:", newX);
    }

    setDragStartPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setDragStartPosition(null);
  };

  return (
    <div className='test'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Render your Tetris game component here */}
    </div>
  );
};

export default TouchTest;