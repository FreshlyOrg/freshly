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

  // angular directive
  $scope.center = {
    zoom: 16, // sets the first zoom level on instantiation
    autoDiscover: true, // center location will be the current location of the user
    
  };

  // angular directive
  // there are multiple properties that you can set on the map object with leaflet on instantiation
  // see http://leafletjs.com/reference.html#map-options
  $scope.defaults = {
    zoomControl: false // turn off zoom control
  }

  // angular directive
  $scope.tiles = {
    url: "https://{s}.tiles.mapbox.com/v3/jakecadams.io9ec4o2/{z}/{x}/{y}.png",
    options: {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms</a>'
    }
  };

  // get all activities from the server, sets the possible activities to $scope.activities and 
  // returns a callback with a boolean on completion
  var getActivities = function(callback) {
    Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
      callback(true);
    }).catch(function(err) {
      console.log(err);
    });
  };


  var markers = {};
  $scope.currCoords;
  $scope.clicked;
  $scope.pinInfo = false;

  // leafletData is used if when wanting to interact directly with the leaflet API, must be used
  // with a promise that returns the map object. 
  leafletData.getMap('map').then(function(map) {
    
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
                var marker = new L.marker({lat: activities[i].lat,lng: activities[i].lng}, activities[i]);
                marker.on("click", function() {
                  $scope.$apply(function(){
                    $scope.clicked = this.options;
                    $scope.pinInfo = true;
                  }.apply(this));
                });
                
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
  
  $scope.closeInfo = function(){
    $scope.pinInfo = false;
  }

});


