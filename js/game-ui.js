// Game UI Handler

class GameUIHandler {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Main Menu
        document.getElementById('play-btn').addEventListener('click', () => this.showWorldMenu());
        document.getElementById('texture-pack-btn').addEventListener('click', () => this.showTexturePackSettings());
        document.getElementById('pvp-settings-btn').addEventListener('click', () => this.showPvPSettings());
        document.getElementById('background-btn').addEventListener('click', () => this.showBackgroundSettings());
        document.getElementById('graphics-btn').addEventListener('click', () => this.showGraphicsSettings());
        
        // Pause Menu
        document.getElementById('pause-btn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeGame());
        document.getElementById('settings-btn-pause').addEventListener('click', () => this.showGraphicsSettings());
        document.getElementById('exit-btn').addEventListener('click', () => this.exitGame());
    }
    
    hideMainMenu() {
        document.getElementById('main-menu').classList.add('hidden');
    }
    
    showMainMenu() {
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('world-menu').classList.add('hidden');
        document.getElementById('pause-menu').classList.add('hidden');
    }
    
    showWorldMenu() {
        document.getElementById('world-menu').classList.remove('hidden');
        this.loadWorlds();
    }
    
    loadWorlds() {
        const worldList = document.getElementById('world-list');
        worldList.innerHTML = '';
        
        const worlds = [
            { name: 'Default World', time: new Date().toLocaleDateString() },
            { name: 'Creative World', time: new Date().toLocaleDateString() },
            { name: 'Survival World', time: new Date().toLocaleDateString() },
        ];
        
        worlds.forEach(world => {
            const div = document.createElement('div');
            div.className = 'world-item';
            div.innerHTML = `
                <div><strong>${world.name}</strong></div>
                <small style="color: #888;">${world.time}</small>
            `;
            div.addEventListener('click', () => this.selectWorld(world.name));
            worldList.appendChild(div);
        });
    }
    
    selectWorld(worldName) {
        console.log(`Selected world: ${worldName}`);
        this.startGame();
    }
    
    startGame() {
        this.hideMainMenu();
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('world-menu').classList.add('hidden');
        
        hudSystem = new HUDSystem();
        hudSystem.show();
        
        gameEngine = new GameEngine('game-canvas');
        gameEngine.start();
    }
    
    pauseGame() {
        document.getElementById('pause-menu').classList.remove('hidden');
        if (gameEngine) gameEngine.stop();
    }
    
    resumeGame() {
        document.getElementById('pause-menu').classList.add('hidden');
        if (gameEngine) gameEngine.start();
    }
    
    exitGame() {
        if (gameEngine) gameEngine.stop();
        hudSystem.hide();
        this.showMainMenu();
    }
    
    showGraphicsSettings() {
        const modal = document.getElementById('settings-modal');
        document.getElementById('modal-title').textContent = '⚙️ Graphics Settings';
        document.getElementById('modal-body').innerHTML = `
            <div class="settings-row">
                <span class="settings-label">Render Distance</span>
                <input type="range" min="4" max="16" value="${CONFIG.fps.renderDistance}" 
                       onchange="CONFIG.fps.renderDistance = this.value; saveConfig(); this.nextElementSibling.textContent = this.value;" style="flex: 1;">
                <span style="margin-left: 10px;">${CONFIG.fps.renderDistance}</span>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Brightness</span>
                <input type="range" min="50" max="150" value="${CONFIG.graphics.brightness}" 
                       onchange="CONFIG.graphics.brightness = this.value; saveConfig(); this.nextElementSibling.textContent = this.value + '%';" style="flex: 1;">
                <span style="margin-left: 10px;">${CONFIG.graphics.brightness}%</span>
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
        `;
        modal.classList.remove('hidden');
    }
    
    showTexturePackSettings() {
        const modal = document.getElementById('settings-modal');
        document.getElementById('modal-title').textContent = '📦 Texture Packs';
        const packs = texturePackManager.getInstalledPacks();
        
        let html = `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #4a90e2; margin-bottom: 10px;">Upload Texture Pack</h3>
                <input type="file" id="texture-pack-upload" accept=".zip">
                <button onclick="gameUI.handleTexturePackUpload()" class="main-button" style="width: 100%; padding: 10px; margin-top: 10px;">Upload</button>
            </div>
        `;
        
        html += `<h3 style="color: #4a90e2; margin-bottom: 10px;">Installed Packs</h3>`;
        if (packs.length === 0) {
            html += '<p style="color: #aaa;">No texture packs installed.</p>';
        } else {
            packs.forEach(pack => {
                html += `
                    <div class="settings-row" style="padding: 15px; background: rgba(74, 144, 226, 0.1); margin: 10px 0;">
                        <div><strong>${pack.name}</strong></div>
                        <button onclick="texturePackManager.removeTexturePack('${pack.id}'); gameUI.showTexturePackSettings();" style="background: #ef4444; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
                    </div>
                `;
            });
        }
        
        document.getElementById('modal-body').innerHTML = html;
        modal.classList.remove('hidden');
    }
    
