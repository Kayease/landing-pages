import React from 'react';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 50%, ${theme.palette.grey[900]} 100%)`,
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
      radial-gradient(ellipse at top, rgba(59, 130, 248, 0.08), transparent 60%),
      radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.08), transparent 60%)
    `,
    zIndex: 1
  }
}));

const FloatingBlob = styled(Box)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(60px)',
  animation: `float 6s ease-in-out infinite ${delay}s`,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) scale(1)'
    },
    '33%': {
      transform: 'translateY(-20px) translateX(10px) scale(1.1)'
    },
    '66%': {
      transform: 'translateY(10px) translateX(-10px) scale(0.9)'
    }
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: 'shimmer 3s ease-in-out infinite',
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 120,
  height: 120,
  margin: '0 auto',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 20px rgba(59, 130, 248, 0.3))'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40)`,
    borderRadius: '50%',
    animation: 'pulse 3s ease-in-out infinite',
    zIndex: -1
  },
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.3
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.6
    }
  }
}));

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.4)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.3)`,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 40px rgba(59, 130, 248, 0.2)`
  }
}));

const PlanetImage = styled('img')<{ delay?: number }>(({ delay = 0 }) => ({
  position: 'absolute',
  opacity: 0.2,
  animation: `planetFloat 20s ease-in-out infinite ${delay}s`,
  '@keyframes planetFloat': {
    '0%, 100%': {
      transform: 'rotate(0deg) scale(1)'
    },
    '50%': {
      transform: 'rotate(180deg) scale(1.1)'
    }
  }
}));

interface HeroSectionProps {
  visitorCount: number;
  showsCount: number;
  equipmentCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ visitorCount, showsCount, equipmentCount }) => {
  return (
    <HeroContainer>
      {/* Floating Background Elements */}
      <FloatingBlob
        sx={{
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          opacity: 0.1
        }}
        delay={0}
      />
      <FloatingBlob
        sx={{
          bottom: '10%',
          right: '10%',
          width: 400,
          height: 400,
          background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
          opacity: 0.1
        }}
        delay={2}
      />
      <FloatingBlob
        sx={{
          top: '20%',
          right: '30%',
          width: 250,
          height: 250,
          background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
          opacity: 0.1
        }}
        delay={4}
      />

      {/* Planet Decorations */}
      <PlanetImage
        src="/Planets/Earth.png"
        alt=""
        delay={0}
        style={{
          top: '15%',
          right: '15%',
          width: 80,
          height: 80
        }}
      />
      <PlanetImage
        src="/Planets/Venus.png"
        alt=""
        delay={10}
        style={{
          bottom: '20%',
          left: '10%',
          width: 60,
          height: 60
        }}
      />

      {/* Floating Stars */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 2,
            height: 2,
            backgroundColor: 'warning.main',
            borderRadius: '50%',
            left: `${15 + i * 10}%`,
            top: `${20 + i * 8}%`,
            animation: `twinkle 3s ease-in-out infinite ${i * 0.3}s`,
            '@keyframes twinkle': {
              '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.5)' }
            }
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={6} alignItems="center" textAlign="center">
          {/* Logo */}
          <LogoContainer>
            <img src="/favicon.ico" alt="Theme Demo Logo" />
          </LogoContainer>

          {/* Badge */}
          <Chip
            icon={<InfoIcon />}
            label="About Theme Demo"
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              background: 'rgba(59, 130, 248, 0.1)',
              borderColor: 'primary.main',
              color: 'primary.light',
              backdropFilter: 'blur(10px)',
              '& .MuiChip-icon': {
                color: 'primary.main'
              }
            }}
          />

          {/* Main Title */}
          <GradientText variant="h1" component="h1">
            Explore the Planetarium
          </GradientText>

          {/* Subtitle */}
          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: 800, lineHeight: 1.6 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer dictum, risus at aliquet luctus, justo risus fermentum turpis, vitae faucibus mauris nisl non velit.
          </Typography>

          {/* Stats Cards */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ mt: 4, width: '100%', maxWidth: 600 }}
          >
            {[
              { label: 'Visitors', value: visitorCount, suffix: '+' },
              { label: 'Shows', value: showsCount, suffix: '+' },
              { label: 'Equipment', value: equipmentCount, suffix: '+' }
            ].map((stat, index) => (
              <StatsCard key={index} sx={{ flex: 1 }}>
                <Typography variant="h4" component="div" color="primary.main" fontWeight="bold">
                  {stat.value.toLocaleString()}
                  <Typography component="span" color="text.secondary" fontSize="0.7em">
                    {stat.suffix}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {stat.label}
                </Typography>
              </StatsCard>
            ))}
          </Stack>

          {/* Mission Statement */}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mt: 4, lineHeight: 1.7 }}
          >
            The planetarium regularly holds sky-shows to dispel the heavenly myths, propagate the basic concepts of astronomy and also train the amateurs to appreciate the grandeur of the night sky.
          </Typography>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;