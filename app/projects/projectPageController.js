'use strict';

angular.module('issueTrackingSystem.projects.projectPageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            var check ={
                authenticated: [
                    '$q',
                    'authentication',
                    function($q,authentication){
                        if(authentication.isAuthenticated()){
                            return $q.when(true);
                        }
                        return $q.reject('Unauthorized Access');
                    }]};
            $routeProvider.when('/projects/:id',{
                templateUrl: 'app/projects/projectPage.html',
                controller: 'projectPageCtrl',
                resolve:check.authenticated
            })
        }
    ])
    .controller('projectPageCtrl',[
        '$scope',
        '$routeParams',
        'projectService',
        'issueService',
        function($scope,$routeParams,projectService,issueService){

            var id = $routeParams.id;

            projectService.getProjectById(id)
                .then(function(response){
                    var project = response;
                    $scope.project = project;
                });

            issueService.getProjectIssues(id)
                .then(function(response){
                    var issues = response;
                    $scope.issues = issues;
                })

        }
    ]);