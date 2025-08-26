import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FeatureCard from './FeatureCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.5)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 248, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    zIndex: 1
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const ConstellationLine = styled('svg')({
  width: '100%',
  height: 60,
  opacity: 0.3,
  marginBottom: 24
});

const features = [
  {
    icon: StarIcon,
    title: "Sky Shows",
    description: "Regular sky-shows to dispel heavenly myths and propagate basic concepts of astronomy"
  },
  {
    icon: GroupIcon,
    title: "Interactive Sessions",
    description: "Engaging sessions with school groups following the sky-shows"
  },
  {
    icon: CalendarTodayIcon,
    title: "Amateur Training",
    description: "Training amateurs to appreciate the grandeur of the night sky"
  },
  {
    icon: AccessTimeIcon,
    title: "Telescope Making",
    description: "Helping enthusiasts make their own telescopes and organize astro-photography sessions"
  }
];

const MissionSection: React.FC = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={8}>
          {/* Section Header */}
          <Box textAlign="center">
            <GradientText variant="h2" component="h2" sx={{ mb: 3 }}>
              Our Mission
            </GradientText>
            
            {/* Decorative constellation line */}
            <ConstellationLine viewBox="0 0 600 60" fill="none">
              <path 
                d="M10 30 Q 60 10 110 30 T 210 30 T 310 30 T 410 30 T 510 30 T 590 30" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </ConstellationLine>
          </Box>

          {/* Content Grid */}
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={8} alignItems="flex-start">
            {/* Left Column - Mission Content */}
            <Box flex={1}>
              <Stack spacing={4}>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  The planetarium regularly holds sky-shows to dispel the heavenly myths, propagate the basic concepts of astronomy and also train the amateurs to appreciate the grandeur of the night sky. The topics include evolution of earth, mysteries of cosmos, exploration of Mars and other planets. Interactive sessions are held following the sky-shows with school groups.
                </Typography>

                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  The planetarium coordinates the activities of the local amateur astronomers by helping them to make their own telescopes, organising astro-photography and sky watch sessions from outside the glare of city lights, guiding and helping them in various scientific projects and organising evening open sky-watch sessions for the masses.
                </Typography>
              </Stack>
            </Box>

            {/* Right Column - Features Grid */}
            <Box flex={1}>
              <Stack spacing={3}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeInUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(30px)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)'
                        }
                      }
                    }}
                  >
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default MissionSection;