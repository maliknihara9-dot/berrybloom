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
    'a,button,.product-card,.feature-card'
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
['🍓', '🌿', '🍓', '✨', '🌸', '🍓', '🌿', '🍓', '✨', '🌸']
    .forEach(b => {

        const el = document.createElement('div');
        el.classList.add('berry');
        el.textContent = b;

        const size = Math.random() * 1.2 + 0.8;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const dur = Math.random() * 12 + 10;

        el.style.cssText = `
        font-size:${size}rem;
        left:${left}%;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
    `;

        document.querySelector('.home')?.appendChild(el);
    });


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
const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() =>
                e.target.classList.add('in'),
                i * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.reveal,.reveal-left,.reveal-right'
).forEach(el => obs.observe(el));


// COUNTERS
const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;

        const el = e.target;
        const target = +el.dataset.target;

        let n = 0;
        const step = Math.max(1, Math.floor(target / 55));

        const t = setInterval(() => {
            n = Math.min(n + step, target);
            el.textContent = n.toLocaleString();

            if (n >= target) clearInterval(t);
        }, 28);

        cntObs.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num')
    .forEach(el => cntObs.observe(el));


// BOOKING VISIT
function openBooking() {
    document.getElementById("bookingModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    document.getElementById("bookingModal").style.display = "none";
    document.body.style.overflow = "auto";
}


//ALERT FOR BOOKING
function openBooking() {
    document.getElementById("bookingModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    document.getElementById("bookingModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function closeBookingAlert() {
    document.getElementById("bookingAlertModal").classList.remove("show");
    document.body.style.overflow = "auto";
}

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input");
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const date = inputs[3].value;

    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    const dateFormatted = new Date(date).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    function formatTime(t) {
        const [h, m] = t.split(":");
        const hour = parseInt(h);
        return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
    }

    const timeFormatted = `${formatTime(startTime)} – ${formatTime(endTime)}`;

    document.getElementById("ba-name").textContent = name;
    document.getElementById("ba-email").textContent = email;
    document.getElementById("ba-phone").textContent = phone;
    document.getElementById("ba-date").textContent = dateFormatted;
    document.getElementById("ba-time").textContent = timeFormatted;


    if (endTime <= startTime) {
        showAlert("error", "Invalid Time", "End time must be after start time.", "Fix it");
        return;
    }

    closeBooking();
    document.getElementById("bookingAlertModal").classList.add("show");

    this.reset();
});

document.getElementById("bookingAlertModal")?.addEventListener("click", (e) => {
    if (e.target.id === "bookingAlertModal") closeBookingAlert();
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
