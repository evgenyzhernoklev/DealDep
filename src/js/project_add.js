var ProjectAdd = function() {
  this.body = $('body');

  this.init();
};

ProjectAdd.prototype.init = function () {
  this.body.on('click', '.attention-close', this.closeAttention.bind(this));
  this.body.on('click', '.add-requisites-link', this.addRequisites.bind(this));
  this.body.on('click', '.remove-requisites-link', this.removeRequisites.bind(this));
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

  $target.closest('.close-container').slideUp(500);
};


$(document).ready(function() {
  new ProjectAdd();
});
