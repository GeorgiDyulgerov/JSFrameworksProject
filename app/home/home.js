angular.module('issueTrackingSystem.home',[
    'issueTrackingSystem.accounts.authentication'
])
.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/',{
           templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        })
}])
.controller('HomeCtrl',[
    '$scope',
    '$location',
    'authentication',
    function($scope,$location,authentication){

        $scope.login = function(account){
           account.grant_type="password";
            console.log(account);
            authentication.loginAccount(account)

                .then(function(loggedInUser){
                    console.log(loggedInUser);
                    $location.path('/users');
                })

        }
    }
])