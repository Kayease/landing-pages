import React from 'react';
import { Box, Container, Typography, Card, CardContent, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FaxIcon from '@mui/icons-material/Print';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '241, 245, 249'}, 0.3)`,
  position: 'relative'
}));

const InfoCard = styled(Card)(({ theme }) => ({
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.6)`,
  backdropFilter: 'blur(15px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.3)`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 40px rgba(59, 130, 248, 0.15)`,
    background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.8)`
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.5)`,
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.2)`,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.8)`,
    transform: 'translateX(5px)'
  }
}));

const showTimes = [
  { day: "Weekdays", times: ["1:00 PM", "5:00 PM"] },
  { day: "Weekends", times: ["1:00 PM", "3:00 PM", "5:00 PM"] },
  { day: "Monday", times: ["Closed"] }
];

const VisitInfoSection: React.FC = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Section Header */}
          <Box textAlign="center">
            <GradientText variant="h2" component="h2">
              Visit Information
            </GradientText>
          </Box>

          {/* Info Cards Grid */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            {/* Show Times Card */}
            <InfoCard sx={{ flex: 1 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="600" color="text.primary">
                      Show Timings
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    {showTimes.map((schedule, index) => (
                      <InfoRow key={index}>
                        <Typography variant="body1" fontWeight="500" color="text.primary" sx={{ minWidth: 80 }}>
                          {schedule.day}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {schedule.times.map((time, timeIndex) => (
                            <Chip
                              key={timeIndex}
                              label={time}
                              size="small"
                              sx={{
                                backgroundColor: schedule.day === "Monday" ? 'error.main' : 'primary.main',
                                color: 'white',
                                fontWeight: 500
                              }}
                            />
                          ))}
                        </Stack>
                      </InfoRow>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </InfoCard>

            {/* Capacity & Pricing Card */}
            <InfoCard sx={{ flex: 1 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <GroupIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="600" color="text.primary">
                      Capacity & Pricing
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <InfoRow>
                      <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
                        Total Seating Capacity
                      </Typography>
                      <Chip 
                        label="132 Seats" 
                        sx={{ 
                          backgroundColor: 'success.main', 
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    </InfoRow>
                    
                    <InfoRow>
                      <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
                        Individual Visitor
                      </Typography>
                      <Chip 
                        label="₹80" 
                        sx={{ 
                          backgroundColor: 'info.main', 
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    </InfoRow>
                    
                    <InfoRow>
                      <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
                        Student Group (Bulk)
                      </Typography>
                      <Chip 
                        label="₹50 per student" 
                        sx={{ 
                          backgroundColor: 'secondary.main', 
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    </InfoRow>
                  </Stack>
                </Stack>
              </CardContent>
            </InfoCard>
          </Stack>

          {/* Contact Information Card */}
          <InfoCard>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <PhoneIcon sx={{ color: 'warning.main', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="600" color="text.primary">
                    Contact Information
                  </Typography>
                </Box>
                
                <Stack spacing={2}>
                  <InfoRow>
                    <PhoneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body1" color="text.secondary">
                      +91-141-2385367, 2385094
                    </Typography>
                  </InfoRow>
                  
                  <InfoRow>
                    <LocationOnIcon sx={{ color: 'error.main', fontSize: 20 }} />
                    <Typography variant="body1" color="text.secondary">
                      B M Birla Science Center, Statue Circle, Jaipur-302001
                    </Typography>
                  </InfoRow>
                  
                  <InfoRow>
                    <EmailIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography variant="body1" color="text.secondary">
                      planet@bisr.res.in
                    </Typography>
                  </InfoRow>
                  
                  <InfoRow>
                    <FaxIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="body1" color="text.secondary">
                      Fax: +91-141-2385121
                    </Typography>
                  </InfoRow>
                </Stack>
              </Stack>
            </CardContent>
          </InfoCard>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default VisitInfoSection;