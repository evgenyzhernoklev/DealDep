$(document).ready(function() {
  var $window = $(window),
      $body = $('body');


  $('.form-select').selectize({
    sortField: {
      field: 'text',
      direction: 'asc'
    }
    , create: false
    , dropdownParent: 'body'
  });

  $('.first-enter-close').one('click', function(e) {
    e.preventDefault();
    $body.removeClass('first-enter');
  });



  $('.close-container-link').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.close-container').slideUp(500);
  });


  // full height in empty block
  function fullHeight() {
    var newHeight = $window.height() - $('.header').height();

    $('.full-height').height(newHeight);
  }

  $window.on('load resize', fullHeight);
});
