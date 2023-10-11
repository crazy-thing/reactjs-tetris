

export const checkScores = () => {
    let stats = JSON.parse(localStorage.getItem("newStatsLocal"));
    let highScore = JSON.parse(localStorage.getItem("highScore"));

    if (highScore === null) {
        console.log("Setting Highscore...");
        localStorage.setItem("highScore", JSON.stringify(stats));
        highScore = JSON.parse(localStorage.getItem("highScore"));
    }

    if (stats.points > highScore.points) {
        localStorage.setItem("highScore", JSON.stringify(stats));
    }
};


