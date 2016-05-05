'use strict';

angular.module('issueTrackingSystem.projects.editProjectPageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/projects/:id/edit',{
                templateUrl: 'app/projects/editProjectPage.html',
                controller: 'editProjectPageCtrl'
            })
        }
    ])
    .controller('editProjectPageCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'projectService',
        'authentication',
        function($scope,$routeParams,$location,projectService,authentication){

            var id = $routeParams.id;

            projectService.getProjectById(id)
                .then(function(response){
                    var project = response;
                    console.log(project);
                    $scope.editProjectModule = project;
                    $scope.editProjectModule.Name = project.Name;
                    $scope.editProjectModule.Description = project.Description;
                    $scope.editProjectModule.ProjectKey = project.ProjectKey;
                    $scope.project = project;
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

            $scope.editProject = function (model){
                var body = {};
                body.Name = model.Name;
                body.Description = model.Description;
                body.LeadId = model.LeadId;
                body.Labels = model.Labels;
                body.Priorities = model.Priorities;
                console.log(body);
                projectService.editProject(id,body)
                    .then(function(response){
                        console.log(response);
                        $location.path('/projects/'+ response.Id)
                    })
            }


        }
    ]);