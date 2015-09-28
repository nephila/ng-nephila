angular.module('ngNephila.components.paginator', [
  'ngNephila.services.pagination',
  'ngNephila.filters.range',
  'ngNephila.tpls.paginator.paginator'
])
.directive('nphPaginator', [
  '$filter', 'nphPagination', function($filter, nphPagination) {
    return {
      restrict: 'E',
      scope: {
        onPageChange: '&',
        numberOfItems: '=',
        start: '=',
        compress: '@',
        prevLabel: '@',
        nextLabel: '@',
        compressLabel: '@'
      },
      templateUrl: function(elem,attrs) {
        return attrs.templateUrl || 'template/paginator/paginator.html';
      },
      controller: ['$scope', function ( $scope ) {
        $scope.pagesVisibility = [];
        $scope.paginator = nphPagination.getPaginator();
        $scope.paginator.setNumberOfItems(parseInt($scope.numberOfItems));
        $scope.pages = $filter('nphRange')(1, 1 + $scope.paginator.getNumberOfPages());
        $scope.calculatePagesVisiblity = function() {
          var compress = parseInt($scope.compress);
          if (!compress) {
            return;
          }
          var currentPage = $scope.paginator.getCurrentPage();
          var numberOfPages = $scope.paginator.getNumberOfPages();
          if (!numberOfPages) {
            return;
          }
          $scope.pagesVisibility = new Array(numberOfPages+1);
          var left = currentPage - compress;
          var right = currentPage + compress;
          var firstLeftReached = false;
          var firstRightReached = false;
          if (left < 0) {
            right = right + (left * -1);
            left = 1;
          }

          for (var page = 1 ; page <= numberOfPages ; page++) {
            // Create visibility infos for page
            $scope.pagesVisibility.splice(page, 0, {
              visibility: false,
              firstHide: false
            });
            // Set visibilities for boundaries or other elements
            if (page < 3 || page > numberOfPages - 2) {
              $scope.pagesVisibility[page].visibility = true;
            } else {
              if (page < left) {
                $scope.pagesVisibility[page].visibility = false;
              } else if (page > right) {
                $scope.pagesVisibility[page].visibility = false;
              } else {
                $scope.pagesVisibility[page].visibility = true;
              }
              // Get first hide on the left side
              if ($scope.pagesVisibility[page].visibility === false) {
                if (!firstLeftReached) {
                  $scope.pagesVisibility[page].firstHide = true;
                  firstLeftReached = true;
                }
              }
              // Get first hide on the right side
              if (page == right + 1) {
                if (firstLeftReached && !firstRightReached) {
                  $scope.pagesVisibility[page].firstHide = true;
                  firstRightReached = true;
                }
              }
            }
          }
          // Do not hide a single element between 2 visible elements
          if (left - 2 >= 1 && $scope.pagesVisibility[left - 2].visibility === true) {
            $scope.pagesVisibility[left - 1].visibility = true;
            $scope.pagesVisibility[left - 1].firstHide = false;
          }
          if (right + 2 < numberOfPages && $scope.pagesVisibility[right + 2].visibility === true ) {
            $scope.pagesVisibility[right + 1].visibility = true;
            $scope.pagesVisibility[right + 1].firstHide = false;
          }
        };
        $scope.canHide = function(page) {
          if (!$scope.pagesVisibility.length) {
            return false;
          }
          return !$scope.pagesVisibility[page].visibility && !$scope.pagesVisibility[page].firstHide;
        };
        $scope.isFirstCanHide = function(page) {
          if (!$scope.pagesVisibility.length) {
            return false;
          }
          return $scope.pagesVisibility[page].firstHide;
        };
        $scope.paginator.onPageChange(function (page) {
          $scope.onPageChange({page: page});
          $scope.calculatePagesVisiblity();
        });
        $scope.paginator.goToPage(parseInt($scope.start));
      }],
      link: function(scope, elem, attrs) {
        scope.$watch('numberOfItems', function(newValue, oldValue) {
          scope.paginator.setNumberOfItems(parseInt(newValue));
          scope.pages = $filter('nphRange')(1, 1 + scope.paginator.getNumberOfPages());
          scope.calculatePagesVisiblity();
        });
      }
    };
  }
]);
