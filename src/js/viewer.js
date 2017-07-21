var Viewer = function() {
  this.window = $(window);
  this.body = $('body');

  this.init();
};

Viewer.prototype.init = function () {
  this.initClasses();
  this.initFunctions();

  this.window.on('resize', this.updateResizer.bind(this));



  // temporary here
  $('.first-enter-close').one('click', function(e) {
    e.preventDefault();
    $('body').removeClass('first-enter');
  });
};

Viewer.prototype.initClasses = function () {
  new Forms();
  $('.tab-container').each(function() {
    new Tabs(this);
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
