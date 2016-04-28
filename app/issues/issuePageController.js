'use strict';

angular.module('issueTrackingSystem.issues.issuePageController',[])
    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider.when('/issues/:id',{
                templateUrl: 'app/issues/issuePage.html',
                controller: 'issuePageCtrl'
            })
        }
    ])
    .controller('issuePageCtrl',[
        '$scope',
        '$routeParams',
        'issueService',
        function($scope,$routeParams,issueService){

            var id = $routeParams.id;

            issueService.getIssueById(id)
                .then(function(response){
                    var issue =response;

                    $scope.issue=issue;
                });

            $scope.changeStatus = function (statusId) {
                console.log(id);
                console.log(statusId);
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

