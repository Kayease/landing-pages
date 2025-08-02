/**
 * VELOX Documentation JavaScript
 * Enhanced UI interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader
    initPageLoader();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
    
    // Initialize smooth scrolling for sidebar links
    initSmoothScrolling();
    
    // Initialize enhanced interactions
    initEnhancedInteractions();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scroll to top button
    initScrollToTop();
});

/**
 * Page Loader Animation
 */
function initPageLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    if (loader) {
        // Hide loader after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

/**
 * Smooth Scrolling for Navigation
 */
function initSmoothScrolling() {
    // Add smooth scrolling to any anchor links if needed
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 120;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Enhanced Interactions
 */
function initEnhancedInteractions() {
    // Feature cards 3D tilt effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) perspective(1000px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Code block copy functionality
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy to clipboard';
        
        copyBtn.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = '#28a745';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.background = '';
                }, 2000);
            });
        });
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
    });
}

/**
 * Tab Animations
 */
function initTabAnimations() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            
            if (targetPane) {
                // Add entrance animation
                setTimeout(() => {
                    targetPane.style.animation = 'fadeInUp 0.6s ease-out';
                }, 150);
            }
        });
    });
}

/**
 * Scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .section-title, .hero-content');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Utility Functions
 */

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }, 16));
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize scroll animations with throttling
window.addEventListener('scroll', throttle(function() {
    // Add any scroll-based animations here
}, 16)); // ~60fps