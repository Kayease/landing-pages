// KayEase Global - Portfolio JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Typewriter effect
const typewriterText = [
    'Full Stack Developer',
    'UI/UX Enthusiast', 
    'Problem Solver',
    'Creative Thinker',
    'Tech Innovator'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentText = typewriterText[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterText.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
if (typewriterElement) {
    typeWriter();
}

// Enhanced Skills animation with progress tracking
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        const percentage = skillPercentages[index];
        
        if (!width || !percentage) return;
        
        // Animate the progress bar
        setTimeout(() => {
            bar.style.width = width + '%';
            
            // Animate percentage counter
            let currentPercent = 0;
            const targetPercent = parseInt(width);
            const increment = targetPercent / 50;
            
            const counter = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= targetPercent) {
                    currentPercent = targetPercent;
                    clearInterval(counter);
                }
                percentage.textContent = Math.round(currentPercent) + '%';
            }, 40);
        }, index * 200);
    });
}

// Skills section observer
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);
}

// Enhanced Portfolio Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselContainer = document.getElementById('carousel-container');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

function updateCarousel() {
    if (!carouselContainer) return;
    
    const translateX = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators with enhanced animation
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
            indicator.style.transform = 'scale(1.3)';
        } else {
            indicator.classList.remove('active');
            indicator.style.transform = 'scale(1)';
        }
    });
    
    // Add slide transition effects
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.opacity = '1';
            slide.style.transform = 'scale(1)';
        } else {
            slide.style.opacity = '0.8';
            slide.style.transform = 'scale(0.95)';
        }
    });
}

function nextSlide() {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        updateCarousel();
    }
}

// Enhanced carousel event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Auto-play carousel with enhanced controls
let autoPlayInterval = null;

function startAutoPlay() {
    if (totalSlides > 1) {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Start auto-play
startAutoPlay();

// Pause auto-play on hover with enhanced UX
const carousel = document.querySelector('.portfolio-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        stopAutoPlay();
        carousel.style.cursor = 'pointer';
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
        carousel.style.cursor = 'default';
    });
}

// Enhanced touch/swipe support for mobile
let startX = 0;
let endX = 0;
let isDragging = false;

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });

    carousel.addEventListener('touchend', (e) => {
        if (isDragging) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
            isDragging = false;
            startAutoPlay();
        }
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Enhanced Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Contact form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();

        // Enhanced validation
        if (!nameValue || !emailValue || !subjectValue || !messageValue) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(emailValue)) {
            showNotification('Please enter a valid email address', 'error');
            email.focus();
            return;
        }

        if (nameValue.length < 2) {
            showNotification('Name must be at least 2 characters long', 'error');
            name.focus();
            return;
        }

        if (subjectValue.length < 5) {
            showNotification('Subject must be at least 5 characters long', 'error');
            subject.focus();
            return;
        }

        if (messageValue.length < 10) {
            showNotification('Message must be at least 10 characters long', 'error');
            message.focus();
            return;
        }

        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Enhanced loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--primary-color)';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('skill-item') || 
                entry.target.classList.contains('testimonial-card')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.skill-item, .testimonial-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enhanced particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Limit particles for better performance
    const particleCount = window.innerWidth < 768 ? 20 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles only on desktop
if (window.innerWidth >= 768) {
    createParticles();
}

// Enhanced mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10001;
        transition: width 0.1s ease;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    let ticking = false;
    
    function updateProgress() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });
}

createScrollProgress();

// Enhanced performance optimization
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced accessibility features
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Initialize AOS after page load
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // Could add error reporting here
});

// Enhanced theme support (for future dark mode implementation)
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Enhanced analytics tracking (placeholder for future implementation)
function trackEvent(eventName, data = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, data);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        trackEvent('navigation_click', { target: e.target.getAttribute('href') });
    }
    
    if (e.target.closest('.carousel-link')) {
        trackEvent('portfolio_click', { 
            action: e.target.closest('.carousel-link').classList.contains('primary') ? 'demo' : 'code' 
        });
    }
    
    if (e.target.closest('.btn-submit')) {
        trackEvent('contact_form_submit');
    }
});

console.log('🎨 KayEase Global Portfolio - Enhanced JavaScript Loaded Successfully!'); 