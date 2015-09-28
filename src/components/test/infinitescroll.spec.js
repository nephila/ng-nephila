describe('Component: infinite-scroll', function() {

  var element, $scope, $compile, $timeout, $window;

  beforeEach(module('ngNephila.components.infinitescroll'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$window_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    $window = _$window_;

    element = angular.element('<nph-infinite-scroll on-infinite="callbacks.loadMore()" ng-if="callbacks.moreDataCanBeLoaded()"></nph-infinite-scroll>');
    $scope.callbacks = {
      loadMore: function() {
      },
      moreDataCanBeLoaded: function() {
        return true;
      },
    };
  }));

  it('should call on-infinite callback', function () {
    spyOn($scope.callbacks, 'loadMore');
    element = $compile(element)($scope);
    $scope.$digest();
    expect($scope.callbacks.loadMore).toHaveBeenCalled();
  });

  it('should not call on-infinite callback if ngIf returns false', function () {
    $scope.callbacks = {
      loadMore: function() {
      },
      moreDataCanBeLoaded: function() {
        return false;
      },
    };
    spyOn($scope.callbacks, 'loadMore');
    element = $compile(element)($scope);
    $scope.$digest();
    expect($scope.callbacks.loadMore.callCount).toEqual(0);
  });

});
