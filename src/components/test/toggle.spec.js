describe('Component: toggle', function() {

  var element, $scope, $compile;

  beforeEach(module('ngNephila.components.toggle'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  it('should fucking work', function () {
    element = angular.element('<div nph-toggle>Toggle</div>');
    element = $compile(element)($scope);
    $scope.$digest();
    $(element).trigger('click');
    expect($(element).attr('class').indexOf('active') >= 0).toEqual(true);
  });

  it('should set state when passed as attribute', function () {
    element = angular.element('<div nph-toggle state="true">Toggle</div>');
    element = $compile(element)($scope);
    $scope.$digest();
    $(element).trigger('click');
    expect($(element).attr('class').indexOf('active') >= 0).toEqual(false);
  });

  it('should set the class that we want', function () {
    element = angular.element('<div nph-toggle toggle-class="boom">Toggle</div>');
    element = $compile(element)($scope);
    $scope.$digest();
    $(element).trigger('click');
    expect($(element).attr('class').indexOf('boom') >= 0).toEqual(true);
    $(element).trigger('click');
    expect($(element).attr('class').indexOf('boom') >= 0).toEqual(false);
  });

  it('should change the internal state', function () {
    element = angular.element('<div nph-toggle state="true">Toggle</div>');
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    $(element).trigger('click');
    expect(isolated.state).toBe(false);
    $(element).trigger('click');
    expect(isolated.state).toBe(true);
  });

});
