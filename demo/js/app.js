var app = angular.module('demo', ['ngNephila']);

app.config(function(nphPaginationProvider) {
  nphPaginationProvider.setItemsPerPage(5);
});

app.controller('demoCtrl', function($scope, $timeout, nphPagination, nphTts) {
  $scope.myText = 'the last good day of the year';
  $scope.myHtmlText = '<p>the last <b>good day</b> of the <i>year</i></p>';
  $scope.loadCount = 0;
  $scope.loadingShow = true;
  $scope.scrollContainer = document.getElementById('innerscroll');
  $scope.modalShown = false;

  $scope.showModal = function () {
    $scope.modalShown = true;
  }

  $scope.loadMore = function () {
    alert("Load more!");
    $scope.loadCount++;
    if ($scope.loadCount==2) {
      $scope.loadingShow = false;
    }
  }

  $scope.startSpeaking = function () {
    nphTts.speak("Hi man! How are you? Hope fine!")
    .then(function() {
      console.log("SPEAK DONE!");
    }, function(err) {

    });
  }

  $scope.stopSpeaking = function () {
    nphTts.stop();
  }

  $scope.moreDataCanBeLoaded = function () {
    return $scope.loadCount < 2;
  }

  $scope.pageChange = function (page) {
    $timeout(function() {
      $scope.numberOfItems = 100;
      $scope.loadingShow = false;
      alert("BAH, " + page);
    }, 1000);
  }
  $scope.myDate = new Date();
});