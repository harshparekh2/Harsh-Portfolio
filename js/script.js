// AI/ML Portfolio JavaScript
(function() {
    'use strict';

    // DOM elements
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const progressBars = document.querySelectorAll('.progress-bar');
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeAnimations();
        initializeSkillBars();
        initializeCounters();
        initializeContactForm();
        initializeScrollAnimations();
        initializeTypingEffect();
        initializeParticles();
    });

    // Navigation functionality
    function initializeNavigation() {
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            
            // Update active navigation link
            updateActiveNavLink();
        });

        // Mobile menu close on link click
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Initialize scroll animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('skill-card')) {
                        animateSkillCard(entry.target);
                    } else if (entry.target.classList.contains('project-card')) {
                        animateProjectCard(entry.target);
                    } else if (entry.target.querySelector('.stat-number')) {
                        animateCounter(entry.target.querySelector('.stat-number'));
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-form, .stat-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Initialize skill progress bars
    function initializeSkillBars() {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Initialize counters
    function initializeCounters() {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        statNumbers.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Animate counter numbers
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Animate skill cards
    function animateSkillCard(card) {
        const delay = Array.from(skillCards).indexOf(card) * 100;
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, delay);
    }

    // Animate project cards
    function animateProjectCard(card) {
        const delay = Array.from(projectCards).indexOf(card) * 150;
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, delay);
    }

    // Initialize contact form
    function initializeContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }

    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Validate all fields
        const isValid = validateForm();
        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoader.classList.remove('d-none');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission();
            showSuccess('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        } catch (error) {
            showError('Failed to send message. Please try again later.');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
            btnText.style.display = 'inline';
            btnLoader.classList.add('d-none');
            submitBtn.disabled = false;
        }
    }

    // Validate entire form
    function validateForm() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);

        // Required field check
        if (!value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
            isValid = false;
        } else {
            // Specific validation based on field type
            switch (fieldName) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address.';
                        isValid = false;
                    }
                    break;
                case 'name':
                    if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long.';
                        isValid = false;
                    }
                    break;
                case 'subject':
                    if (value.length < 5) {
                        errorMessage = 'Subject must be at least 5 characters long.';
                        isValid = false;
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters long.';
                        isValid = false;
                    }
                    break;
            }
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        const errorDiv = field.parentNode.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = message;
        contactForm.parentNode.insertBefore(successDiv, contactForm);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.textContent = message;
        contactForm.parentNode.insertBefore(errorDiv, contactForm);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    // Initialize typing effect for hero title
    function initializeTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Hi, I\'m an AI/ML',
            'Hi, I\'m a Data Scientist',
            'Hi, I\'m a Tech Enthusiast',
            'Hi, I\'m an AI/ML'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isWaiting) {
                setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    typeText();
                }, 2000);
                return;
            }

            if (isDeleting) {
                charIndex--;
                typingElement.textContent = currentText.substring(0, charIndex);
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            } else {
                charIndex++;
                typingElement.textContent = currentText.substring(0, charIndex);
                
                if (charIndex === currentText.length) {
                    isWaiting = true;
                }
            }

            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeText, typingSpeed);
        }

        // Start typing effect
        setTimeout(typeText, 1000);
    }

    // Initialize general animations
    function initializeAnimations() {
        // Add entrance animations to elements
        setTimeout(() => {
            document.querySelectorAll('.hero-content').forEach(el => {
                el.classList.add('fade-in-up');
            });
        }, 500);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-section');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Floating elements animation
        animateFloatingElements();
    }

    // Animate floating elements
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            // Set random initial positions
            const randomDelay = Math.random() * 2;
            const randomDuration = 4 + Math.random() * 4;
            
            element.style.animationDelay = `${randomDelay}s`;
            element.style.animationDuration = `${randomDuration}s`;
            
            // Add mouseover effects
            element.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.2)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize particle effect (optional enhancement)
    function initializeParticles() {
        // Simple particle system for hero background
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        heroSection.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }

    // Create individual particle
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(79, 70, 229, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle(container);
            }
        }, (5 + Math.random() * 10) * 1000);
    }

    // Utility functions
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
        };
    }

    // Performance optimized scroll handler
    const optimizedScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 100);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Resize handler for responsive animations
    window.addEventListener('resize', debounce(() => {
        // Recalculate animations on resize
        initializeScrollAnimations();
    }, 250));

    // Preload images and assets
    function preloadAssets() {
        // Preload any images or assets here
        const assets = [
            // Add any image URLs here
        ];

        assets.forEach(asset => {
            const img = new Image();
            img.src = asset;
        });
    }

    // Initialize preloading
    preloadAssets();

    // Export functions for potential external use
    window.portfolioJS = {
        updateActiveNavLink,
        validateForm,
        animateCounter,
        showSuccess,
        showError
    };

})();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Add smooth reveal animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.documentElement.style.setProperty('--transition-duration', '0s');
}

// Console easter egg
console.log(`
🚀 Welcome to my AI/ML Portfolio!
📧 Contact: your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub: github.com/yourusername

Built with ❤️ using HTML, CSS, JavaScript & Bootstrap
`);
