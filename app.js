/**
 * app.js - Lógica principal de FocusFlow
 * Maneja interacciones de UI, menú móvil y animaciones.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Función para alternar el menú
    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        const icon = navMenu.classList.contains('open') ? 'x' : 'menu';
        // Actualizar icono si se usa feather icons
        navToggle.innerHTML = `<i data-feather="${icon}"></i>`;
        feather.replace();
    };

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace (UX móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- 2. HEADER STICKY ---
    // Cambiar fondo del header al hacer scroll
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- 3. ANIMACIONES AL SCROLL (Intersection Observer) ---
    // Detectar elementos para animar cuando entran en el viewport
    const observerOptions = {
        threshold: 0.1,      // 10% visible
        rootMargin: '0px 0px -50px 0px' // Offset para disparar un poco antes
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Seleccionar elementos a animar
    const animatedElements = document.querySelectorAll('.fade-up, .step, .feature-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-up'); // Asegurar clase base
        observer.observe(el);
    });

    // --- 4. FORMULARIO DEMO ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            // Simular carga
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = '¡Enviado!';
                btn.style.backgroundColor = '#10b981'; // Green success
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }, 1000);
        });
    });

});
