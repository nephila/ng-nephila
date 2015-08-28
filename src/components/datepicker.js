angular.module('ngNephila.components.datePicker', [
  'ngNephila.tpls.datepicker.datepicker'
])
.directive('datePicker', ['$document', function($document) {
  return {
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs) {

      scope.viewFormat = attrs.viewFormat || 'DD MMMM YYYY';
      scope.locale = attrs.locale || 'en';
      scope.firstWeekDaySunday = scope.$eval(attrs.firstWeekDaySunday) || false;
      scope.placeholder = attrs.placeholder || '';

      scope.calendarOpened = false;
      scope.days = [];
      scope.dayNames = [];
      scope.viewValue = null;
      scope.dateValue = null;

      moment.locale(scope.locale);
      var date = moment(scope.ngModel);
      scope.viewValue = date.format(scope.viewFormat);

      var generateCalendar = function (date) {
        var lastDayOfMonth = date.endOf('month').date(),
          month = date.month(),
          year = date.year(),
          n = 1;

        var firstWeekDay = scope.firstWeekDaySunday === true ? date.set('date', 2).day() : date.set('date', 1).day();
        if (firstWeekDay !== 1) {
          n -= firstWeekDay - 1;
        }

        scope.dateValue = date.format('MMMM YYYY');
        scope.days = [];

        for (var i = n; i <= lastDayOfMonth; i += 1) {
          if (i > 0) {
            scope.days.push({day: i, month: month + 1, year: year, enabled: true});
          } else {
            scope.days.push({day: null, month: null, year: null, enabled: false});
          }
        }
      };

      var generateDayNames = function () {
        var date = scope.firstWeekDaySunday === true ?  moment('2015-06-07') : moment('2015-06-01');
        for (var i = 0; i < 7; i += 1) {
          scope.dayNames.push(date.format('ddd'));
          date.add('1', 'd');
        }
      };

      generateDayNames();

      scope.showCalendar = function () {
        scope.calendarOpened = true;
        generateCalendar(date);
      };

      scope.closeCalendar = function () {
        scope.calendarOpened = false;
      };

      scope.prevYear = function () {
        date.subtract(1, 'Y');
        generateCalendar(date);
      };

      scope.prevMonth = function () {
        date.subtract(1, 'M');
        generateCalendar(date);
      };

      scope.nextMonth = function () {
        date.add(1, 'M');
        generateCalendar(date);
      };

      scope.nextYear = function () {
        date.add(1, 'Y');
        generateCalendar(date);
      };

      scope.selectDate = function (event, date) {
        event.preventDefault();
        var selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
        scope.ngModel = selectedDate.toDate();
        scope.viewValue = selectedDate.format(scope.viewFormat);
        scope.closeCalendar();
      };

      var classList = ['datepicker', 'datepicker-input'];
      if (attrs.id !== undefined) {
        classList.push(attrs.id);
      }
      $document.on('click', function (e) {
        if (!scope.calendarOpened) {
          return;
        }
        var i = 0,
          element;

        if (!e.target) {
          return;
        }

        for (element = e.target; element; element = element.parentNode) {
          var id = element.id;
          var classNames = element.className;

          if (id !== undefined) {
            for (i = 0; i < classList.length; i += 1) {
              if (id.indexOf(classList[i]) > -1 || classNames.indexOf(classList[i]) > -1) {
                return;
              }
            }
          }
        }

        scope.closeCalendar();
        scope.$apply();
      });

    },
    templateUrl: 'template/datepicker/datepicker.html'
  };

}]);
