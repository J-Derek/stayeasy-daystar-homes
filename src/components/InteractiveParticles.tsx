import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      density: number;
      color: string;
      speedY: number;
      speedX: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2.5 + 0.5;
        this.density = (Math.random() * 15) + 5; // Lowered max density for smoother inertia
        
        // Soft drift speeds
        this.speedY = (Math.random() * 0.2) - 0.1;
        this.speedX = (Math.random() * 0.2) - 0.1;

        // In dark mode: shimmering gold particles; Light mode: deep bronze
        this.color = isDark 
          ? `rgba(224, 181, 96, ${Math.random() * 0.6 + 0.1})` 
          : `rgba(163, 117, 26, ${Math.random() * 0.7 + 0.3})`;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        
        // Mouse interaction (Orbiting Solar Swarm effect)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = 220;
        let orbitRadius = 90; // The "Keep Away" buffer distance

        // Calculate target acceleration based on mouse distance
        let accelerationX = 0;
        let accelerationY = 0;

        if (distance < maxDistance) {
          if (distance > orbitRadius) {
            // Attract towards the orbit ring
            let force = (maxDistance - distance) / (maxDistance - orbitRadius);
            let speedFactor = 0.05; 
            accelerationX = forceDirectionX * force * this.density * speedFactor;
            accelerationY = forceDirectionY * force * this.density * speedFactor;
          } else {
            // Repel strongly if they get too close (inside the buffer ring)
            let repelForce = (orbitRadius - distance) / orbitRadius;
            let repelSpeed = 0.15;
            accelerationX = -forceDirectionX * repelForce * this.density * repelSpeed;
            accelerationY = -forceDirectionY * repelForce * this.density * repelSpeed;
          }
          
          // Add a subtle tangential (orbital) force to make them swirl around the mouse
          // Tangent vector is (-dy, dx) normalized
          let orbitForce = 0.02;
          accelerationX += -forceDirectionY * orbitForce * this.density;
          accelerationY += forceDirectionX * orbitForce * this.density;
          
        } else {
          // Gently pull back to base position
          let returnDx = this.baseX - this.x;
          let returnDy = this.baseY - this.y;
          accelerationX = returnDx * 0.01;
          accelerationY = returnDy * 0.01;
        }

        // Apply acceleration to velocity
        this.vx += accelerationX;
        this.vy += accelerationY;

        // Apply friction (damping) so they don't fly off infinitely
        this.vx *= 0.85; 
        this.vy *= 0.85;

        // Apply velocity to position
        this.x += this.vx;
        this.y += this.vy;
        
        // Continuous slow organic floating movement
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around screen gracefully
        if (this.baseX > canvas.width) { this.baseX = 0; this.x = 0; }
        if (this.baseX < 0) { this.baseX = canvas.width; this.x = canvas.width; }
        if (this.baseY > canvas.height) { this.baseY = 0; this.y = 0; }
        if (this.baseY < 0) { this.baseY = canvas.height; this.y = canvas.height; }
        
        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate responsive particle count based on screen size
      const numberOfParticles = (canvas.width * canvas.height) / 7500;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      // Clear with slight trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      
      // Draw lines between nearby particles
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      if (!ctx) return;
      for (let a = 0; a < particles.length; a++) {
        // Connect particle to mouse
        let dxMouse = particles[a].x - mouse.x;
        let dyMouse = particles[a].y - mouse.y;
        let distanceMouse = dxMouse * dxMouse + dyMouse * dyMouse;
        
        if (distanceMouse < 30000) { // roughly 173px radius
          let opacity = 1 - (distanceMouse / 30000);
          ctx.strokeStyle = isDark 
            ? `rgba(224, 181, 96, ${opacity * 0.3})`
            : `rgba(163, 117, 26, ${opacity * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Connect particle to other particles
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;
          
          if (distance < 8000) {
            let opacity = 1 - (distance / 8000);
            ctx.strokeStyle = isDark 
              ? `rgba(224, 181, 96, ${opacity * 0.15})`
              : `rgba(163, 117, 26, ${opacity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1, // Will sit between the gradient background (0) and text (10)
      }}
    />
  );
}
