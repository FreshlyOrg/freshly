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

.controller('MapController', [ "$scope", "Activities", "$log", "leafletData", function($scope, Activities, $log, leafletData) {
  
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


  var refreshActivities = function() {
    Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
    }).catch(function(err) {
      console.log(err);
    });
  };

  var markers = [
    {lat: 40.252149412988935,lng: -111.6533875465393},
    {lat: 40.252804476697165,lng: -111.64948225021361},
    {lat: 40.252804476697165,lng: -111.66040420532227}
  ]



  leafletData.getMap('map').then(function(map) {

    var markerGroup = new L.layerGroup();
    map.addLayer(markerGroup);
    //right click on computer or hold on mobile
    map.on('contextmenu', function(e) {
      var marker = new L.marker(e.latlng);
      markerGroup.addLayer(marker);     
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var latlng = {
        lat: lat,
        lng: lng
      }
      markers.push(latlng);
    });

    map.on('move', function(e) {
      markerGroup.clearLayers();
      for (var i = 0; i < markers.length; i++) {
        if(inBounds(markers[i], map)){
          var marker = new L.marker(markers[i]);
          markerGroup.addLayer(marker);          
        }
      }
      console.log(markerGroup.getLayers());
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
