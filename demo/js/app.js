var app = angular.module('demo', ['ngNephila']);

app.config(function(paginationProvider) {
  paginationProvider.setItemsPerPage(5);
});

app.controller('demoCtrl', function($scope, pagination) {
  $scope.myText = 'the last good day of the year';
  $scope.paginator = pagination.getPaginator();
  $scope.paginator.setNumberOfItems(10);
  $scope.paginator.onPageChange(function(page){
    alert(page);
  });
  $scope.paginator.goToPage(1);
});