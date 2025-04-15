document.addEventListener('DOMContentLoaded', function() {
    // Page Transition Elements
    const pageTransition = document.querySelector('.page-transition');
    const pageTransitionLeft = document.querySelector('.page-transition-left');
    const pageTransitionRight = document.querySelector('.page-transition-right');
    
    // Get all internal links (excluding anchors, mailto, tel links)
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    // Don't apply transitions for external links
    links.forEach(link => {
        // Only apply transitions for internal links
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Don't transition if it's the current page
                if (href === window.location.pathname) return;
                
                e.preventDefault();
                
                // Get transition direction
                const currentIndex = getPageIndex(window.location.pathname);
                const targetIndex = getPageIndex(href);
                const direction = targetIndex > currentIndex ? 'right' : 'left';
                
                // Play the transition animation based on direction
                if (direction === 'right') {
                    // Move from right to left (next page)
                    pageTransitionLeft.style.transform = 'translateX(0)';
                    pageTransitionRight.style.transform = 'translateX(0)';
                    pageTransitionLeft.style.animation = 'slideInLeft 0.5s ease forwards';
                    pageTransitionRight.style.animation = 'slideInRight 0.5s ease forwards';
                } else {
                    // Move from left to right (previous page)
                    pageTransitionLeft.style.transform = 'translateX(0)';
                    pageTransitionRight.style.transform = 'translateX(0)';
                    pageTransitionLeft.style.animation = 'slideInLeft 0.5s ease forwards';
                    pageTransitionRight.style.animation = 'slideInRight 0.5s ease forwards';
                }
                
                // Wait for animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });
    
    // When page loads, play exit animation
    window.addEventListener('load', () => {
        // Only play animation if we came from an internal page
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            pageTransitionLeft.style.transform = 'translateX(0)';
            pageTransitionRight.style.transform = 'translateX(0)';
            pageTransitionLeft.style.animation = 'slideOutLeft 0.5s ease forwards';
            pageTransitionRight.style.animation = 'slideOutRight 0.5s ease forwards';
        } else {
            // Hide the transition elements for direct page loads
            pageTransitionLeft.style.display = 'none';
            pageTransitionRight.style.display = 'none';
        }
    });
    
    // Add gallery filtering functionality (for Gallery page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
    
    // Helper function to determine page index for direction
    function getPageIndex(path) {
        const pages = ['/index.html', '/events.html', '/gallery.html', '/about.html', '/contact.html'];
        
        // Handle root path
        if (path === '/' || path === '') {
            return 0;
        }
        
        // Find the page index
        const index = pages.findIndex(page => path.endsWith(page));
        return index !== -1 ? index : 0;
    }
});

// Initialize AOS animations on all pages
function initAOS() {
    // Find all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            } else {
                // Optional: remove the class when element is not visible
                // entry.target.classList.remove('aos-animate');
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

// Call the initAOS function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initAOS);
