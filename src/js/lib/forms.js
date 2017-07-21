var Forms = function() {
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
  $( ".formSlider" ).slider({
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

  $('.fieldWrapper__input--slider').on('input', function() {
    var inputValue = $(this).val();
    var $parent = $(this).closest('.formBlock');
    var $slider = $parent.find('.formSlider');

    if (inputValue < 0) {
      inputValue = 0;
    } else if (inputValue > 100) {
      inputValue = 100;
    }

    $(this).val(inputValue);
    $slider.slider('value', inputValue);
  });
};
