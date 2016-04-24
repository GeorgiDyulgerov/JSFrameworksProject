'use strict'

angular.module('issueTrackingSystem.accounts.users',['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/users',{
                templateUrl: 'app/accounts/user.html',
                controller: 'userCtrl'
            })
        }
    ])
    .controller('userCtrl',['$scope','identity',function($scope,identity){
        var user =identity.requestUser();
        console.log(user);
        console.log(user.Username);
        $scope.user=user;
    }])

