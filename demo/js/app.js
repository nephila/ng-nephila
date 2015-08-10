var app = angular.module('demo', ['ngNephila']);

app.config(function(paginationProvider) {
  paginationProvider.setItemsPerPage(5);
});

app.controller('demoCtrl', function($scope, $timeout, pagination) {
  $scope.myText = 'the last good day of the year';
  $scope.loadCount = 0;
  $scope.loadMore = function() {
    alert("Load more!");
    $scope.loadCount++;
  }
  $scope.moreDataCanBeLoaded = function() {
    return $scope.loadCount < 2;
  }
  $scope.pageChange = function(page) {
    $timeout(function() {
      $scope.numberOfItems = 100;
      alert("BAH, " + page);
    }, 1000);
  }
});