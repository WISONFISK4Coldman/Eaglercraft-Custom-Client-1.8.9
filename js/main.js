// Main Application Entry Point

class EaglerCraftClient {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        console.log('%c=== Eaglercraft 1.8.9 Custom Client ===', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
        console.log('%cLoading configuration...', 'color: #4ade80;');
        
        // Load configuration
        loadConfig();
        
        // Initialize components
        console.log('%cInitializing FPS Booster...', 'color: #4ade80;');
        // fpsBooster already initialized
        
        console.log('%cInitializing Texture Pack Manager...', 'color: #4ade80;');
        // texturePackManager already initialized
        
        console.log('%cInitializing PvP Utilities...', 'color: #4ade80;');
        // pvpUtils already initialized
        
        console.log('%cInitializing Background Manager...', 'color: #4ade80;');
        // backgroundManager already initialized
        
        console.log('%cInitializing UI Handler...', 'color: #4ade80;');
        // uiHandler already initialized
        
        // Apply saved background
        if (CONFIG.background.type === 'image' && CONFIG.background.imageUrl) {
            backgroundManager.applyBackground(CONFIG.background);
        }
        
        // Activate saved texture pack
        if (CONFIG.texturePack.currentPack) {
            texturePackManager.activateTexturePack(CONFIG.texturePack.currentPack);
        }
        
        this.setupPerformanceMonitoring();
        this.initialized = true;
        
        console.log('%c✓ Client initialized successfully!', 'color: #4ade80; font-weight: bold;');
        console.log('%cVersion: 1.0.0 | Ready to play!', 'color: #4a90e2;');
    }

    setupPerformanceMonitoring() {
        // Monitor performance metrics
        if (window.performance && window.performance.memory) {
            setInterval(() => {
                const memUsage = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                console.log(`Memory Usage: ${memUsage} MB`);
            }, 5000);
        }
    }

    // Get client info
    getClientInfo() {
        return {
            name: 'Eaglercraft',
            version: '1.8.9',
            edition: 'Custom Client v1.0',
            features: [
                'Custom Buttons',
                'FPS Boosting',
                'Texture Pack Support',
                'Background Customization',
                'PvP Utilities',
            ],
        };
    }
}

// Initialize client when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.client = new EaglerCraftClient();
    });
} else {
    window.client = new EaglerCraftClient();
}

// Prevent accidental page exit
window.addEventListener('beforeunload', (e) => {
    // Uncomment to enable warning
    // e.preventDefault();
    // e.returnValue = '';
});