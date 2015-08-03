var app = angular.module('demo', ['ngNephila']);
app.controller('demoCtrl', function($scope) {
  $scope.myText = 'the last good day of the year';
  $scope.npages = 5;
});