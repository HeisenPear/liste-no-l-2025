/**
 * Snow Effect Animation
 * Creates a subtle, performant snowfall effect using Canvas API
 */

(function() {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');

    let snowflakes = [];
    let animationId;

    // Configuration
    const config = {
        snowflakeCount: 50,
        maxSize: 3,
        minSize: 1,
        maxSpeed: 1,
        minSpeed: 0.2,
        maxWind: 0.5,
        opacity: 0.6
    };

    // Snowflake class
    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
            this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
            this.wind = (Math.random() - 0.5) * config.maxWind;
            this.opacity = Math.random() * config.opacity;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            // Reset snowflake if it goes off screen
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }

            if (this.x > canvas.width + 10) {
                this.x = -10;
            } else if (this.x < -10) {
                this.x = canvas.width + 10;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initialize snowflakes
    function init() {
        resizeCanvas();

        snowflakes = [];
        for (let i = 0; i < config.snowflakeCount; i++) {
            snowflakes.push(new Snowflake());
        }

        // Distribute snowflakes across the screen initially
        snowflakes.forEach(flake => {
            flake.y = Math.random() * canvas.height;
        });

        animate();
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 250);
    });

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    } else {
        // Hide canvas if user prefers reduced motion
        canvas.style.display = 'none';
    }

    // Pause animation when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else if (!prefersReducedMotion) {
            animate();
        }
    });
})();
