angular.module('ngNephila.services.pathJoin', [
  'ngNephila.filters.path'
])
.factory('pathJoin', function(pathFilter) {
  return function() {
    var noTrailingSlash = false;
    var pathArgumentsLength = arguments.length;
    if (typeof arguments[arguments.length - 1] == 'boolean') {
      noTrailingSlash = arguments[arguments.length - 1];
      pathArgumentsLength--;
    }
    var str = arguments[0];
    for (var i = 1; i < pathArgumentsLength; i++) {
      str = pathFilter(str, arguments[i], true);
    }
    if (!noTrailingSlash) {
      str += '/';
    }
    return str;
  };
});
