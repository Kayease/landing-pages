// VELOX Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Quick view modal functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));

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
        'thunder-elite': {
            name: 'Thunder Elite Basketball',
            price: '$170',
            description: 'Iconic basketball heritage meets street style. Perfect for both court performance and urban fashion.',
            image: 'assets/images/shoe-3.jpg',
            rating: '4.7',
            features: ['Air Cushioning', 'Leather Upper', 'Basketball Outsole', 'Ankle Support']
        },
        'power-trainer': {
            name: 'Power Trainer',
            price: '$130',
            description: 'Versatile training shoes for all workouts. From weightlifting to HIIT, these shoes provide stability and comfort.',
            image: 'assets/images/shoe-1.jpg',
            rating: '4.6',
            features: ['Stable Platform', 'Breathable Upper', 'Training Outsole', 'Versatile Design']
        },
        'urban-walker': {
            name: 'Urban Walker',
            price: '$110',
            description: 'Comfortable lifestyle shoes for everyday wear. Perfect for walking, casual outings, and daily activities.',
            image: 'assets/images/shoe-2.jpg',
            rating: '4.5',
            features: ['Memory Foam Insole', 'Leather Upper', 'Walking Outsole', 'All-Day Comfort']
        },
        'street-classic': {
            name: 'Street Classic',
            price: '$95',
            description: 'Timeless design meets modern comfort. A classic silhouette with contemporary technology for everyday style.',
            image: 'assets/images/shoe-3.jpg',
            rating: '4.4',
            features: ['Classic Design', 'Comfortable Fit', 'Durable Construction', 'Versatile Style']
        }
    };

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

    function populateQuickViewModal(product) {
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = product.price;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductImage').alt = product.name;
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

    // Product search functionality
    // const searchInput = document.createElement('input');
    // searchInput.type = 'text';
    // searchInput.placeholder = 'Search products...';
    // searchInput.className = 'form-control product-search';
    // searchInput.style.cssText = `
    //     max-width: 300px;
    //     margin: 0 auto 30px;
    //     border-radius: 25px;
    //     padding: 12px 20px;
    //     border: 2px solid #e9ecef;
    //     transition: border-color 0.3s ease;
    // `;

    // // Insert search input before filter buttons
    // const filterSection = document.querySelector('.filter-buttons');
    // if (filterSection) {
    //     filterSection.parentNode.insertBefore(searchInput, filterSection);
    // }

    // searchInput.addEventListener('input', function() {
    //     const searchTerm = this.value.toLowerCase();
        
    //     productItems.forEach(item => {
    //         const productName = item.querySelector('.product-name').textContent.toLowerCase();
    //         const productDescription = item.querySelector('.product-description').textContent.toLowerCase();
            
    //         if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
    //             item.classList.remove('hidden');
    //         } else {
    //             item.classList.add('hidden');
    //         }
    //     });
    // });

    // // Product sorting functionality
    // const sortSelect = document.createElement('select');
    // sortSelect.className = 'form-select product-sort';
    // sortSelect.style.cssText = `
    //     max-width: 200px;
    //     margin: 0 auto 30px;
    //     border-radius: 25px;
    //     padding: 12px 20px;
    //     border: 2px solid #e9ecef;
    //     background-color: white;
    // `;
    // sortSelect.innerHTML = `
    //     <option value="">Sort by</option>
    //     <option value="price-low">Price: Low to High</option>
    //     <option value="price-high">Price: High to Low</option>
    //     <option value="name">Name: A to Z</option>
    //     <option value="rating">Rating: High to Low</option>
    // `;

    // // Insert sort select before search input
    // if (searchInput.parentNode) {
    //     searchInput.parentNode.insertBefore(sortSelect, searchInput);
    // }

    // sortSelect.addEventListener('change', function() {
    //     const sortBy = this.value;
    //     const productsContainer = document.getElementById('productsContainer');
    //     const products = Array.from(productItems);
        
    //     products.sort((a, b) => {
    //         switch(sortBy) {
    //             case 'price-low':
    //                 const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
    //                 const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
    //                 return priceA - priceB;
    //             case 'price-high':
    //                 const priceC = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
    //                 const priceD = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
    //                 return priceD - priceC;
    //             case 'name':
    //                 const nameA = a.querySelector('.product-name').textContent;
    //                 const nameB = b.querySelector('.product-name').textContent;
    //                 return nameA.localeCompare(nameB);
    //             case 'rating':
    //                 const ratingA = parseFloat(a.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));
    //                 const ratingB = parseFloat(b.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));
    //                 return ratingB - ratingA;
    //             default:
    //                 return 0;
    //         }
    //     });
        
    //     // Reorder products in DOM
    //     products.forEach(product => {
    //         productsContainer.appendChild(product);
    //     });
    // });

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

    searchInput.addEventListener('input', function() {
        debouncedSearch(this.value);
    });
}); 