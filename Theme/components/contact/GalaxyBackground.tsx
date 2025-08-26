import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';

const GalaxyContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
  pointerEvents: 'none'
});

const Star = styled(Box)<{ size?: number }>(({ size = 1 }) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: '#ffffff',
  borderRadius: '50%',
  opacity: 0.8,
  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`
}));

const GalaxyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create stars
      const stars: HTMLElement[] = [];
      const starCount = 150;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#ffffff';
        star.style.borderRadius = '50%';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`;
        
        containerRef.current?.appendChild(star);
        stars.push(star);
      }

      // Animate stars twinkling
      stars.forEach((star, index) => {
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2
        });

        // Slow drift animation
        gsap.to(star, {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      });

      // Create nebula clouds
      const nebulae = [
        { color: 'rgba(139, 92, 246, 0.1)', size: 400 },
        { color: 'rgba(59, 130, 248, 0.08)', size: 350 },
        { color: 'rgba(34, 211, 238, 0.06)', size: 300 },
        { color: 'rgba(16, 185, 129, 0.05)', size: 250 }
      ];

      nebulae.forEach((nebula, index) => {
        const cloud = document.createElement('div');
        cloud.style.position = 'absolute';
        cloud.style.width = `${nebula.size}px`;
        cloud.style.height = `${nebula.size}px`;
        cloud.style.background = `radial-gradient(circle, ${nebula.color}, transparent)`;
        cloud.style.borderRadius = '50%';
        cloud.style.filter = 'blur(40px)';
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.top = `${Math.random() * 100}%`;
        cloud.style.transform = 'translate(-50%, -50%)';
        
        containerRef.current?.appendChild(cloud);

        // Animate nebula movement
        gsap.to(cloud, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          rotation: 360,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          ease: "none"
        });

        // Pulsing effect
        gsap.to(cloud, {
          scale: Math.random() * 0.5 + 0.8,
          duration: Math.random() * 8 + 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <GalaxyContainer ref={containerRef} />;
};

export default GalaxyBackground;