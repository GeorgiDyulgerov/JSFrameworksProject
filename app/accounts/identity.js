angular.module('issueTrackingSystem.accounts.identity',[])
    .factory('identity',[
        '$http',
        '$q',
        'BASE_URL',
        function($http,$q,BASE_URL){
            var deferred = $q.defer();

            var currentUser=undefined;

            function getCurrentUser(){
                $http.get(BASE_URL + 'Users/me')
                    .then(function (response) {
                        currentUser = response.data;
                        if(currentUser){
                            return $q.when(currentUser);
                        }

                        deferred.resolve(response);
                    },function(err){
                        currentUser = undefined;
                        console.log(err);
                    });
                return currentUser;
            }


            return{
                getCurrentUser : getCurrentUser,
                isAuthenticated : function(){
                    if (currentUser!=undefined){
                        return true;
                    }
                    return false;
                }
            }


        }

    ]


)