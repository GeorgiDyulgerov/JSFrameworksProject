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
    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/'});

      $httpProvider.interceptors.push(['$q','toastr', function($q, toastr) {
        return {
          'responseError': function(rejection) {
            if (rejection.data && rejection.data['error_description']) {
              toastr.error(rejection.data['error_description']);
            }
            else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']){
              var errors = rejection.data.modelState[''];
              if (errors.length > 0) {
                toastr.error(errors[0]);
              }
            }

            return $q.reject(rejection);
          }
        }
      }]);

  }])
    .run(['$rootScope','$location','authentication',function($rootScope,$location,authentication){
      $rootScope.$on('$routeChangeError',function(ev,current,previous,rejection){
        if(rejection == 'Unauthorized Access'){
          $location.path('/')
        }
      });

      authentication.refreshCookie();
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/')
    .constant('toastr',toastr);
