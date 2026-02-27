document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       1. Theme Toggle
    ========================== */

    const themeToggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme ? savedTheme : (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });



    /* =========================
       2. Fade-In beim Scrollen
    ========================== */

    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));



    /* =========================
       3. Navbar Hintergrund bei Scroll
    ========================== */

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });



    /* =========================
       4. Erinnerung-Lichter
    ========================== */

    const memoryForm = document.getElementById('memory-form');
    const memoryInput = document.getElementById('memory-input');
    const lightsContainer = document.getElementById('lights-container');

    // Startlichter simulieren
    const initialLights = 7;
    for (let i = 0; i < initialLights; i++) {
        createLight(false);
    }

    memoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = memoryInput.value.trim();
        if (!text) return;

        createLight(true);

        memoryInput.value = '';
        memoryInput.placeholder = "Dein Gedanke wurde zu einem Licht.";

        setTimeout(() => {
            memoryInput.placeholder = "Deine Gedanken...";
        }, 5000);
    });



    function createLight(animateIn) {
        const light = document.createElement('div');
        light.classList.add('memory-light');

        const size = Math.random() * 6 + 6; // 6–12px
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;

        const margin = Math.random() * 15 + 5;
        light.style.margin = `${margin}px`;

        lightsContainer.appendChild(light);

        if (animateIn) {
            requestAnimationFrame(() => {
                light.style.opacity = '1';
            });
        } else {
            light.style.opacity = '0.7';
            light.style.transition = 'none';
        }
    }

});
