var Tooltip = function(container) {
  this.container = $(container);
  this.content = this.container.find('.tooltip-content');
  this.link = this.container.find('.tooltip-link');

  this.WIDTH_MOBILE = 767;

  this.init();
};

Tooltip.prototype.init = function () {
  $(window).on('load resize', this.checkTooltip.bind(this));
  this.link.on('click', this.switchTooltip.bind(this));
};

Tooltip.prototype.switchTooltip = function (e) {
  e.preventDefault();
  this.content.stop().fadeToggle();
  this.link.toggleClass('is-active');
};

Tooltip.prototype.checkTooltip = function () {
  if (this.content.hasClass('tooltip-content-mobile')) {
    if (viewportSize.getWidth() > this.WIDTH_MOBILE) {
      this.content.stop().fadeIn();
    } else {
      this.content.stop().fadeOut();
      this.link.removeClass('is-active');
    }
  }
};
