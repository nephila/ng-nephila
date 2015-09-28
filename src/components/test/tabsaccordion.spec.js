describe('Component: tabsaccordion', function() {

  var element, $scope, $compile, $timeout;

  beforeEach(module('ngNephila.components.tabsaccordion'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    var element_html = '<nph-tabsaccordion>' +
    '<nph-tabheaders>' +
    '<nph-tabheader selected="true" ref="tab1"><p>Tab 1</p><div>Tab 1</div></nph-tabheader>' +
    '<nph-tabheader ref="tab2"><p>Tab 2</p><div>Tab 2</div></nph-tabheader>' +
    '</nph-tabheaders>' +
    '<nph-tabcontents>' +
    '<nph-tabcontent ref="tab1">Content 1</nph-tabcontent>' +
    '<nph-tabcontent ref="tab2">Content 2</nph-tabcontent>' +
    '</nph-tabcontents>' +
    '</nph-tabsaccordion>';
    element = angular.element(element_html);
  }));

  it('should fucking work', function () {
    element = $compile(element)($scope);
    $scope.$digest();
  });

  it('should setup statuses', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    expect(isolated.statuses['tab1']).toEqual(true);
    expect(isolated.statuses['tab2']).toEqual(false);
  });

  it('should be selected only one', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    var isolated = element.isolateScope();
    isolated.setStatus('tab2', true);
    expect(isolated.statuses['tab1']).toEqual(false);
    expect(isolated.statuses['tab2']).toEqual(true);
  });

});
