angular.module('ngNephila.components.focusMe',[])
.directive('focusMe', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
}]);
