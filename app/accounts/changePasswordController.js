'use strict';

angular.module('issueTrackerSystem.accounts.changePasswordController',[])
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
            $routeProvider.when('/profile/password',{
                templateUrl: 'app/accounts/changePassword.html',
                controller: 'ChangePasswordCtrl',
                resolve:check.authenticated
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
                        toastr.success('Successfully changed password')
                        $location.path('/');
                    })
            }
        }
    ]);