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
  $scope.refreshActivities = function() {
    Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.toggleActivity = function(activity) {
    if (activity._id === $scope.viewActivity) {
      $scope.viewActivity = null;
    } else {
      $scope.viewActivity = activity._id;
    }
  };

  $scope.editActivity = function(activity) {
    $scope.savedActivity = activity;
    $scope.editing = activity._id;
  };
  
  $scope.cancelEdit = function(activity) {
    $scope.editing = null;
    Activities.getActivity(activity._id).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.saveEdit = function(activity) {
    Activity.updateActivity(activity).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.deleteActivity = function(activity) {
    if (confirm("Are you sure you want to delete this activity?")) {
      Activity.deleteActivity(activity).then(function(response) {
        console.log(response);
      }).catch(function(err) {
        console.log(err);
      });
    }
  };

  $scope.activities = [];
  $scope.refreshActivities();
});