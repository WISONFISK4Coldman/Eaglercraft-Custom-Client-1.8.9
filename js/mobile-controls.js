// Mobile Touch Controls Handler

class MobileControls {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isTouching = false;
        this.isSupported = this.checkMobileSupport();
        this.sensitivity = 2;
        
        // Virtual joystick state
        this.joystickLeft = { x: 0, y: 0 };
        this.joystickRight = { x: 0, y: 0 };
        this.jumpButton = false;
        
        if (this.isSupported) {
            this.setupMobileUI();
            this.setupTouchListeners();
            this.setupDeviceOrientation();
        }
    }
    
    checkMobileSupport() {
        const ua = navigator.userAgent;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    }
    
    setupMobileUI() {
        // Create mobile controls container
        const mobileControls = document.createElement('div');
        mobileControls.id = 'mobile-controls';
        mobileControls.className = 'mobile-controls hidden';
        mobileControls.innerHTML = `
            <!-- Left Joystick (Movement) -->
            <div class="joystick-container joystick-left">
                <div class="joystick-bg">
                    <div id="joystick-left-stick" class="joystick-stick"></div>
                </div>
                <span class="joystick-label">Move</span>
            </div>
            
            <!-- Right Joystick (Looking) -->
            <div class="joystick-container joystick-right">
                <div class="joystick-bg">
                    <div id="joystick-right-stick" class="joystick-stick"></div>
                </div>
                <span class="joystick-label">Look</span>
            </div>
            
            <!-- Action Buttons -->
            <div class="mobile-buttons">
                <button id="mobile-jump" class="mobile-btn jump-btn" title="Jump">⬆ Jump</button>
                <button id="mobile-attack" class="mobile-btn attack-btn" title="Attack">⚔ Attack</button>
                <button id="mobile-place" class="mobile-btn place-btn" title="Place">◻ Place</button>
                <button id="mobile-pause" class="mobile-btn pause-btn" title="Pause">⏸ Menu</button>
            </div>
            
            <!-- Mobile Settings Toggle -->
            <button id="mobile-settings-toggle" class="mobile-settings-toggle">☰</button>
            
            <!-- Crosshair -->
            <div id="mobile-crosshair" class="mobile-crosshair"></div>
            
            <!-- Mobile HUD -->
            <div id="mobile-hud" class="mobile-hud">
                <div class="mobile-hud-item">FPS: <span id="mobile-fps">60</span></div>
                <div class="mobile-hud-item">Health: <span id="mobile-health">20</span></div>
                <div class="mobile-hud-item">CPS: <span id="mobile-cps">0</span></div>
            </div>
            
            <!-- Gyro Toggle -->
            <button id="mobile-gyro-toggle" class="mobile-gyro-toggle" title="Toggle Gyroscope">📱 Gyro</button>
        `;
        
        document.body.appendChild(mobileControls);
        this.setupButtonListeners();
    }
    
    setupButtonListeners() {
        // Jump button
        const jumpBtn = document.getElementById('mobile-jump');
        if (jumpBtn) {
            jumpBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.jumpButton = true;
                jumpBtn.classList.add('active');
                if (gameEngine) gameEngine.keys[' '] = true;
            });
            jumpBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.jumpButton = false;
                jumpBtn.classList.remove('active');
                if (gameEngine) gameEngine.keys[' '] = false;
            });
        }
        
        // Attack button
        const attackBtn = document.getElementById('mobile-attack');
        if (attackBtn) {
            attackBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                attackBtn.classList.add('active');
                const clickEvent = new MouseEvent('mousedown', { bubbles: true });
                document.dispatchEvent(clickEvent);
            });
            attackBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                attackBtn.classList.remove('active');
                const clickEvent = new MouseEvent('mouseup', { bubbles: true });
                document.dispatchEvent(clickEvent);
            });
        }
        
        // Place button
        const placeBtn = document.getElementById('mobile-place');
        if (placeBtn) {
            placeBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                placeBtn.classList.add('active');
                const clickEvent = new MouseEvent('contextmenu', { bubbles: true });
                document.dispatchEvent(clickEvent);
            });
            placeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                placeBtn.classList.remove('active');
            });
        }
        
        // Pause button
        const pauseBtn = document.getElementById('mobile-pause');
        if (pauseBtn) {
            pauseBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (gameUI && gameEngine && gameEngine.running) {
                    gameUI.pauseGame();
                }
            });
        }
        
        // Settings toggle
        const settingsToggle = document.getElementById('mobile-settings-toggle');
        if (settingsToggle) {
            settingsToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.toggleMobileSettings();
            });
        }
        
        // Gyro toggle
        const gyroToggle = document.getElementById('mobile-gyro-toggle');
        if (gyroToggle) {
            gyroToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.toggleGyroscope();
            });
        }
    }
    
    setupTouchListeners() {
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
    }
    
    handleTouchStart(e) {
        // Get all touches
        const touches = e.touches;
        
        if (touches.length >= 1) {
            const touch = touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
            this.isTouching = true;
            
            // Detect which joystick area
            if (touch.clientX < window.innerWidth / 2) {
                // Left joystick (movement)
                this.handleLeftJoystickStart(touch);
            } else {
                // Right joystick (looking)
                this.handleRightJoystickStart(touch);
            }
        }
        
        if (touches.length >= 2) {
            // Two-finger tap = attack
            const clickEvent = new MouseEvent('mousedown', { bubbles: true });
            document.dispatchEvent(clickEvent);
        }
    }
    
    handleTouchMove(e) {
        const touches = e.touches;
        
        if (touches.length >= 1) {
            const touch = touches[0];
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;
            
            if (touch.clientX < window.innerWidth / 2) {
                this.handleLeftJoystickMove(deltaX, deltaY);
            } else {
                this.handleRightJoystickMove(deltaX, deltaY);
            }
        }
    }
    
    handleTouchEnd(e) {
        this.isTouching = false;
        this.joystickLeft = { x: 0, y: 0 };
        this.joystickRight = { x: 0, y: 0 };
        this.updateJoystickUI();
        this.updatePlayerMovement();
    }
    
    handleLeftJoystickStart(touch) {
        // Visual feedback
        const stick = document.getElementById('joystick-left-stick');
        if (stick) stick.style.opacity = '1';
    }
    
    handleLeftJoystickMove(deltaX, deltaY) {
        const maxDistance = 60;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > maxDistance) {
            this.joystickLeft.x = (deltaX / distance) * maxDistance;
            this.joystickLeft.y = (deltaY / distance) * maxDistance;
        } else {
            this.joystickLeft.x = deltaX;
            this.joystickLeft.y = deltaY;
        }
        
        this.updateJoystickUI();
        this.updatePlayerMovement();
    }
    
    handleRightJoystickStart(touch) {
        const stick = document.getElementById('joystick-right-stick');
        if (stick) stick.style.opacity = '1';
    }
    
    handleRightJoystickMove(deltaX, deltaY) {
        const maxDistance = 60;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > maxDistance) {
            this.joystickRight.x = (deltaX / distance) * maxDistance;
            this.joystickRight.y = (deltaY / distance) * maxDistance;
        } else {
            this.joystickRight.x = deltaX;
            this.joystickRight.y = deltaY;
        }
        
        // Update player camera
        if (gameEngine) {
            gameEngine.player.yaw += (this.joystickRight.x * 0.01);
            gameEngine.player.pitch += (this.joystickRight.y * 0.01);
        }
        
        this.updateJoystickUI();
    }
    
    updateJoystickUI() {
        // Update left joystick visual
        const leftStick = document.getElementById('joystick-left-stick');
        if (leftStick) {
            leftStick.style.transform = `translate(calc(-50% + ${this.joystickLeft.x}px), calc(-50% + ${this.joystickLeft.y}px))`;
        }
        
        // Update right joystick visual
        const rightStick = document.getElementById('joystick-right-stick');
        if (rightStick) {
            rightStick.style.transform = `translate(calc(-50% + ${this.joystickRight.x}px), calc(-50% + ${this.joystickRight.y}px))`;
        }
    }
    
    updatePlayerMovement() {
        if (!gameEngine) return;
        
        // Calculate movement based on joystick
        const magnitude = Math.sqrt(
            this.joystickLeft.x * this.joystickLeft.x + 
            this.joystickLeft.y * this.joystickLeft.y
        );
        
        if (magnitude > 5) {
            const angle = Math.atan2(this.joystickLeft.x, -this.joystickLeft.y);
            gameEngine.player.vx = Math.sin(angle + gameEngine.player.yaw) * magnitude * 0.01;
            gameEngine.player.vz = Math.cos(angle + gameEngine.player.yaw) * magnitude * 0.01;
        } else {
            gameEngine.player.vx = 0;
            gameEngine.player.vz = 0;
        }
    }
    
    setupDeviceOrientation() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ requires permission
            document.getElementById('mobile-gyro-toggle').style.display = 'block';
        } else if (window.DeviceOrientationEvent) {
            // Android and older iOS
            this.enableGyroscope();
        }
    }
    
    toggleGyroscope() {
        const toggle = document.getElementById('mobile-gyro-toggle');
        if (toggle.classList.contains('active')) {
            this.disableGyroscope();
            toggle.classList.remove('active');
        } else {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            this.enableGyroscope();
                            toggle.classList.add('active');
                        }
                    })
                    .catch(console.error);
            } else {
                this.enableGyroscope();
                toggle.classList.add('active');
            }
        }
    }
    
    enableGyroscope() {
        window.addEventListener('deviceorientation', (e) => {
            if (gameEngine) {
                gameEngine.player.yaw = (e.alpha || 0) * Math.PI / 180;
                gameEngine.player.pitch = -(e.beta || 0) * Math.PI / 180;
            }
        });
    }
    
    disableGyroscope() {
        window.removeEventListener('deviceorientation', null);
    }
    
    toggleMobileSettings() {
        const mobileHud = document.getElementById('mobile-hud');
        if (mobileHud) {
            mobileHud.classList.toggle('hidden');
        }
    }
    
    show() {
        const controls = document.getElementById('mobile-controls');
        if (controls) controls.classList.remove('hidden');
    }
    
    hide() {
        const controls = document.getElementById('mobile-controls');
        if (controls) controls.classList.add('hidden');
    }
    
    updateHUD(fps, health, cps) {
        const fpsEl = document.getElementById('mobile-fps');
        const healthEl = document.getElementById('mobile-health');
        const cpsEl = document.getElementById('mobile-cps');
        
        if (fpsEl) fpsEl.textContent = fps;
        if (healthEl) healthEl.textContent = Math.ceil(health);
        if (cpsEl) cpsEl.textContent = cps;
    }
}

let mobileControls = null;