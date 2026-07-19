// UI Handler Module

class UIHandler {
    constructor() {
        this.modal = document.getElementById('settings-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Settings Button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showGraphicsSettings();
        });

        // Texture Pack Button
        document.getElementById('texture-pack-btn').addEventListener('click', () => {
            this.showTexturePackSettings();
        });

        // PvP Utils Button
        document.getElementById('pvp-utils-btn').addEventListener('click', () => {
            this.showPvPSettings();
        });

        // Background Button
        document.getElementById('background-btn').addEventListener('click', () => {
            this.showBackgroundSettings();
        });

        // Game Buttons
        document.getElementById('single-player-btn').addEventListener('click', () => {
            alert('Singleplayer feature coming soon!');
        });

        document.getElementById('multi-player-btn').addEventListener('click', () => {
            alert('Multiplayer feature coming soon!');
        });

        document.getElementById('server-browser-btn').addEventListener('click', () => {
            alert('Server Browser feature coming soon!');
        });
    }

    // Show Graphics Settings
    showGraphicsSettings() {
        this.modalTitle.textContent = '⚙️ Graphics & FPS Settings';
        this.modalBody.innerHTML = `
            <div class="settings-row">
                <span class="settings-label">Fast Graphics</span>
                <div class="toggle-switch ${CONFIG.fps.fastGraphics ? 'enabled' : ''}" 
                     onclick="fpsBooster.${CONFIG.fps.fastGraphics ? 'disableFastGraphics' : 'enableFastGraphics'}(); uiHandler.showGraphicsSettings();"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Render Distance</span>
                <input type="range" min="4" max="16" value="${CONFIG.fps.renderDistance}" 
                       onchange="fpsBooster.setRenderDistance(this.value); this.nextElementSibling.textContent = this.value;" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 30px;">${CONFIG.fps.renderDistance}</span>
            </div>

            <div class="settings-row">
                <span class="settings-label">Target FPS</span>
                <input type="range" min="30" max="120" value="${CONFIG.fps.targetFPS}" 
                       onchange="fpsBooster.setTargetFPS(this.value); this.nextElementSibling.textContent = this.value;" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 40px;">${CONFIG.fps.targetFPS}</span>
            </div>

            <div class="settings-row">
                <span class="settings-label">Smooth Lighting</span>
                <div class="toggle-switch ${CONFIG.graphics.smoothLighting ? 'enabled' : ''}" 
                     onclick="CONFIG.graphics.smoothLighting = !CONFIG.graphics.smoothLighting; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Animated Textures</span>
                <div class="toggle-switch ${CONFIG.graphics.animatedTextures ? 'enabled' : ''}" 
                     onclick="CONFIG.graphics.animatedTextures = !CONFIG.graphics.animatedTextures; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Entity Shadows</span>
                <div class="toggle-switch ${CONFIG.graphics.entityShadows ? 'enabled' : ''}" 
                     onclick="CONFIG.graphics.entityShadows = !CONFIG.graphics.entityShadows; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Brightness</span>
                <input type="range" min="50" max="150" value="${CONFIG.graphics.brightness}" 
                       onchange="CONFIG.graphics.brightness = this.value; saveConfig(); this.nextElementSibling.textContent = this.value + '%';" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 50px;">${CONFIG.graphics.brightness}%</span>
            </div>
        `;
        this.openModal();
    }

    // Show Texture Pack Settings
    showTexturePackSettings() {
        this.modalTitle.textContent = '📦 Texture Packs';
        const packs = texturePackManager.getInstalledPacks();
        
        let html = `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #4a90e2; margin-bottom: 10px;">Upload Texture Pack</h3>
                <input type="file" id="texture-pack-upload" accept=".zip" style="margin-bottom: 10px;">
                <button onclick="uiHandler.handleTexturePackUpload()" class="main-button" style="width: 100%; padding: 10px;">Upload</button>
            </div>
            <hr style="border: 1px solid #4a90e2; margin: 20px 0;">
            <h3 style="color: #4a90e2; margin-bottom: 10px;">Installed Packs</h3>
        `;

        if (packs.length === 0) {
            html += '<p style="color: #aaa;">No texture packs installed yet.</p>';
        } else {
            packs.forEach(pack => {
                html += `
                    <div class="settings-row" style="padding: 15px; background: rgba(74, 144, 226, 0.1); margin: 10px 0; border-radius: 5px;">
                        <div style="flex: 1;">
                            <strong>${pack.name}</strong><br>
                            <small style="color: #888;">${texturePackManager.getPackSize(pack.id)} MB</small>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="texturePackManager.activateTexturePack('${pack.id}'); alert('Activated: ${pack.name}');" class="settings-button">Activate</button>
                            <button onclick="texturePackManager.removeTexturePack('${pack.id}'); uiHandler.showTexturePackSettings();" class="settings-button" style="color: #ef4444; border-color: #ef4444;">Remove</button>
                        </div>
                    </div>
                `;
            });
        }

        this.modalBody.innerHTML = html;
        this.openModal();
    }

    // Show PvP Settings
    showPvPSettings() {
        this.modalTitle.textContent = '⚔️ PvP Utilities';
        this.modalBody.innerHTML = `
            <div class="settings-row">
                <span class="settings-label">CPS Display</span>
                <div class="toggle-switch ${CONFIG.pvp.showCPS ? 'enabled' : ''}" 
                     onclick="pvpUtils.toggleCPSDisplay(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Show Armor Status</span>
                <div class="toggle-switch ${CONFIG.pvp.showArmorStatus ? 'enabled' : ''}" 
                     onclick="pvpUtils.toggleArmorStatus(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Show Target Health</span>
                <div class="toggle-switch ${CONFIG.pvp.showTargetHealth ? 'enabled' : ''}" 
                     onclick="pvpUtils.toggleTargetHealth(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Nametags</span>
                <div class="toggle-switch ${CONFIG.pvp.nametags ? 'enabled' : ''}" 
                     onclick="pvpUtils.toggleNametags(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Hitbox Display</span>
                <div class="toggle-switch ${CONFIG.pvp.hitboxDisplay ? 'enabled' : ''}" 
                     onclick="pvpUtils.toggleHitboxDisplay(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Kill Effects</span>
                <div class="toggle-switch ${CONFIG.pvp.killEffects ? 'enabled' : ''}" 
                     onclick="${CONFIG.pvp.killEffects ? 'pvpUtils.disableKillEffects' : 'pvpUtils.enableKillEffects'}(); this.classList.toggle('enabled');"></div>
            </div>

            <div class="settings-row">
                <span class="settings-label">Crosshair Style</span>
                <select onchange="pvpUtils.setCrosshairStyle(this.value);" style="flex: 1;">
                    <option value="default" ${CONFIG.pvp.crosshairStyle === 'default' ? 'selected' : ''}>Default</option>
                    <option value="dot" ${CONFIG.pvp.crosshairStyle === 'dot' ? 'selected' : ''}>Dot</option>
                    <option value="plus" ${CONFIG.pvp.crosshairStyle === 'plus' ? 'selected' : ''}>Plus</option>
                    <option value="custom" ${CONFIG.pvp.crosshairStyle === 'custom' ? 'selected' : ''}>Custom</option>
                </select>
            </div>

            <div class="settings-row">
                <span class="settings-label">Crosshair Color</span>
                <input type="color" value="${CONFIG.pvp.crosshairColor}" 
                       onchange="pvpUtils.setCrosshairColor(this.value);" style="width: 60px; cursor: pointer;">
            </div>

            <div class="settings-row">
                <span class="settings-label">Crosshair Size</span>
                <input type="range" min="0.5" max="2" step="0.1" value="${CONFIG.pvp.crosshairSize}" 
                       onchange="pvpUtils.setCrosshairSize(this.value); this.nextElementSibling.textContent = (this.value * 100).toFixed(0) + '%';" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 50px;">${(CONFIG.pvp.crosshairSize * 100).toFixed(0)}%</span>
            </div>
        `;
        this.openModal();
    }

    // Show Background Settings
    showBackgroundSettings() {
        this.modalTitle.textContent = '🖼️ Background Settings';
        const backgrounds = backgroundManager.getBackgrounds();
        
        let html = `
            <h3 style="color: #4a90e2; margin-bottom: 15px;">Background Type</h3>
            <div class="settings-row">
                <label style="display: flex; align-items: center; flex: 1;">
                    <input type="radio" name="bg-type" value="default" ${CONFIG.background.type === 'default' ? 'checked' : ''} 
                           onchange="CONFIG.background.type = 'default'; backgroundManager.applyBackground(CONFIG.background); saveConfig();" style="margin-right: 10px;">
                    Default Gradient
                </label>
            </div>
            <div class="settings-row">
                <label style="display: flex; align-items: center; flex: 1;">
                    <input type="radio" name="bg-type" value="color" ${CONFIG.background.type === 'color' ? 'checked' : ''} 
                           onchange="CONFIG.background.type = 'color'; backgroundManager.applyBackground(CONFIG.background); saveConfig();" style="margin-right: 10px;">
                    Solid Color
                </label>
                <input type="color" value="${CONFIG.background.color}" 
                       onchange="CONFIG.background.color = this.value; backgroundManager.setBackgroundColor(this.value);" style="width: 60px;">
            </div>

            <hr style="border: 1px solid #4a90e2; margin: 20px 0;">
            <h3 style="color: #4a90e2; margin-bottom: 10px;">Upload Custom Background</h3>
            <input type="file" id="background-upload" accept="image/*" style="margin-bottom: 10px;">
            <button onclick="uiHandler.handleBackgroundUpload()" class="main-button" style="width: 100%; padding: 10px;">Upload</button>

            <hr style="border: 1px solid #4a90e2; margin: 20px 0;">
            <h3 style="color: #4a90e2; margin-bottom: 10px;">Background Effects</h3>
            <div class="settings-row">
                <span class="settings-label">Blur</span>
                <input type="range" min="0" max="1" step="0.1" value="${CONFIG.background.blur}" 
                       onchange="backgroundManager.setBackgroundBlur(this.value); this.nextElementSibling.textContent = (this.value * 100).toFixed(0) + '%';" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 50px;">${(CONFIG.background.blur * 100).toFixed(0)}%</span>
            </div>
            <div class="settings-row">
                <span class="settings-label">Brightness</span>
                <input type="range" min="0" max="1" step="0.1" value="${CONFIG.background.brightness}" 
                       onchange="backgroundManager.setBackgroundBrightness(this.value); this.nextElementSibling.textContent = (this.value * 100).toFixed(0) + '%';" style="flex: 1;">
                <span style="margin-left: 10px; min-width: 50px;">${(CONFIG.background.brightness * 100).toFixed(0)}%</span>
            </div>

            <button onclick="backgroundManager.resetToDefault(); uiHandler.showBackgroundSettings();" class="main-button" style="width: 100%; margin-top: 15px;">
                Reset to Default
            </button>
        `;

        this.modalBody.innerHTML = html;
        this.openModal();
    }

    // Handle texture pack upload
    handleTexturePackUpload() {
        const input = document.getElementById('texture-pack-upload');
        if (input.files.length > 0) {
            texturePackManager.addTexturePack(input.files[0]).then(() => {
                this.showTexturePackSettings();
                alert('Texture pack uploaded successfully!');
            }).catch(err => {
                alert('Failed to upload texture pack: ' + err.message);
            });
        } else {
            alert('Please select a texture pack file.');
        }
    }

    // Handle background upload
    handleBackgroundUpload() {
        const input = document.getElementById('background-upload');
        if (input.files.length > 0) {
            backgroundManager.uploadBackground(input.files[0]).then(() => {
                this.showBackgroundSettings();
                alert('Background uploaded successfully!');
            }).catch(err => {
                alert('Failed to upload background: ' + err.message);
            });
        } else {
            alert('Please select an image file.');
        }
    }

    // Open modal
    openModal() {
        this.modal.classList.remove('hidden');
    }
}

// Close modal function
function closeModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('settings-modal');
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Initialize UI Handler
const uiHandler = new UIHandler();