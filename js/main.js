// ========================================
// MENU MOBILE
// ========================================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Fermer le menu lors du clic sur un lien
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});

// ========================================
// LAZY LOADING DES IMAGES AVEC EFFET
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Pour les images déjà chargées
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
        }
    });
    
    // IntersectionObserver pour un meilleur contrôle
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            if (!img.classList.contains('loaded')) {
                imageObserver.observe(img);
            }
        });
    }
});

// ========================================
// TRACKING FACEBOOK PIXEL
// ========================================
function trackReservation() {
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Schedule');
        console.log('Facebook Pixel: Réservation trackée');
    }
}

// ========================================
// SMOOTH SCROLL AVEC OFFSET POUR LA NAV
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMATION AU SCROLL
// ========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.step, .bienfait-card, .galerie-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========================================
// NAVBAR SCROLL EFFECT (OPTIONNEL)
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre quand on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// PRELOAD DE L'IMAGE HERO (OPTIONNEL)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const bgImage = window.getComputedStyle(hero).backgroundImage;
        const imageUrl = bgImage.slice(5, -2); // Extrait l'URL
        
        if (imageUrl && imageUrl !== 'none') {
            const img = new Image();
            img.src = imageUrl;
        }
    }
});

// ========================================
// GESTION DES ERREURS D'IMAGES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Erreur de chargement:', this.src);
            // Optionnel : remplacer par une image par défaut
            // this.src = 'images/placeholder.jpg';
        });
    });
});

