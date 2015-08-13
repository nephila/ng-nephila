angular.module('ngNephila.services.scrolledInContainer', [])
.factory('scrolledInContainer', function() {
  return function(element, container) {
    var elementBox = element.getBoundingClientRect();
    var visible = (!element.style.opacity || element.style.opacity > 0) &&
      element.style.display !== 'none' &&
      element.style.visibility !== 'hidden';

    if (!visible) {
      return false;
    }

    if (!container.getBoundingClientRect) {
      return elementBox.top >= 0 && elementBox.bottom <= container.innerHeight;
    }

    var containerBox = container.getBoundingClientRect();

    return !(elementBox.bottom > containerBox.bottom);
  };
});
