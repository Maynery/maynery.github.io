  // slider
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
  
  