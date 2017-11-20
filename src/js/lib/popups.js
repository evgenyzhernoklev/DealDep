var Popups = function() {
  this.body = $('body');
  this.bPopupOpened = false;
  this.init();
};

Popups.prototype.init = function () {
  this.body.on('click', '.popup-open', this.openPopup.bind(this));
};

Popups.prototype.openPopup = function(e) {
  e.preventDefault();
  var self = this,
      target = $(e.target).closest('.popup-open').data('popup'),
      $target = $('.' + target),
      closeEl = 'popup-close';

  if (this.bPopupOpened) {
    this.bPopupOpened.bPopup().close();
  }

  this.bPopupOpened = $target.bPopup({
    opacity: 0.8,
    follow: [true, false],
    closeClass: closeEl,
    onOpen: function() {
      self.body.addClass('popup-opened');
    },
    onClose: function() {
      self.bPopupOpened = '';
      self.body.removeClass('popup-opened');
    }
  });
};
