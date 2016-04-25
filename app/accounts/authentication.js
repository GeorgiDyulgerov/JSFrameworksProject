'use strict';

angular.module('issueTrackingSystem.accounts.authentication',[])
    .factory('authentication',[
        '$http',
        '$q',
        '$cookies',
        '$location',
        'BASE_URL',
        'identity',
    function($http,$q,$cookies,$location,BASE_URL,identity){

        var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

        function registerAccount(account){
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Account/Register',account)
                .then(function(response){
                    loginAccount(account);
                    deferred.resolve(response);
                },function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function loginAccount(account){
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Token',"Username=" + encodeURIComponent(account.Email) +
                    "&Password=" + encodeURIComponent(account.Password) +
                    "&grant_type=password")
                .then(function(response){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY,response.data.access_token);
                    identity.requestUser()
                        .then(function(response){
                            deferred.resolve(response);
                        });
                });

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Account/Logout')
                .then(function(response){
                    delete $http.defaults.headers.common.Authorization;
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $location.path('/');
                    identity.removeUser();
                    deferred.resolve(response);
                },function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function changePassword(passwords){
            var deferred = $q.defer();

            $http.post(BASE_URL + "api/Account/ChangePassword",passwords)
                .then(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise
        }

        function isAuthenticated(){
            return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
        }

        function refreshCookie(){
            if(isAuthenticated()){
                $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
            }
        }


        return {
            registerAccount: registerAccount,
            loginAccount: loginAccount,
            logout: logout,
            changePassword: changePassword,
            isAuthenticated: isAuthenticated,
            refreshCookie: refreshCookie
        }
    }]);
