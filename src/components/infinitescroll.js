angular.module('ngNephila.components.infinitescroll', [
  'ngNephila.services.visibleInContainer'
])
.directive('infiniteScroll', [
  '$window', 'visibleInContainer', function($window, visibleInContainer) {
    return {
      scope: {
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
          reached = visibleInContainer(elem[0], container[0]);
          if (reached && !visible) {
            visible = true;
            scope.onInfinite();
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
        changeContainer(windowElement);
        handler();
      }
    };
  }
]);