// Texture Pack Manager Module

class TexturePackManager {
    constructor() {
        this.packs = {};
        this.currentPack = null;
        this.loadedPacks = [];
        this.init();
    }

    init() {
        this.loadInstalledPacks();
    }

    // Load installed texture packs from localStorage
    loadInstalledPacks() {
        const saved = localStorage.getItem('texture_packs');
        if (saved) {
            try {
                this.loadedPacks = JSON.parse(saved);
                console.log(`Loaded ${this.loadedPacks.length} texture packs`);
            } catch (e) {
                console.error('Failed to load texture packs:', e);
            }
        }
    }

    // Add new texture pack
    addTexturePack(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const pack = {
                    id: Date.now().toString(),
                    name: file.name.replace('.zip', ''),
                    size: file.size,
                    data: e.target.result,
                    timestamp: new Date().getTime(),
                };
                this.loadedPacks.push(pack);
                this.savePacks();
                resolve(pack);
                console.log(`✓ Texture pack "${pack.name}" added`);
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }

    // Remove texture pack
    removeTexturePack(packId) {
        this.loadedPacks = this.loadedPacks.filter(p => p.id !== packId);
        this.savePacks();
        console.log(`✓ Texture pack removed`);
    }

    // Activate texture pack
    activateTexturePack(packId) {
        const pack = this.loadedPacks.find(p => p.id === packId);
        if (pack) {
            this.currentPack = pack;
            CONFIG.texturePack.currentPack = packId;
            saveConfig();
            console.log(`✓ Activated texture pack: ${pack.name}`);
            this.applyTextures(pack);
            return true;
        }
        return false;
    }

    // Apply textures from pack
    applyTextures(pack) {
        // This would interface with the actual game engine
        // For now, we'll log the action
        console.log(`Applying textures from: ${pack.name}`);
    }

    // Save packs to localStorage
    savePacks() {
        localStorage.setItem('texture_packs', JSON.stringify(this.loadedPacks));
    }

    // Get all installed packs
    getInstalledPacks() {
        return this.loadedPacks;
    }

    // Get current active pack
    getCurrentPack() {
        return this.currentPack;
    }

    // Get pack info
    getPackInfo(packId) {
        return this.loadedPacks.find(p => p.id === packId);
    }

    // Download texture pack (simulate)
    async downloadTexturePack(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], 'downloaded-pack.zip', { type: 'application/zip' });
            return this.addTexturePack(file);
        } catch (e) {
            console.error('Failed to download texture pack:', e);
            return null;
        }
    }

    // Get pack size in MB
    getPackSize(packId) {
        const pack = this.getPackInfo(packId);
        if (pack) {
            return (pack.size / (1024 * 1024)).toFixed(2);
        }
        return '0';
    }
}

// Initialize Texture Pack Manager
const texturePackManager = new TexturePackManager();