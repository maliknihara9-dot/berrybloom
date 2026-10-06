// CUSTOM CURSOR
const ring = document.getElementById('cursorRing');
const dot = document.getElementById('cursorDot');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
});

function animCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';

    requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll(
    'a,button,.product-tile,.variety-card,.recipe-tile,.gal-item,.benefit-card'
).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});


// PARALLAX HOME
const homeBg = document.getElementById('homeBg');
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

document.querySelector('.home').addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;

    homeBg.style.transform = `translate(${x}px, ${y}px)`;
});

(function scrollParallax() {
    homeBg.style.transform = `translateY(${scrollY * 0.38}px)`;
    requestAnimationFrame(scrollParallax);
})();


// FLOATING BERRIES
const berries = ['🍓', '🍓', '✨', '🍓', '🍓', '✨', '🍓', '🍓', '✨', '🍓', '🍓', '✨'];

const home = document.querySelector('.home');

if (home) {
    berries.forEach(b => {
        const el = document.createElement('div');
        el.classList.add('berry');
        el.textContent = b;

        const size = Math.random() * 1 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const dur = Math.random() * 16 + 12;

        el.style.cssText = `
            font-size: ${size}rem;
            left: ${left}%;
            animation-duration: ${dur}s;
            animation-delay: ${delay}s;
        `;

        home.appendChild(el);
    });
}

// MOBILE NAV 
function toggleMobile() {
    const nav = document.getElementById("mobileNav");
    const burger = document.getElementById("hamburger");

    if (!nav || !burger) return;

    nav.classList.toggle("open");
    burger.classList.toggle("open");

    document.body.style.overflow =
        nav.classList.contains("open") ? "hidden" : "";
}

function closeMobile() {
    const nav = document.getElementById("mobileNav");
    const burger = document.getElementById("hamburger");

    if (!nav || !burger) return;

    nav.classList.remove("open");
    burger.classList.remove("open");
    document.body.style.overflow = "";
}


// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal')
    .forEach(el => observer.observe(el));


// LIGHTBOX
function openLightbox(el) {
    const src = el.querySelector('img').src;

    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});


// DOM READY
document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("navbar");
    const mobileNav = document.getElementById("mobileNav");


    if (mobileNav) {
        mobileNav.addEventListener("click", function (e) {
            if (e.target === mobileNav) closeMobile();
        });

        document.querySelectorAll("#mobileNav a").forEach(link => {
            link.addEventListener("click", closeMobile);
        });
    }

    // NAVBAR SCROLL 
    window.addEventListener("scroll", function () {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

});


// SCROLL TOP BUTTON
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {

    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }

    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }

});