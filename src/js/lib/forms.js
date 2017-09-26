var Forms = function() {
  this.body = $('body');
  this.select = $('.form-select');
  this.init();
};

Forms.prototype.init = function () {
  this.initSelect();
  this.initMasks();
  this.initSlider();
  $('.slider-lock-toggle').on('click', this.sliderLockToggle);
};

Forms.prototype.initSelect = function () {
  this.select.selectize({
    sortField: {
      field: 'text',
      direction: 'asc'
    }
    , create: false
  });
};

Forms.prototype.initMasks = function () {
  $('.field-mobile').inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
  $('.field-date').inputmask("date", { placeholder: "дд/мм/гггг", "clearIncomplete": true });
  $('.field-passport-numbers').inputmask("9999 999999", { "clearIncomplete": true });
  $('.field-email').inputmask("email", { "clearIncomplete": true });
};

Forms.prototype.initSlider = function () {
  var self = this;

  this.sliders = $(".formSlider").slider({
    range: "min",
    min: 1,
    max: 100,
    create: function() {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input'),
          inputValue = $input.val();

      $(this).slider('value', inputValue);
    },
    slide: function(event, ui) {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input');

      $input.val(ui.value);
    },
    start: function(event, ui) {
      self.sliderStartValue = ui.value;
    },
    stop: function(event, ui) {
      self.sliderStopValue = ui.value;
      self.updateAllSliders(this);
    }
  });

  this.body.on('input', '.fieldWrapper__input--slider', this.updateSlider);

  // TODO
  // 1 - закреплять значения (+)
  // 2 - обновлять значения у незакрепленных слайдеров
  // 3 - при превышении лимита подстраивать значения
};

Forms.prototype.sliderLockToggle = function(e) {
  e.preventDefault();
  var $parent = $(this).closest('.share'),
      $slider = $parent.find('.formSlider'),
      $input = $parent.find('.fieldWrapper__input--slider');

  $parent.toggleClass('is-locked');

  if ($parent.hasClass('is-locked')) {
    $input.prop('readonly', 'readonly');
    $slider.slider('disable');
  } else {
    $input.prop('readonly', '');
    $slider.slider('enable');
  }
};

Forms.prototype.updateSlider = function () {
  var inputValue = $(this).val(),
      $parent = $(this).closest('.formBlock'),
      $slider = $parent.find('.formSlider');

  if ( inputValue < 0 ) {
    inputValue = 0;
  } else if ( inputValue > 100 ) {
    inputValue = 100;
  }

  $(this).val(inputValue);
  $slider.slider('value', inputValue);
};

Forms.prototype.updateAllSliders = function (currentSlider) {
  var updatingSliders = this.sliders.not($(currentSlider)),
      updatingSlidersLength = updatingSliders.length,
      difference = this.sliderStopValue - this.sliderStartValue,
      modulo = Math.abs(difference % updatingSlidersLength),
      division;

  if (difference > 0) {
    division = Math.floor(difference / updatingSlidersLength);
  } else {
    division = Math.ceil(difference / updatingSlidersLength);
  }

  // присваиваем слайдерам целые значения
  updatingSliders.each(function(index, element) {
    var currentValue = $(element).slider('value');
    $(element).slider('value', currentValue - division);
  });

  // распределяем по слайдерам оставшееся дробное значения
  for (i = 0; i < modulo; i++) {
    var currentSlider = updatingSliders.eq(i),
        currentValue = currentSlider.slider('value');

    if (difference > 0) {
      currentSlider.slider('value', currentValue - 1);
    } else {
      currentSlider.slider('value', currentValue + 1);
    }
  }

  // обновляем значения инпутов
  updatingSliders.each(function(index, element) {
    var currentValue = $(element).slider('value');
    $(element).closest('.formBlock--slider').find('.fieldWrapper__input--slider').val(currentValue);
  });

  // общая сумма для проверки (временно)
  var counter = 0;
  $('.fieldWrapper__input--slider').each(function() {
    var value = +$(this).val();
    counter += value;
  });
  console.log('counter - ' + counter);
};
