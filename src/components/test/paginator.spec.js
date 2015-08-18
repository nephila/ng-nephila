describe('Component: paginator', function() {

  var element, pProvider, $scope, $compile;

  beforeEach(module('ngNephila.components.paginator'));

  beforeEach(function(){
    module(function(paginationProvider){
      pProvider = paginationProvider;
    });
  });

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
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

});
