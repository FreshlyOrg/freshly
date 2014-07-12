angular.module('freshly.capture', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('test', {
      url: "/test",
      templateUrl: 'templates/tab-activities.html'
    })

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.explore', {
      url: '/explore',
      views: {
        'tab-explore': {
          templateUrl: 'templates/tab-explore.html',
          controller: 'ExploreController'
        }
      }
    })

    .state('tab.capture', {
      url: '/capture',
      views: {
        'tab-capture': {
          templateUrl: 'templates/tab-capture.html',
          controller: 'CaptureController'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/explore');

})

.controller('CaptureController', function($scope) {

});