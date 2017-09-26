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
  this.body.on('click', '.partner-entity-remove', this.removePartner.bind(this));

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

    if ( $(e.target).data('partner') ) {
      this.initSlider($clone);
      this.updatePartnerTitle($clone, $persons.length);
    }

    $clone.find('input').val('');
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

ProjectAdd.prototype.initSlider = function ($container) {
  $container.find(".formSlider").slider({
    range: "min",
    min: 1,
    max: 100,
    create: function() {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input'),
          inputValue = $input.val();

      $(this).slider('value', inputValue);
    },
    slide: function( event, ui ) {
      var $parent = $(this).closest('.formBlock'),
          $input = $parent.find('.fieldWrapper__input');

      $input.val( ui.value );
    }
  });
};

ProjectAdd.prototype.updatePartnerTitle = function ($container, length) {
  var $title = $container.find('.formTitle__counter'),
      $hint = $container.find('.formTitle__hint'),
      titleText = '';

  switch (length) {
    case 2:
      titleText = 'Третий'
      break;
    case 3:
      titleText = 'Четвертый'
      break;
    case 4:
      titleText = 'Пятый'
      break;
    case 5:
      titleText = 'Шестой'
      break;
  }

  $hint.remove();
  $title.text(titleText + ' участник');
  $title.closest('.formTitle').append('<span class="formTitle__remove partner-entity-remove">убрать участника</span>');
}

ProjectAdd.prototype.removePartner = function(e) {
  e.preventDefault();
  var $target = $(e.target),
      self = this;

  $target.closest('.personEntity').slideUp(700, function() {
    $(this).remove();
    self.updateTitles();
  });
};

ProjectAdd.prototype.updateTitles = function () {
  var $counter = $('.formTitle__counter'),
      counterLength = $counter.length;

  for (var i = 2; i < counterLength; i++) {
    var titleText = '';

    switch (i) {
      case 2:
        titleText = 'Третий'
        break;
      case 3:
        titleText = 'Четвертый'
        break;
      case 4:
        titleText = 'Пятый'
        break;
      case 5:
        titleText = 'Шестой'
        break;
    }

    $counter.eq(i).text(titleText + ' участник');
  }
};



$(document).ready(function() {
  if ($('.person-entity-clone').length) {
    new ProjectAdd();
  }
});
