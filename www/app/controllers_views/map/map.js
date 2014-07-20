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

.controller('MapController', function($scope, $state, Activities, LocationService, leafletData) {


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

  var markers = {};

  leafletData.getMap('map').then(function(map) {
    $scope.currCoords;

    $scope.relocate = function(){
      map.panTo({lat: $scope.currCoords.latitude, lng: $scope.currCoords.longitude});
    };


    var currLocation = new L.layerGroup();
    map.addLayer(currLocation);

    var getLocation = function(){
      LocationService.findCurrentLocation(function(e){
        currLocation.clearLayers();
        var circle = LocationService.createCircle(e.coords);
        $scope.currCoords = e.coords;
        currLocation.addLayer(circle);
      });
    }
    //call for first time
    getLocation();

    //reload location every 5 seconds
    setInterval(function(){
      getLocation();
    },5000);

    var markerGroup = new L.layerGroup();
    map.addLayer(markerGroup);
    //right click on computer or hold on mobile
    map.on('contextmenu', function(e) {
      var marker = new L.marker(e.latlng);
      markerGroup.addLayer(marker);
      $state.go("^.capture", {"location": JSON.stringify({lat: e.latlng.lat, lng: e.latlng.lng})});
    });

    map.on('move', function(e) {
      getActivities(function(ready){
        if(ready){
          var activities = $scope.activities;

          for (var i = 0; i < activities.length; i++) {
            var m = markers[activities[i]._id];
            if(!m){
              var latlng = {
                lat: activities[i].lat,
                lng: activities[i].lng
              }
              if(LocationService.inBounds(latlng, map)){
                var marker = new L.marker({lat: activities[i].lat,lng: activities[i].lng});
                marker.bindPopup('<br>'+activities[i].name+'<br> - '+activities[i].description);
                markerGroup.addLayer(marker);
                activities[i].marker_id = marker._leaflet_id;
                markers[activities[i]._id] = activities[i];
              }
            } else {
              if(!LocationService.inBounds(activities[i], map)){
                markerGroup.removeLayer(m.marker_id);
                delete markers[m._id];
              }
            }
          }// end for loop

        }// end ready callback
      });
    });

  });

});
