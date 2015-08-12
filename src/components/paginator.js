angular.module('ngNephila.components.paginator', [
  'ngNephila.services.pagination',
  'ngNephila.filters.range'
])
.directive('paginator', [
  '$filter', 'pagination', function($filter, pagination) {
    return {
      restrict: 'E',
      scope: {
        onPageChange: '&',
        numberOfItems: '=',
        start: '=',
      },
      templateUrl: 'template/paginator/paginator.html',
      controller: ['$scope', function ( $scope ) {
        $scope.paginator = pagination.getPaginator();
        $scope.paginator.setNumberOfItems(parseInt($scope.numberOfItems));
        $scope.paginator.onPageChange(function (page) {
          $scope.onPageChange({page: page});
        });
        $scope.pages = $filter('range')(1, 1 + $scope.paginator.getNumberOfPages());
        $scope.paginator.goToPage(parseInt($scope.start));
      }],
      link: function(scope, elem, attrs) {
        scope.$watch('numberOfItems', function(newValue, oldValue) {
          scope.paginator.setNumberOfItems(parseInt(newValue));
          scope.pages = $filter('range')(1, 1 + scope.paginator.getNumberOfPages());
        });
      }
    };
  }
]);
