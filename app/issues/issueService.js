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

            function getIssueById(id){
                var defered = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id)
                    .then(function(response){
                        console.log(response.data);
                        defered.resolve(response.data);
                    });

                return defered.promise;

            }

            function  editIssue(id){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + id)
                    .then(function (response) {
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }

            function changeStatus(id, statusId){
                var deferred = $q.defer();

                $http.put(BASE_URL +'Issues/' + id + '/changestatus?statusid=' + statusId)
                    .then(function (response) {
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }

            return{
                getMyIssues: getMyIssues,
                getIssueById: getIssueById,
                editIssue: editIssue,
                changeStatus: changeStatus

            }
        }
    ])