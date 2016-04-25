'use strict';

angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'ui.bootstrap.pagination',
  'issueTrackingSystem.view1',
  'issueTrackingSystem.accounts.users',
  'issueTrackingSystem.accounts.authentication',
  'issueTrackingSystem.accounts.identity',
  'issueTrackingSystem.home',
  'issueTrackingSystem.common.mainController',
  'issueTrackingSystem.issues.issueService',
  'issueTrackingSystem.home.dashboardController',
  'issueTrackingSystem.pagination.paginationController',
  'issueTrackerSystem.accounts.changePasswordController'


  ])
    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  }])
    .run(['$rootScope','$location','authentication',function($rootScope,$location,authentication){
      $rootScope.$on('$routeChangeError',function(ev,current,previous,rejection){
        if(rejection == 'Unauthorized Access'){
          $location.path('/')
        }
      });

      authentication.refreshCookie();
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
