'use strict';

angular.module('issueTrackingSystem.home',[])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/',{
               templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
            })
    }])
    .controller('HomeCtrl',[
        '$scope',
        '$location',
        'authentication',
        function($scope,$location,authentication){
            $scope.login = function(account){
                authentication.loginAccount(account)
                    .then(function(loggedInUser){
                        toastr.success('Successfully logged in.');
                        $location.path('/');
                    })
            };
            $scope.register= function(account){
                authentication.registerAccount(account)
                    .then(function(registeredUser){
                        toastr.success('Successfully registered.');
                        $location.path('/');
                    })
            };
        }
    ]);