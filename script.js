// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Accordion FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
let animated = false;

const animateCounters = () => {
    const section = document.getElementById('chiffres');
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && !animated) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
        animated = true;
    }
};

window.addEventListener('scroll', animateCounters);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formFeedback.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
        formFeedback.style.display = 'none';
    }, 5000);
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- ANIMATIONS AU DÉFILEMENT (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // L'animation se déclenche quand 15% de l'élément est visible
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stoppe l'observation une fois l'élément apparu (animation jouée une seule fois)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Sélectionne tous les éléments avec la classe .fade-up et les observe
document.querySelectorAll('.fade-up').forEach(el => {
    scrollObserver.observe(el);
});
