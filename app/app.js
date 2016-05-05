'use strict';

angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'ui.bootstrap.pagination',

  'issueTrackingSystem.accounts.users',
  'issueTrackingSystem.accounts.authentication',
  'issueTrackingSystem.accounts.identity',
  'issueTrackingSystem.issues.issueService',
  'issueTrackingSystem.projects.projectService',
  'issueTrackingSystem.home',

  'issueTrackingSystem.common.mainController',
  'issueTrackingSystem.home.dashboardController',
  'issueTrackingSystem.pagination.paginationController',
  'issueTrackerSystem.accounts.changePasswordController',
  'issueTrackingSystem.issues.issuePageController',
  'issueTrackingSystem.issues.editIssuePageController',
  'issueTrackingSystem.issues.addIssuePageController',
  'issueTrackingSystem.projects.projectPageController',
  'issueTrackingSystem.projects.editProjectPageController',
  'issueTrackingSystem.projects.allProjectsPageController',


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
