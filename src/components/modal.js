angular.module('ngNephila.components.modal', [
  'ngNephila.tpls.modal.modal'
])
.directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    transclude: true,
    link: function(scope, element, attrs, transcludeFn) {
      scope.dialogStyle = {};
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: function(elem,attrs) {
      return attrs.templateUrl || 'template/modal/modal.html';
    }
  };
});