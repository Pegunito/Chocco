(function () {
  const hamburger__icon = document.querySelector('.header__hamburger');

  const menu = document.querySelector('.hamburger-menu');

  const scroll = document.querySelector('body')

  hamburger__icon.addEventListener('click', () => {
    hamburger__icon.classList.toggle("header__hamburger--active");
    menu.classList.toggle("hamburger-menu--active");
    scroll.classList.toggle("body--active");

  });
  
}());






