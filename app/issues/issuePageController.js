'use strict';

angular.module('issueTrackingSystem.issues.issuePageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/issues/:id',{
                templateUrl: 'app/issues/issuePage.html',
                controller: 'issuePageController'
            })
        }
    ])
    .controller('issuePageController',[
        '$scope',
        '$routeParams',
        'issueService',
        function($scope,$routeParams,issueService){

            var id = $routeParams.id;

            issueService.getIssueById(id)
                .then(function(response){
                    var issue =response;

                    $scope.issue=issue;
                })

        }
    ])

