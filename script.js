document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        
        // Update menu icon
        if (isActive) {
            mobileToggle.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        }
        lucide.createIcons();
    });

    // Close Menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // Navigation Active Link Tracker on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Submission (Format for WhatsApp)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const vessel = document.getElementById('vessel').value.trim();
            const port = document.getElementById('port').value;
            const message = document.getElementById('message').value.trim();

            // WhatsApp Message Formatting
            const whatsappNumber = '573004471043';
            const baseText = `*SEAWATER SUPPLY CO - New Inquiry*\n\n` +
                             `*Name:* ${name}\n` +
                             `*Vessel Name:* ${vessel}\n` +
                             `*Destination Port:* ${port}\n\n` +
                             `*Requirements/Provisions List:*\n${message}`;

            const encodedText = encodeURIComponent(baseText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            // Open WhatsApp link in a new window
            window.open(whatsappUrl, '_blank');
        });
    }

    // Scroll Reveal (Simple Fade In)
    const revealElements = document.querySelectorAll('.about-info, .mv-card, .portfolio-card, .value-card, .contact-box');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animations
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
