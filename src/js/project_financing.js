var ProjectFinancing = function() {
  this.body = $('body');
  this.personsEntity = this.body.find('.financing-participants-clone');
  this.personsEntityClone = this.personsEntity.clone();
  this.submitButton = this.body.find('.financing-submit');

  this.init();
};

ProjectFinancing.prototype.init = function() {
  this.body.on('click', '.financing-participants-update', this.updatePersonsEntity.bind(this));
  this.body.on('click', '.financing-participants-edit', this.editPersonsEntity.bind(this));
  this.body.on('click', '.financing-add-step', this.addStep.bind(this));
};

ProjectFinancing.prototype.updatePersonsEntity = function(e) {
  e.preventDefault();
  var $target = $(e.target),
      $container = $target.closest('.financing-participants-clone');

  this.submitButton.prop('disabled', '');
  $container.addClass('is-ok');
  $container.find('.formSwitch, .buttonContainer').stop().slideUp(300);
  $container.find('.formHidden, .editButton').stop().slideDown(300);
  $container.siblings('.financing-next-step').stop().slideDown(300);
};

ProjectFinancing.prototype.editPersonsEntity = function(e) {
  e.preventDefault();
  var $target = $(e.target),
      $container = $target.closest('.financing-participants-clone');

  this.submitButton.prop('disabled', 'true');
  $container.removeClass('is-ok');
  $container.find('.formSwitch, .buttonContainer').stop().slideDown(300);
  $container.find('.formHidden, .editButton').stop().slideUp(300);
  $container.siblings('.financing-next-step').stop().slideUp(300);
};

ProjectFinancing.prototype.addStep = function(e) {
  e.preventDefault();
  var $clone = this.personsEntityClone.clone(),
      $last = $('.financing-participants-clone').last();

  $clone.hide().insertAfter($last).slideDown(300);
};



$(document).ready(function() {
  if ($('.financing-participants-clone').length) {
    new ProjectFinancing();
  }
});
