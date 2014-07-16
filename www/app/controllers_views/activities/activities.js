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

  $scope.toggleActivity = function(activity) {
    if (!$scope.editing) {
      if (activity._id === $scope.viewActivity) {
        $scope.viewActivity = null;
      } else {
        $scope.viewActivity = activity._id;
      }
    }
  };

  $scope.addTag = function(activity) {
    if (activity.newTag) {
      if (!Array.isArray(activity.tags)) {
        activity.tags = [];
      }
      if (activity.tags.indexOf(activity.newTag) === -1) {
        activity.tags.push(activity.newTag);
      }
    }
    activity.newTag = '';
  }

  $scope.refreshActivities = function() {
    Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.editActivity = function(activity) {
    $scope.savedActivity = activity;
    $scope.editing = activity._id;
  };

  $scope.cancelEdit = function(activity) {
    $scope.editing = null;
    $scope.refreshActivities();
  };

  $scope.saveEdit = function(activity) {
    Activities.updateActivity(activity).then(function(response) {
      $scope.editing = null;
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.deleteActivity = function(activity) {
    if (confirm("Are you sure you want to delete this activity?")) {
      Activities.deleteActivity(activity._id).then(function(response) {
        console.log('Activity deleted');
        $scope.refreshActivities();
      }).catch(function(err) {
        console.log(err);
      });
    }
  };

  $scope.activities = [];
  $scope.refreshActivities();
});