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
                    $location.path('#/')
                });
        };

        $scope.isAuthenticated =function(){
            return identity.isAuthenticated();
        };

    }]);
