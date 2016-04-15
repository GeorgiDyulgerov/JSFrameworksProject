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
    .controller('userCtrl',['$scope',function($scope){
        var user = {
            name:'Pesho',
            age:21
        }
        $scope.user=user;
    }])