    showPvPSettings() {
        const modal = document.getElementById('settings-modal');
        document.getElementById('modal-title').textContent = '⚔️ PvP Utilities';
        document.getElementById('modal-body').innerHTML = `
            <div class="settings-row">
                <span class="settings-label">CPS Display</span>
                <div class="toggle-switch ${CONFIG.pvp.showCPS ? 'enabled' : ''}" 
                     onclick="CONFIG.pvp.showCPS = !CONFIG.pvp.showCPS; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Show Armor</span>
                <div class="toggle-switch ${CONFIG.pvp.showArmorStatus ? 'enabled' : ''}" 
                     onclick="CONFIG.pvp.showArmorStatus = !CONFIG.pvp.showArmorStatus; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Show Target Health</span>
                <div class="toggle-switch ${CONFIG.pvp.showTargetHealth ? 'enabled' : ''}" 
                     onclick="CONFIG.pvp.showTargetHealth = !CONFIG.pvp.showTargetHealth; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Hitbox Display</span>
                <div class="toggle-switch ${CONFIG.pvp.hitboxDisplay ? 'enabled' : ''}" 
                     onclick="CONFIG.pvp.hitboxDisplay = !CONFIG.pvp.hitboxDisplay; saveConfig(); this.classList.toggle('enabled');"></div>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Crosshair Style</span>
                <select onchange="CONFIG.pvp.crosshairStyle = this.value; saveConfig(); updateCrosshair();" style="padding: 5px;">
                    <option value="default" ${CONFIG.pvp.crosshairStyle === 'default' ? 'selected' : ''}>Default</option>
                    <option value="dot" ${CONFIG.pvp.crosshairStyle === 'dot' ? 'selected' : ''}>Dot</option>
                    <option value="plus" ${CONFIG.pvp.crosshairStyle === 'plus' ? 'selected' : ''}>Plus</option>
                </select>
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Crosshair Color</span>
                <input type="color" value="${CONFIG.pvp.crosshairColor}" onchange="CONFIG.pvp.crosshairColor = this.value; saveConfig();">
            </div>
        `;
        modal.classList.remove('hidden');
    }
    
    showBackgroundSettings() {
        const modal = document.getElementById('settings-modal');
        document.getElementById('modal-title').textContent = '🎨 Background';
        document.getElementById('modal-body').innerHTML = `
            <div class="settings-row">
                <label style="display: flex; align-items: center; flex: 1;">
                    <input type="radio" name="bg-type" value="default" ${CONFIG.background.type === 'default' ? 'checked' : ''} 
                           onchange="CONFIG.background.type = 'default'; backgroundManager.applyBackground(CONFIG.background); saveConfig();">
                    Default Gradient
                </label>
            </div>
            
            <div class="settings-row">
                <label style="display: flex; align-items: center; flex: 1;">
                    <input type="radio" name="bg-type" value="color" ${CONFIG.background.type === 'color' ? 'checked' : ''} 
                           onchange="CONFIG.background.type = 'color'; saveConfig();">
                    Solid Color
                </label>
                <input type="color" value="${CONFIG.background.color}" 
                       onchange="CONFIG.background.color = this.value; backgroundManager.setBackgroundColor(this.value);">
            </div>
            
            <div class="settings-row">
                <span class="settings-label">Blur</span>
                <input type="range" min="0" max="1" step="0.1" value="${CONFIG.background.blur}" 
                       onchange="CONFIG.background.blur = this.value; backgroundManager.applyBackground(CONFIG.background); saveConfig();" style="flex: 1;">
            </div>
        `;
        modal.classList.remove('hidden');
    }
    
    handleTexturePackUpload() {
        const input = document.getElementById('texture-pack-upload');
        if (input && input.files.length > 0) {
            texturePackManager.addTexturePack(input.files[0]).then(() => {
                alert('Texture pack uploaded!');
                this.showTexturePackSettings();
            });
        }
    }
}

let gameUI = null;

function closeModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

function backToMainMenu() {
    document.getElementById('world-menu').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}

function createNewWorld() {
    alert('Create new world feature coming soon!');
}

function updateCrosshair() {
    const crosshair = document.getElementById('crosshair');
    if (crosshair) {
        crosshair.className = `crosshair ${CONFIG.pvp.crosshairStyle}`;
        crosshair.style.borderColor = CONFIG.pvp.crosshairColor;
    }
}