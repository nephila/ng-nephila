angular.module('ngNephila.filters.path', [])
.filter('path', function() {
  return function(base, path, noTrailingSlash) {
    var remove = '/';
    while (path.length > 0 && remove.indexOf(path.charAt(0)) != -1) {
      path = path.substr(1);
    }
    while (path.length > 0 && remove.indexOf(path.charAt(path.length - 1)) != -1) {
      path = path.substr(0, path.length - 1);
    }
    if (!noTrailingSlash) {
      path = path + '/';
    }
    return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + path;
  };
});