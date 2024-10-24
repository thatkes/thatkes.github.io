document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('header nav ul');
const navItems = document.querySelectorAll('header nav ul li');

function updateNavDisplay() {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('nav-active');
        navLinks.style.height = 'auto';
        navItems.forEach(item => {
            item.style.opacity = 1;
        });
        hamburger.style.display = 'none';
    } else {
        hamburger.style.display = 'block';
    }
}

hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active');

    if (isActive) {
        navLinks.style.height = navLinks.scrollHeight + 'px';
        navItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = 1;
        });
    } else {
        navItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = 0;
        });

        setTimeout(() => {
            navLinks.style.height = '0';
        }, navItems.length * 100);
    }
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            navLinks.style.height = '0';

            navItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.style.opacity = 0;
            });
        }
    });
});

navLinks.addEventListener('transitionend', () => {
    if (!navLinks.classList.contains('nav-active')) {
        navLinks.style.height = '';
    }
});

function scrollToContent() {
    document.querySelector('#about').scrollIntoView({ behavior: "smooth" });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const options = {
        root: null,
        theshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });
}

function scrollHeader() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 0) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
}


updateNavDisplay();
window.addEventListener('resize', updateNavDisplay);
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', scrollHeader);