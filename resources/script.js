const date = new Date();
const elementCurrentDate = document.getElementById('current-date');

const navToggle = document.getElementsByClassName('nav-toggle')[0];
const navLinks = document.querySelectorAll('.nav__link');

const contactLink = document.querySelectorAll('.contact__link');
const closeContact = document.getElementsByClassName('contact-close')[0];

elementCurrentDate.textContent = date.getFullYear();

const openNav = () => {
    document.body.classList.toggle('nav-open');
};

const removeNav = () => {
    document.body.classList.remove('nav-open');
};

const openContact = () => {
    document.body.classList.toggle('contact-open');
};

const removeContact = () => {
    document.body.classList.remove('contact-open');
};


// Nav toggle event listener
navToggle.addEventListener('click', openNav);

navLinks.forEach(link => {
    link.addEventListener('click', removeNav);
});

contactLink.forEach(link => {
    link.addEventListener('click', openContact);
});

closeContact.addEventListener('click', removeContact);