angular.module('ngNephila.components.fallbackImg',[])
.directive('fallbackImg', function () {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function () {
        angular.element(this).attr('src', attrs.fallbackImg);
      });
    }
  };
});
