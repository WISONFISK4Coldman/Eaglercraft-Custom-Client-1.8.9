// Background Manager Module

class BackgroundManager {
    constructor() {
        this.backgroundContainer = document.getElementById('background-container');
        this.backgrounds = [];
        this.currentBackground = null;
        this.init();
    }

    init() {
        this.loadBackgrounds();
        this.applyBackground(CONFIG.background);
    }

    // Load saved backgrounds
    loadBackgrounds() {
        const saved = localStorage.getItem('backgrounds');
        if (saved) {
            try {
                this.backgrounds = JSON.parse(saved);
                console.log(`Loaded ${this.backgrounds.length} backgrounds`);
            } catch (e) {
                console.error('Failed to load backgrounds:', e);
            }
        }
    }

    // Apply background
    applyBackground(backgroundConfig) {
        const container = this.backgroundContainer;
        
        switch (backgroundConfig.type) {
            case 'image':
                if (backgroundConfig.imageUrl) {
                    container.style.backgroundImage = `url('${backgroundConfig.imageUrl}')`;
                    container.style.backgroundColor = 'transparent';
                }
                break;
            case 'color':
                container.style.backgroundColor = backgroundConfig.color;
                container.style.backgroundImage = 'none';
                break;
            case 'default':
            default:
                container.style.backgroundImage = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                container.style.backgroundColor = 'transparent';
        }

        // Apply filters
        let filterString = '';
        if (backgroundConfig.blur) {
            filterString += `blur(${backgroundConfig.blur * 10}px) `;
        }
        if (backgroundConfig.brightness) {
            filterString += `brightness(${backgroundConfig.brightness}) `;
        }
        container.style.filter = filterString.trim();

        this.currentBackground = backgroundConfig;
    }

    // Upload custom background
    uploadBackground(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const background = {
                    id: Date.now().toString(),
                    name: file.name,
                    data: e.target.result,
                    type: 'image',
                    timestamp: new Date().getTime(),
                };
                this.backgrounds.push(background);
                this.saveBackgrounds();
                resolve(background);
                console.log(`✓ Background "${background.name}" added`);
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }

    // Save backgrounds to localStorage
    saveBackgrounds() {
        localStorage.setItem('backgrounds', JSON.stringify(this.backgrounds));
    }

    // Remove background
    removeBackground(backgroundId) {
        this.backgrounds = this.backgrounds.filter(b => b.id !== backgroundId);
        this.saveBackgrounds();
        console.log(`✓ Background removed`);
    }

    // Apply uploaded background
    applyUploadedBackground(backgroundId) {
        const background = this.backgrounds.find(b => b.id === backgroundId);
        if (background) {
            const config = {
                type: 'image',
                imageUrl: background.data,
                blur: CONFIG.background.blur,
                brightness: CONFIG.background.brightness,
            };
            this.applyBackground(config);
            CONFIG.background = config;
            saveConfig();
            return true;
        }
        return false;
    }

    // Set background color
    setBackgroundColor(color) {
        const config = {
            type: 'color',
            color: color,
        };
        this.applyBackground(config);
        CONFIG.background = config;
        saveConfig();
    }

    // Set background blur
    setBackgroundBlur(blur) {
        CONFIG.background.blur = Math.max(0, Math.min(1, blur));
        this.applyBackground(CONFIG.background);
        saveConfig();
    }

    // Set background brightness
    setBackgroundBrightness(brightness) {
        CONFIG.background.brightness = Math.max(0, Math.min(1, brightness));
        this.applyBackground(CONFIG.background);
        saveConfig();
    }

    // Get all backgrounds
    getBackgrounds() {
        return this.backgrounds;
    }

    // Reset to default background
    resetToDefault() {
        const defaultConfig = {
            type: 'default',
            blur: 0.6,
            brightness: 0.6,
        };
        this.applyBackground(defaultConfig);
        CONFIG.background = defaultConfig;
        saveConfig();
    }
}

// Initialize Background Manager
const backgroundManager = new BackgroundManager();