angular.module('ngNephila.components.toggle',[])
.directive('toggle', function () {
  return {
    scope: {
      state: '=',
    },
    link: function(scope, element, attrs) {
      var toggleClass = attrs.toggleClass;
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
      });
    }
  };
});
