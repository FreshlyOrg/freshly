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

.controller('CaptureController', function($scope, Camera, Activities) {

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

    console.log('Name: ', this.name);
    console.log('Description: ', this.description);
    console.log('Current Photo: ', this.currentPhoto);

  };
});
