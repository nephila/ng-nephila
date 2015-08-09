describe('Component: fallback-img', function() {

  var element, $scope, $compile;

  beforeEach(module('ngNephila.components.fallbackImg'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();

    element = angular.element('<img ng-src="" fallback-img="img/nocover.png">');

  }));

  it('should set fallback-img on error', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    expect($(element).attr('src')).toEqual(undefined);
    $(element).trigger('error');
    expect($(element).attr('src')).toEqual('img/nocover.png');
  });

});
