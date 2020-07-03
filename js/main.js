(function () {
  const header__hamburger = document.querySelector('.header__hamburger');
    header__hamburger.addEventListener('click', () => {
      header__hamburger.classList.toggle("header__hamburger--active");
  });
}());