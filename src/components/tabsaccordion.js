angular.module('ngNephila.components.tabsaccordion', [])
.directive('tabsaccordion', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    transclude: true,
    replace: true,
    controller: function($scope) {
      var vm = this;
      vm.$scope = $scope;
      $scope.statuses = {};
      $scope.contents = {};

      $scope.setStatus = function(key, status) {
        if (status === true) {
          for (var k in $scope.statuses) {
            $scope.statuses[k] = false;
          }
        }
        $scope.statuses[key] = status;
      };

      $scope.getStatus = function(key) {
        return $scope.statuses[key];
      };

      $scope.setContent = function(key, content) {
        $scope.contents[key] = content;
      };

      $scope.getContent = function(key) {
        return $scope.contents[key];
      };

    },
    link: function(scope, element, attrs, transcludeFn) {

    },
    template: '<div ng-transclude></div>',
  };
})
.directive('tabheaders', function() {
  return {
    restrict: 'E',
    scope: {
    },
    transclude: true,
    replace: true,
    controller: function($scope) {

    },
    link: function(scope, element, attrs, transcludeFn) {

    },
    template: '<ul class="tab-headers" ng-transclude></ul>',
  };
})
.directive('tabcontents', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    controller: function($scope) {
    },
    link: function(scope, element, attrs, transcludeFn) {

    },
    template: '<div class="tab-contents" ng-transclude></div>',
  };
})
.directive('tabheader', function() {
  return {
    scope: {
      ref: '@',
      selected: '@'
    },
    require: '^tabsaccordion',
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs, tabsaccordion) {
      scope.selected = (scope.selected === 'true');
      tabsaccordion.$scope.setStatus(attrs['ref'], scope.selected);
      tabsaccordion.$scope.setContent(
        attrs['ref'],
        element.find('a')[0].innerHTML
      );
      element.find('a').on('click', function(e){
        e.preventDefault();
        scope.$apply(
          tabsaccordion.$scope.setStatus(attrs['ref'], true)
        );
      });
      tabsaccordion.$scope.$watch('statuses.' + attrs['ref'] + '', function (newValue, oldValue){
        scope.selected = tabsaccordion.$scope.getStatus(attrs['ref']);
      });
    },
    template: '<li ng-class="{\'tab-active\':selected}"><a href="#{{ref}}" ng-transclude></a></li>',
  };
})
.directive('tabcontent', ['$sce', function($sce) {
  return {
    scope: {
      ref: '@'
    },
    require: '^tabsaccordion',
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs, tabsaccordion) {
      scope.selected = false;
      element.find('a').on('click', function(e){
        e.preventDefault();
        scope.$apply(
          tabsaccordion.$scope.setStatus(attrs['ref'], true)
        );
      });
      scope.content = $sce.trustAsHtml(tabsaccordion.$scope.getContent(attrs['ref']));
      tabsaccordion.$scope.$watch('statuses.' + attrs['ref'] + '', function (newValue, oldValue){
        scope.selected = tabsaccordion.$scope.getStatus(attrs['ref']);
      });
    },
    template: '<div><div class="accordion-link" ng-class="{\'accordion-active\':selected}"><a href="#{{ref}}" ng-bind-html="content"></a></div><div ng-class="{\'tab-active\':selected, \'accordion-active\':selected}" class="tab-content" id="{{ref}}" ng-transclude></div></div>',
  };
}]);
