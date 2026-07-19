// HUD System for in-game display

class HUDSystem {
    constructor() {
        this.fps = 60;
        this.cps = 0;
        this.lastClickTime = 0;
        this.clickCount = 0;
        this.visible = true;
        this.init();
    }
    
    init() {
        this.startFPSCounter();
        this.setupClickListener();
    }
    
    startFPSCounter() {
        let frameCount = 0;
        setInterval(() => {
            this.fps = frameCount;
            frameCount = 0;
            
            const fpsEl = document.getElementById('hud-fps');
            if (fpsEl) {
                fpsEl.textContent = this.fps;
                const fpsCounter = document.querySelector('.fps-counter');
                if (this.fps >= 60) {
                    fpsCounter.classList.remove('warning', 'bad');
                    fpsCounter.classList.add('good');
                } else if (this.fps >= 30) {
                    fpsCounter.classList.remove('good', 'bad');
                    fpsCounter.classList.add('warning');
                } else {
                    fpsCounter.classList.remove('good', 'warning');
                    fpsCounter.classList.add('bad');
                }
            }
        }, 1000);
    }
    
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
            this.updateCPS();
        });
    }
    
    updateCPS() {
        const cpsEl = document.getElementById('cps-value');
        if (cpsEl) {
            cpsEl.textContent = this.cps;
        }
    }
    
    updateHealth(health) {
        const healthFill = document.getElementById('player-health');
        if (healthFill) {
            const percent = (health / 20) * 100;
            healthFill.style.width = percent + '%';
        }
    }
    
    updateArmorStatus(helmet, chestplate, leggings, boots) {
        const armorItems = document.getElementById('armor-items');
        if (!armorItems) return;
        
        armorItems.innerHTML = '';
        const armor = [
            { name: 'Helmet', durability: helmet },
            { name: 'Chest', durability: chestplate },
            { name: 'Legs', durability: leggings },
            { name: 'Boots', durability: boots },
        ];
        
        armor.forEach(item => {
            const div = document.createElement('div');
            div.className = 'armor-item';
            div.title = `${item.name}: ${item.durability}%`;
            div.textContent = Math.round(item.durability / 10);
            armorItems.appendChild(div);
        });
    }
    
    updateTargetInfo(visible, name, health) {
        const targetInfo = document.getElementById('target-info');
        if (!targetInfo) return;
        
        if (visible) {
            targetInfo.classList.remove('hidden');
            document.getElementById('target-name').textContent = name;
            const targetHealth = document.getElementById('target-health');
            if (targetHealth) {
                const percent = (health / 20) * 100;
                targetHealth.style.width = percent + '%';
            }
        } else {
            targetInfo.classList.add('hidden');
        }
    }
    
    show() {
        const hud = document.getElementById('game-hud');
        if (hud) hud.classList.remove('hidden');
    }
    
    hide() {
        const hud = document.getElementById('game-hud');
        if (hud) hud.classList.add('hidden');
    }
}

let hudSystem = null;