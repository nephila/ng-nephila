angular.module('ngNephila.services.visibleInContainer', [])
.factory('visibleInContainer', function() {
  return function(elem, container) {
    return elem.getBoundingClientRect().top >= 0 && elem.getBoundingClientRect().bottom <= container.innerHeight;
  };
});
