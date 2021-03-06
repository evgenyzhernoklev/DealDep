var Arrangement = function(container) {
  this.container = $(container);
  this.content = this.container.find('.arrangement-content');
  this.tabs = this.container.find('.arrangement-tab');

  this.WIDTH_MOBILE = 767;

  this.init();
};

Arrangement.prototype.init = function () {
  this.tabs.on('click', this.switchTabs.bind(this));
  $('body').on('click', '.is-inactive', function(e) {
    e.preventDefault();
  });
};

Arrangement.prototype.switchTabs = function(e) {
  var $target = $(e.target),
      arrangementGroup = $target.data('arrangement'),
      $link = this.container.find('.tooltip-link');

  if (!$target.hasClass('is-active')) {
    this.tabs.removeClass('is-active');
    $target.addClass('is-active');
    this.cleanContent();
    this.switchContent(arrangementGroup);
    $link.text($target.text());
  } else {
    this.tabs.removeClass('is-active');
    this.cleanContent();
    $link.text('Все области');
  }

  if (viewportSize.getWidth() <= this.WIDTH_MOBILE) {
    $link.trigger('click');
  }
};

Arrangement.prototype.switchContent = function(arrangementGroup) {
  this.content.each(function(index, element) {
    if ($(element).data('arrangement') != arrangementGroup) {
      $(element).addClass('is-inactive');
    }
  });
};

Arrangement.prototype.cleanContent = function () {
  this.content.removeClass('is-inactive');
};



$(document).ready(function() {
  $('.arrangement-container').each(function() {
    new Arrangement(this);
  });
});
