import "./Menu.css";
import "./GameStats.css";

const Menu = ({ onClick }) => {

  const newStats = JSON.parse(localStorage.getItem("newStatsLocal"));
  const highScore = JSON.parse(localStorage.getItem("highScore"));
  return (
  <div className="Menu">

    {newStats && (
      <ul className="GameStatsMenu">
      <h3>Previous Score:</h3>
        <li className="values">Level: {newStats.level}</li>
        <li className="values">Lines Completed: {newStats.linesCompleted}</li>
        <li className="values">Points: {newStats.points}</li>
    </ul> 
    )}
    {highScore && (
      <ul className="GameStatsMenu Highscore">
      <h3>High Score:</h3>
        <li className="values">Level: {highScore.level}</li>
        <li className="values">Lines Completed: {highScore.linesCompleted}</li>
        <li className="values">Points: {highScore.points}</li>
    </ul> 
    )}
    <button className="Button" onClick={onClick}>
      Play Tetris
    </button>
  </div>
  );
    };

export default Menu;