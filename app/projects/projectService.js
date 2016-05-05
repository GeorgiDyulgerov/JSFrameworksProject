'use strict';

'use strict';

angular.module('issueTrackingSystem.projects.projectService',[])
    .factory('projectService',[
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        'authentication',
        function($http,$q,BASE_URL,identity,authentication){

            function getAllProjects(){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects')
                    .then(function(response){
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id)
                    .then(function(response){
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            function addProject(body){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Projects/', body)
                    .then(function(response){
                        deferred.resolve(response.data);
                    })

                return deferred.promise;
            }

            function editProject(id, body){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + id, body)
                    .then(function(response){
                        deferred.resolve(response.data);
                    })

                return deferred.promise;
            }

            return{
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                editProject: editProject,
            }
        }
    ]);