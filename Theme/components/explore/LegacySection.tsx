import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.8)`,
  position: 'relative',
  overflow: 'hidden'
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.6)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.3)`,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(6),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(59, 130, 248, 0.03) 0%, 
      rgba(139, 92, 246, 0.03) 100%)`,
    borderRadius: theme.shape.borderRadius * 3,
    zIndex: -1
  }
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  filter: 'blur(40px)',
  animation: 'float 8s ease-in-out infinite'
}));

const LegacySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation with morphing effect
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Content paragraphs with wave effect
      const paragraphs = contentRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          y: 80,
          opacity: 0,
          rotationX: 45,
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Badge entrance with bounce
      gsap.from(badgeRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating content box
      gsap.to(contentRef.current, {
        y: -30,
        rotation: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Background color transition
      gsap.to(sectionRef.current, {
        background: "rgba(15, 23, 42, 0.9)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      // Floating elements animation
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -50 : 50,
          x: index % 2 === 0 ? 30 : -30,
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 + index * 0.2
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer ref={sectionRef}>
      {/* Floating Background Elements */}
      <FloatingElement 
        className="floating-element"
        sx={{
          top: '10%',
          left: '10%',
          width: 200,
          height: 200
        }}
      />
      <FloatingElement 
        className="floating-element"
        sx={{
          bottom: '10%',
          right: '10%',
          width: 150,
          height: 150
        }}
      />

      <Container maxWidth="lg">
        <Stack spacing={8} alignItems="center">
          {/* Section Title */}
          <GradientText 
            ref={titleRef}
            variant="h2" 
            component="h2"
            textAlign="center"
            sx={{ fontWeight: 700 }}
          >
            A Legacy of Excellence
          </GradientText>

          {/* Content */}
          <ContentBox ref={contentRef} sx={{ maxWidth: 900 }}>
            <Stack spacing={5}>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                B.M. Birla Planetarium, Jaipur, is now an integral part in the intellectual landscape of the city and a valuable asset for its students and intelligentsia. The planetarium is dedicated to serve the city and its populace for many more years, keeping alive the wonderful three centuries old legacy of its founder astronomer king - Raja Sawai Jai Singh.
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                The planetarium has made its presence felt through invited lecture tours and telescope making workshops at Shillong in Meghalaya, Bhubaneswar in Orissa, Bhopal in Madhya Pradesh, Hyderabad in Andhra Pradesh, Jaipur, Ranchi in Jharkhand, Dhenkanal in Orissa, Kashmir, Patiala in Panjab and at Kurukshetra in Haryana. Schools, colleges and NGOs in and around the city are regularly visited by the planetarium personnel with their array of popular lecture topics and conduct evening sky-watch sessions through telescopes for the young enthusiasts.
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                A planetarium is a window to the universe at large. There are innumerable mysteries hidden deep within the unfathomable depths of the universe. We have begun to unravel those mysteries one by one only by now. As technologies improve, so do our techniques to peek within those depths of darkness and fish out answers of our age old questions: where do we come from; where are we going?
              </Typography>
            </Stack>
          </ContentBox>

          {/* Operating Since Badge */}
          <Box ref={badgeRef}>
            <Chip
              icon={<AccessTimeIcon />}
              label="Operating Since 1987"
              variant="outlined"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                background: 'rgba(59, 130, 248, 0.1)',
                borderColor: 'primary.main',
                color: 'primary.light',
                backdropFilter: 'blur(10px)',
                '& .MuiChip-icon': {
                  color: 'primary.main'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 24,
                  height: 24,
                  background: 'warning.main',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}
            />
          </Box>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default LegacySection;