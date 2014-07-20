angular.module('freshly.servicesMap', [])

  // Returns the current location of the user
  .factory('LocationService', function() {
    return {
      findCurrentLocation: function(successCallback){

        var errorCallback = function(data){
          return data;
        };
        if (navigator.geolocation) {
          options = { maximumAge: 5000, timeout: 5000 };
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
      },
      inBounds: function(marker, map){
        var northEast = map.getBounds().getNorthEast();
        var southWest = map.getBounds().getSouthWest();

        if(marker.lat < northEast.lat && marker.lng < northEast.lng){
          if(marker.lat > southWest.lat && marker.lng > southWest.lng){
            return true;
          }
        }
        return false;
      },
      createCircle: function(coords){
        return new L.circleMarker({
            lat: coords.latitude,
            lng: coords.longitude
          }, {
            // radius: coords.accuracy/2,
            radius: 10,
            fillColor: 'rgb(51, 146, 213)',
            color: 'rgb(51, 146, 213)'
        });
      }
    };
  });
