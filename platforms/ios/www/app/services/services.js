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
      })
    },
    deleteActivity: function(activity_id) {
      return $http({
        method: 'DELETE',
        url: 'http://fresh.ly/api/activities/' + activity_id
      });
    }
  };
})

// JASEN: Access the device's camera
.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
}]);
