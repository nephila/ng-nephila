angular.module('ngNephila.filters.stripHtml', [])
.filter('nphStripHtml', function() {
  return function(s) {
    return s ? String(s).replace(/<[^>]+>/gm, '') : '';
  };
});