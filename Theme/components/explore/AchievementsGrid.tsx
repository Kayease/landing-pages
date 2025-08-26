import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TelescopeIcon from '@mui/icons-material/Visibility';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicIcon from '@mui/icons-material/Public';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.8)`,
  position: 'relative',
  overflow: 'hidden'
}));

const AchievementCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: `linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.35))`,
  backdropFilter: 'blur(16px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(148, 163, 184, 0.18)',
  boxShadow: '0 8px 30px rgba(2,6,23,0.35)',
  transformStyle: 'preserve-3d',
  transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease, background 420ms ease',
  willChange: 'transform',
  height: '100%',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    padding: 1,
    borderRadius: theme.shape.borderRadius * 2 + 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0.25,
    transition: 'opacity 420ms ease'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    width: '60%',
    height: 120,
    background: `radial-gradient(ellipse at top, ${theme.palette.primary.main}33, transparent 60%)`,
    pointerEvents: 'none',
    opacity: 0.25,
    filter: 'blur(20px)'
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.015)',
    boxShadow: `0 24px 60px rgba(59, 130, 246, 0.25), 0 6px 20px rgba(0,0,0,0.25)`,
    background: `linear-gradient(180deg, rgba(2,6,23,0.7), rgba(2,6,23,0.45))`,
  },
  '&:hover::before': { opacity: 0.6 },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.shape.borderRadius * 2,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.4s ease'
  },
  '&:hover::after': {
    opacity: 0.4
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const achievements = [
  { icon: StarIcon, title: "25+ Shows Produced", description: "Over 25 unique planetarium shows since 1989" },
  { icon: GroupIcon, title: "Thousands of Visitors", description: "Educating and inspiring generations of students" },
  { icon: EmojiEventsIcon, title: "Nobel Laureates", description: "Hosted renowned scientists and researchers" },
  { icon: TelescopeIcon, title: "Advanced Equipment", description: "State-of-the-art projection and observation facilities" },
  { icon: MenuBookIcon, title: "Research Publications", description: "Contributing to astronomical research and knowledge" },
  { icon: PublicIcon, title: "International Recognition", description: "Known worldwide for excellence in science education" }
];

const AchievementsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.achievement-card');
      if (cards) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          duration: 1,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Hover + tilt animations for each card
        cards.forEach((card, index) => {
          const icon = card.querySelector('.achievement-icon');
          const quickRX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
          const quickRY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });
          const quickRZ = gsap.quickTo(card, 'rotationZ', { duration: 0.4, ease: 'power3.out' });
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { boxShadow: `0 28px 70px rgba(59,130,246,0.28), 0 8px 24px rgba(0,0,0,0.25)`, duration: 0.5, ease: 'power3.out' });
            gsap.to(icon, {
              rotation: 360,
              scale: 1.3,
              duration: 0.6,
              ease: "back.out(1.7)"
            });
          });

          const onMove = (e: MouseEvent) => {
            const rect = (card as HTMLElement).getBoundingClientRect();
            const dx = (e.clientX - rect.left) / rect.width; // 0..1
            const dy = (e.clientY - rect.top) / rect.height; // 0..1
            const rx = (0.5 - dy) * 10; // tilt X
            const ry = (dx - 0.5) * 12; // tilt Y
            const rz = (dx - 0.5) * 2; // slight twist
            quickRX(rx);
            quickRY(ry);
            quickRZ(rz);
          };

          card.addEventListener('mousemove', onMove);

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, rotationZ: 0, duration: 0.5, ease: 'power2.out', boxShadow: '0 8px 30px rgba(2,6,23,0.35)' });
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

      // Parallax effect for the entire grid
      gsap.to(gridRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={8}>
          {/* Section Title */}
          <GradientText 
            ref={titleRef}
            variant="h2" 
            component="h2"
            textAlign="center"
            sx={{ fontWeight: 700 }}
          >
            Our Achievements
          </GradientText>

          {/* Achievements Grid */}
          <Box ref={gridRef}>
            <Stack 
              direction="row" 
              flexWrap="wrap" 
              spacing={4}
              justifyContent="center"
              sx={{
                '& > *': {
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', lg: '1 1 calc(33.333% - 16px)' },
                  maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', lg: 'calc(33.333% - 16px)' }
                }
              }}
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <AchievementCard key={index} className="achievement-card">
                    <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                      <IconContainer className="achievement-icon">
                        <Icon sx={{ color: 'white', fontSize: 36 }} />
                      </IconContainer>
                      
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        color="text.primary"
                        fontWeight="600"
                        sx={{ mb: 2 }}
                      >
                        {achievement.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </AchievementCard>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default AchievementsGrid;