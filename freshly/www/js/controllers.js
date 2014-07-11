angular.module('freshly.controllers', [])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('ActivitiesController', function($scope) {
  $scope.activities = [
    { name: 'Dodgeball' },
    { name: 'Wax Museum' },
    { name: 'Soccer' },
    { name: 'Segway Tour' },
    { name: 'Volunteer Boys and Girls Club' },
    { name: 'Cal Academy Nightlife' },
    { name: 'Exploratorium Nightlife' },

  ];
  $scope.showActivity = function(activity) {
    console.log(activity.name);
  }
});
