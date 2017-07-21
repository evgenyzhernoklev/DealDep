var Forms = function() {
  this.body = $('body');
  this.select = $('.form-select');

  this.init();
};

Forms.prototype.init = function () {
  this.initSelect();
  this.initSlider();
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
