angular.module('freshly.map', [
  'leaflet-directive'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.map', {
    url: '/map',
    views: {
      'app-map': {
        templateUrl: 'app/controllers_views/map/app-map.html',
        controller: 'MapController'
      }
    }
  });
})

.controller('MapController', function($scope) {
  

  $scope.location = {
            zoom: 16,
            autoDiscover: true
        };


  $scope.getLocation = function(location) {

       var callback = function(position){
        var newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 4
        }
        location($scope.newLocation);
      }

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(callback);
      } else { 
          console.log("Geolocation is not supported by this browser.");
      }
  }

});