'use strict';

angular.module('issueTrackingSystem.projects.allProjectsPageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/projects',{
                templateUrl: 'app/projects/allProjectsPage.html',
                controller: 'allProjectsPageCtrl'
            })
        }
    ])
    .controller('allProjectsPageCtrl',[
        '$scope',
        'projectService',
        'issueService',
        function($scope,projectService){

            projectService.getAllProjects()
                .then(function(response){
                    var projects = response;
                    $scope.projects = projects;
                })
        }
    ]);
