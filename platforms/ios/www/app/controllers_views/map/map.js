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

  var markers = {};

  leafletData.getMap('map').then(function(map) {

    var currLocation = new L.layerGroup();
    map.addLayer(currLocation);

    var findLocation = function(successCallback) {
      if (navigator.geolocation) {
        options = { maximumAge: 5000, timeout: 5000 };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
      }

      var errorCallback = function(data){
        console.log("Geolocation error: ", data);
      };
    };

    var getLocation = function(){
      findLocation(function(e){
        currLocation.clearLayers();
        var circle = new L.circleMarker({
          lat: e.coords.latitude,
          lng: e.coords.longitude
        }, {
          radius: e.coords.accuracy/2,
          fillColor: 'rgb(51, 146, 213)',
          color: 'rgb(51, 146, 213)'
        });

        currLocation.addLayer(circle);
      });
    }

    getLocation();

    setInterval(function(){
      getLocation();
    },5000);


    var markerGroup = new L.layerGroup();
    map.addLayer(markerGroup);
    //right click on computer or hold on mobile
    map.on('contextmenu', function(e) {
      console.log('pix', e.containerPoint);
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
              if(inBounds(latlng, map)){
                var marker = new L.marker({lat: activities[i].lat,lng: activities[i].lng});
                marker.bindPopup('<br>'+activities[i].name+'<br> - '+activities[i].description);
                markerGroup.addLayer(marker);
                activities[i].marker_id = marker._leaflet_id;
                markers[activities[i]._id] = activities[i];
              }
            } else {
              if(!inBounds(activities[i], map)){
                markerGroup.removeLayer(m.marker_id);
                delete markers[m._id]
              }
            }
          }// end for loop

        }// end ready callback
      });
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
