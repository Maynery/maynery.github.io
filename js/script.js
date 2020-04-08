
// Accordions
var accordions = function (options) {
  var list = document.querySelector('.' + options.list);

  var itemsList = list.children;

  if (options.direction === 'horizontal') {
    var _getWidth = function () {
      var mobileWidth = 530;
      var userWidth = window.innerWidth;
      var headingItem = list.querySelector('.' + options.subLink);
      var widthHeading = headingItem.clientWidth;
      var neededWidth = userWidth - itemsList.length * widthHeading;
      neededWidth = (neededWidth > mobileWidth) ? mobileWidth + 'px' : neededWidth + 'px';

      return neededWidth;
    };
  } else if (options.direction === 'vertical') {
    var _getHeight = function (elem) {
      return elem.scrollHeight + 'px';
    };
  }

  var _toogleItems = function (e) {
    e.preventDefault();

    if (e.target.className === options.subLink || options.link || options.btnClose) {
      var item = e.target.closest('.' + options.item);

      var contentItem = item.querySelector('.' + options.content);

      if (!item.classList.contains(options.activeItem)) {
        _closeItems(itemsList);
        _openItem(item, contentItem);
      } else {
        _closeItem(item, contentItem);
      }
    }
  };

  var _openItem = function (item, contentItem) {
    if (options.direction === 'horizontal') {
      contentItem.style.width = _getWidth();
    } else if (options.direction === 'vertical') {
      contentItem.style.height = _getHeight(contentItem);
    }
    item.classList.toggle(options.activeItem);
  };

  var _closeItem = function (item, contentItem) {
    if (options.direction === 'horizontal') {
      contentItem.style.width = '';
    } else if (options.direction === 'vertical') {
      contentItem.style.height = '';
    }

    item.classList.remove(options.activeItem);
  };

  var _closeItems = function (items) {
    for (var i = 0; i < items.length; i++) {
      var contentItem = items[i].querySelector('.' + options.content);
      _closeItem(items[i], contentItem);
    }
  };

  var addListeners = function () {
    list.addEventListener('click', _toogleItems);
  };

  return {
    init: addListeners
  };
};

accordions({
  direction: 'horizontal',
  list: 'menu__list',
  item: 'menu__item',
  activeItem: 'menu__item--active',
  subLink: 'menu__sub-heading',
  content: 'menu__content',
  btnClose: 'menu__content-close'
}).init();

accordions({
  direction: 'vertical',
  list: 'team__list',
  item: 'team__item',
  activeItem: 'team__item--active',
  link: 'team__link',
  content: 'team__content'
}).init();


let player;

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady = () => {
  let interval;
  let durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const eventsInit = () => {
  $(".player__start").on("click", e => {
    e.preventDefault();
    const btn = $(e.currentTarget);

    if (btn.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {
    player.playVideo();
  });
};

const onPlayerStateChange = event => {
  const playerButton = $(".player__start");
  /*
  -1 (воспроизведение видео не начато)
  0 (воспроизведение видео завершено)
  1 (воспроизведение)
  2 (пауза)
  3 (буферизация)
  5 (видео подают реплики).
   */
  switch (event.data) {
    case 1: 
      $('.player__wrapper').addClass('active');
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "EaJfC1dREIQ",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();

