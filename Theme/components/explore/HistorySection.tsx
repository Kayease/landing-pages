import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.3)`,
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
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.4)`,
  backdropFilter: 'blur(15px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.2)`,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(59, 130, 248, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 100%)`,
    borderRadius: theme.shape.borderRadius * 3,
    zIndex: -1
  }
}));

const HistorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Content paragraphs stagger animation
      const paragraphs = contentRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Floating animation for content box
      gsap.to(contentRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Background gradient shift
      gsap.to(sectionRef.current, {
        background: "rgba(15, 23, 42, 0.6)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer ref={sectionRef}>
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
            A Journey Through Time
          </GradientText>

          {/* Content */}
          <ContentBox ref={contentRef} sx={{ maxWidth: 900 }}>
            <Stack spacing={4}>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                The unflinching desire to fly unbridled in the sky is as old as the civilization itself. However, the yearning to break away from the shackles of earth's gravity to explore the unfathomable universe is as recent as a couple of centuries old. The dream became reality little more than half a century ago, bringing in an unprecedented growth of scientific imagination and innovation.
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                The B.M.Birla Planetarium was inaugurated on March 17, 1987, by Sh. G.P.Birla and Smt. Nirmala Birla. Over more than a quarter century of its operation, the planetarium has produced and screened 25 shows, organised seminars on various topics related to astronomy & space science, conducted workshops to enthuse and educate an umpteen number of teachers and students and has held open sky observation sessions using binoculars and telescopes to mesmerise thousands of curious onlookers.
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
              >
                The planetarium prides itself with its widely researched scripts collated from the authentic sources, a library of latest books, subscribed periodicals, the internet and institutional original research. The colourful visuals projected by tens of projectors on the 12 meter wide dome along with the crystal clear, pin pointed stars by the central GOTO projector and impressive story lines presented using post production techniques with ultimate care, have held its visitors spell-bound over the years.
              </Typography>
            </Stack>
          </ContentBox>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default HistorySection;