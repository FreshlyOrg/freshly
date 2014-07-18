angular.module('freshly.capture', ['geolocation'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.capture', {
    url: '/capture/:location',
    views: {
      'app-capture': {
        templateUrl: 'app/controllers_views/capture/app-capture.html',
        controller: 'CaptureController'
      }
    }
  });
})

.controller('CaptureController', function($scope, geolocation, Camera, Activities, $state, $stateParams) {

  // DO WHAT YOU WILL WITH passedLocation
  var passedLocation = JSON.parse($stateParams.location);
  console.log('passedLocation', passedLocation);

  // Object that holds all activity properties
  $scope.activity = {};

  $scope.activity.address = "Loading...";
  $scope.activity.lat = '';
  $scope.activity.lng = '';

  geolocation.getLocation().then(function(data){

    var lat = data.coords.latitude;
    var lng = data.coords.longitude;
    console.log("lat: ", lat);
    console.log("lng: ", lng);

    // Creates a LatLng object to be passed into reverse geocoder later
    var latlng = new google.maps.LatLng(lat, lng);
    console.log("latlng object: ", latlng);

    // Makes a geocode request
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        console.log(status);
      }

      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);

        // Grabs the first element's formatted address type - NOTE: Total of 10 elements
        var address = (results[0].formatted_address);
        console.log(address);

        // Necessarily uses $apply to update the properties on the $scope
        $scope.$apply(function () {
          $scope.activity.address = address;
          $scope.activity.lat = lat;
          $scope.activity.lng = lng;
        });
      }
    });
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
    Activities.addActivity($scope.activity).then(function(response) {
      console.log(response);
      $state.go('app.map');
    }).catch(function(err) {
      console.err(err);
    });
  };

});
