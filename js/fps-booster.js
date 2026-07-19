// FPS Booster and Performance Optimization Module

class FPSBooster {
    constructor() {
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.currentFPS = 60;
        this.isOptimized = false;
        this.requestID = null;
        this.init();
    }

    init() {
        this.startFPSCounter();
        this.applyOptimizations();
    }

    // Start FPS counter
    startFPSCounter() {
        setInterval(() => {
            const now = Date.now();
            const delta = (now - this.lastTime) / 1000;
            this.currentFPS = Math.round(this.frameCount / delta);
            this.frameCount = 0;
            this.lastTime = now;

            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = this.currentFPS;
                // Change color based on FPS
                if (this.currentFPS >= 60) {
                    fpsCounter.style.color = '#4ade80'; // Green
                } else if (this.currentFPS >= 30) {
                    fpsCounter.style.color = '#fbbf24'; // Yellow
                } else {
                    fpsCounter.style.color = '#ef4444'; // Red
                }
            }
        }, 1000);
    }

    // Increment frame counter
    frameUpdate() {
        this.frameCount++;
    }

    // Apply FPS optimizations
    applyOptimizations() {
        // Reduce animation frame rate for non-critical elements
        this.reduceAnimationFrameRate();
        
        // Enable hardware acceleration
        this.enableHardwareAcceleration();
        
        // Optimize render distance
        this.optimizeRenderDistance();
        
        // Disable particle effects if needed
        this.optimizeParticles();
        
        this.isOptimized = true;
    }

    // Reduce animation frame rate
    reduceAnimationFrameRate() {
        const style = document.createElement('style');
        style.textContent = `
            @media (prefers-reduced-motion: no-preference) {
                * {
                    animation-duration: 0.01s !important;
                    transition-duration: 0.01s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enable hardware acceleration
    enableHardwareAcceleration() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // Optimize render distance
    optimizeRenderDistance() {
        if (CONFIG.fps.fastGraphics) {
            CONFIG.fps.renderDistance = Math.max(4, CONFIG.fps.renderDistance - 2);
        }
    }

    // Optimize particles
    optimizeParticles() {
        switch (CONFIG.fps.particleLevel) {
            case 0: // Minimal
                console.log('Particles: Minimal');
                break;
            case 1: // Default
                console.log('Particles: Default');
                break;
            case 2: // All
                console.log('Particles: All (May impact FPS)');
                break;
        }
    }

    // Get current FPS
    getFPS() {
        return this.currentFPS;
    }

    // Enable Fast Graphics Mode
    enableFastGraphics() {
        CONFIG.fps.fastGraphics = true;
        CONFIG.graphics.smoothLighting = false;
        CONFIG.graphics.animatedTextures = false;
        CONFIG.graphics.entityShadows = false;
        CONFIG.fps.particleLevel = 0;
        CONFIG.fps.cloudQuality = 0;
        console.log('✓ Fast Graphics enabled');
        saveConfig();
    }

    // Disable Fast Graphics Mode
    disableFastGraphics() {
        CONFIG.fps.fastGraphics = false;
        CONFIG.graphics.smoothLighting = true;
        CONFIG.graphics.animatedTextures = true;
        CONFIG.graphics.entityShadows = true;
        CONFIG.fps.particleLevel = 1;
        CONFIG.fps.cloudQuality = 1;
        console.log('✓ Fast Graphics disabled');
        saveConfig();
    }

    // Set render distance
    setRenderDistance(distance) {
        CONFIG.fps.renderDistance = Math.max(4, Math.min(16, distance));
        console.log(`Render Distance: ${CONFIG.fps.renderDistance}`);
        saveConfig();
    }

    // Set target FPS
    setTargetFPS(fps) {
        CONFIG.fps.targetFPS = Math.max(30, Math.min(120, fps));
        console.log(`Target FPS: ${CONFIG.fps.targetFPS}`);
        saveConfig();
    }
}

// Initialize FPS Booster
const fpsBooster = new FPSBooster();