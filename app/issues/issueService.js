'use strict';

angular.module('issueTrackingSystem.issues.issueService',[])
    .factory('issueService',[
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        'authentication',
        function($http,$q,BASE_URL,identity,authentication){

            function getMyIssues(settings){
                var deferred = $q.defer();

                var pageSize = settings.pageSize;
                var pageNumber = settings.pageNumber;
                var orderBy = settings.orderBy;

                $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                    .then(function(response){
                        deferred.resolve(response.data);
                    });


                return deferred.promise;
            }

            return{
                getMyIssues: getMyIssues,
            }
        }
    ])