/**
 * Animation Logic for Fatmabea Spa
 * Handles initial load animations and scroll-triggered reveals.
 */

document.addEventListener("DOMContentLoaded", () => {
    initLoadAnimations();
    initScrollAnimations();
});

function initLoadAnimations() {
    const loadElements = document.querySelectorAll("[data-onload-anim]");
    
    loadElements.forEach(el => {
        const type = el.dataset.onloadAnim;
        // Small timeout to ensure DOM is ready and transition triggers smoothly
        setTimeout(() => {
            if (type === "fade-up") {
                el.classList.add("anim-fade-in-up");
            } else if (type === "fade") {
                el.classList.add("anim-fade-in");
            }
            // Remove init class after animation ensures visibility
            // but 'forwards' in CSS keeps it valid. 
            // We can leave anim-init or remove it. 
            // Removing it is cleaner for inspection but not strictly necessary if 'forwards' is used.
            el.classList.remove("anim-init");
        }, 50); 
    });
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const type = el.dataset.animate;
                
                if (type === "fade-up") {
                    el.classList.add("anim-fade-in-up");
                } else if (type === "fade") {
                    el.classList.add("anim-fade-in");
                }
                
                el.classList.remove("anim-init");
                obs.unobserve(el);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll("[data-animate]");
    scrollElements.forEach(el => observer.observe(el));

    // Expose observer globally if we need to observe new elements (e.g. services filter)
    window.animObserver = observer;
}
