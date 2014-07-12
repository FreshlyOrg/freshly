angular.module('freshly.directives', [])

.directive('ngActivity', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/activities/_activity.html'
  }
})