document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for Fade-In Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a, .hero-action a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust scroll position to account for fixed navbar
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    // 3. AI Terminal Typing Animation
    const typingBio = document.getElementById('typing-bio');
    if (typingBio) {
        const textToType = "Generating profile... \n\nHello! I am Whispaire. Let me introduce you to Tiya. She builds AI systems that don't just process information, but actually make sense of it.\n\nP.S. She is actively seeking a summer internship for 2026!";
        let index = 0;
        
        function typeWriter() {
            if (index < textToType.length) {
                if(textToType.charAt(index) === '\n') {
                    typingBio.innerHTML += '<br>';
                } else {
                    typingBio.innerHTML += textToType.charAt(index);
                }
                index++;
                setTimeout(typeWriter, Math.random() * 50 + 20); // Random typing speed
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
    // 3. Animate Skill Bars Width on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 4. Animate Metric Counter Numbers
    const metrics = document.querySelectorAll('.metric-number');
    let hasAnimatedMetrics = false;

    const metricObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimatedMetrics) {
            hasAnimatedMetrics = true;
            metrics.forEach(metric => {
                const target = parseFloat(metric.getAttribute('data-target'));
                if (!target) return; // Skip if no target (e.g., hardcoded "7.5" CGPA)
                
                let current = 0;
                const increment = target / 30; // 30 steps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        metric.innerText = target;
                        clearInterval(timer);
                    } else {
                        metric.innerText = Math.ceil(current);
                    }
                }, 40);
            });
        }
    }, { threshold: 0.5 });

    const metricsBanner = document.querySelector('.metrics-banner');
    if (metricsBanner) {
        metricObserver.observe(metricsBanner);
    }
});
