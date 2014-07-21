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
    },
    addImage: function(image, activity_id) {
      var formData = new FormData();
      formData.append('file', image);
      return $http({
        method: 'POST',
        url: 'http://fresh.ly/api/activities/' + activity_id + '/images',
        headers: {
          "Content-Type": undefined
        },
        transformRequest: angular.identity,
        data: formData,
      });
    },
    updateImage: function(image, activity_id, imageIndex) {
      var formData = new FormData();
      formData.append('file', image);
      return $http({
        method: 'PUT',
        url: 'http://fresh.ly/api/activities/' + activity_id + '/images/' + imageIndex,
        headers: {
          "Content-Type": undefined
        },
        transformRequest: angular.identity,
        data: formData,
      });
    },
  };
});
