var Viewer = function() {
  this.window = $(window);
  this.body = $('body');

  this.init();
};

Viewer.prototype.init = function () {
  this.initClasses();
  this.initFunctions();

  this.window.on('resize', this.updateResizer.bind(this));
};

Viewer.prototype.initClasses = function () {
  new Forms();
  new Popups();
  new Sliders();
  $('.tab-container').each(function() {
    new Tabs(this);
  });
  $('.tooltip-container').each(function() {
    new Tooltip(this);
  });
  $('nav.menu').each(function() {
    new Menu(this);
  });
  $('.slide-container').each(function() {
    new Sliding(this);
  });
};

Viewer.prototype.initFunctions = function () {
  this.fullWindowHeight();
};

Viewer.prototype.updateResizer = function () {
  this.fullWindowHeight();
};



Viewer.prototype.fullWindowHeight = function () {
  var newHeight = this.window.height() - $('.header').height();

  $('.full-height').height(newHeight);
};
