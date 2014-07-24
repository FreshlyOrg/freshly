angular.module('freshly.capture', [])

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

.controller('CaptureController', function($scope, Camera, Activities, $state, $stateParams) {

  // Object that holds all activity properties
  $scope.activity = {};

  // Object that holds photo to be taken
  $scope.imageData = {};

  // Default values on Capture page load
  $scope.activity.address = "Loading...";
  $scope.activity.lat = '';
  $scope.activity.lng = '';

  if ($stateParams.location) {
    var passedLocation = JSON.parse($stateParams.location);

    var lat = passedLocation.lat;
    var lng = passedLocation.lng;

    // Creates a LatLng object to be passed into reverse geocoder later
    var latlng = new google.maps.LatLng(lat, lng);

    // Makes a geocode request
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        console.log(status);
      }

      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);

        // Grabs the first element's formatted address type
        // NOTE: Total of 10 elements
        var address = (results[0].formatted_address);
        // console.log(address);

        // Necessarily uses $apply to update the properties on the $scope
        $scope.$apply(function () {
          $scope.activity.address = address;
          $scope.activity.lat = lat;
          $scope.activity.lng = lng;
        });
      }
    });
  } else {
    var getLocation = function(successCallback) {
      if (navigator.geolocation) {
        options = {
          // max 5 seconds of possible cached position that is acceptable to return
          maximumAge: 5000,
          // max 5 seconds that is allowed to return a position
          timeout: 5000,
          // provid emore accurate position (may take more time, and more energy consumption on device)
          enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
      }

      var errorCallback = function(data){
        console.log("Geolocation error: ", data);
      };
    };

    getLocation(function(data){
      var lat = data.coords.latitude;
      var lng = data.coords.longitude;

      // Creates a LatLng object to be passed into reverse geocoder later
      var latlng = new google.maps.LatLng(lat, lng);

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

          // Necessarily uses $apply to update the properties on the $scope
          $scope.$apply(function () {
            $scope.activity.address = address;
            $scope.activity.lat = lat;
            $scope.activity.lng = lng;
          });
        }
      });
    });
  }

  // JASEN: DOES NOT WORK!!
  $scope.renderPicture = function (input) {
    Camera.renderPicture(input);
  };

  /*
  Opens camera and allows for photo to be taken and returns photo
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
  */

  // Send new experience to db and return to app.map state
  $scope.createPin = function () {
    Activities.addActivity($scope.activity).then(function(response) {
      console.log('[JASEN] Response:', response);
      console.log('[JASEN] Response.data:', response.data);
      console.log('[JASEN] Response..._id:', response.data.activity[0]._id);
      console.log('[JASEN] imageData.myFile:', $scope.imageData.myFile);

      var image = $scope.imageData.myFile;

      // If there is an image send to server
      if (image) {
        Activities.addImage(image, response.data.activity[0]._id);
      }

      $state.go('app.map');
    }).catch(function(err) {
      console.err(err);
    });
  };

});
