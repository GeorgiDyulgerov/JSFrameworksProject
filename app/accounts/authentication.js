angular.module('issueTrackingSystem.accounts.authentication',[])
    .factory('authentication',[
        '$http',
        '$q',
        'BASE_URL',
        'identity',
    function($http,$q,BASE_URL,identity){

        var currentUser = undefined;

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
                    identity.getCurrentUser();
                    deferred.resolve(response);
                },function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function logout(){
            //TODO fix
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Account/Logout')
                .then(function(response){
                    console.log(response);
                    $http.defaults.headers.common.Authorization = '';
                    identity.getCurrentUser();
                    deferred.resolve(response);
                },function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }


        return {
            registerAccount: registerAccount,
            loginAccount: loginAccount,
            logout: logout,
        }
    }]);
