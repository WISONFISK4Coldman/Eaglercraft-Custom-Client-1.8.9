// Main Game Initialization

window.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    loadConfig();
    backgroundManager = new BackgroundManager();
    texturePackManager = new TexturePackManager();
    pvpUtils = new PvPUtils();
    gameUI = new GameUIHandler();
    
    console.log('%c=== Eaglercraft 1.8.9 Full Game Client ===', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log('%c✓ Client initialized!', 'color: #4ade80;');
});

// Handle window resize
window.addEventListener('resize', () => {
    if (gameEngine) {
        gameEngine.width = window.innerWidth;
        gameEngine.height = window.innerHeight;
        gameEngine.canvas.width = gameEngine.width;
        gameEngine.canvas.height = gameEngine.height;
    }
});

// Handle full screen toggle
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    if (e.key === 'Escape') {
        if (gameEngine && gameEngine.running) {
            gameUI.pauseGame();
        }
    }
});