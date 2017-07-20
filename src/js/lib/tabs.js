var Tabs = function(container) {
  this.container = $(container);
  this.content = this.container.find('.tab-content');
  this.links = this.container.find('.tab-link');

  this.init();
};

Tabs.prototype.init = function () {
  this.checkActiveContent();
  this.links.on('click', this.switchContent.bind(this));
};

Tabs.prototype.checkActiveContent = function () {
  var $active = this.links.filter('.is-active'),
      index = this.links.index($active);

  this.content.eq(index).addClass('is-active');
};

Tabs.prototype.switchContent = function (e) {
  e.preventDefault();
  var $target = $(e.target);

  if ($target.hasClass('is-active')) {
    return;
  }

  this.links.removeClass('is-active');
  this.content.removeClass('is-active');
  $target.addClass('is-active');
  this.checkActiveContent();
};
