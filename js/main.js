document.addEventListener('DOMContentLoaded', () => {

    // --- Login Modal Logic ---
    const loginBtn = document.getElementById('login-btn');
    const loginOverlay = document.getElementById('login-overlay');
    const closeIntroBtn = document.getElementById('close-intro');

    // Lamp Elements
    const lampCordWrapper = document.getElementById('lamp-cord-wrapper');
    const lampGlow = document.getElementById('lamp-glow');
    const shadeInnerGlow = document.getElementById('shade-inner-glow');
    const loginFormContainer = document.getElementById('login-form-container');

    let isLightOn = false;

    // Open Login Modal (If triggered manually later)
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginOverlay.classList.remove('hidden');
        // Force reflow
        void loginOverlay.offsetWidth;
        loginOverlay.classList.remove('opacity-0');
        // Reset state if needed, or keep previous state
        resetLampState();
    });

    // Close Intro
    closeIntroBtn.addEventListener('click', () => {
        closeModal();
    });

    function closeModal() {
        loginOverlay.classList.add('opacity-0');
        setTimeout(() => {
            loginOverlay.classList.add('hidden');
            // We can leave the light on or off, depends on preference
        }, 700);
    }

    function resetLampState() {
        isLightOn = false;
        lampGlow.classList.add('opacity-0');
        shadeInnerGlow.classList.add('opacity-0');

        loginFormContainer.classList.remove('opacity-100', 'scale-100');
        loginFormContainer.classList.add('opacity-0', 'scale-95');

        lampCordWrapper.parentElement.parentElement.classList.remove('light-is-on');
    }

    // Pull String Interaction
    lampCordWrapper.addEventListener('click', () => {
        // 1. Animate pull
        lampCordWrapper.classList.add('pull-animation');
        setTimeout(() => lampCordWrapper.classList.remove('pull-animation'), 500);

        // 2. Toggle Light Logic
        isLightOn = !isLightOn;

        if (isLightOn) {
            // TURN ON
            lampCordWrapper.parentElement.parentElement.classList.add('light-is-on');

            // Light Up
            lampGlow.classList.remove('opacity-0');
            shadeInnerGlow.classList.remove('opacity-0');

            // Show Form after slight delay
            setTimeout(() => {
                loginFormContainer.classList.remove('opacity-0', 'scale-95');
                loginFormContainer.classList.add('opacity-100', 'scale-100');
            }, 200);

        } else {
            // TURN OFF
            lampCordWrapper.parentElement.parentElement.classList.remove('light-is-on');

            // Light Down
            lampGlow.classList.add('opacity-0');
            shadeInnerGlow.classList.add('opacity-0');

            // Hide Form
            loginFormContainer.classList.remove('opacity-100', 'scale-100');
            loginFormContainer.classList.add('opacity-0', 'scale-95');
        }
    });


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));


    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');

    // Create mobile menu wrapper
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-100 dark:border-slate-700 absolute top-20 left-4 right-4 rounded-3xl shadow-2xl hidden transition-all duration-300 transform origin-top scale-y-0 opacity-0 z-50';
    mobileMenu.innerHTML = `
        <div class="px-6 py-6 space-y-4 flex flex-col">
            <a href="#hero" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Home</a>
            <a href="#features" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Services</a>
            <a href="#portfolio" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Work</a>
            <a href="#pricing" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Pricing</a>
            <a href="#about" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">About</a>
            <a href="#contact" class="mobile-link block px-3 py-2 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Contact</a>
            
            <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <span class="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Appearance</span>
                <button id="mobile-theme-toggle" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    <span class="dark:hidden">Dark Mode</span>
                    <span class="hidden dark:inline">Light Mode</span>
                </button>
            </div>

            <button id="mobile-login-trigger" class="mt-4 w-full text-center bg-brand-600 text-white px-5 py-4 rounded-2xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-500/30">
                Login
            </button>
        </div>
    `;
    navbar.appendChild(mobileMenu);

    let isMenuOpen = false;

    const toggleMenu = (open) => {
        isMenuOpen = open;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            }, 10);
        } else {
            mobileMenu.classList.add('scale-y-0', 'opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    };

    mobileMenuBtn.addEventListener('click', () => {
        toggleMenu(!isMenuOpen);
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Mobile theme toggle integration
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    mobileThemeToggle.addEventListener('click', () => {
        themeToggleBtn.click(); // Reuse desktop logic
    });

    // Wire up mobile login button
    document.getElementById('mobile-login-trigger').addEventListener('click', () => {
        toggleMenu(false);
        loginBtn.click();
    });

    // --- FAQ Accordion ---
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Close other open faqs (optional, but good UX)
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherIcon = otherToggle.querySelector('svg');
                    const otherContent = otherToggle.nextElementSibling;
                    if (otherIcon) otherIcon.classList.remove('rotate-180');
                    if (otherContent) otherContent.classList.add('hidden');
                }
            });

            const icon = toggle.querySelector('svg');
            const content = toggle.nextElementSibling;

            // Toggle current
            if (icon) icon.classList.toggle('rotate-180');
            if (content) content.classList.toggle('hidden');
        });
    });

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const htmlElement = document.documentElement;

    // Check Local Storage or System Preference on load
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
    } else {
        htmlElement.classList.remove('dark');
        darkIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle icons
            lightIcon.classList.toggle('hidden');
            darkIcon.classList.toggle('hidden');

            // Toggle Dark Class
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    htmlElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    htmlElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (htmlElement.classList.contains('dark')) {
                    htmlElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    htmlElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // --- Helper for Auto-Horizontal Scroll (Infinite Marquee) ---
    const initHorizontalAutoScroll = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const init = () => {
            // Check if already cloned
            if (container.dataset.cloned === 'true') return;
            container.dataset.cloned = 'true';

            const originalItems = Array.from(container.children);
            if (originalItems.length === 0) return;

            // Clone to create seamless loop
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                container.appendChild(clone);
            });

            let isPaused = false;
            let scrollPos = 0;
            const scrollSpeed = 0.9; // Smooth passing speed

            const step = () => {
                if (!isPaused) {
                    scrollPos += scrollSpeed;
                    if (scrollPos >= container.scrollWidth / 2) {
                        scrollPos = 0;
                    }
                    container.scrollLeft = scrollPos;
                }
                requestAnimationFrame(step);
            };

            container.addEventListener('mouseenter', () => isPaused = true);
            container.addEventListener('mouseleave', () => isPaused = false);
            container.addEventListener('touchstart', () => isPaused = true, { passive: true });
            container.addEventListener('touchend', () => setTimeout(() => isPaused = false, 1500), { passive: true });

            requestAnimationFrame(step);
        };

        // Initialize when DOM is ready
        if (document.readyState !== 'loading') {
            init();
        } else {
            document.addEventListener('DOMContentLoaded', init);
        }

        // Final fallback for images/fonts
        window.addEventListener('load', init);
    };

    // Initialize scrolling for both sections
    initHorizontalAutoScroll('features-container');
    initHorizontalAutoScroll('portfolio-container');

});
