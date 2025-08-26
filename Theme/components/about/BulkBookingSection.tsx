import React from 'react';
import { Box, Container, Typography, Alert, Stack, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import StarIcon from '@mui/icons-material/Star';
import PaymentIcon from '@mui/icons-material/Payment';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: `rgba(${theme.palette.mode === 'dark' ? '15, 23, 42' : '248, 250, 252'}, 0.8)`,
  position: 'relative'
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const InstructionCard = styled(Card)(({ theme }) => ({
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.6)`,
  backdropFilter: 'blur(15px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.3)`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 15px 30px rgba(59, 130, 248, 0.1)`
  }
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0
  }
}));

const BulkBookingSection: React.FC = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Section Header */}
          <Box textAlign="center">
            <GradientText variant="h2" component="h2">
              Bulk Booking Instructions
            </GradientText>
          </Box>

          {/* COVID Alert */}
          <Alert 
            severity="warning" 
            icon={<WarningIcon />}
            sx={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderColor: 'warning.main',
              color: 'warning.main',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: 'warning.main'
              }
            }}
          >
            <Typography variant="body1" fontWeight="500">
              <strong>Important:</strong> In the post COVID period, the planetarium operations have drastically changed. The planetarium now remains closed on almost all public holidays.
            </Typography>
          </Alert>

          {/* Instruction Cards */}
          <Stack spacing={4}>
            {/* School Group Bookings */}
            <InstructionCard>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <StarIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="600" color="text.primary">
                    School Group Bookings
                  </Typography>
                </Box>
                
                <Stack spacing={2}>
                  <BulletPoint>
                    <StarIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      Schools may opt for other show timings during normal working hours only if they have group strengths of minimum 125 students.
                    </Typography>
                  </BulletPoint>
                  
                  <BulletPoint>
                    <StarIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      Student groups availing the concessional rate must submit a request letter on an institutional letter head while visiting the planetarium.
                    </Typography>
                  </BulletPoint>
                  
                  <BulletPoint>
                    <StarIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      All planetarium shows are in Hindi.
                    </Typography>
                  </BulletPoint>
                </Stack>
              </CardContent>
            </InstructionCard>

            {/* Payment & Booking */}
            <InstructionCard>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <PaymentIcon sx={{ color: 'success.main', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="600" color="text.primary">
                    Payment & Booking
                  </Typography>
                </Box>
                
                <Stack spacing={3}>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Schools may make an advance payment using the QR code provided and put up a request for the intended shows. However, payment using the QR code does not guarantee a booking.
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    <Typography variant="body1" color="error.main" fontWeight="600">
                      Important: The booking gets finalised only when a confirmation mail is received from the administration.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </InstructionCard>
          </Stack>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default BulkBookingSection;