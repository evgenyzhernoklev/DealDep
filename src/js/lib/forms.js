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
      self.updateAllSliders($(this));
    }
  });

  this.body.on('input', '.fieldWrapper__input--slider', this.updateSlider.bind(this));
};

Forms.prototype.sliderLockToggle = function(e) {
  e.preventDefault();
  var $parent = $(this).closest('.share'),
      $slider = $parent.find('.formSlider'),
      $input = $parent.find('.fieldWrapper__input--slider'),
      $info = $(this).find('.shareTip__info');

  $parent.toggleClass('is-locked');

  if ($parent.hasClass('is-locked')) {
    $info.text('Разблокировать долю');
    $input.prop('readonly', 'readonly');
    $slider.slider('disable');
  } else {
    $info.text('Зафиксировать долю');
    $input.prop('readonly', '');
    $slider.slider('enable');
  }
};

Forms.prototype.updateSlider = function (e) {
  var $target = $(e.target),
      targetValue = +$target.val(),
      $targetSlider = $target.closest('.formBlock').find('.formSlider'),
      updatingSliders = this.sliders.not($targetSlider).not(function() {
        return $(this).closest('.share').hasClass('is-locked');
      }),
      updatingSlidersLength = updatingSliders.length;

  // находим значение для текущего блока со слайдером и инпутом
  if (targetValue <= 0) {
    targetValue = 1;
  } else if (targetValue > 100 - updatingSlidersLength) {
    targetValue = 100 - updatingSlidersLength;
  }

  $target.val(targetValue);
  $targetSlider.slider('value', targetValue);

  // распределяем оставшееся значение между слайдерами
  var leftValue = 100 - targetValue,
      valueForEachSliderLeft = Math.floor(leftValue / updatingSlidersLength),
      modulo = leftValue % updatingSlidersLength;

  updatingSliders.each(function(index, element) {
    $(element).slider('value', valueForEachSliderLeft);
  });

  for (var i = 0; i < modulo; i++) {
    var $indexSlider = updatingSliders.eq(i),
        indexSliderValue = $indexSlider.slider('value');

    $indexSlider.slider('value', indexSliderValue + 1);
  }

  // обновляем значение инпутов
  updatingSliders.each(function(index, element) {
    var indexSliderValue = $(element).slider('value');

    $(element)
      .closest('.formBlock')
      .find('.fieldWrapper__input--slider')
      .val(indexSliderValue);
  });

  /***** общая сумма для проверки (временно) *****/
  var counter = 0;
  $('.fieldWrapper__input--slider').each(function() {
    var value = +$(this).val();
    counter += value;
  });
  console.log('counter - ' + counter);
  /***** end *****/
};

Forms.prototype.updateAllSliders = function ($currentSlider) {
  var updatingSliders = this.sliders.not($currentSlider).not(function() {
        return $(this).closest('.share').hasClass('is-locked');
      }),
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
    var $indexSlider = updatingSliders.eq(i),
        indexSliderValue = $indexSlider.slider('value');

    if (difference > 0) {
      $indexSlider.slider('value', indexSliderValue - 1);
    } else {
      $indexSlider.slider('value', indexSliderValue + 1);
    }
  }

  // обновляем значения инпутов
  updatingSliders.each(function(index, element) {
    var currentValue = $(element).slider('value');
    $(element)
      .closest('.formBlock--slider')
      .find('.fieldWrapper__input--slider')
      .val(currentValue);
  });

  // проверяем сумму процентов
  var counter = 0;
  $('.fieldWrapper__input--slider').each(function() {
    var value = +$(this).val();
    counter += value;
  });

  // при превышении суммы в 100% убавляем значение у активного слайдера на превышение
  if (counter > 100) {
    var overdraft = counter - 100,
        currentSliderValue = $currentSlider.slider('value');

    $currentSlider.slider('value', currentSliderValue - overdraft);
    $currentSlider
      .closest('.formBlock--slider')
      .find('.fieldWrapper__input--slider')
      .val(currentSliderValue - overdraft);
  }

  /***** общая сумма для проверки (временно) *****/
  console.log('counter before - ' + counter);
  counter = 0;
  $('.fieldWrapper__input--slider').each(function() {
    var value = +$(this).val();
    counter += value;
  });
  console.log('counter after - ' + counter);
  /***** end *****/
};
