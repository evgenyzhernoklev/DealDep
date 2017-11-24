var Sliding = function(container) {
  this.container = $(container);
  this.link = this.container.find('.slide-link');
  this.content = this.container.find('.slide-content');

  this.WIDTH_MOBILE = 767;

  this.init();
};

Sliding.prototype.init = function () {
  $(window).on('load resize', this.checkContent.bind(this));
  this.link.on('click', this.toggleContent.bind(this));
};

Sliding.prototype.toggleContent = function (e) {
  e.preventDefault();
  $target = $(e.target);

  $target.toggleClass('is-active');
  this.content.stop().slideToggle(700);

  if ($target.hasClass('is-active')) {
    $target.text($target.data('show'));
  } else {
    $target.text($target.data('hide'));
  }
};

Sliding.prototype.checkContent = function () {
  if (viewportSize.getWidth() > this.WIDTH_MOBILE) {
    this.link.removeClass('is-active').text(this.link.data('hide'));
    this.content.show();
  }
};
