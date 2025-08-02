// VELOX Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Enhanced Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const newsletter = document.getElementById('newsletter');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Reset validation states
            const inputs = [firstName, lastName, email, phone, subject, message];
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
            });
            
            let isValid = true;
            
            // Validate first name
            if (!firstName.value.trim()) {
                firstName.classList.add('is-invalid');
                isValid = false;
            } else {
                firstName.classList.add('is-valid');
            }
            
            // Validate last name
            if (!lastName.value.trim()) {
                lastName.classList.add('is-invalid');
                isValid = false;
            } else {
                lastName.classList.add('is-valid');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.add('is-valid');
            }
            
            // Validate phone (optional but if provided, should be valid)
            if (phone.value.trim()) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
                    phone.classList.add('is-invalid');
                    isValid = false;
                } else {
                    phone.classList.add('is-valid');
                }
            }
            
            // Validate subject
            if (!subject.value) {
                subject.classList.add('is-invalid');
                isValid = false;
            } else {
                subject.classList.add('is-valid');
            }
            
            // Validate message
            if (!message.value.trim() || message.value.trim().length < 10) {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.add('is-valid');
            }
            
            if (isValid) {
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Add success animation
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('btn-success');
                    
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        inputs.forEach(input => {
                            input.classList.remove('is-valid', 'is-invalid');
                        });
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-primary');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            } else {
                // Shake form on error
                contactForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
            }
        });
    }

    // Success message function
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        successDiv.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    // Enhanced input animations
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.parentElement.classList.add('input-filled');
            } else {
                this.parentElement.classList.remove('input-filled');
            }
        });
    });

    // Contact info card click to copy
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('tel:') || href.startsWith('mailto:')) {
                // Show copied notification
                const notification = document.createElement('div');
                notification.className = 'position-fixed bg-dark text-white px-3 py-2 rounded';
                notification.style.cssText = `
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                notification.textContent = 'Contact info copied to clipboard!';
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.opacity = '1';
                }, 10);
                
                // Copy to clipboard
                const textToCopy = href.replace('tel:', '').replace('mailto:', '');
                navigator.clipboard.writeText(textToCopy).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                });
                
                // Remove notification
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 2000);
            }
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .input-focused .form-label {
            color: #ff0000 !important;
            transform: translateY(-2px);
        }
        
        .input-filled .form-label {
            font-weight: 700;
        }
        
        .form-control.is-valid,
        .form-select.is-valid {
            border-color: #28a745;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }
        
        .form-control.is-invalid,
        .form-select.is-invalid {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
            animation: inputShake 0.3s ease-in-out;
        }
        
        @keyframes inputShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }
        
        .contact-link:hover {
            text-decoration: none !important;
        }
    `;
    document.head.appendChild(style);
});