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

  $scope.activity = {};

  // Stores current location when go to capture state
  // $scope.activity.location = GetLocation();
  $scope.activity.location = GetLocation.currentLocation();
  console.log("Scope.activity.location: ", $scope.activity.location);

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

  $scope.createPin = function () {
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
