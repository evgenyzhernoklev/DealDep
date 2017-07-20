var Viewer = function() {
  this.window = $(window);
  this.body = $('body');

  this.init();
};

Viewer.prototype.init = function () {
  this.initClasses();
};

Viewer.prototype.initClasses = function () {
  new Forms();
  $('.tab-container').each(function() {
    new Tabs(this);
  });
};



$(document).ready(function() {
  var $window = $(window),
      $body = $('body');

  $('.first-enter-close').one('click', function(e) {
    e.preventDefault();
    $body.removeClass('first-enter');
  });

  // full height in empty block
  function fullHeight() {
    var newHeight = $window.height() - $('.header').height();

    $('.full-height').height(newHeight);
  }

  $window.on('load resize', fullHeight);

  new Viewer();
});
