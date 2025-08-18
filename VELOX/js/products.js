// VELOX Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('VELOX Products Page JavaScript loaded');

    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    console.log(`Found ${filterButtons.length} filter buttons and ${productItems.length} product items`);

    if (filterButtons.length > 0 && productItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                console.log(`Filtering by: ${filter}`);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                filterProducts(filter);
            });
        });
    }

    function filterProducts(filter) {
        let visibleCount = 0;
        
        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease forwards';
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Show/hide no products message
        const noProductsMessage = document.querySelector('.no-products-message');
        if (visibleCount === 0) {
            if (!noProductsMessage) {
                const message = document.createElement('div');
                message.className = 'no-products-message';
                message.innerHTML = `
                    <div class="text-center">
                        <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                        <h4>No products found</h4>
                        <p>We couldn't find any products in the "${filter}" category.</p>
                        <button class="btn btn-outline-primary mt-3" onclick="document.querySelector('[data-filter=\"all\"]').click()">
                            View All Products
                        </button>
                    </div>
                `;
                document.getElementById('productsContainer').appendChild(message);
                setTimeout(() => message.classList.add('show'), 100);
            } else {
                noProductsMessage.classList.add('show');
            }
        } else {
            if (noProductsMessage) {
                noProductsMessage.classList.remove('show');
                setTimeout(() => {
                    if (noProductsMessage.parentNode) {
                        noProductsMessage.parentNode.removeChild(noProductsMessage);
                    }
                }, 300);
            }
        }
        
        console.log(`Filtered to show ${visibleCount} products in ${filter} category`);
    }

    // Quick view modal functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModalElement = document.getElementById('quickViewModal');
    const quickViewModal = quickViewModalElement ? new bootstrap.Modal(quickViewModalElement) : null;

    console.log(`Found ${quickViewButtons.length} quick view buttons`);

    // Product data for quick view
    const productData = {
        'velocity-pro': {
            name: 'Velocity Pro Running',
            price: '$150',
            description: 'Maximum comfort with visible VeloFoam cushioning. Designed for long-distance running with superior energy return and lightweight construction.',
            image: 'assets/images/shoe-1.jpg',
            rating: '4.8',
            features: ['VeloFoam Cushioning', 'Breathable Mesh Upper', 'Rubber Outsole', 'Lightweight Design']
        },
        'sprint-elite': {
            name: 'Sprint Elite',
            price: '$140',
            description: 'Lightweight racing shoes for elite performance. Engineered for speed with minimal weight and maximum responsiveness.',
            image: 'assets/images/shoe-2.jpg',
            rating: '4.9',
            features: ['Carbon Fiber Plate', 'Lightweight Mesh', 'Racing Outsole', 'Elite Performance']
        },
        'marathon-pro': {
            name: 'Marathon Pro',
            price: '$165',
            description: 'Long-distance running shoes with maximum cushioning. Perfect for marathon training and endurance running.',
            image: 'assets/images/user.jpg',
            rating: '4.7',
            features: ['Maximum Cushioning', 'Breathable Upper', 'Durable Outsole', 'Long-Distance Comfort']
        },
        'thunder-elite': {
            name: 'Thunder Elite Basketball',
            price: '$170',
            description: 'Iconic basketball heritage meets street style. Perfect for both court performance and urban fashion.',
            image: 'assets/images/shoe-3.jpg',
            rating: '4.7',
            features: ['Air Cushioning', 'Leather Upper', 'Basketball Outsole', 'Ankle Support']
        },
        'court-master-pro': {
            name: 'Court Master Pro',
            price: '$190',
            description: 'Professional basketball performance with ankle support. Designed for competitive play and maximum court control.',
            image: 'assets/images/shoe-1.jpg',
            rating: '4.9',
            features: ['Ankle Support', 'Professional Grade', 'Court Control', 'Competitive Design']
        },
        'street-hoops': {
            name: 'Street Hoops',
            price: '$145',
            description: 'Urban basketball style meets court performance. Perfect for street basketball and casual play.',
            image: 'assets/images/shoe-2.jpg',
            rating: '4.5',
            features: ['Urban Style', 'Street Performance', 'Casual Design', 'Versatile Use']
        },
        'power-trainer': {
            name: 'Power Trainer',
            price: '$130',
            description: 'Versatile training shoes for all workouts. From weightlifting to HIIT, these shoes provide stability and comfort.',
            image: 'assets/images/premium shoes.png',
            rating: '4.6',
            features: ['Stable Platform', 'Breathable Upper', 'Training Outsole', 'Versatile Design']
        },
        'crossfit-elite': {
            name: 'CrossFit Elite',
            price: '$120',
            description: 'High-intensity training shoes for maximum performance. Designed for CrossFit and functional fitness.',
            image: 'assets/images/shoe-3.jpg',
            rating: '4.8',
            features: ['High-Intensity Design', 'Functional Fitness', 'Performance Focus', 'CrossFit Ready']
        },
        'gym-master': {
            name: 'Gym Master',
            price: '$140',
            description: 'Weightlifting and strength training shoes. Perfect for powerlifting and heavy lifting sessions.',
            image: 'assets/images/shoe.png',
            rating: '4.7',
            features: ['Weightlifting Design', 'Stable Platform', 'Heavy Lifting', 'Gym Performance']
        },
        'urban-walker': {
            name: 'Urban Walker',
            price: '$110',
            description: 'Comfortable lifestyle shoes for everyday wear. Perfect for walking, casual outings, and daily activities.',
            image: 'assets/images/shoe.png',
            rating: '4.5',
            features: ['Memory Foam Insole', 'Leather Upper', 'Walking Outsole', 'All-Day Comfort']
        },
        'street-classic': {
            name: 'Street Classic',
            price: '$95',
            description: 'Timeless design meets modern comfort. A classic silhouette with contemporary technology for everyday style.',
            image: 'assets/images/user.jpg',
            rating: '4.4',
            features: ['Classic Design', 'Comfortable Fit', 'Durable Construction', 'Versatile Style']
        },
        'casual-comfort': {
            name: 'Casual Comfort',
            price: '$85',
            description: 'Everyday lifestyle shoes for ultimate comfort. Perfect for casual wear and daily activities.',
            image: 'assets/images/premium shoes.png',
            rating: '4.3',
            features: ['Ultimate Comfort', 'Casual Design', 'Everyday Use', 'Affordable Price']
        }
    };

    if (quickViewButtons.length > 0 && quickViewModal) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product');
                const product = productData[productId];
                
                if (product) {
                    populateQuickViewModal(product);
                    quickViewModal.show();
                }
            });
        });
    }

    function populateQuickViewModal(product) {
        const elements = {
            name: document.getElementById('modalProductName'),
            price: document.getElementById('modalProductPrice'),
            description: document.getElementById('modalProductDescription'),
            image: document.getElementById('modalProductImage'),
            rating: document.getElementById('modalRatingText')
        };

        if (elements.name) elements.name.textContent = product.name;
        if (elements.price) elements.price.textContent = product.price;
        if (elements.description) elements.description.textContent = product.description;
        if (elements.image) {
            elements.image.src = product.image;
            elements.image.alt = product.name;
        }
        if (elements.rating) elements.rating.textContent = `(${product.rating})`;
    }

    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });

        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) {
                this.value = 1;
            }
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show success message
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add loading state
            this.textContent = 'Adding...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Added!';
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.disabled = false;
                }, 1000);
            }, 500);
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 3000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
    }

    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }


    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            padding: 15px 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #28a745;
        }
        
        .notification-info {
            border-left: 4px solid #17a2b8;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            color: #28a745;
            font-size: 1.2rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            margin-left: auto;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        .product-search:focus,
        .product-sort:focus {
            border-color: #ff0000;
            box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
        }
    `;
    document.head.appendChild(notificationStyles);

    // Initialize AOS for products page
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Lazy loading for product images
    const productImages = document.querySelectorAll('.product-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        productImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }

    // Keyboard navigation for filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Accessibility improvements
    quickViewButtons.forEach(button => {
        button.setAttribute('aria-label', 'Quick view product details');
    });

    addToCartButtons.forEach(button => {
        button.setAttribute('aria-label', 'Add product to cart');
    });

    // Performance optimization: Debounce search input
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

    const debouncedSearch = debounce(function(searchTerm) {
        // Search functionality here
    }, 300);

    // searchInput.addEventListener('input', function() {
    //     debouncedSearch(this.value);
    // });
}); 