var app = angular.module('demo', ['ngNephila']);

app.config(function(paginationProvider) {
  paginationProvider.setItemsPerPage(5);
});

app.controller('demoCtrl', function($scope, $timeout, pagination, tts) {
  $scope.myText = 'the last good day of the year';
  $scope.myHtmlText = '<p>the last <b>good day</b> of the <i>year</i></p>';
  $scope.loadCount = 0;
  $scope.loadingShow = true;
  $scope.scrollContainer = document.getElementById('innerscroll');

  $scope.loadMore = function() {
    alert("Load more!");
    $scope.loadCount++;
    if ($scope.loadCount==2) {
      $scope.loadingShow = false;
    }
  }

  $scope.startSpeaking = function() {
    tts.speak("Hi man! How are you? Hope fine!")
    .then(function() {
      console.log("SPEAK DONE!");
    }, function(err) {

    });
  }

  $scope.stopSpeaking = function() {
    tts.stop();
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
  $scope.myDate = new Date();
});