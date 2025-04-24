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
  strings: ["Frontend Developer", "Web Designer", "UI/UX Designer"],
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