const sections = $(".section");
const display = $(".maincontent");

let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const countSectionPosition = (sectionEq) => {

  const position = sectionEq * -100;
  if (isNaN(position))
    console.error("передано не верное значение в countSectionPositon");

  return position;
};

const resetActiveClass = (item, eq) => {
  item.eq(eq).addClass("active").siblings().removeClass("active");
};

const performTransition = (sectionEq) => {
  if (inScroll) return;

  inScroll = true;

  const position = countSectionPosition(sectionEq);
  const trasitionOver = 1000;
  const mouseInertionOver = 300;

  resetActiveClass(sections, sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  setTimeout(() => {
    resetActiveClass($(".fixed-menu__item"), sectionEq);
    inScroll = false;
  }, trasitionOver + mouseInertionOver);
};

const scroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;
  const windowScroller = scroller();

  if (deltaY > 0) {
    windowScroller.next();
  }

  if (deltaY < 0) {
    windowScroller.prev();
  }
});

$(document).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const windowScroller = scroller();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      windowScroller.prev();
      break;
    case 40:
      windowScroller.next();
      break;
  }
});

$("[data-scroll-to]").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");

  performTransition(target);
});

if (isMobile) {
  // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirection;
      const windowScroller = scroller();

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      windowScroller[scrollDirection]();
    },
  });
}
var slider = function (options) {
  var container = document.querySelector(options.container);
  var widthWrapper = container.clientWidth;

  var wrapper = document.querySelector(options.wrapper);
  wrapper.style.width = widthWrapper + 'px';

  var list = document.querySelector(options.list);
  var items = list.children;

  var left = document.querySelector(options.prev);
  var right = document.querySelector(options.next);

  var minRight = 0;
  var maxRight = widthWrapper * (items.length - 1);
  var step = widthWrapper;
  var currentRight = 0;

  var _slideRight = function (value) {
    if (value <= maxRight) {
      currentRight += step;
      list.style.right = currentRight + 'px';
    } else {
      list.style.right = maxRight - currentRight + 'px';
      currentRight = 0;
    }
  };

  var _slideLeft = function (value) {
    if (value >= minRight) {
      currentRight -= step;
      list.style.right = currentRight + 'px';
    } else {
      list.style.right = maxRight + 'px';
      currentRight = maxRight;
    }
  };

  var initial = function () {
    list.style.right = currentRight;

    right.addEventListener('click', function (e) {
      e.preventDefault();

      _slideRight(currentRight + step);
    });

    left.addEventListener('click', function (e) {
      e.preventDefault();

      _slideLeft(currentRight - step);
    });
  };

  var sliderList = document.querySelector(options.list);
  var sliderItem = sliderList.children;

  for (var i = 0; i < sliderItem.length; i++) {
    var _mobileIngredients = function () {
      var btnIngredients = sliderItem[i].querySelector('.slider__ingredients');
      var btnCloseIngredients = sliderItem[i].querySelector('.slider__ingredients-dropdown-close');

      btnCloseIngredients.addEventListener('click', function (e) {
        e.preventDefault();

        btnIngredients.classList.remove('slider__ingredients--active');
      });
      btnCloseIngredients.addEventListener('touchstart', function (e) {
        e.preventDefault();

        btnIngredients.classList.remove('slider__ingredients--active');
      });

      if (checkMobile) {
        btnIngredients.addEventListener('click', function (e) {
          e.preventDefault();
          btnIngredients.classList.add('slider__ingredients--active');
        });
      }
      btnIngredients.addEventListener('mouseenter', function () {
        btnIngredients.classList.add('slider__ingredients--active');
      });

      btnIngredients.addEventListener('mouseleave', function () {
        btnIngredients.classList.remove('slider__ingredients--active');
      });
    };
    _mobileIngredients();
  }
  return {
    init: initial
  };
};

slider({
  container: '.slider',
  wrapper: '.slider__wrap',
  list: '.slider__list',
  next: '.slider__btn--next',
  prev: '.slider__btn--prev'
}).init();

// check mobile devices
var checkMobile = function () {
  var isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP|AvantGo|Atomic Web Browser|Blazer|Chrome Mobile|Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB|Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser|NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser|Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser|SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web|wOSBrowser|Yandex.Browser mobile/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  return isMobile;
};


