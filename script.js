document.addEventListener("DOMContentLoaded", () => {
    // --- Hamburger Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
    // Clone Marquee items for seamless infinite scroll
    const marqueeTrack = document.querySelector(".marquee-track");
    if (marqueeTrack) {
        const marqueeContent = marqueeTrack.innerHTML;
        // Duplicate the content to ensure smooth looping
        marqueeTrack.innerHTML = marqueeContent + marqueeContent;
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Scroll Reveal Animation (Minh Pham Style)
    const revealElements = document.querySelectorAll('.reveal-type');
    
    // We only want to run SplitType if it is loaded
    if (typeof SplitType !== 'undefined') {
        revealElements.forEach((el) => {
            // Split text into lines and words
            new SplitType(el, { types: 'lines, words' });
            
            // Stagger animation delay per line
            const lines = el.querySelectorAll('.line');
            lines.forEach((line, index) => {
                const words = line.querySelectorAll('.word');
                words.forEach(word => {
                    word.style.transitionDelay = `${index * 0.1}s`;
                });
            });
        });

        // Intersection Observer to trigger animation
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
        
        const blockElements = document.querySelectorAll('.reveal-block');
        blockElements.forEach(el => observer.observe(el));
    }

    // Mouse Parallax Effect for Hero Avatar
    const avatar = document.getElementById('parallax-avatar');
    if (avatar) {
        document.addEventListener('mousemove', (e) => {
            // Calculate distance from center of screen
            // Dividing by 30 dampens the movement (higher number = less movement)
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            // Apply slight translation
            avatar.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        });
    }

    // Custom Cursor Follower (Minh Pham Style)
    const cursorFollower = document.getElementById('cursor-follower');
    if (cursorFollower) {
        let mouseX = -150, mouseY = -150;
        let cursorX = -150, cursorY = -150;
        let prevCursorX = -150, prevCursorY = -150;
        let isContracted = false;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Lerp function for smooth interpolation
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        // Animation loop using requestAnimationFrame
        function animateCursor() {
            // Store previous position for velocity calc
            prevCursorX = cursorX;
            prevCursorY = cursorY;

            // Smoothly interpolate toward mouse position (0.12 = trailing lag)
            cursorX = lerp(cursorX, mouseX, 0.12);
            cursorY = lerp(cursorY, mouseY, 0.12);

            // Calculate velocity for ellipse deformation
            const dx = cursorX - prevCursorX;
            const dy = cursorY - prevCursorY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Calculate stretch based on velocity (capped)
            const maxStretch = 0.4;
            const stretchAmount = Math.min(speed / 50, maxStretch);

            // Get the angle of movement
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Scale: stretch along direction, squeeze perpendicular
            const scaleX = 1 + stretchAmount;
            const scaleY = 1 - stretchAmount * 0.5;

            // Apply transform — offset by half size to center on cursor
            const halfW = cursorFollower.offsetWidth / 2;
            const halfH = cursorFollower.offsetHeight / 2;

            cursorFollower.style.transform = `translate(${cursorX - halfW}px, ${cursorY - halfH}px) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Expand on hover over text elements (using event delegation for dynamic/HMR content)
        document.addEventListener('mouseover', (e) => {
            const textElement = e.target.closest('h1, h2, h3, h4, h5, h6, p, span, li, blockquote, .reveal-type');
            if (textElement) {
                cursorFollower.classList.add('expanded');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const textElement = e.target.closest('h1, h2, h3, h4, h5, h6, p, span, li, blockquote, .reveal-type');
            if (textElement) {
                cursorFollower.classList.remove('expanded');
            }
        });
    }
});
