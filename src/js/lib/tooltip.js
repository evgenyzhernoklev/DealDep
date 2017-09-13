var Tooltip = function(container) {
  this.container = $(container);
  this.content = this.container.find('.tooltip-content');
  this.link = this.container.find('.tooltip-link');
  this.init();
}

Tooltip.prototype.init = function () {
  this.link.on('click', this.switchTooltip.bind(this));
};

Tooltip.prototype.switchTooltip = function (e) {
  e.preventDefault();
  this.content.stop().fadeToggle();
  this.link.toggleClass('is-active');
};
