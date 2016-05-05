'use strict';

angular.module('issueTrackingSystem.projects.editProjectPageController',[])
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
            $routeProvider.when('/projects/:id/edit',{
                templateUrl: 'app/projects/editProjectPage.html',
                controller: 'editProjectPageCtrl',
                resolve: check.authenticated
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
                        toastr.success('Successfully edited Project.');
                        $location.path('/projects/'+ response.Id)
                    })
            }

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





        }
    ]);