angular.module('freshly.capture', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app.capture', {
      url: "/capture",
      view: {
        'app-capture': {
          templateUrl: 'app/controllers_views/capture/app-capture.html',
          controller: 'CaptureController'
        }
      },
      templateUrl: 'app-capture.html'
    });

})

.controller('CaptureController', function($scope) {

});