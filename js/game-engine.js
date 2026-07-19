// Simple 3D Game Engine for Eaglercraft

class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('webgl2', { antialias: true, preserveDrawingBuffer: true });
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Player
        this.player = {
            x: 0,
            y: 70,
            z: 0,
            vx: 0,
            vy: 0,
            vz: 0,
            yaw: 0,
            pitch: 0,
            speed: 0.5,
            health: 20,
        };
        
        // Input
        this.keys = {};
        this.mouse = { x: 0, y: 0, moved: false };
        
        // World
        this.chunks = {};
        this.renderDistance = 8;
        
        // Game state
        this.running = false;
        this.time = 0;
        this.fpsCounter = 0;
        
        this.setupInput();
        this.setupShaders();
        this.generateWorld();
    }
    
    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.moved = true;
        });
        
        document.addEventListener('click', () => {
            document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock;
            document.body.requestPointerLock();
        });
    }
    
    setupShaders() {
        // Vertex shader
        const vertexShader = `#version 300 es
            precision highp float;
            in vec3 position;
            in vec3 color;
            uniform mat4 projection;
            uniform mat4 view;
            out vec3 fragColor;
            void main() {
                gl_Position = projection * view * vec4(position, 1.0);
                fragColor = color;
            }
        `;
        
        // Fragment shader
        const fragmentShader = `#version 300 es
            precision highp float;
            in vec3 fragColor;
            out vec4 outColor;
            void main() {
                outColor = vec4(fragColor, 1.0);
            }
        `;
        
        this.program = this.createProgram(vertexShader, fragmentShader);
    }
    
    createProgram(vertexSrc, fragmentSrc) {
        const vs = this.createShader(this.ctx.VERTEX_SHADER, vertexSrc);
        const fs = this.createShader(this.ctx.FRAGMENT_SHADER, fragmentSrc);
        const program = this.ctx.createProgram();
        this.ctx.attachShader(program, vs);
        this.ctx.attachShader(program, fs);
        this.ctx.linkProgram(program);
        return program;
    }
    
    createShader(type, source) {
        const shader = this.ctx.createShader(type);
        this.ctx.shaderSource(shader, source);
        this.ctx.compileShader(shader);
        return shader;
    }
    
    generateWorld() {
        // Generate simple terrain
        for (let cx = -this.renderDistance; cx <= this.renderDistance; cx++) {
            for (let cz = -this.renderDistance; cz <= this.renderDistance; cz++) {
                this.generateChunk(cx, cz);
            }
        }
    }
    
    generateChunk(cx, cz) {
        const key = `${cx},${cz}`;
        const blocks = [];
        
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                for (let y = 0; y < 64; y++) {
                    const wx = cx * 16 + x;
                    const wz = cz * 16 + z;
                    const height = Math.floor(40 + 5 * Math.sin(wx * 0.1) * Math.cos(wz * 0.1));
                    
                    if (y < height) {
                        let color = [0.2, 0.6, 0.2]; // Grass
                        if (y < height - 3) {
                            color = [0.5, 0.4, 0.2]; // Dirt
                        }
                        blocks.push({ x, y, z, color });
                    }
                }
            }
        }
        
        this.chunks[key] = blocks;
    }
    
    update(deltaTime) {
        // Player movement
        const moveSpeed = this.player.speed * deltaTime;
        
        if (this.keys['w']) {
            this.player.x += Math.sin(this.player.yaw) * moveSpeed;
            this.player.z += Math.cos(this.player.yaw) * moveSpeed;
        }
        if (this.keys['s']) {
            this.player.x -= Math.sin(this.player.yaw) * moveSpeed;
            this.player.z -= Math.cos(this.player.yaw) * moveSpeed;
        }
        if (this.keys['a']) {
            this.player.x += Math.sin(this.player.yaw - Math.PI / 2) * moveSpeed;
            this.player.z += Math.cos(this.player.yaw - Math.PI / 2) * moveSpeed;
        }
        if (this.keys['d']) {
            this.player.x += Math.sin(this.player.yaw + Math.PI / 2) * moveSpeed;
            this.player.z += Math.cos(this.player.yaw + Math.PI / 2) * moveSpeed;
        }
        if (this.keys[' ']) {
            if (this.player.y <= 70) {
                this.player.vy = 0.5;
            }
        }
        
        // Gravity
        this.player.vy -= 0.02;
        this.player.y += this.player.vy;
        if (this.player.y <= 70) {
            this.player.y = 70;
            this.player.vy = 0;
        }
    }
    
    render() {
        this.ctx.clearColor(0.53, 0.81, 0.92, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
        this.ctx.enable(this.ctx.DEPTH_TEST);
        
        // This is a simple render setup. In a real engine, you'd render blocks here.
    }
    
    start() {
        this.running = true;
        let lastTime = Date.now();
        
        const loop = () => {
            if (this.running) {
                const now = Date.now();
                const deltaTime = (now - lastTime) / 1000;
                lastTime = now;
                
                this.update(deltaTime);
                this.render();
                this.fpsCounter++;
                
                requestAnimationFrame(loop);
            }
        };
        
        loop();
    }
    
    stop() {
        this.running = false;
    }
}

let gameEngine = null;