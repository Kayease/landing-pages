// VELOX Shoes Showcase - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader with VELOX swoosh animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-wrapper');
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // Longer loading time for VELOX effect
    });

    // Initialize AOS animations with custom settings
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 100
    });

    // Initialize Vanilla Tilt for product images
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 20,
            speed: 400,
            glare: true,
            'max-glare': 0.2,
            perspective: 1000
        });
    }

    // Initialize Typed.js for hero section with VELOX-themed text
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: ['SPEED', 'POWER', 'POTENTIAL', 'VELOCITY'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Enhanced Sticky Header with VELOX branding
    function stickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Run on scroll and on initial load
    window.addEventListener('scroll', stickyHeader);
    stickyHeader();

    // Smooth scroll for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // Calculate position
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                // Scroll smoothly
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });

    // Enhanced counter animation for statistics
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 150; // Slower animation for better effect
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 15);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.collection-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Technology card interactive effects
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced form validation with modern styling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add floating label effects
        const formInputs = contactForm.querySelectorAll('.form-control-modern');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Add typing animation effect
            input.addEventListener('input', function() {
                const formLine = this.parentElement.querySelector('.form-line');
                if (formLine) {
                    formLine.style.width = '100%';
                    setTimeout(() => {
                        if (!this.matches(':focus')) {
                            formLine.style.width = '0';
                        }
                    }, 300);
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset previous error states
            [name, email, subject, message].forEach(field => {
                field.classList.remove('is-invalid');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                subject.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                isValid = false;
            }
            
            // If form is valid, show success animation
            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn-submit-modern');
                const btnText = submitBtn.querySelector('.btn-text');
                const originalText = btnText.innerHTML;
                
                // VELOX-style success animation
                btnText.innerHTML = '<i class="fas fa-check"></i> SPEED DELIVERED!';
                submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                submitBtn.disabled = true;
                
                // Add ripple effect
                const ripple = submitBtn.querySelector('.btn-ripple');
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                
                // Reset form and button after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    btnText.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                    
                    // Reset form labels
                    formInputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                }, 3000);
            }
        });
    }

    // Enhanced back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add VELOX swoosh animation to button
            this.style.transform = 'rotate(360deg) scale(1.2)';
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset button animation
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    }

    // Enhanced navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section nav link
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroShoe = document.querySelector('.hero-shoe');
        const geometricShapes = document.querySelectorAll('.geometric-shape');
        
        if (heroShoe) {
            heroShoe.style.transform = `translateY(${scrolled * 0.3}px) rotateY(${scrolled * 0.1}deg)`;
        }
        
        geometricShapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${45 + scrolled * 0.1}deg)`;
        });
    });



    // Enhanced testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card-modern');
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add glowing effect
            this.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)';
            
            // Animate stars
            const stars = this.querySelectorAll('.rating i');
            stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.3) rotate(360deg)';
                    star.style.color = '#ffd700';
                }, starIndex * 100);
            });
            
            // Animate sport icon
            const sportIcon = this.querySelector('.sport-icon');
            if (sportIcon) {
                sportIcon.style.transform = 'scale(1.5) rotate(360deg)';
                sportIcon.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            // Reset stars
            const stars = this.querySelectorAll('.rating i');
            stars.forEach(star => {
                star.style.transform = 'scale(1) rotate(0deg)';
                star.style.color = '#ffd700';
            });
            
            // Reset sport icon
            const sportIcon = this.querySelector('.sport-icon');
            if (sportIcon) {
                sportIcon.style.transform = 'scale(1) rotate(0deg)';
                sportIcon.style.filter = 'none';
            }
        });
    });

    // Contact info cards enhanced animations
    const contactInfoCards = document.querySelectorAll('.contact-info-card');
    contactInfoCards.forEach(card => {
        let typeWriterInterval = null;
        let originalHTML = null;
        card.addEventListener('mouseenter', function() {
            // Add pulsing effect to icon
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s ease-in-out infinite';
            }
            // Add typing effect to text (preserve <br> and formatting)
            const details = this.querySelector('.contact-details p');
            if (details) {
                if (!originalHTML) originalHTML = details.innerHTML;
                const html = originalHTML;
                // Split by <br> to animate line by line
                const lines = html.split(/<br\s*\/?\s*>/i);
                details.innerHTML = '';
                let lineIdx = 0;
                function typeLine() {
                    if (lineIdx >= lines.length) return;
                    let charIdx = 0;
                    const line = lines[lineIdx];
                    const span = document.createElement('span');
                    details.appendChild(span);
                    function typeChar() {
                        if (charIdx < line.length) {
                            span.textContent += line.charAt(charIdx);
                            charIdx++;
                            typeWriterInterval = setTimeout(typeChar, 18);
                        } else {
                            if (lineIdx < lines.length - 1) details.appendChild(document.createElement('br'));
                            lineIdx++;
                            typeWriterInterval = setTimeout(typeLine, 120);
                        }
                    }
                    typeChar();
                }
                typeLine();
            }
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = '';
            }
            const details = this.querySelector('.contact-details p');
            if (details && originalHTML) {
                details.innerHTML = originalHTML;
            }
            if (typeWriterInterval) {
                clearTimeout(typeWriterInterval);
                typeWriterInterval = null;
            }
        });
    });

    // Product quick view functionality
    const quickViewBtns = document.querySelectorAll('.product-overlay .btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // VELOX-style quick view animation
            this.innerHTML = '<i class="fas fa-eye"></i> VIEWING...';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-eye"></i> Quick View';
                this.style.transform = 'scale(1)';
                
                // Here you would typically open a modal or navigate to product page
                alert('Quick view functionality - would open product details modal');
            }, 800);
        });
    });

    // Carousel auto-play enhancement
    const athleteCarousel = document.getElementById('athleteCarousel');
    if (athleteCarousel) {
        // Pause carousel on hover
        athleteCarousel.addEventListener('mouseenter', function() {
            const carousel = bootstrap.Carousel.getInstance(this);
            if (carousel) {
                carousel.pause();
            }
        });
        
        // Resume carousel when mouse leaves
        athleteCarousel.addEventListener('mouseleave', function() {
            const carousel = bootstrap.Carousel.getInstance(this);
            if (carousel) {
                carousel.cycle();
            }
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.transition = 'all 0.5s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // VELOX-style page transitions
    const pageLinks = document.querySelectorAll('a:not([href^="#"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                
                // Add VELOX swoosh transition effect
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    z-index: 9999;
                    transition: left 0.5s ease;
                `;
                
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.left = '0';
                }, 10);
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });

    // Add custom cursor for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .tech-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });

    // Performance optimization: Debounce scroll events
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

    // Apply debouncing to scroll-heavy functions
    const debouncedHighlightNav = debounce(highlightNavItem, 10);
    const debouncedStickyHeader = debounce(stickyHeader, 10);
    
    window.addEventListener('scroll', debouncedHighlightNav);
    window.addEventListener('scroll', debouncedStickyHeader);

    // Add VELOX-style loading states for dynamic content
    function showLoadingState(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> LOADING...';
        element.disabled = true;
        
        return function hideLoadingState() {
            element.innerHTML = originalContent;
            element.disabled = false;
        };
    }

    // Initialize intersection observers for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in animation to elements
    const fadeElements = document.querySelectorAll('.product-card, .tech-card, .athlete-card');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        fadeInObserver.observe(element);
    });

    // Add scroll-triggered animations for sections
    const animatedSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Add specific animations based on section
                const sectionId = entry.target.id;
                switch(sectionId) {
                    case 'products':
                        animateProductCards();
                        break;
                    case 'technology':
                        animateTechCards();
                        break;
                    case 'athletes':
                        animateTestimonials();
                        break;
                    case 'contact':
                        animateContactSection();
                        break;
                }
            }
        });
    }, { threshold: 0.2 });
    
    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    function animateProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 200);
        });
    }
    
    function animateTechCards() {
        const techCards = document.querySelectorAll('.tech-card');
        techCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg) translateZ(0)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }
    
    function animateTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card-modern');
        testimonialCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.opacity = '1';
            }, index * 300);
        });
    }
    
    function animateContactSection() {
        const contactCards = document.querySelectorAll('.contact-info-card');
        const contactForm = document.querySelector('.contact-form-container');
        
        contactCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateX(0) scale(1)';
                card.style.opacity = '1';
            }, index * 200);
        });
        
        setTimeout(() => {
            if (contactForm) {
                contactForm.style.transform = 'translateX(0) scale(1)';
                contactForm.style.opacity = '1';
            }
        }, 600);
    }
    
    // Enhanced loading animation for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Add dynamic background color change on scroll
    window.addEventListener('scroll', function() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = Math.floor(scrollPercent * 360);
        document.documentElement.style.setProperty('--dynamic-bg', `hsl(${hue}, 10%, 98%)`);
    });
    
    console.log('🏃‍♂️ VELOX Shoes Showcase - Enhanced JavaScript Loaded Successfully! Unleash Your Speed! 👟✨');
});