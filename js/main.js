(function () {
  const hamburger__icon = document.querySelector('.header__hamburger');

  const menu = document.querySelector('.hamburger-menu');

  hamburger__icon.addEventListener('click', () => {
    hamburger__icon.classList.toggle("header__hamburger--active");
    menu.classList.add("hamburger-menu--active");
  });
  
}());



