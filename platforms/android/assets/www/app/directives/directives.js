angular.module('freshly.directives', [])

.directive('ngActivity', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/controllers_views/activities/activity.html'
  }
})