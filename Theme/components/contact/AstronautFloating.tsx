import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PersonIcon from '@mui/icons-material/Person';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AstronautContainer = styled(Box)({
  position: 'fixed',
  top: '20%',
  right: '5%',
  zIndex: 15,
  pointerEvents: 'none'
});

const AstronautIcon = styled(PersonIcon)(({ theme }) => ({
  fontSize: 80,
  color: theme.palette.info.main,
  filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))',
  background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.success.main})`,
  borderRadius: '50%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(10px)',
  border: `2px solid ${theme.palette.info.main}40`
}));

const AstronautFloating: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(containerRef.current, {
        y: -30,
        x: 15,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Parallax scroll effect
      gsap.to(containerRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Rotation on scroll
      gsap.to(containerRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });

      // Glow pulse effect
      const icon = containerRef.current?.querySelector('.astronaut-icon');
      if (icon) {
        gsap.to(icon, {
          filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.8))',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AstronautContainer ref={containerRef}>
      <AstronautIcon className="astronaut-icon" />
    </AstronautContainer>
  );
};

export default AstronautFloating;