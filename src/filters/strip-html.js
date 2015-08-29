angular.module('ngNephila.filters.stripHtml', [])
.filter('stripHtml', function() {
  return function(s) {
    return s ? String(s).replace(/<[^>]+>/gm, '') : '';
  };
});