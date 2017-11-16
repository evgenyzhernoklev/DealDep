var Menu = function(container) {
  this.body = $('body');
  this.container = $(container);
  this.hamburger = $('.hamburger');

  this.WIDTH_MOBILE = 767;

  this.init();
};

Menu.prototype.init = function () {
  $(window).on('resize', this.checkMobile.bind(this));
  this.hamburger.on('click', this.toggleMobileMenu.bind(this));
};

Menu.prototype.toggleMobileMenu = function (e) {
  this.body.toggleClass('menu-opened');
  this.container.toggleClass('is-active');
  this.hamburger.toggleClass('is-active');
};

Menu.prototype.checkMobile = function () {
  if (viewportSize.getWidth() > this.WIDTH_MOBILE) {
    this.body.removeClass('menu-opened');
  }
};
