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
});
