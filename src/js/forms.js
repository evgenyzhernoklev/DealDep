$(document).ready(function() {
  $('.form-select').selectize({
    sortField: {
      field: 'text',
      direction: 'asc'
    }
    , create: false
    , dropdownParent: 'body'
  });
});
