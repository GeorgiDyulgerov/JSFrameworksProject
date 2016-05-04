'use strict';

angular.module('issueTrackingSystem.issues.addIssuePageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/projects/:id/add-issue',{
                templateUrl: 'app/issues/addIssuePage.html',
                controller: 'addIssuePageCtrl'
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
                        $location.path('/issues/'+response.Id);
                    })
            };

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

            authentication.getUsers()
                .then(function(response){
                    var users = response;
                    users.sort(function(a, b){
                        if(a.Username < b.Username) return -1;
                        if(a.Username > b.Username) return 1;
                        return 0;
                    });
                    $scope.users = users;
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