import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Section = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `linear-gradient(180deg, rgba(2,6,23,0.4), rgba(2,6,23,0.2))`,
  overflow: 'hidden'
}));

const ExperienceCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: 'rgba(2, 6, 23, 0.5)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? theme.shape.borderRadius * 2
    : `calc(${theme.shape.borderRadius} * 2)`,
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease',
  boxShadow: '0 8px 28px rgba(2,6,23,0.35)'
}));

const Overlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 20%, rgba(2,6,23,0.85) 80%)'
});

const Title = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800
}));

const experiences = [
  {
    title: 'Immersive Dome Shows',
    description: 'Journey through the cosmos with breathtaking 360° visuals on our 12m dome.',
    img: '/Planets/Earth.png',
    badge: 'Signature'
  },
  {
    title: 'Astronomy Workshops',
    description: 'Hands-on learning experiences curated for students and enthusiasts.',
    img: '/Planets/Group 3.png',
    badge: 'Learning'
  },
  {
    title: 'Night Sky Observation',
    description: 'Guided stargazing sessions with telescopes and expert narration.',
    img: '/Planets/Orb.png',
    badge: 'Outdoor'
  }
];

const FeaturedExperiences: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal for cards
      const cards = gridRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%'
          }
        });

        // Tilt behavior
        cards.forEach((card) => {
          const quickRX = gsap.quickTo(card, 'rotationX', { duration: 0.45, ease: 'power3.out' });
          const quickRY = gsap.quickTo(card, 'rotationY', { duration: 0.45, ease: 'power3.out' });

          const onMove = (e: MouseEvent) => {
            const rect = (card as HTMLElement).getBoundingClientRect();
            const dx = (e.clientX - rect.left) / rect.width; // 0..1
            const dy = (e.clientY - rect.top) / rect.height; // 0..1
            quickRX((0.5 - dy) * 8);
            quickRY((dx - 0.5) * 10);
          };
          card.addEventListener('mousemove', onMove as EventListener);
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={8}>
          <Box textAlign="center">
            <Title variant="h1">Featured Experiences</Title>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              The most-loved experiences at Theme Demo
            </Typography>
          </Box>

          <Box
            ref={gridRef}
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              justifyItems: 'center'
            }}
          >
            {experiences.map((item, i) => (
              <ExperienceCard key={i} className="exp-card" sx={{ width: '100%', maxWidth: 380 }}>
                <Box sx={{ position: 'relative', height: 300 }}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'contain' }} />
                  <Overlay />
                  <Chip label={item.badge} color="primary" sx={{ position: 'absolute', top: 16, left: 16, backdropFilter: 'blur(6px)' }} />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" component="h3" color="text.primary" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </ExperienceCard>
            ))}
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

export default FeaturedExperiences;


