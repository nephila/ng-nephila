var app = angular.module('demo', ['ngNephila']);

app.config(function(paginationProvider) {
  paginationProvider.setItemsPerPage(5);
});

app.controller('demoCtrl', function($scope, $timeout, pagination) {
  $scope.myText = 'the last good day of the year';
  $scope.loadCount = 0;
  $scope.loadingShow = true;
  $scope.scrollContainer = document.getElementById('innerscroll');
  console.log($scope.scrollContainer);
  $scope.loadMore = function() {
    alert("Load more!");
    $scope.loadCount++;
    if ($scope.loadCount==2) {
      $scope.loadingShow = false;
    }
  }
  $scope.moreDataCanBeLoaded = function() {
    return $scope.loadCount < 2;
  }
  $scope.pageChange = function(page) {
    $timeout(function() {
      $scope.numberOfItems = 100;
      $scope.loadingShow = false;
      alert("BAH, " + page);
    }, 1000);
  }
});