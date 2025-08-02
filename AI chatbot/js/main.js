// AI Startup - Main JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Create Particles Background Effect
function createParticles(containerId, count = 50) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// Initialize particles
createParticles('particles', 30);
createParticles('particles-newsletter', 20);

// Typing Animation
const typingText = document.getElementById('typing-text');
const words = ['Productivity', 'Innovation', 'Automation', 'Intelligence'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// Start typing animation
typeWriter();

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenu = document.getElementById('close-mobile-menu');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuFunc() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
}

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenuFunc();
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenuFunc();
    }
});

// Header Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Pricing Toggle Functionality
const pricingToggle = document.getElementById('pricing-toggle');
const priceAmounts = document.querySelectorAll('.price-amount');
let isYearly = false;

if (pricingToggle) {
    pricingToggle.addEventListener('click', function() {
        isYearly = !isYearly;
        this.classList.toggle('active');
        
        priceAmounts.forEach(amount => {
            if (amount.dataset.monthly && amount.dataset.yearly) {
                amount.textContent = isYearly ? amount.dataset.yearly : amount.dataset.monthly;
            }
        });
    });
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
const successMessage = document.getElementById('success-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            successMessage.classList.add('show');
            newsletterForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 500);
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
});

// Add scroll progress bar to DOM
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any additional scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler); 