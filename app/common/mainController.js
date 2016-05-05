'use strict';

angular.module('issueTrackingSystem.common.mainController',[])
    .controller('MainCtrl', [
    '$scope',
    '$http',
    '$location',
    'identity',
    'authentication',
    function($scope, $http,$location, identity,authentication) {

        $scope.logout = function(){
            authentication.logout()
                .then(function(response){
                    toastr.success('Successfully logged out.');
                });
        };

        $scope.$on('$viewContentLoaded',function(){
            if(authentication.isAuthenticated()){
            identity.requestUser().
                then(identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                    $scope.isAdmin = user.isAdmin;
                }));

                authentication.getUsers()
                    .then(function(response){
                        var users = response;
                        users.sort(function(a, b){
                            if(a.Username < b.Username) return -1;
                            if(a.Username > b.Username) return 1;
                            return 0;
                        });
                        $scope.allUsers = users;
                    });
            }
        }
        );


        $scope.isAuthenticated =function(){
            return authentication.isAuthenticated();
        };

    }]);
