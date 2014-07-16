angular.module('freshly.servicesMap', [])

  .factory('LocationService', function($http) {
    var loc;

    return {
      // returns a list of params associated to the location which is being watched
      // Params include lattitude, longitude, timestamp, accuracy, etc
      getLocation: function() {
        return loc;
      },
      setLocation: function(location) {
        loc = location;
      }
    };
  });
