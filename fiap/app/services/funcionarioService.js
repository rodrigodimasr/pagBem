(function () {
    "use strict";

    angular.module('fiap').factory('funcionarioService', factory);
    factory.$inject = ['$http', '$q'];

    function factory($http, $q) {

        var _getAll = function (filtro) {
            var deferred = $q.defer();
            var args = {
                'skip': filtro.skip,
                'take': filtro.take
            };

            $http.post('/funcionario/GetAll', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        var _get = function (codigo) {
            var deferred = $q.defer();
            var args = { 'codigofuncionario': codigo }
            $http.post('/funcionario/get', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        var _validaCpf = function (cpf) {
            var deferred = $q.defer();
            var args = { 'cpf': cpf };
            $http.post('/funcionario/ValidaCpf', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        var _save = function (item) {
            var deferred = $q.defer();
            var args = {
                item: item
            };
            $http.post('funcionario/save', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        }
        var _update = function (item) {
            var deferred = $q.defer();
            var args = {
                item: item
            };
            $http.post('funcionario/update', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        var _delete = function (item) {
            var deferred = $q.defer();
            var args = {
                codigo_funcionario: item
            };
            $http.post('funcionario/delete', args)
                .success(function (data) { deferred.resolve(data); })
                .error(function (data, status, headers, config) { deferred.reject(data); });
            return deferred.promise;
        };

        return {
            getAll: _getAll,
            get: _get,
            validaCpf: _validaCpf,
            save: _save,
            update: _update,
            delete: _delete
        };
    }

})();