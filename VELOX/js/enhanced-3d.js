// VELOX Enhanced 3D Effects and Animations
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Enhanced 3D Tilt Effects for Product Cards
    function init3DTiltEffects() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Enhanced 3D Tilt Effects for Contact Cards
    function initContactCard3D() {
        const contactCards = document.querySelectorAll('.contact-info-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                this.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    perspective(1000px)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    // Enhanced 3D Tilt Effects for Team Cards
    function initTeamCard3D() {
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;
                
                this.style.transform = `
                    translateY(-10px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Enhanced 3D Tilt Effects for Value Cards
    function initValueCard3D() {
        const valueCards = document.querySelectorAll('.value-card');
        
        valueCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `
                    translateY(-10px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.05)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Parallax Effect for Page Headers
    function initParallaxHeaders() {
        const pageHeaders = document.querySelectorAll('.page-header');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            pageHeaders.forEach(header => {
                const rate = scrolled * -0.5;
                header.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Enhanced Filter Animation
    function initEnhancedFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Animate products out
                productItems.forEach((item, index) => {
                    setTimeout(() => {
                        const category = item.getAttribute('data-category');
                        
                        if (filter === 'all' || category === filter) {
                            item.classList.remove('hidden');
                            item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
                        } else {
                            item.classList.add('hidden');
                            item.style.animation = `fadeOutDown 0.3s ease forwards`;
                        }
                    }, index * 50);
                });
            });
        });
    }

    // Enhanced Form Interactions
    function initEnhancedForms() {
        const formInputs = document.querySelectorAll('.form-control, .form-select');
        
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                this.style.transform = 'translateY(0)';
            });
            
            // Add typing effects
            input.addEventListener('input', function() {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 0, 0, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: inputRipple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.parentElement.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Enhanced Button Interactions
    function initEnhancedButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-1px) scale(1.02)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
        });
    }

    // Enhanced FAQ Interactions
    function initEnhancedFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqQuestions.forEach(q => {
                    if (q !== this) {
                        q.setAttribute('aria-expanded', 'false');
                        q.parentElement.classList.remove('active');
                    }
                });
                
                // Toggle current item
                this.setAttribute('aria-expanded', !isActive);
                faqItem.classList.toggle('active');
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 0, 0, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: faqRipple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Enhanced Counter Animation with 3D Effect
    function initEnhancedCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            counter.style.transform = `scale(${1 + (count / target) * 0.1})`;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                            counter.style.transform = 'scale(1)';
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Enhanced Scroll Animations
    function initEnhancedScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('aos-animate');
                    
                    // Add additional 3D transform
                    setTimeout(() => {
                        element.style.transform += ' translateZ(0)';
                    }, 100);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes fadeOutDown {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
        }
        
        @keyframes inputRipple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        @keyframes faqRipple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        .product-card,
        .contact-info-card,
        .team-card,
        .value-card {
            transform-style: preserve-3d;
            backface-visibility: hidden;
        }
        
        .form-group.focused .form-label {
            color: #ff0000;
            transform: translateY(-2px);
        }
        
        .faq-item.active .faq-question {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
    `;
    document.head.appendChild(style);

    // Initialize all enhanced effects
    init3DTiltEffects();
    initContactCard3D();
    initTeamCard3D();
    initValueCard3D();
    initParallaxHeaders();
    initEnhancedFilters();
    initEnhancedForms();
    initEnhancedButtons();
    initEnhancedFAQ();
    initEnhancedCounters();
    initEnhancedScrollAnimations();

    // Add smooth transitions to all elements
    document.body.style.cssText += `
        * {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    `;
});