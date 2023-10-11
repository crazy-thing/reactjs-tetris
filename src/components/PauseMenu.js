import "./PauseMenu.css";

const PauseMenu = ({ onResume, focusClick, resumeClick }) => {
  return (
    <div className="pauseMenuContainer">
        <div className="pauseMenu" onClick={focusClick}>
            <h1>Paused</h1>
          {/* Maybe add later  <button className="pauseButton" onClick={resumeClick}> Resume </button> */}
            <h2 className="pauseHeaders"> Press <strong>P</strong> to resume </h2> 
            <h2 className="pauseHeaders"> Press <strong>Q</strong> to quit </h2>
        </div>
    </div>
  );
};

export default PauseMenu;