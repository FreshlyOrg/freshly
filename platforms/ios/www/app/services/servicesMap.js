angular.module('freshly.servicesMap', [])

  // Returns the current location of the user
  .factory('GetLocation', function() {
    return {
      currentLocation: function() {
        if (geoPosition.init()) {
          return geoPosition.getCurrentPosition(function (loc) {
            console.log("Latitude: ", loc.coords.latitude);
            console.log("Longitude: ", loc.coords.longitude);
            return {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude
            };
          }, function () {
            console.log("Snap. Could not find your current location.");
          });
        }
      }
    };
  })

  // Takes lat, lon as params and returns address using GoogleAPI
  .factory('LatLonIntoAddress', function (lat, lon) {
  })

  .factory('AddressIntoLatLon', function (address) {

  /*
  //JASEN: TO BE REVIEWED
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': $scope.experience.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $scope.experience.lat = results[0].geometry.location.lat();
        $scope.experience.lon = results[0].geometry.location.lng();
      }
    });

  // add to index????
    // <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
  // JASEN: TO BE REVIEWED
  */

  });
