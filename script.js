// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all components
    initLoader();
    initNavigation();
    initThemeToggle();
    initCustomCursor();
    initAnimations();
    initTabs();
    initProjectFilter();
    initContactForm();
    initScrollToTop();
    initScrollIndicator();
    initParallax();
}

// Loader functionality
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        // Start entrance animations after loader disappears
        setTimeout(() => {
            animateOnLoad();
        }, 300);
    }, 1500);
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
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

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            icon.className = 'bx bx-sun';
        } else {
            icon.className = 'bx bx-moon';
        }
    }
}

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth cursor follower animation
    function animateCursorFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursorFollower);
    }
    
    animateCursorFollower();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tab-btn, .filter-btn, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.querySelector(`.${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// UPDATED: Project filter functionality with DOM Reordering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Store original order of project cards
    const originalCards = Array.from(projectCards);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Add filtering class to grid for animation state
            projectsGrid.classList.add('filtering');
            
            // First, fade out all cards
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
            });
            
            // After fade out animation, filter and reflow
            setTimeout(() => {
                let visibleCards = [];
                
                // Determine which cards should be visible
                originalCards.forEach(card => {
                    const categories = card.dataset.category.split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        visibleCards.push(card);
                    }
                });
                
                // Remove all cards from grid temporarily
                while (projectsGrid.firstChild) {
                    projectsGrid.removeChild(projectsGrid.firstChild);
                }
                
                // Add back only visible cards in order
                visibleCards.forEach(card => {
                    projectsGrid.appendChild(card);
                    // Reset styles for proper reflow
                    card.style.display = 'block';
                });
                
                // Animate visible cards back in with stagger effect
                setTimeout(() => {
                    visibleCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100); // Stagger animation by 100ms
                    });
                    
                    // Remove filtering class after all animations complete
                    setTimeout(() => {
                        projectsGrid.classList.remove('filtering');
                    }, visibleCards.length * 100 + 300);
                }, 50);
                
            }, 300); // Wait for fade out to complete
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form) return;
    
    // Initialize EmailJS with your Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!validateForm(data)) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'lahiiru.dananjaya@gmail.com'
        })
        .then(() => {
            showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
    
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return data.name.trim() && 
               data.email.trim() && 
               emailRegex.test(data.email) && 
               data.subject.trim() && 
               data.message.trim();
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
}

// Scroll to top functionality
function initScrollToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Parallax effect for floating elements
function initParallax() {
    const floatingElements = document.querySelectorAll('.float-item');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.blog-card, .project-card, .skill-category, .education-item, .contact-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initial load animations
function animateOnLoad() {
    const titleLines = document.querySelectorAll('.title-line');
    const heroElements = document.querySelectorAll('.hero-description, .hero-stats, .hero-actions, .hero-social');
    
    // Animate title lines
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = `slideUp 0.8s ease ${index * 0.2}s forwards`;
        }, 500);
    });
    
    // Animate other hero elements
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// Smooth scroll for hero scroll indicator
document.addEventListener('DOMContentLoaded', () => {
    const heroScroll = document.querySelector('.hero-scroll');
    
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Add CSS for initial hidden state
const initialStyles = `
    .hero-description,
    .hero-stats,
    .hero-actions,
    .hero-social {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
    
    .blog-card,
    .project-card,
    .skill-category,
    .education-item,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Enhanced project filtering styles */
    .projects-grid {
        transition: all 0.3s ease;
    }
    
    .projects-grid.filtering {
        pointer-events: none;
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
    }
`;

// Inject initial styles
const styleSheet = document.createElement('style');
styleSheet.textContent = initialStyles;
document.head.appendChild(styleSheet);

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

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
}, 100));

// Add resize event listener for responsive handling
window.addEventListener('resize', debounce(() => {
    // Recalculate positions or update layout if needed
    console.log('Window resized');
}, 250));

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'assets/profile1.png',
        'assets/profile.png',
        'assets/blog1.jpg',
        'assets/blog2.jpg',
        'assets/blog3.jpg',
        'assets/blog4.jpg',
        'assets/project1.jpeg',
        'assets/project2.jpeg',
        'assets/project3.png',
        'assets/project4.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();