angular.module('freshly.capture', [])

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

.controller('CaptureController', function($scope, Camera, GetLocation, Activities, $state) {

  // Object that holds all activity properties
  $scope.activity = {};

  // Stores current location when go to capture state
  // $scope.activity.location = GetLocation();
  $scope.activity.location = "Loading...";

  GetLocation.currentLocation().then(function(response) {
    $scope.activity.location = response.latitude;
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
