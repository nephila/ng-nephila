describe('Component: datePicker', function() {

  var element, isolated, $scope, $compile, $timeout, $document;

  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  beforeEach(module('ngNephila.components.datePicker'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$document_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    $document = _$document_;

    element = angular.element('<date-picker ng-model="myDate" view-format="DD MMMM YYYY"></date-picker>');
  }));

  it('should show correct data on showCalendar', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    var today = new Date();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth()] + ' ' + today.getFullYear()
    );
  });

  it('should generate correct day names on showCalendar', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.dayNames).toEqual(
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    );
    element = angular.element('<date-picker first-week-day-sunday="true" ng-model="myDate" view-format="DD MMMM YYYY"></date-picker>');
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.dayNames).toEqual(
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    );

  });

  it('should generate correct day names based on locale', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.dayNames).toEqual(
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    );
    element = angular.element('<date-picker ng-model="myDate" locale="it" view-format="DD MMMM YYYY"></date-picker>');
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.dayNames).toEqual(
      ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    );

  });

  it('should update status on showCalendar and closeCalendar', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.calendarOpened).toEqual(true);
    isolated.closeCalendar();
    expect(isolated.calendarOpened).toEqual(false);
  });

  it('should close calendar on $document click', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    isolated.showCalendar();
    expect(isolated.calendarOpened).toEqual(true);
    $document.trigger('click');
    expect(isolated.calendarOpened).toEqual(false);
  });

  it('should move correctly through the calendar', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    var today = new Date();
    isolated.nextMonth();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth() + 1] + ' ' + today.getFullYear()
    );

    isolated.prevMonth();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth()] + ' ' + today.getFullYear()
    );

    isolated.nextYear();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth()] + ' ' + (today.getFullYear() + 1)
    );

    isolated.prevYear();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth()] + ' ' + today.getFullYear()
    );
  });

  it('should view the correct date', function () {
    element = $compile(element)($scope);
    $scope.$digest();
    isolated = element.isolateScope();
    var today = new Date();
    isolated.nextMonth();
    expect(isolated.dateValue).toEqual(
      monthNames[today.getMonth() + 1] + ' ' + today.getFullYear()
    );

    var ev = {
      preventDefault: function (){}
    };

    var selectDate = {
      day: 2,
      month: 4,
      year: 2015,
    };

    isolated.selectDate(ev, selectDate);
    expect(isolated.viewValue).toEqual('02 April 2015');

  });

});