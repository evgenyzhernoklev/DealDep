var Sliders = function() {
  this.body = $('body');
  this.sliderInfo = $('.slider-info');
  this.WIDTH_MOBILE = 767;
  this.init();
};

Sliders.prototype.init = function () {
  var self = this;

  this.sliderInfo.each(function(index, element) {
    self.initSliderInfo(element);
  });
};

Sliders.prototype.initSliderInfo = function (element) {
  var self = this,
      $sliderInfo = $(element),
      isSliderInfoActive = false;

  $(window).on('resize load', function() {
    if (viewportSize.getWidth() <= self.WIDTH_MOBILE) {
      if (!isSliderInfoActive) {
        $sliderInfo.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          draggable: false,
          adaptiveHeight: true
        });
        isSliderInfoActive = true;
      }
    } else {
      if (isSliderInfoActive) {
        $sliderInfo.slick('unslick');
        isSliderInfoActive = false;
      }
    }
  });
};
