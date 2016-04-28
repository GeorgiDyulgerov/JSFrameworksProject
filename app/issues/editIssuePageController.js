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
        'issueService',
        function($scope,$routeParams, issueService){

            var id = $routeParams.id;

            //TODO: Finish
            issueService.getIssueById(id)
                .then(function(response){
                    var issue =response;
                    $scope.editIssue = issue;
                    $scope.editIssue.Title = issue.Title;
                    $scope.editIssue.Description = issue.Description;
                    $scope.editIssue.Username = issue.Assignee.Username;
                    $scope.editIssue.PriorityId = issue.Priority.Id;
                    $scope.editIssue.DueDate = issue.DueDate;
                    $scope.editIssue.ProjectId = issue.Project.Id;
                    $scope.issue = issue;
                })
        }
    ])
