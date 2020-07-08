//hamburger

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

//vertical acordeon

const openItem = item => {
  const container = item.closest(".member__item");
  const contentBlock = container.find(".members__position");
  const textBlock = contentBlock.find(".member__content");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.members__position');
  const itemContainer = container.find(".member__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$('.member__title').click(e =>{
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__list');
  const elemContainer = $this.closest(".member__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }

});

//slider

const slider = $('.assortment__switcher').bxSlider({
  pager: false,
  controls: false
});

$('.assortment__link--left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$('.assortment__link--right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});

