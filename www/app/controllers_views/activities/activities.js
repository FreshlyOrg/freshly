angular.module('freshly.activities', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.activities', {
    url: '/activities',
    views: {
      'app-activities': {
        templateUrl: 'app/controllers_views/activities/app-activities.html',
        controller: 'ActivitiesController'
      }
    }
  })
})

.controller('ActivitiesController', function($scope, Activities) {
  $scope.activities = [];
  Activities.getActivities().then(function(response) {
    console.log(response.data);
    $scope.activities = response.data;
  }).catch(function(err) {
    console.log(err);
  });

  $scope.toggleActivity = function(activity) {
    if (activity._id === $scope.viewActivity) {
      $scope.viewActivity = null;
    } else {
      $scope.viewActivity = activity._id;
    }
  }
});