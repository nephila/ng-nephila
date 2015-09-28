angular.module('ngNephila.components.focusMe', [])
.directive('nphFocusMe', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.nphFocusMe, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
}]);
