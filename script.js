document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for section fade-in animation
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateSections = document.querySelectorAll('.animate-on-scroll');
    animateSections.forEach(section => {
        observer.observe(section);
    });

    // 2. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projectGrid .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 3. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (navToggle.querySelector('i')) {
                    navToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // 4. ScrollSpy: Highlight Nav link corresponding to current scroll section
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. CV Download button — ripple + feedback
    const downloadCvBtn = document.getElementById('downloadCvBtn');

    if (downloadCvBtn) {
        const defaultLabel = downloadCvBtn.querySelector('.btn-download-text');
        const defaultText = defaultLabel ? defaultLabel.textContent : 'Download CV';

        downloadCvBtn.addEventListener('click', (e) => {
            const rect = downloadCvBtn.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);

            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            downloadCvBtn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());

            downloadCvBtn.classList.add('downloading');
            if (defaultLabel) defaultLabel.textContent = 'Downloading…';

            setTimeout(() => {
                downloadCvBtn.classList.remove('downloading');
                downloadCvBtn.classList.add('downloaded');
                if (defaultLabel) defaultLabel.textContent = 'CV Ready!';

                setTimeout(() => {
                    downloadCvBtn.classList.remove('downloaded');
                    if (defaultLabel) defaultLabel.textContent = defaultText;
                }, 2500);
            }, 800);
        });
    }

    // 6. Courses & Certifications — show more toggle
    const certViewMore = document.getElementById('certViewMore');
    const certGrid = document.getElementById('certGrid');

    if (certViewMore && certGrid) {
        const btnText = certViewMore.querySelector('.btn-view-more-text');

        certViewMore.addEventListener('click', () => {
            const isExpanded = certGrid.classList.toggle('expanded');
            certViewMore.classList.toggle('expanded', isExpanded);
            certViewMore.setAttribute('aria-expanded', isExpanded);
            if (btnText) btnText.textContent = isExpanded ? 'View less' : 'View more';
        });
    }
});
