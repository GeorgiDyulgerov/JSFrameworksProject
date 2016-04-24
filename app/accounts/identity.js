angular.module('issueTrackingSystem.accounts.identity',[])
    .factory('identity',[
        '$http',
        '$q',
        'BASE_URL',
        function($http,$q,BASE_URL){
            var deferred = $q.defer();

            var currentUser=undefined;

            return{
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                requestUser: function() {
                    var userDeferred = $q.defer();

                    $http.get(BASE_URL + 'users/me')
                        .then(function(response) {
                            currentUser = response.data;
                            deferred.resolve(currentUser);
                            userDeferred.resolve();
                        });

                    return userDeferred.promise;
                },
                removeUser: function(){
                    currentUser = undefined;
                }
            };
        }

    ]);