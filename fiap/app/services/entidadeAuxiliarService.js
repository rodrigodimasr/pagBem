(function () {
    "use strict";

    angular.module('fiap').factory('entidadeAuxiliarService', factory);
    factory.$inject = ['$http', '$q'];

    function factory($http, $q) {

        var _getEndereco = function (cep) {
            var deferred = $q.defer();
            $http.get('http://viacep.com.br/ws/{0}/json'.replace('{0}', cep))
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        var _getAllEstado = function () {
            var deferred = $q.defer();
            $http.get('/entidadeauxiliar/GetAllEstado')
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        var _getAllSetor = function () {
            var deferred = $q.defer();
            $http.post('/entidadeauxiliar/GetAllSetor')
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        return {
            getEndereco: _getEndereco,
            getAllEstado: _getAllEstado,
            getAllSetor: _getAllSetor
        };
    }

})();