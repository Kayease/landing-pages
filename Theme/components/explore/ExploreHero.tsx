import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarIcon from '@mui/icons-material/Star';

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.dark}20 0%, 
    ${theme.palette.secondary.dark}20 50%, 
    ${theme.palette.grey[900]} 100%)`,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(ellipse at 25% 25%, rgba(59, 130, 248, 0.08), transparent 60%),
      radial-gradient(ellipse at 75% 75%, rgba(139, 92, 246, 0.08), transparent 60%)
    `,
    zIndex: 1
  }
}));

const FloatingBlob = styled(Box)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.1,
  willChange: 'transform',
  animation: `float 8s ease-in-out infinite ${delay}s`,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) scale(1)'
    },
    '33%': {
      transform: 'translateY(-30px) translateX(15px) scale(1.1)'
    },
    '66%': {
      transform: 'translateY(15px) translateX(-15px) scale(0.9)'
    }
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: 'shimmer 4s ease-in-out infinite',
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}));

const ExploreHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();
      
      tl.from(badgeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.4")
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");

      // Parallax effect for blobs
      gsap.utils.toArray<HTMLElement>(".floating-blob").forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? -60 : 60,
          x: i % 2 === 0 ? 30 : -30,
          rotation: i % 2 === 0 ? 360 : -360,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      });

      // Text glow effect on scroll
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            textShadow: "0 0 30px rgba(59, 130, 248, 0.5)",
            duration: 1,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.to(titleRef.current, {
            textShadow: "0 0 0px rgba(59, 130, 248, 0)",
            duration: 1,
            ease: "power2.out"
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroContainer ref={containerRef}>
      {/* Floating Background Elements */}
      <FloatingBlob
        className="floating-blob"
        sx={{
          top: '20%',
          left: '15%',
          width: 400,
          height: 400,
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'
        }}
        delay={0}
      />
      <FloatingBlob
        className="floating-blob"
        sx={{
          bottom: '20%',
          right: '15%',
          width: 350,
          height: 350,
          background: 'linear-gradient(45deg, #8b5cf6, #ec4899)'
        }}
        delay={2}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center">
          {/* Badge */}
          <Box ref={badgeRef} sx={{ mb: 4 }}>
            <Chip
              icon={<StarIcon />}
              label="A Landmark of the Pink City"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                background: 'rgba(59, 130, 248, 0.1)',
                borderColor: 'primary.main',
                color: 'primary.light',
                backdropFilter: 'blur(10px)',
                '& .MuiChip-icon': {
                  color: 'warning.main'
                }
              }}
            />
          </Box>

          {/* Main Title */}
          <GradientText 
            ref={titleRef}
            variant="h1" 
            component="h1"
            sx={{ 
              mb: 4,
              fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
              fontWeight: 800,
              lineHeight: 1.1
            }}
          >
            Explore the Planetarium
          </GradientText>

          {/* Subtitle */}
          <Typography
            ref={subtitleRef}
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.7,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            A landmark of the pink city - The B.M.Birla Planetarium, Jaipur has a long legacy in the field of popularisation of science and spreading awareness among the masses, especially among the school children.
          </Typography>
        </Box>
      </Container>
    </HeroContainer>
  );
};

export default ExploreHero;