var ProjectAdd = function() {
  this.body = $('body');
  this.personEntity = this.body.find('.person-entity-clone');
  this.personEntityClone = this.personEntity.clone();
  this.personButtonsContainer = this.body.find('.person-entity-links');
  this.addPersonButton = this.personButtonsContainer.find('.person-entity-add');
  this.removePersonButton = this.personButtonsContainer.find('.person-entity-remove');

  this.init();
};

ProjectAdd.prototype.init = function () {
  this.body.on('click', '.attention-close', this.closeAttention.bind(this));
  this.body.on('click', '.add-requisites-link', this.addRequisites.bind(this));
  this.body.on('click', '.remove-requisites-link', this.removeRequisites.bind(this));

  this.addPersonButton.on('click', this.addPerson.bind(this));
  this.removePersonButton.on('click', this.removePerson.bind(this));
};



ProjectAdd.prototype.addRequisites = function (e) {
  e.preventDefault();
  var $target = $(e.target);

  $target.hide();
  $target.siblings('.add-requisites-hidden').stop().slideDown(500, function() {
    $target.siblings('.remove-requisites-link').fadeIn();
  });
};

ProjectAdd.prototype.removeRequisites = function (e) {
  e.preventDefault();
  var $target = $(e.target);

  $target.hide();
  $target.siblings('.add-requisites-hidden').stop().slideUp(500, function() {
    $target.siblings('.add-requisites-link').fadeIn();
  });
};

ProjectAdd.prototype.closeAttention = function (e) {
  e.preventDefault();
  var $target = $(e.target);

  $target.closest('.attention-container').slideUp(500);
};

ProjectAdd.prototype.addPerson = function (e) {
  e.preventDefault();
  var $persons = $('.personEntity');

  if (this.personEntity.is(':hidden')) {
    this.personEntity.slideDown(700);
    this.personButtonsContainer.removeClass('is-first');
  } else {
    var $clone = this.personEntityClone.clone();

    new Tabs($clone);
    $clone.find('.form-select').selectize({
      sortField: {
        field: 'text',
        direction: 'asc'
      }
      , create: false
      , dropdownParent: 'body'
    });

    $clone.hide();
    $persons.last().after($clone);
    $clone.slideDown(700);
  }
};

ProjectAdd.prototype.removePerson = function (e) {
  e.preventDefault();
  var $persons = $('.personEntity');

  if ($persons.length < 2) {
    this.personEntity.slideUp(700);
    this.personButtonsContainer.addClass('is-first');
  } else {
    $persons.last().slideUp(700, function() {
      $(this).remove();
    });
  }
};



$(document).ready(function() {
  new ProjectAdd();
});
