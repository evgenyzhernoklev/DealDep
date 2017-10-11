var Forms = function() {
  this.body = $('body');
  this.select = $('.form-select');
  this.hiddenBlocks = $('.formblock-toggle-hidden');
  this.relatedBlocks = $('.field-related-container');
  this.duplicateBlocks = $('.pattern-field');
  this.init();
};

Forms.prototype.init = function () {
  this.initSelect();
  this.initMasks();
  this.initSliderSingle();
  this.initSlider();

  $('.slider-lock-toggle').on('click', this.sliderLockToggle);
  $('.formblock-toggle-link').on('change', this.toggleHiddenBlock.bind(this));
  $('.field-related').on('change', this.toggleRelatedFields.bind(this));
  $('.quantity-reduce').on('click', this.quantityReduce);
  $('.quantity-add').on('click', this.quantityAdd);
  $('.field-quantity').on('input', this.checkQuantityField);
  $('.add-field').on('click', this.duplicateField.bind(this));
};

Forms.prototype.initSelect = function () {
  this.select.selectize({
    sortField: {
      field: 'text',
      direction: 'asc'
    }
    , create: false
    , dropdownParent: 'body'
  });
};

Forms.prototype.initMasks = function () {
  $('.field-mobile').inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
  $('.field-date').inputmask("date", { placeholder: "дд/мм/гггг", "clearIncomplete": true });
  $('.field-passport-numbers').inputmask("9999 999999", { "clearIncomplete": true });
};

Forms.prototype.initSliderSingle = function () {
  $('.formSliderSingle').each(function(index, element) {
    $(element).slider({
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
      }
    });
  });

  this.body.on('input', '.fieldWrapper__input--sliderSingle', this.updateSliderSingle.bind(this));
};

Forms.prototype.updateSliderSingle = function (e) {
  var $target = $(e.target),
      targetValue = +$target.val(),
      $targetSlider = $target.closest('.formBlock').find('.formSliderSingle');

  if (targetValue <= 0) {
    targetValue = 1;
  } else if (targetValue > 100) {
    targetValue = 100;
  }

  $target.val(targetValue);
  $targetSlider.slider('value', targetValue);
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

  // находим заблокированные значения
  var lockedValue = 0;

  this.sliders
    .not($targetSlider)
    .each(function(index, element) {
      var $parent = $(element).closest('.share');

      if ($parent.hasClass('is-locked')) {
        var currentLockedValue = +$parent.find('.fieldWrapper__input--slider').val();

        lockedValue += currentLockedValue;
      }
    });

  // находим значение для текущего блока со слайдером и инпутом
  if (targetValue <= 0) {
    targetValue = 1;
  } else if (targetValue > 100 - updatingSlidersLength - lockedValue) {
    targetValue = 100 - updatingSlidersLength - lockedValue;
  }

  $target.val(targetValue);
  $targetSlider.slider('value', targetValue);

  // распределяем оставшееся значение между слайдерами
  var leftValue = 100 - targetValue - lockedValue,
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
  // var counter = 0;
  // $('.fieldWrapper__input--slider').each(function() {
  //   var value = +$(this).val();
  //   counter += value;
  // });
  // console.log('counter - ' + counter);
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
  // console.log('counter before - ' + counter);
  // counter = 0;
  // $('.fieldWrapper__input--slider').each(function() {
  //   var value = +$(this).val();
  //   counter += value;
  // });
  // console.log('counter after - ' + counter);
  /***** end *****/
};

Forms.prototype.toggleHiddenBlock = function (e) {
  var self = this,
      $target = $(e.target),
      targetType = $target.attr('type'),
      targetData = $target.data('target'),
      $targetBlock = this.hiddenBlocks.filter(function() {
        return $(this).data('target') == targetData;
      });

  if (targetType == 'checkbox') {
    $targetBlock.stop().slideToggle();
    return;
  }

  if (targetType == 'radio') {
    var $siblings = $target.closest('.formBlock').find('.formblock-toggle-link'),
        $siblingsWithHiddenBlock = $siblings.filter(function() {
          return $(this).data('target');
        });

    $siblingsWithHiddenBlock.each(function() {
      var currentData = $(this).data('target');

      self.hiddenBlocks.each(function() {
        if ($(this).data('target') == currentData) {
          $(this).stop().slideUp();
        }
      });
    });

    if (targetData) {
      $targetBlock.stop().slideDown();
    }
  }
};

Forms.prototype.toggleRelatedFields = function (e) {
  var $target = $(e.target),
      isChecked = $target.prop('checked'),
      $parent = $target.closest('.field-related-container'),
      $siblings = $parent.find('.field-related'),
      index = $siblings.index($target),
      related = $parent.data('related'),
      $relatedBlock = this.relatedBlocks.not($parent).filter(function() {
        return $(this).data('related') == related;
      }),
      $relatedInput = $relatedBlock.find('.field-related').eq(index);

  if (isChecked) {
    $relatedInput.prop('disabled', 'true');
  } else {
    $relatedInput.prop('disabled', '');
  }
};

Forms.prototype.quantityReduce = function (e) {
  e.preventDefault();
  var $input = $(this).closest('.formBlock').find('.fieldWrapper__input'),
      value = +$input.val();

  value -= 1;

  if (value < 0) {
    value = 0;
  }

  $input.val(value);
};

Forms.prototype.quantityAdd = function (e) {
  e.preventDefault();
  var $input = $(this).closest('.formBlock').find('.fieldWrapper__input'),
      value = +$input.val();

  value += 1;
  $input.val(value);
};

Forms.prototype.checkQuantityField = function () {
  var value = +$(this).val();

  if (value < 0) {
    value = 0;
  }

  $(this).val(value);
};

Forms.prototype.duplicateField = function (e) {
  e.preventDefault();
  var $target = $(e.target),
      dataField = $target.data('field'),
      $pattern = this.duplicateBlocks.filter(function() {
        return $(this).data('field') == dataField;
      }),
      $clone = $pattern.clone(),
      $patternsCommon = $pattern.nextAll('.pattern-field[data-field="' + dataField + '"]').addBack();

  $clone.find('input, textarea').val('');
  $clone.hide().insertAfter($patternsCommon.last()).slideDown(300);
};
