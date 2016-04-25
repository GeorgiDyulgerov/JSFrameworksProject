'use strict';

angular.module('issueTrackingSystem.accounts.users',['ngRoute'])
    .config(['$routeProvider',
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
            $routeProvider.when('/users',{
                templateUrl: 'app/accounts/user.html',
                controller: 'userCtrl',
                resolve:check.authenticated
            })
        }
    ])
    .controller('userCtrl',['$scope','identity',function($scope,identity){
        var user = identity.requestUser();
        $scope.user=user;
    }]);

