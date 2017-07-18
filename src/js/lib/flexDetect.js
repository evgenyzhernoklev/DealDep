(function(d){
  var c = 'no-flexbox',
      prefixFlex = 'flex -webkit-flex -ms-flexbox -moz-box -webkit-box'.split(' '),
      prefixLength = prefixFlex.length,
      e = d.createElement('b');

  try {
    for (var i = 0; i < prefixLength; i++) {
      e.style.display = prefixFlex[i];

      if (e.style.display == prefixFlex[i]) {
        c = '';
        i = prefixLength;
      }
    }
  } catch(e) {
    c = 'no-flexbox';
  }

  if (c.length) {
    d.documentElement.className += c;
  }
})(document);
