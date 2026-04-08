const audioManager = (() => {
  let homeAudio = null;
  let gameAudio = null;
  let currentScreen = "none";

  const initHome = () => {
    if (!homeAudio) {
      homeAudio = new Audio("/home.mp3");
      homeAudio.volume = 0.3;
      homeAudio.loop = true;
      homeAudio.preload = "auto";
    }
    currentScreen = "home";
  };

  const initGame = () => {
    if (!gameAudio) {
      gameAudio = new Audio("/card-dealing.mp3");
      gameAudio.volume = 0.5;
      gameAudio.preload = "auto";
    }
  };

  const playHome = () => {
    initHome();
    if (gameAudio) gameAudio.pause();
    if (homeAudio.paused) {
      homeAudio.currentTime = 0;
      homeAudio.play().catch((e) => console.log("Home play failed:", e));
    }
  };

  const playGameSound = () => {
    initGame();
    if (homeAudio) homeAudio.pause();
    if (gameAudio) {
      gameAudio.currentTime = 0;
      gameAudio
        .play()
        .then(() => console.log("Game sound SUCCESS"))
        .catch((e) => console.log("Game sound failed:", e));
    }
  };

  const stopAll = () => {
    if (homeAudio) {
      homeAudio.pause();
      homeAudio.currentTime = 0;
    }
    if (gameAudio) {
      gameAudio.pause();
      gameAudio.currentTime = 0;
    }
  };

  return {
    initHome,
    initGame,
    playHome,
    playGameSound,
    stopAll,
  };
})();

export default audioManager;
