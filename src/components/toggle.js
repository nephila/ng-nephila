angular.module('ngNephila.components.toggle',[])
.directive('nphToggle', ['$rootScope', function($rootScope) {
  return {
    restrict: 'AE',
    scope: {
      state: '=',
    },
    link: function(scope, element, attrs) {
      var toggleClass = attrs.toggleClass;
      var toggleState = function() {
        scope.state = !scope.state;
      };
      if (!toggleClass) {
        toggleClass = 'active';
      }
      if (scope.state) {
        element.addClass(toggleClass);
      } else {
        element.removeClass(toggleClass);
      }
      element.bind('click', function() {
        element.toggleClass(toggleClass);
        if (scope.$$phase || $rootScope.$$phase) {
          scope.toggleState();
        } else {
          scope.$apply(toggleState);
        }
      });
    }
  };
}]);
