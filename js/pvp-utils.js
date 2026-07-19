// PvP Utilities Module

class PvPUtils {
    constructor() {
        this.cps = 0;
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.armorStatus = {
            helmet: 100,
            chestplate: 100,
            leggings: 100,
            boots: 100,
        };
        this.targetHealth = 20;
        this.init();
    }

    init() {
        this.setupClickListener();
        this.setupKeybinds();
    }

    // Setup click listener for CPS counter
    setupClickListener() {
        document.addEventListener('mousedown', () => {
            const now = Date.now();
            if (now - this.lastClickTime < 1000) {
                this.clickCount++;
            } else {
                this.clickCount = 1;
            }
            this.lastClickTime = now;
            this.cps = this.clickCount;
        });
    }

    // Setup keybinds
    setupKeybinds() {
        document.addEventListener('keydown', (e) => {
            // Example: Press 'H' to toggle hitbox display
            if (e.key.toLowerCase() === 'h') {
                this.toggleHitboxDisplay();
            }
            // Press 'K' to toggle CPS display
            if (e.key.toLowerCase() === 'k') {
                this.toggleCPSDisplay();
            }
        });
    }

    // Toggle hitbox display
    toggleHitboxDisplay() {
        CONFIG.pvp.hitboxDisplay = !CONFIG.pvp.hitboxDisplay;
        console.log(`Hitbox Display: ${CONFIG.pvp.hitboxDisplay ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Toggle CPS display
    toggleCPSDisplay() {
        CONFIG.pvp.showCPS = !CONFIG.pvp.showCPS;
        console.log(`CPS Display: ${CONFIG.pvp.showCPS ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Toggle nametags
    toggleNametags() {
        CONFIG.pvp.nametags = !CONFIG.pvp.nametags;
        console.log(`Nametags: ${CONFIG.pvp.nametags ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Toggle armor status display
    toggleArmorStatus() {
        CONFIG.pvp.showArmorStatus = !CONFIG.pvp.showArmorStatus;
        console.log(`Armor Status: ${CONFIG.pvp.showArmorStatus ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Toggle target health display
    toggleTargetHealth() {
        CONFIG.pvp.showTargetHealth = !CONFIG.pvp.showTargetHealth;
        console.log(`Target Health: ${CONFIG.pvp.showTargetHealth ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Set crosshair style
    setCrosshairStyle(style) {
        CONFIG.pvp.crosshairStyle = style;
        console.log(`Crosshair Style: ${style}`);
        this.renderCrosshair();
        saveConfig();
    }

    // Set crosshair color
    setCrosshairColor(color) {
        CONFIG.pvp.crosshairColor = color;
        console.log(`Crosshair Color: ${color}`);
        this.renderCrosshair();
        saveConfig();
    }

    // Set crosshair size
    setCrosshairSize(size) {
        CONFIG.pvp.crosshairSize = Math.max(0.5, Math.min(2, size));
        console.log(`Crosshair Size: ${CONFIG.pvp.crosshairSize}`);
        this.renderCrosshair();
        saveConfig();
    }

    // Render crosshair
    renderCrosshair() {
        // This would render the custom crosshair in the game
        // For now, we log the settings
        console.log(`Rendering crosshair: ${CONFIG.pvp.crosshairStyle}`);
    }

    // Get current CPS
    getCPS() {
        return this.cps;
    }

    // Update armor status
    setArmorStatus(piece, durability) {
        if (this.armorStatus.hasOwnProperty(piece)) {
            this.armorStatus[piece] = Math.max(0, Math.min(100, durability));
        }
    }

    // Update target health
    setTargetHealth(health) {
        this.targetHealth = Math.max(0, Math.min(20, health));
    }

    // Enable kill effects
    enableKillEffects() {
        CONFIG.pvp.killEffects = true;
        saveConfig();
    }

    // Disable kill effects
    disableKillEffects() {
        CONFIG.pvp.killEffects = false;
        saveConfig();
    }

    // Toggle snap lines (shows lines to enemies)
    toggleSnapLines() {
        CONFIG.pvp.snapLines = !CONFIG.pvp.snapLines;
        console.log(`Snap Lines: ${CONFIG.pvp.snapLines ? 'ON' : 'OFF'}`);
        saveConfig();
    }

    // Get armor status
    getArmorStatus() {
        return this.armorStatus;
    }

    // Get target health
    getTargetHealth() {
        return this.targetHealth;
    }
}

// Initialize PvP Utils
const pvpUtils = new PvPUtils();