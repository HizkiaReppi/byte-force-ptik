import Aos from 'aos';
import { navbarItem, benefitsList, testimonialsData, blogs } from './data.js';

// Membuat elemen-elemen HTML
const createNavbar = () => {
  const navbarContainer = document.querySelector(".navbar-list");

  navbarItem.forEach((item) => {
    const navbarList = document.createElement("li");
    const navbarLink = document.createElement("a");

    navbarLink.setAttribute("href", `#${item.toLowerCase()}`);
    navbarLink.classList.add("navbar-link");
    navbarLink.textContent = item;

    navbarList.appendChild(navbarLink);
    navbarContainer.appendChild(navbarList);
  });
};

const createBenefits = () => {
  const benefitsContainer = document.querySelector(".benefit-list");

  benefitsList.forEach((item) => {
    const benefitsItem = document.createElement("li");

    benefitsItem.innerHTML = `
      <div class="benefit-card" data-aos="zoom-in" data-aos-duration="2000">
        <div class="card-icon">
          <i class="fas ${item.icon}"></i>
        </div>
        <h3 class="h3 card-title">${item.title}</h3>
        <p class="card-text">
          ${item.description}
        </p>
      </div>
    `;

    benefitsContainer.appendChild(benefitsItem);
  });
};

const createTestimonials = () => {
  const testimonialsLists = document.querySelector('.testimonials-testRow');

  testimonialsData.map((item) => {
    const testimonialsItem = document.createElement('div');
    testimonialsItem.classList.add('testimonials-testItem');
    testimonialsItem.innerHTML = `
      <img src="https://raw.githubusercontent.com/HizkiaReppi/byte-force-ptik/main/src/img/${item.photo}">
      <h3>${item.name}</h3>
      <h4>${item.job}</h4>
      <p>${item.description}</p>
    `;
    testimonialsItem.setAttribute('data-aos', 'zoom-in')
    testimonialsItem.setAttribute('data-aos-duration', '2000')
    testimonialsLists.appendChild(testimonialsItem);
  });
};

const createBlogs = () => {
  const blogList = document.getElementById("blog-list");

  blogs.map((blog) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="blog-card" data-aos="zoom-in">
        <figure class="blog-banner">
          <img src="https://raw.githubusercontent.com/HizkiaReppi/byte-force-ptik/main/src/img/blog-banner-${blog.id}.jpg" alt="${blog.title}">
        </figure>
        <div class="blog-meta">
          <span>
            <i class="fa fa-calendar"></i>
            <time datetime="${blog.published_at}">${blog.published_at}</time>
          </span>
          <span>
            <i class="fa fa-user"></i>
            <p>${blog.author}</p>
          </span>
        </div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-text">${blog.content}</p>
        <a href="#" class="blog-link-btn">
          <span>Baca Selengkapnya</span>
        </a>
      </div>
    `;

    blogList.appendChild(li);
  });
};

// Menjalankan fungsi-fungsi untuk membuat elemen-elemen HTML
createNavbar();
createBenefits();
createTestimonials();
createBlogs();

// Toogle Navbar
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});

// Access the testimonials and indicators
const testSlide = document.querySelectorAll('.testimonials-testItem');
const dots = document.querySelectorAll('.dot');

let counter = 0;
let deleteInterval;

// Add click event to the indicators
function switchTest(currentTest) {
  const testId = parseInt(currentTest.getAttribute('attr'));

  if (testId === counter) return; // Do nothing if the same testimonial is clicked

  const animationDirection = testId > counter ? 'next' : 'prev';
  testSlide[counter].style.animation = `${animationDirection}1 0.5s ease-in forwards`;

  counter = testId;

  testSlide[counter].style.animation = `${animationDirection}2 0.5s ease-in forwards`;

  indicators();
}

// Add and remove active class from the indicators
function indicators() {
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === counter) {
      dot.classList.add('active');
    }
  });
}

// Code for auto sliding
function slideNext() {
  const animationDirection = 'next';
  testSlide[counter].style.animation = `${animationDirection}1 0.5s ease-in forwards`;

  counter = (counter + 1) % testSlide.length;

  testSlide[counter].style.animation = `${animationDirection}2 0.5s ease-in forwards`;

  indicators();
}

function autoSliding() {
  deleteInterval = setInterval(() => {
    slideNext();
  }, 5000);
}

// Start auto sliding when the page loads
document.addEventListener('DOMContentLoaded', () => {
  autoSliding();

  // Stop auto sliding when mouse is over the indicators
  const container = document.querySelector('.indicators');
  container.addEventListener('mouseover', () => {
    clearInterval(deleteInterval);
  });

  // Resume sliding when mouse is out of the indicators
  container.addEventListener('mouseout', () => {
    autoSliding();
  });

  // Add click event to the indicators
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      switchTest(dot);
    });
  });
});


// Copyright
const copyright = document.querySelector('.copyright');
let currentYear = new Date().getFullYear()

copyright.textContent = `© ${currentYear} BYTE FORCE PTIK. All Right Reserved`

Aos.init({
  duration: 2000,
  easing: 'ease-in-out',
})
