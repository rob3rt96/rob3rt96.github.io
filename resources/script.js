const date = new Date();
const elementCurrentDate = document.getElementById('current-date');

const navToggle = document.getElementsByClassName('nav-toggle')[0];
const navLinks = document.querySelectorAll('.nav__link');



elementCurrentDate.textContent = date.getFullYear();

const openNav = () => {
    document.body.classList.toggle('nav-open');
};

const removeNav = () => {
    document.body.classList.remove('nav-open');
};


// Nav toggle event listener
navToggle.addEventListener('click', openNav);

navLinks.forEach(link => {
    link.addEventListener('click', removeNav);
});