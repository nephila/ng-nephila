describe('Component: paginator', function() {

  var element, pProvider, $scope, $compile, $timeout;

  var checkVisibilityRange = function(pagesVisibility, start, end, value) {
    for (var page=start ; page <= end ; page++) {
      expect(pagesVisibility[page].visibility).toBe(value);
    }
  };

  beforeEach(module('ngNephila.components.paginator'));

  beforeEach(function(){
    module(function(paginationProvider){
      pProvider = paginationProvider;
    });
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $timeout = _$timeout_;
  }));

  it('should fucking work', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    expect(isolated.start).toBe(1);
    expect(isolated.numberOfItems).toBe(100);
    expect(isolated.paginator.getNumberOfPages()).toBe(20);
  });

  it('should change pages when number-of-items changes', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    expect(isolated.pages.length).toBe(20);
    $scope.nitems = 200;
    $scope.$digest();
    expect(isolated.pages.length).toBe(40);
  });

  it('should change visible pages if compression is active', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" compress="2" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    checkVisibilityRange(isolated.pagesVisibility, 1, 4 ,true);
    checkVisibilityRange(isolated.pagesVisibility, 5, 18 ,false);
    checkVisibilityRange(isolated.pagesVisibility, 19, 20 ,true);

  });

  it('should change visible pages on page change if compression is active', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" compress="2" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    isolated.paginator.goToPage(11);
    checkVisibilityRange(isolated.pagesVisibility, 1, 2 ,true);
    checkVisibilityRange(isolated.pagesVisibility, 3, 8 ,false);
    checkVisibilityRange(isolated.pagesVisibility, 9, 13 ,true);
    checkVisibilityRange(isolated.pagesVisibility, 14, 18 ,false);
    checkVisibilityRange(isolated.pagesVisibility, 19, 20 ,true);
  });

  it('should change visible pages on page change if compression is active and compress changes', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" compress="1" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    isolated.paginator.goToPage(11);
    checkVisibilityRange(isolated.pagesVisibility, 1, 2 ,true);
    checkVisibilityRange(isolated.pagesVisibility, 3, 9 ,false);
    checkVisibilityRange(isolated.pagesVisibility, 10, 12 ,true);
    checkVisibilityRange(isolated.pagesVisibility, 13, 18 ,false);
    checkVisibilityRange(isolated.pagesVisibility, 19, 20 ,true);
  });

  it('should show all the pages if compression is active and compress rate is high', function () {
    pProvider.setItemsPerPage(5);
    $scope.nitems = 100;
    $scope.pageChange = function(page) {};
    element = angular.element('<paginator start="1" compress="19" number-of-items="nitems" on-page-change="pageChange"></paginator>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    checkVisibilityRange(isolated.pagesVisibility, 1, 20 ,true);
  });

});
