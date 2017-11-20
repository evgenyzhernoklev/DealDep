/*
 * Third party
 */

//= ../../node_modules/jquery/dist/jquery.min.js



/*
 * Custom
 */

//= ./vendor/jquery-ui.js
//= ./vendor/slick.min.js
//= ./vendor/bpopup.min.js
//= ./vendor/selectize.min.js
//= ./vendor/viewportSize.js
//= ./vendor/jquery.inputmask.bundle.js

//= ./lib/flexDetect.js
//= ./lib/tabs.js
//= ./lib/forms.js
//= ./lib/tooltip.js
//= ./lib/popups.js
//= ./lib/menu.js

//= ./account.js
//= ./piechart.js
//= ./project_add.js
//= ./project_financing.js
//= ./arrangement.js
//= ./viewer.js



$(document).ready(function() {
  new Viewer();

  $('.first-enter-close').one('click', function(e) {
    e.preventDefault();
    $('body').removeClass('first-enter');
  });

  $('.info-link-hide').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.info-link-target').slideUp();
  });
});
