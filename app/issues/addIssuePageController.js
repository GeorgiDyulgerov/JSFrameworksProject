'use strict';

angular.module('issueTrackingSystem.issues.addIssuePageController',[])
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
            $routeProvider.when('/projects/:id/add-issue',{
                templateUrl: 'app/issues/addIssuePage.html',
                controller: 'addIssuePageCtrl',
                resolve:check.authenticated
            })
        }
    ])
    .controller('addIssuePageCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'issueService',
        'projectService',
        'authentication',
        function($scope,$routeParams,$location, issueService,projectService,authentication){

            var id = $routeParams.id;

            $scope.addIssue = function(issue){
                issueService.addIssue(issue)
                    .then(function(response){
                        toastr.success('Successfully added issue.');
                        $location.path('/issues/'+response.Id);
                    })
            };

            //TODO: make it faster and add label
            projectService.getProjectById(id)
                .then(function(response){
                    $scope.previousProject = response;
                })
                .then(function(response){
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
                });


                $scope.setPriorities= function(projectId){
                    projectService.getProjectById(projectId)
                        .then(function(response){
                            var priorities = response.Priorities;
                            $scope.priorities = priorities;
                        })
                }


        }
    ]);