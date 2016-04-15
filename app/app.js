'use strict';

angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.view1',
  'issueTrackingSystem.accounts.users',
  'issueTrackingSystem.accounts.authentication',
  'issueTrackingSystem.home'


  ])
    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
