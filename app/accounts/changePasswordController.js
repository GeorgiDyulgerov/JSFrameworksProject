'use strict';

angular.module('issueTrackerSystem.accounts.changePasswordController',[])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/profile/password',{
                templateUrl: 'app/accounts/changePassword.html',
                controller: 'ChangePasswordCtrl'
            })
        }])
    .controller('ChangePasswordCtrl',[
        '$scope',
        '$location',
        'authentication',
        function($scope,$location,authentication){
            $scope.changePassword = function(passwords){
                authentication.changePassword(passwords)
                    .then(function(response){
                        $location.path('/');
                    })
            }
        }
    ]);