var Forms = function() {
  this.select = $('.form-select');

  this.init();
};

Forms.prototype.init = function () {
  this.initSelect();
};

Forms.prototype.initSelect = function () {
  this.select.selectize({
    sortField: {
      field: 'text',
      direction: 'asc'
    }
    , create: false
    , dropdownParent: 'body'
  });
};
