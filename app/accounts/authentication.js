angular.module('issueTrackingSystem.accounts.authentication',[])
    .factory('authentication',[
        '$http',
        '$q',
        'BASE_URL',
    function($http,$q,BASE_URL){

        function registerAccount(account){
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Account/Register',account)
                .then(function(response){
                    console.log(response);
                    deferred.resolve(response);
                },function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function loginAccount(account){
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Token',"Username=" + encodeURIComponent(account.Email) +
                    "&Password=" + encodeURIComponent(account.Password) +
                    "&grant_type=password")
                .then(function(response){
                    console.log(response);
                    deferred.resolve(response);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logout(){
            //TODO
        }

        return {
            registerAccount: registerAccount,
            loginAccount: loginAccount,
            logout: logout
        }
    }]);
