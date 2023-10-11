import React from "react";
import Preview from "../components/Preview";

const Previews = ({ tetrominoes }) => {
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <div className="previewsContainer">
      <h2>Next</h2>
      <div className="previewsBox">
        {previewTetrominoes.map((tetromino, index) => (
          <Preview tetromino={tetromino} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Previews);