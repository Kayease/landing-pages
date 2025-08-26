import React, { useEffect, useRef } from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { gsap } from "gsap";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 0),
  background: `radial-gradient(1200px 400px at 50% 0%, ${theme.palette.primary.main}15, transparent),
               linear-gradient(180deg, rgba(2,6,23,0.35), rgba(2,6,23,0.6))`,
  overflow: "hidden",
}));

const Accent = styled("span")(({ theme }) => ({
  position: "absolute",
  width: 140,
  height: 140,
  borderRadius: "50%",
  background: `radial-gradient(circle, ${theme.palette.secondary.main}33, transparent 60%)`,
  filter: "blur(20px)",
  pointerEvents: "none",
}));

const VisitCta: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const accents = sectionRef.current.querySelectorAll(".accent");
    accents.forEach((a, i) => {
      gsap.to(a, {
        x: i % 2 ? 40 : -40,
        y: i % 2 ? -30 : 30,
        repeat: -1,
        yoyo: true,
        duration: 6 + i,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <Section ref={sectionRef}>
      <Accent className="accent" style={{ left: "8%", top: "10%" }} />
      <Accent className="accent" style={{ right: "12%", bottom: "10%" }} />
      <Container maxWidth="md">
        <Stack spacing={3} textAlign="center" alignItems="center">
          <Typography
            variant="h3"
            component="h2"
            fontWeight={800}
            sx={{
              background: "linear-gradient(45deg, #60a5fa, #a78bfa, #22d3ee)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Visit Us & Book Tickets
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 720 }}
          >
            Experience the wonders of space. Choose your showtime and secure
            your seats in minutes.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              href="/#book"
              sx={{ px: 4 }}
            >
              Book Tickets
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="info"
              href="/contact"
              sx={{ px: 4 }}
            >
              Contact Team
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};

export default VisitCta;
