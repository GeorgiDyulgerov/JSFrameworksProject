'use strict';

angular.module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        '$scope',
        'issueService',
        function($scope,issueService){

            var issues = undefined;

            var settings={
                pageSize:10,
                pageNumber: 1,
                orderBy: 'DueDate desc'
            };

            issueService.getMyIssues(settings)
                .then(function(response){
                    issues = response.Issues;
                    settings.TotalPages = response.TotalPages;
                    $scope.issues = issues;
            })
                .then(function(){
                    $scope.totalItems = settings.TotalPages * settings.pageSize;
                    $scope.currentPage = settings.pageNumber;
                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };

                    $scope.pageChanged = function() {
                        settings.pageNumber = $scope.currentPage;
                        issueService.getMyIssues(settings)
                            .then(function(response){
                                issues = response.Issues;
                                settings.TotalPages = response.TotalPages;
                                $scope.issues = issues;
                            })
                    };
                })
        }
    ]);