angular.module('freshly.directives', [])

.directive('ngActivity', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/controllers_views/activities/activity.html'
  }
})

.directive('detectGestures', function($ionicGesture) {
  
  var log = function(){
    console.log('hold');
  }

  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      switch(gestureType) {
       
        case 'hold':
          // $ionicGesture.on('hold', scope.placePin, elem);
          break;
      }

    }
  }
})