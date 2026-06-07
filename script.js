/* ============================================================
   РІЗЕН — НІМЕЦЬКИЙ ВЕЛЕТЕНЬ | script.js
   ============================================================ */

(function () {
    'use strict';

    /* ── Sticky header shadow ── */
    const header = document.querySelector('.site-header');
    function onScroll() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Mobile burger menu ── */
    const burger = document.getElementById('navBurger');
    const mobileNav = document.getElementById('navMobile');

    burger.addEventListener('click', function () {
        const isOpen = mobileNav.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (!header.contains(e.target)) {
            mobileNav.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        }
    });

    /* ── Scroll reveal — generic .reveal elements ── */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ── Staggered reveal for .char-item ── */
    const charItems = document.querySelectorAll('.char-item');

    const charObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = Array.from(charItems).indexOf(entry.target) * 80;
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);
                    charObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    charItems.forEach(function (el) {
        charObserver.observe(el);
    });

    /* ── Staggered reveal for keeping-card ── */
    const keepingCards = document.querySelectorAll('.keeping-card');

    const keepingObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = Array.from(keepingCards).indexOf(entry.target) * 70;
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                    }, delay);
                    keepingObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    keepingCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s';
        keepingObserver.observe(card);
    });

    /* ── Staggered reveal for health-card ── */
    const healthCards = document.querySelectorAll('.health-card');

    const healthObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = Array.from(healthCards).indexOf(entry.target) * 80;
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                    }, delay);
                    healthObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    healthCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        healthObserver.observe(card);
    });

    /* ── Staggered reveal for breeding-step ── */
    const breedingSteps = document.querySelectorAll('.breeding-step');

    const breedingObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const delay = Array.from(breedingSteps).indexOf(entry.target) * 90;
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                    }, delay);
                    breedingObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.06 }
    );

    breedingSteps.forEach(function (step) {
        step.style.opacity = '0';
        step.style.transform = 'translateY(16px)';
        step.style.transition = 'opacity 0.45s ease, transform 0.45s ease, background 0.2s';
        breedingObserver.observe(step);
    });

    /* ── Staggered reveal for pros/cons list items ── */
    const prosConsItems = document.querySelectorAll('.pros-list li, .cons-list li');

    const listObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const allItems = Array.from(prosConsItems);
                    const globalIdx = allItems.indexOf(entry.target);
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                    }, (globalIdx % 5) * 80);
                    listObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    prosConsItems.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-12px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        listObserver.observe(item);
    });

    /* ── Active nav link highlight on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveLink() {
        const scrollY = window.scrollY + 100;
        let active = null;

        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop) {
                active = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute('href').slice(1);
            link.style.color = href === active
                ? 'var(--clr-brass-lt)'
                : '';
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

    /* ── Timeline dots pulse on enter ── */
    const timelineDots = document.querySelectorAll('.timeline-dot');

    const dotObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1.4)';
                    entry.target.style.transition = 'transform 0.3s ease';
                    setTimeout(function () {
                        entry.target.style.transform = 'scale(1)';
                    }, 300);
                    dotObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 1 }
    );

    timelineDots.forEach(function (dot) {
        dotObserver.observe(dot);
    });

    /* ── Stats table row hover (keyboard accessible) ── */
    const tableRows = document.querySelectorAll('.stats-table tbody tr');
    tableRows.forEach(function (row) {
        row.setAttribute('tabindex', '0');
        row.addEventListener('focus', function () {
            row.style.background = 'rgba(255,255,255,0.04)';
        });
        row.addEventListener('blur', function () {
            row.style.background = '';
        });
    });

    /* ── Smooth anchor scroll (fallback for older Safari) ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

})();