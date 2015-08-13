angular.module('ngNephila.components.infinitescroll', [
  'ngNephila.services.scrolledInContainer'
])
.directive('infiniteScroll', [
  '$window', '$rootScope', 'scrolledInContainer', function($window, $rootScope, scrolledInContainer) {
    return {
      restrict: 'E',
      scope: {
        scrollContainer: '=',
        onInfinite: '&',
        ngIf: '&',
      },
      link: function(scope, elem, attrs) {
        var visible = false;
        var windowElement = angular.element($window);
        var container = null;
        var reached;
        var handler = function() {
          if (scope.ngIf() === false) {
            return;
          }
          reached = scrolledInContainer(elem[0], container[0]);
          if (reached && !visible) {
            visible = true;
            if (scope.$$phase || $rootScope.$$phase) {
              scope.onInfinite();
            } else {
              scope.$apply(scope.onInfinite);
            }
          } else if (!reached && visible) {
            visible = false;
          }
        };
        var changeContainer = function(newContainer) {
          if (container != null) {
            container.unbind('scroll', handler);
          }
          container = newContainer;
          if (newContainer != null) {
            return container.bind('scroll', handler);
          }
        };
        if (scope.scrollContainer) {
          changeContainer(angular.element(scope.scrollContainer));
        } else {
          changeContainer(windowElement);
        }
        handler();
      }
    };
  }
]);