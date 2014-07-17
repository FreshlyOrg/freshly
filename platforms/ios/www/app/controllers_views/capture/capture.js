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

.controller('CaptureController', function($scope, Camera, LocationService, Activities, $state) {

  $scope.activity = {};

  // Stores current location when go to capture state
  $scope.activity.location = LocationService.getLocation();

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

  Activities.addActivity($scope.activity).then(function(response) {
    console.log(response);
    $state.go('app.map');
  }).catch(function(err) {
    console.err(err);
  });

  };
});
