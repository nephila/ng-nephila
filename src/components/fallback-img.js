angular.module('ngNephila.components.fallbackImg',[])
.directive('nphFallbackImg', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('error', function () {
        angular.element(this).attr('src', attrs.nphFallbackImg);
      });
    }
  };
});
