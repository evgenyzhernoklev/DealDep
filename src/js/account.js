$(document).ready(function() {
  $hiddenText = $('.loginHeaderTooltip__hidden');

  $('.loginHeaderTooltip').on('click', function () {
    $(this).toggleClass('is-active');
  });

  $('.tab-link').on('click', function() {
    $hiddenText.text($(this).text());
  });
});
