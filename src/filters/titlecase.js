angular.module('ngNephila.filters.titlecase', [])
.filter('nphTitlecase', function() {
  return function(s, onlyFirst) {
    s = ( s === undefined || s === null ) ? '' : s;
    onlyFirst = ( onlyFirst === undefined || onlyFirst === null ) ? false : onlyFirst;
    var regexp = /\b([a-z])/g;
    if (onlyFirst) {
      regexp = /\b([a-z])/;
    }
    return s.toString().toLowerCase().replace( regexp, function(ch) {
      return ch.toUpperCase();
    });
  };
});