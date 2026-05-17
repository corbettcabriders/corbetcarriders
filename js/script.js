// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  
  if(window.scrollY > 50) {
    header.style.background = '#081c15';
  }
  else {
    header.style.background = 'rgba(26, 77, 46, 0.9)';
  }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const phone = this.querySelector('input[placeholder="Your Phone"]').value;
    const message = this.querySelector('textarea[placeholder="Your Message"]').value;
    
    // Validate form
    if (name && email && phone && message) {
      // Create WhatsApp message
      const whatsappMessage = `Hello! I'm ${name}.\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
      const whatsappLink = `https://wa.me/917017698685?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappLink, '_blank');
      
      // Reset form
      this.reset();
      alert('Thank you! Your message will be sent via WhatsApp.');
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Mobile menu toggle (if needed in future)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    navbar.classList.toggle('active');
  });
}

// Close mobile menu when link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function() {
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply observer to service cards, fleet cards, etc.
document.querySelectorAll('.service-card, .fleet-card, .destination-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Phone number click handler
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', function(e) {
    // Allow default behavior on mobile devices
    if (!/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i.test(navigator.userAgent)) {
      e.preventDefault();
      alert('Please use a phone to make calls or install WhatsApp.');
    }
  });
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

// Prevent multiple form submissions
if (contactForm) {
  let isSubmitting = false;
  contactForm.addEventListener('submit', function(e) {
    if (isSubmitting) {
      e.preventDefault();
      return false;
    }
    isSubmitting = true;
    setTimeout(() => {
      isSubmitting = false;
    }, 2000);
  });
}