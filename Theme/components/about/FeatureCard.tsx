import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SvgIconComponent } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.5)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid rgba(${theme.palette.mode === 'dark' ? '71, 85, 105' : '203, 213, 225'}, 0.3)`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 25px 50px rgba(59, 130, 248, 0.25)`,
    background: `rgba(${theme.palette.mode === 'dark' ? '30, 41, 59' : '248, 250, 252'}, 0.7)`,
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    }
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.shape.borderRadius * 1.5,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.shape.borderRadius * 1.5,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover::after': {
    opacity: 0.3
  }
}));

interface FeatureCardProps {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <IconContainer className="feature-icon">
          <Icon sx={{ color: 'white', fontSize: 28 }} />
        </IconContainer>
        
        <Typography 
          variant="h6" 
          component="h3" 
          color="text.primary"
          fontWeight="600"
          sx={{ mb: 1.5 }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default FeatureCard;