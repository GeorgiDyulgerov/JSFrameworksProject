'use strict';

angular.module('issueTrackingSystem.issues.issuePageController',[])
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
            $routeProvider.when('/issues/:id',{
                templateUrl: 'app/issues/issuePage.html',
                controller: 'issuePageCtrl',
                resolve: check.authenticated
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

