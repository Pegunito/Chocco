//Yandex map

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.935274, 30.312388],
    zoom: 11,
    controls: []
  });

  const coords = [
    [59.94554327989287, 30.38935262114668],
    [59.91142323563909, 30.50024587065841],
    [59.88693161784606, 30.319658102103713],
    [59.97033574821672, 30.315194906302924],
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/icons/Ymarker.svg",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  
  myMap.geoObjects.add(myCollection);
  
  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);

//youtube api 

let player;
const playerContainer = $('.player');
const playerStart = $('.player__start');
const volumeBtn = $(".volume__pic");


let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        const btn = $(e.currentTarget);

        if (playerStart.hasClass("player--paused")){

            
            player.pauseVideo();

        }else{
            
            player.playVideo();
        }
        
        onPlayerReady();
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = 
            (player.getDuration() / 100) * newButtonPositionPercent;


        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    });


    $(".volume__pic").click(e => {
        e.preventDefault();

        if (volumeBtn.hasClass("volume__pic--nosound")){

            player.unMute();
            volumeBtn.removeClass("volume__pic--nosound");

        }else{
            
            player.mute();
            volumeBtn.addClass("volume__pic--nosound");
        }
    });

    $(".volume__playback").click(e => {

        const barVolume = $(e.currentTarget);
        const clickedPositionVolume = e.originalEvent.layerX;
        const newVolumeButtonPositionPercent = (clickedPositionVolume / barVolume.width()) * 100;
        let volumePoint = player.getVolume();
    
    
        $(".volume__playback-button").css({
            left: `${newVolumeButtonPositionPercent}%`
        });

        player.setVolume(newVolumeButtonPositionPercent);
        
    });

    
};


const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval !== "undefined"){
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

    }, 1000);
};


const onPlayerStateChange = event => {
    switch(event.data){
        case 1:
            playerContainer.addClass("active");
            playerStart.addClass("player--paused");
            break;
        case 2:
            playerContainer.removeClass("active");
            playerStart.removeClass("player--paused");
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'LXb3EKWsInQ',
        events:{
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modesbranding: 0
        }
    })
};


eventsInit();

//hamburger

(function () {
  const hamburger__icon = document.querySelector('.header__hamburger');

  const menu = document.querySelector('.hamburger-menu');

  const scroll = document.querySelector('body');

  hamburger__icon.addEventListener('click', () => {
    hamburger__icon.classList.toggle("header__hamburger--active");
    menu.classList.toggle("hamburger-menu--active");
    scroll.classList.toggle("body--active");

  });
  
}());

(function () {
  const hamburgerNav = document.querySelector('.hamburger-menu__list');

  const menu = document.querySelector('.hamburger-menu');

  const hamburger__icon = document.querySelector(".header__hamburger");

  hamburgerNav.addEventListener('click', () => {
    menu.classList.remove('hamburger-menu--active');
    hamburger__icon.classList.remove('header__hamburger--active');
    

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

const messureWidth = (item) => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".product-menu__list");
  const titlesBlocks = container.find(".accordeon__link");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".accordeon__content");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));


  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  }
};

const closeEveryItemInContainer = container => {
  const items = container.find(".accordeon__item");
  const content = container.find(".accordeon__wrap");

  items.removeClass("active");
  content.width(0);
}

const openAcco = item => {

  const hiddenContent = item.find(".accordeon__wrap");
  const reqWidth = messureWidth(item);

  const textBlock = item.find(".accordeon__content");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".accordeon__link").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".accordeon__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".product-menu__list");

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openAcco(item);
  }

});

$(".accordeon__svg").on("click", e => {
  closeEveryItemInContainer($('.product-menu__list'));
});


/* function Accordeon(selector) {
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

new Accordeon('#acc-menu'); */

//one page scroll

const sections = $("section");
const display = $(".maincontent");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

//hover fixed-menu
const sidemenu = $(".fixed-menu");
//

let inScroll = false;

sections.first().addClass("scroll");

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().remove(activeClass);
} 

const performTransition = sectionEq => {

  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

    inScroll = true;
    const position = countSectionPosition(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });
  
    resetActiveClassForItem(sections, sectionEq, "scroll");
    sections.eq(sectionEq).addClass("scroll").siblings().removeClass("scroll");

    setTimeout(() =>{
      inScroll = false;

      //hover fixed-menu
      sidemenu
      .find(".fixed-menu__item")
      .eq(sectionEq)
      .addClass("fixed-menu__item--active")
      .siblings().removeClass("fixed-menu__item--active");
      //

    }, transitionOver + mouseInertiaOver);
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".scroll");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction == "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

//Not to scroll in inputs

$(window).on("keydown", e => {

const tagName = e.target.tagName.toLowerCase();
const userTypingInInputs = tagName == "input" || tagName == "textarea";

if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38: //prev
      scrollViewport("prev");
      break;
  
      case 40: //next
      scrollViewport("next");
      break;

    }
});

//Навигация по ссылкам

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

$("body").swipe ({
  
  swipe: function( event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction == "up") scrollDirection = "next";
    if (direction == "down") scrollDirection = "prev";

    scroller[scrollDirection]();

    },
  });
} 



// настройка touch события для мобильной версии 





  





