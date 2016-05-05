'use strict';

angular.module('issueTrackingSystem.issues.editIssuePageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/issues/:id/edit',{
                templateUrl: 'app/issues/editIssuePage.html',
                controller: 'editIssuePageCtrl'
            })
        }
    ])
    .controller('editIssuePageCtrl',[
        '$scope',
        '$routeParams',
        '$location',
        'issueService',
        'authentication',
        function($scope,$routeParams,$location, issueService, authentication){

            var id = $routeParams.id;

            //TODO: Finish

            $scope.editIssue = function(editedIssue){
                var body = {};
                body.Title =editedIssue.Title;
                body.Description =editedIssue.Description;
                body.DueDate =editedIssue.DueDate;
                body.AssigneeId =editedIssue.AssigneeId;
                body.PriorityId =editedIssue.PriorityId;
                body.Labels = editedIssue.Labels;

                console.log(body);
                issueService.editIssue(id,body)
                    .then(function(response){
                        console.log('success');
                        console.log(response);
                    })

            }

            issueService.getIssueById(id)
                .then(function(response){
                    var issue =response;
                    $scope.editIssueModel = issue;
                    $scope.editIssueModel.Title = issue.Title;
                    $scope.editIssueModel.Description = issue.Description;
                    $scope.editIssueModel.DueDate = new Date(issue.DueDate);
                    $scope.editIssueModel.ProjectId = issue.Project.Id;
                    $scope.issue = issue;
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
