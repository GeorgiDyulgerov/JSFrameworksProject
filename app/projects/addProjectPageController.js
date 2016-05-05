'use strict';

angular.module('issueTrackingSystem.projects.addProjectPageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            var check ={
                authenticated: [
                    '$q',
                    'identity',
                    'authentication',
                    function($q,identity,authentication){
                        if(authentication.isAuthenticated()){
                            return $q.when(true);
                        }
                        return $q.reject('Unauthorized Access');
                    }]};
            $routeProvider.when('/project/add',{
                templateUrl: 'app/projects/addProjectPage.html',
                controller: 'addProjectPageCtrl',
                resolve: check.authenticated
            })
        }
    ])
    .controller('addProjectPageCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'projectService',
        'authentication',
        function($scope,$routeParams,$location,projectService,authentication){

            $scope.addProject = function(module){

                var body = {};
                body.Name = module.Name;
                body.Description = module.Description;
                body.LeadId = module.LeadId;
                body.ProjectKey = module.ProjectKey;
                body.labels= [];
                body.priorities = [];
                projectService.addProject(body)
                    .then(function(response){
                        toastr.success('Successfully added Project.');
                        $location.path('/projects/'+ response.Id);
                    })
            }

        }
    ]);
