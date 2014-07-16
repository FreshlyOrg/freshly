angular.module('freshly.services', [])

.factory('Activities', function($http) {
  return {
    getActivities: function() {
      return $http({
        method: 'GET',
        url: 'http://fresh.ly/api/activities'
      });
    },
    addActivity: function(activity) {
      return $http({
        method: 'POST',
        url: 'http://fresh.ly/api/activities',
        data: activity,
        dataType: 'json'
      });
    },
    getActivity: function(activity_id) {
      return $http({
        method: 'GET',
        url: 'http://fresh.ly/api/activities/' + activity_id
      });
    },
    updateActivity: function(activity) {
      return $http({
        method: 'PUT',
        url: 'http://fresh.ly/api/activities/' + activity._id,
        data: activity,
        dataType: 'json'
      });
    },
    deleteActivity: function(activity_id) {
      return $http({
        method: 'DELETE',
        url: 'http://fresh.ly/api/activities/' + activity_id
      });
    }
  };
});
