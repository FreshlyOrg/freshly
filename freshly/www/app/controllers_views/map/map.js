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

.controller('MapController', [ "$scope", "$log", "leafletData", function($scope, $log, leafletData) {
  

  $scope.location = {
    zoom: 16,
    autoDiscover: true
  };
  
  $scope.tiles = {
    url: "https://{s}.tiles.mapbox.com/v3/jakecadams.io9ec4o2/{z}/{x}/{y}.png",
    options: {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms</a>'
    }
  }

  leafletData.getMap('map').then(function(map) {

    //right click on computer or hold on mobile
    map.on('contextmenu', function(e) {
      var newMarker = new L.marker(e.latlng).addTo(map);
    });
  });

}])
