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
  
  // sets default zoom and sets the center to the users location with autoDiscover
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


  var markers = [
     {lat: 40.252149412988935,lng: -111.6533875465393},
     {lat: 40.252804476697165,lng: -111.64948225021361},
     {lat: 40.252804476697165,lng: -111.66040420532227} 
  ]



  leafletData.getMap('map').then(function(map) {

    //right click on computer or hold on mobile
    map.on('contextmenu', function(e) {
      var newMarker = new L.marker(e.latlng).addTo(map);
      var latlng = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
      console.log(latlng);
      markers.push(latlng);
    });

    map.on('move', function(e) {
      console.log('moved');
      for (var i = 0; i < markers.length; i++) {
        if(inBounds(markers[i], map)){
          var newMarker = new L.marker(markers[i]).addTo(map);
        }
      }
    });

  });



  var inBounds = function(marker, map){
    var northEast = map.getBounds().getNorthEast();
    var southWest = map.getBounds().getSouthWest();

    if(marker.lat < northEast.lat && marker.lng < northEast.lng){
      if(marker.lat > southWest.lat && marker.lng > southWest.lng){
        return true;
      }
    }
    return false;
  }

}])
