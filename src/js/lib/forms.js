var Forms = function() {
  this.body = $('body');
  this.select = $('.form-select');

  this.init();
};

Forms.prototype.init = function () {
  this.initSelect();
  this.initSlider();
  this.initMasks();
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

Forms.prototype.initSlider = function () {
  $(".formSlider").slider({
    range: "min",
    min: 1,
    max: 100,
    create: function() {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input'),
          inputValue = $input.val();

      $(this).slider('value', inputValue);
    },
    slide: function( event, ui ) {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input');

      $input.val( ui.value );
    }
  });

  this.body.on('input', '.fieldWrapper__input--slider', this.updateSlider);
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

Forms.prototype.initMasks = function () {
  $('.field-mobile').inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
  $('.field-date').inputmask("date", { placeholder: "дд/мм/гггг", "clearIncomplete": true });
  $('.field-passport-numbers').inputmask("9999 999999", { "clearIncomplete": true });
  $('.field-email').inputmask("email", { "clearIncomplete": true });
};
