document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const sections = document.querySelectorAll(".section-anchor");
  const reveals = document.querySelectorAll(".reveal");

  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });

  const setActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    [...navLinks, ...mobileLinks].forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  reveals.forEach((element) => revealObserver.observe(element));
});

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {

    if (window.innerWidth <= 640) {

      projectCards.forEach(c => {
        c.classList.remove('active');
      });

      card.classList.add('active');
    }
  });
});
const portfolioScroller = document.querySelector('.portfolio-row-moving');

let isDown = false;
let startX;
let scrollLeft;

portfolioScroller.addEventListener('mousedown', (e) => {
  isDown = true;
  portfolioScroller.classList.add('dragging');
  startX = e.pageX - portfolioScroller.offsetLeft;
  scrollLeft = portfolioScroller.scrollLeft;
});

portfolioScroller.addEventListener('mouseleave', () => {
  isDown = false;
  portfolioScroller.classList.remove('dragging');
});

portfolioScroller.addEventListener('mouseup', () => {
  isDown = false;
  portfolioScroller.classList.remove('dragging');
});

portfolioScroller.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - portfolioScroller.offsetLeft;
  const walk = (x - startX) * 1.4;
  portfolioScroller.scrollLeft = scrollLeft - walk;
});

