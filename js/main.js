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

//modal delivery

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((field) => {
    field.removeClass("form__input--error");
      if(field.val().trim() == "") {
        field.addClass("form__input--error");
    }
  });
  
  const errorFields = form.find(".form__input--error");

  return errorFields.length == 0;
}

$(".delivery_form").submit(e =>{
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $(".delivery__modal");
  const content = modal.find(".modal__info");

  const isValid = validateFields(form, [name, phone, comment, to]);


if (isValid) {
 const request = $.ajax ({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "post",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val(),
    },
   });

    request.done(data => {
      content.text(data.message);
    });

    request.fail(data => {
      const message = data.responseJSON.message;
      content.text(message);
    });

    request.always(() => {
      $.fancybox.open({
        src:"#hidden-content",
        type:"inline"
       });
    });
  }
});

$(".btn__js-submit").click(e =>{
  e.preventDefault();

  $.fancybox.close();
});

//slider assortment

const slider = $('.assortment__switcher').slick({
  prevArrow: $('.assortment__link--left'),
  nextArrow: $('.assortment__link--right'),
});


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

//slider reviews

const findBlockByAlias = (alias) => {
    return $(".reviews__item").filter((ndx, item)=> {
    return $(item).attr("data-linked-with") == alias
  });
};

$('.switcher-avatar__link').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target =$this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.switcher-avatar');

  itemToShow.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
  curItem.addClass("switcher-avatar--active").siblings().removeClass("switcher-avatar--active");
});

//inputs

$(function() {
  $(document).on("change keyup input click", "input[type='tel']", function() {
      if(this.value.match(/[^0-9]/g)){
          this.value = this.value.replace(/[^0-9]/g, "");
      };
  });
});

$(function() {
  $(document).on("change keyup input click", "[name='name']", function() {
      if(this.value.match(/[^а-яА-Яa-zA-Z\s]/g)){
          this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
      };
  });
});

//acordeon menu

function Accordeon(selector) {
  const acco = document.querySelector(selector);
  const items = acco.querySelector('[data-list]').children;
  
  acco.addEventListener('click', function(e) {
    e.preventDefault();
    const target = e.target.closest('[data-trigger]');

    if (!target) return;

    const item = target.parentNode;

    if (item.classList.contains('active')) {
      item.classList.remove('active');

    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
        
      }

      item.classList.add('active');
    }
  });
}

new Accordeon('#acc-menu');

const messureWidth = item => {

const screenWidth = $(window).width();
const container = item.closest(".product-menu__list");
const titleBlock = container.find(".accordeon__title");
const titleWidth = titleBlock.width() * titleBlock.length;

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  return screenWidth - titleWidth;

} else {
  return 630;
}

};

const mobileScreen = (item) => {
  const hiddenContent = item.find(".accordeon__wrap");
  const reqWidth = messureWidth(item);

  hiddenContent.width(reqWidth);
};