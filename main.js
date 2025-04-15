document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Handle email signup form
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // You would normally send this to a server
            // For now, just show an alert
            alert(`Thanks for signing up with ${email}! We'll keep you updated on our adventures.`);
            
            // Clear the input
            this.querySelector('input[type="email"]').value = '';
        });
    }
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize the FAQ accordions (for About page)
    const faqItems = document.querySelectorAll('.faq-question');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const parent = item.parentElement;
                parent.classList.toggle('active');
                
                // Close other FAQs
                document.querySelectorAll('.faq-item').forEach(faq => {
                    if (faq !== parent && faq.classList.contains('active')) {
                        faq.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Apply AOS animations - Animate on scroll
    initAOS();
});

function initAOS() {
    // Find all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            } else {
                entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}