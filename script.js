// Menu Toggle
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Close menu on scroll
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
  
  // Show or hide back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
  
  // Reveal sections on scroll
  revealSections();
};

// Typed.js initialization
const typed = new Typed(".multiple-text", {
  strings: ["Full-stack Developer", "UI/UX Designer", "Web Designer"],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1200,
  loop: true,
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hide');
    
    // Reveal initial visible sections
    revealSections();
  }, 1000);
});

// About Section Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    
    // Remove active class from all buttons and contents
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    document.querySelector(`.${tabId}-tab`).classList.add('active');
  });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.dataset.filter;
    
    projectItems.forEach(item => {
      if (filterValue === 'all' || item.dataset.category.includes(filterValue)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Pagination
const paginationBtns = document.querySelectorAll('.pagination-btn');
const projectsContainer = document.querySelector('.projects-container');
const projectsPerPage = 3;
let currentPage = 1;

// Function to show projects for current page
function showProjects(page) {
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  
  // Hide all projects first
  projectItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100 * (index - startIndex));
    } else {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
}

// Initialize pagination
paginationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active class
    paginationBtns.forEach(btn => btn.classList.remove('active'));
    btn.classList.add('active');
    
    // Show projects for clicked page
    currentPage = parseInt(btn.dataset.page);
    showProjects(currentPage);
  });
});

// Testimonial Slider
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialDots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideCount = testimonialDots.length;

// Function to update slider
function updateSlider() {
  testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update active dot
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Event listeners for dots
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto slide testimonials every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slideCount;
  updateSlider();
}, 5000);

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check if user has a theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  // Toggle icon
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('light-mode')) {
    icon.classList.replace('bx-moon', 'bx-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.replace('bx-sun', 'bx-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// Enhanced scroll reveal animation
function revealSections() {
  const sections = document.querySelectorAll('.section');
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add('show');
      
      // Reveal items within section with staggered delay
      const items = section.querySelectorAll('.skill-card, .services-box, .project-item, .contact-card');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }
  });
}

// Handle active navigation links on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simple form validation
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = '#ff5252';
    return;
  }
  
  // Email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = '#ff5252';
    return;
  }
  
  // Simulate form submission
  formStatus.textContent = 'Sending...';
  
  // In a real application, you'd send the form data to a server here
  // For demo purposes, we'll just simulate a successful submission after a delay
  setTimeout(() => {
    contactForm.reset();
    formStatus.textContent = 'Message sent successfully!';
    formStatus.style.color = '#64ffda';
    
    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  }, 1500);
});

// Custom cursor effect
document.addEventListener('mousemove', function(e) {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursorDot && cursorOutline) {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Add slight delay to outline for effect
    setTimeout(() => {
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 50);
  }
});

// Change cursor size on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .filter-btn, .tab-btn, .pagination-btn, .dot');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorOutline) {
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.opacity = '0.5';
    }
  });
  
  el.addEventListener('mouseleave', () => {
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorOutline) {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.opacity = '1';
    }
  });
});

// Skills cards animation
function initSkillCards() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const icons = card.querySelectorAll('i');
      icons.forEach(icon => {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
      });
    });
    
    card.addEventListener('mouseleave', (e) => {
      const icons = card.querySelectorAll('i');
      icons.forEach(icon => {
        icon.style.transform = 'scale(1)';
      });
    });
  });
}

// Initialize animated items for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const animatedItems = document.querySelectorAll('.skill-card, .services-box, .project-item, .contact-card');
  animatedItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Initialize skill cards
  initSkillCards();
  
  // Initialize projects display
  showProjects(currentPage);
  
  // Initialize testimonial slider
  updateSlider();
  
  // Initialize first visible section
  const firstSection = document.querySelector('#home');
  firstSection.classList.add('show');
  
  // Run initial scroll-based functions
  revealSections();
});