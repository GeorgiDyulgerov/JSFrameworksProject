'use strict';

angular.module('issueTrackingSystem.issues.editIssuePageController',[])
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
            $routeProvider.when('/issues/:id/edit',{
                templateUrl: 'app/issues/editIssuePage.html',
                controller: 'editIssuePageCtrl',
                resolve: check.authenticated
            })
        }
    ])
    .controller('editIssuePageCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'issueService',
        'projectService',
        'identity',
        function($scope,$routeParams,$location, issueService,projectService, identity){

            var id = $routeParams.id;
            var projectId = undefined;

            $scope.editIssue = function(editedIssue,originalAssignee){
                var body = {};
                body.Title =editedIssue.Title;
                body.Description =editedIssue.Description;
                body.DueDate = editedIssue.DueDate;
                body.PriorityId =editedIssue.PriorityId;
                body.Labels = editedIssue.Labels;
                if(editedIssue.AssigneeId === undefined){
                    body.AssigneeId = originalAssignee;
                }
                else {body.AssigneeId = editedIssue.AssigneeId;}
                console.log(body);
                issueService.editIssue(id,body)
                    .then(function(response){
                        toastr.success('Successfully edited issue.');
                        $location.path('#/issues/' + id);
                    })
            }

            issueService.getIssueById(id)
                .then(function(response){
                    var issue =response;
                    projectId = issue.Project.Id;
                    $scope.editIssueModel = issue;
                    $scope.editIssueModel.Title = issue.Title;
                    $scope.editIssueModel.Description = issue.Description;
                    $scope.editIssueModel.DueDate = new Date(issue.DueDate);
                    $scope.editIssueModel.ProjectId = issue.Project.Id;
                    $scope.issue = issue;
                })
                .then(function(){
                    projectService.getProjectById(projectId)
                        .then(function(response){
                            $scope.LeadId = response.Lead.Id;
                            var priorities = response.Priorities;
                            $scope.priorities = priorities;
                        })
                });




            $scope.changeStatus = function (statusId) {
                issueService.changeStatus(id,statusId)
                    .then(function(response){
                        issueService.getIssueById(id)
                            .then(function(response){
                                var issue =response;

                                $scope.issue=issue;
                            })
                    })

            }
        }
    ]);
