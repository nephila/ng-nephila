describe('Component: modal', function() {

  var element, $scope, $compile, $timeout;

  beforeEach(module('ngNephila.components.modal'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    element = angular.element('<modal show="modalShown"><p>Modal Content Goes here</p></modal>');
  }));

  it('should fucking work', function () {
    element = $compile(element)($scope);
    $scope.$digest();
  });

  it('should close the modal on click', function () {
    $scope.modalShown = true;
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    isolated.hideModal();
    $scope.$digest();
    expect($scope.modalShown).toBe(false);
  });

});
