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
                    projects.sort(function(a, b){
                        if(a.Name < b.Name) return -1;
                        if(a.Name > b.Name) return 1;
                        return 0;
                    });
                    $scope.projects = projects;
                })
        }
    ]);
