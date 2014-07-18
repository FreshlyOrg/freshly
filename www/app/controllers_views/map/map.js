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

.controller('MapController', function($scope, $state, Activities, leafletData) {

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
  };


  var getActivities = function(callback) {
    Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
      callback(true);
    }).catch(function(err) {
      console.log(err);
    });
  };

  

  leafletData.getMap('map').then(function(map) {

    map.locate({setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true, maximumAge: 15000, timeout: 3000000,});
    map.on('locationfound', function(e){
      // should show current location as a blue dot or something
    });

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
      };
      $state.go("^.capture", {"location": JSON.stringify(latlng)});
    });

    map.on('move', function(e) {
      markerGroup.clearLayers();
      getActivities(function(ready){
        if(ready){
          var activities = $scope.activities;

          for (var i = 0; i < activities.length; i++) {
            console.log(activities[i]);
            var latlng = {
              lat: activities[i].lat,
              lng: activities[i].lng
            }
            if(inBounds(latlng, map)){
              var marker = new L.marker(latlng).bindPopup('<br>'+activities[i].name+'<br> - '+activities[i].description)
              markerGroup.addLayer(marker);
            }
          }
        }
      });


      // console.log('markerGroup', markerGroup.getLayers());
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
  };

});
