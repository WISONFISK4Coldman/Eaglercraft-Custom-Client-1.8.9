// Update game-main.js with mobile support
// Add this code to js/game-main.js after the existing code

window.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    loadConfig();
    backgroundManager = new BackgroundManager();
    texturePackManager = new TexturePackManager();
    pvpUtils = new PvPUtils();
    gameUI = new GameUIHandler();
    
    // Initialize mobile controls if on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        mobileControls = new MobileControls();
        // Load mobile styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/mobile-styles.css';
        document.head.appendChild(link);
    }
    
    console.log('%c=== Eaglercraft 1.8.9 Full Game Client ===', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log('%c✓ Client initialized!', 'color: #4ade80;');
    if (isMobile) {
        console.log('%c✓ Mobile controls activated!', 'color: #4ade80;');
    }
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

// Update HUD every frame
let lastHUDUpdate = 0;
const hudUpdateInterval = setInterval(() => {
    if (hudSystem && gameEngine && gameEngine.running) {
        hudSystem.updateHealth(gameEngine.player.health);
        hudSystem.updateArmorStatus(100, 100, 100, 100);
        
        if (mobileControls) {
            mobileControls.updateHUD(hudSystem.fps, gameEngine.player.health, hudSystem.cps);
        }
    }
}, 100);

// Auto show mobile controls when game starts
const originalStartGame = gameUI ? gameUI.startGame : null;
if (gameUI && originalStartGame) {
    gameUI.startGame = function() {
        originalStartGame.call(this);
        if (mobileControls && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileControls.show();
        }
    };
}

// Hide mobile controls when game ends
const originalExitGame = gameUI ? gameUI.exitGame : null;
if (gameUI && originalExitGame) {
    gameUI.exitGame = function() {
        originalExitGame.call(this);
        if (mobileControls) {
            mobileControls.hide();
        }
    };
}