angular.module('freshly.capture', ['geolocation'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.capture', {
    url: '/capture',
    views: {
      'app-capture': {
        templateUrl: 'app/controllers_views/capture/app-capture.html',
        controller: 'CaptureController'
      }
    }
  });
})

.controller('CaptureController', function($scope, geolocation, Camera, Activities, $state) {

  // Object that holds all activity properties
  $scope.activity = {};

  // Stores current location when go to capture state
  // $scope.activity.location = GetLocation();
  $scope.activity.location = "Loading...";

  geolocation.getLocation().then(function(data){
    var lat = $scope.activity.location.latitude = data.coords.latitude;
    var lng = $scope.activity.location.longitude = data.coords.longitude;

    var latlng = new google.maps.LatLng(lat, lng);

    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address = (results[0].formatted_address);
            console.log(address);
            $scope.activity.location = address;
        }
    });

    // $scope.activity.location = lat.toString() + ", " + lng.toString();
  });

  // Opens camera and allows for photo to be taken and returns photo
  $scope.openCamera = function () {
    Camera.getPicture().then(function(imageURI) {
      // console.log(imageURI);
      $scope.currentPhoto = imageURI;
    }, function(err) {
      console.err(err);
    } , {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };

  // Send new experience to db and return to app.map state
  $scope.createPin = function () {
    // JASEN: The two console.logs below were used temporarily to figure out getLocation... can delete.
    console.log("Latitude: " + $scope.activity.location.latitude);
    console.log("Longitude: " + $scope.activity.location.longitude);

    Activities.addActivity($scope.activity).then(function(response) {
      console.log(response);
      $state.go('app.map');
    }).catch(function(err) {
      console.err(err);
    });
  };

});
