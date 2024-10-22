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

updateNavDisplay();

window.addEventListener('resize', updateNavDisplay);

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
