describe('Component: focus-me', function() {

  var element, $scope, $compile, $timeout;

  beforeEach(module('ngNephila.components.focusMe'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $timeout = _$timeout_;
    $scope = _$rootScope_.$new();
    $scope.shouldFocus = false;
    element = angular.element('<input focus-me="shouldFocus">');
  }));

  it('should fucking work', function () {
    element = $compile(element)($scope);
    spyOn(element[0], 'focus');
    $scope.shouldFocus = true;
    $scope.$digest();
    expect(element[0].focus).not.toHaveBeenCalled();
    $timeout.flush();
    expect(element[0].focus).toHaveBeenCalled();
  });

});
