import React, { useEffect, useRef } from 'react';

const Fireworks = ({ isActive }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);
  const hueRef = useRef(120);
  const limiterTotalRef = useRef(20);
  const limiterTickRef = useRef(0);
  const timerTotalRef = useRef(500);
  const timerTickRef = useRef(0);

  // Shim for requestAnimationFrame
  const requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // Helper functions
  const random = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const calculateDistance = (p1x, p1y, p2x, p2y) => {
    const xDistance = p1x - p2x;
    const yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  // Firework class
  class Firework {
    constructor(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
      this.distanceTraveled = 0;
      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 4;
      this.acceleration = 1.1;
      this.brightness = random(50, 70);
      this.targetRadius = 1;
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }

      this.speed *= this.acceleration;

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        fireworksRef.current.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${hueRef.current}, 100%, ${this.brightness}%)`;
      ctx.stroke();
    }
  }

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 5;

      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }

      this.angle = random(0, Math.PI * 2);
      this.speed = random(2, 15);
      this.friction = 0.98;
      this.gravity = 0.6;
      this.hue = random(hueRef.current - 20, hueRef.current + 20);
      this.brightness = random(50, 80);
      this.alpha = 1;
      this.decay = random(0.005, 0.008);
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particlesRef.current.splice(index, 1);
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
      ctx.stroke();
    }
  }

  const createParticles = (x, y) => {
    const particleCount = 75;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(x, y));
    }
  };

  const createFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cw = canvas.width;
    const ch = canvas.height;

    for (let i = 0; i < 51; i++) {
      const startX = random(50, cw - 50);
      const startY = ch;
      const targetX = random(50, cw - 50);
      const targetY = random(50, ch / 2);
      fireworksRef.current.push(new Firework(startX, startY, targetX, targetY));
    }
  };

  const loop = () => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    animationFrameRef.current = requestAnimFrame(loop);

    hueRef.current += 0.5;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'lighter';

    // Update and draw fireworks
    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      fireworksRef.current[i].draw(ctx);
      fireworksRef.current[i].update(i);
    }

    // Update and draw particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      particlesRef.current[i].draw(ctx);
      particlesRef.current[i].update(i);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (isActive) {
      createFireworks();
      loop();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
        background: 'transparent'
      }}
    />
  );
};

export default Fireworks; 