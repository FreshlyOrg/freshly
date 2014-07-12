angular.module('freshly.controllers', [])

.controller('ExploreController', function($scope) {

})

.controller('CaptureController', function($scope) {

})

.controller('ActivitiesController', function($scope) {
  $scope.activities = [
    { name: 'Dodgeball',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 1
    },
    { name: 'Wax Museum',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 2
    },
    { name: 'Soccer',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 3
    },
    { name: 'Segway Tour',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 4
    },
    { name: 'Volunteer at Boys and Girls Club',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 5
    },
    { name: 'Cal Academy Nightlife',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 6
    },
    { name: 'Exploratorium Nightlife',
      description: 'I want to do this.',
      tags: ['Fun', 'Cool'],
      id: 7
    },

  ];
  $scope.toggleActivity = function(activity) {
    if (activity.id === $scope.viewActivity) {
      $scope.viewActivity = null;
    } else {
      $scope.viewActivity = activity.id;
    }
  }

  $scope.viewActivity = null;
});
