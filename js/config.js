// Global configuration for Eaglercraft Custom Client

const CONFIG = {
    // FPS Optimization Settings
    fps: {
        targetFPS: 60,
        maxFPS: 120,
        minFPS: 30,
        enableVSync: true,
        renderDistance: 8,
        particleLevel: 1, // 0=minimal, 1=default, 2=all
        cloudQuality: 0, // 0=off, 1=fast, 2=fancy
        chunkUpdates: 3,
    },

    // Graphics Settings
    graphics: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        smoothLighting: true,
        fastGraphics: false,
        animatedTextures: true,
        entityShadows: true,
    },

    // PvP Utilities
    pvp: {
        hitboxDisplay: false,
        nametags: true,
        nametageDistance: 100,
        crosshairStyle: 'default', // default, dot, plus, custom
        crosshairColor: '#ffffff',
        crosshairSize: 1,
        showCPS: true,
        showArmorStatus: true,
        showTargetHealth: true,
        killEffects: true,
        snapLines: false,
    },

    // Background Settings
    background: {
        type: 'default', // default, image, color
        imageUrl: '',
        color: '#1a1a1a',
        blur: 0.6,
        brightness: 0.6,
        animated: false,
    },

    // Texture Pack Settings
    texturePack: {
        enabled: true,
        currentPack: 'default',
        packQuality: 'hd', // sd, hd, full
        animationSpeed: 1,
    },

    // UI Settings
    ui: {
        theme: 'dark',
        scale: 1,
        language: 'en',
    },
};

// Load configuration from localStorage
function loadConfig() {
    const saved = localStorage.getItem('eaglercraft_config');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            Object.assign(CONFIG, loaded);
            console.log('Configuration loaded from localStorage');
        } catch (e) {
            console.error('Failed to load configuration:', e);
        }
    }
}

// Save configuration to localStorage
function saveConfig() {
    localStorage.setItem('eaglercraft_config', JSON.stringify(CONFIG));
    console.log('Configuration saved to localStorage');
}

// Reset configuration to defaults
function resetConfig() {
    localStorage.removeItem('eaglercraft_config');
    location.reload();
}

// Initialize configuration on page load
loadConfig();