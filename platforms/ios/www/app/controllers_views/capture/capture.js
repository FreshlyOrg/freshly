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

.controller('CaptureController', function($scope, Camera) {
  $scope.openCamera = function () {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    } , {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };
});
