(function () {
    "use strict";
    angular.module('fiap').controller('funcionarioController', controller);
    controller.$inject = ['$scope', '$state', 'funcionarioService', 'toastr'];

    function controller($scope, $state, funcionarioService, toastr) {
        //[Inicializa objetos]
        $scope.toastr = toastr;
        $scope.state = {
            data: [],
            carregando: false,
            filtro: {
                skip: 0,
                take: 20
            }
        };

        $scope.initialize = function () {
            $scope.refresh();
        };

        $scope.refresh = function () {
            $scope.getAll();
        };

        $scope.getAll = function () {
            $scope.state.carregando = !$scope.state.carregando;
            $scope.state.filtro.skip = 0;
            funcionarioService.getAll($scope.state.filtro)
                .then(
                    function (response) {
                        if (response.Status < 0) {
                            $scope.toastr.error(response.Message, "Serviço");
                            $scope.state.carregando = !$scope.state.carregando;
                        }else {
                            angular.copy(angular.fromJson(response.Data), $scope.state.data);
                            $scope.state.carregando = !$scope.state.carregando;
                            $scope.state.vazio = ($scope.state.data.length == 0);
                        }
                    },
                    function (err) { $scope.toastr.error(err); }
                );

        };

        $scope.Addfuncionario = function () {
            console.log('teste');
        }

        $scope.initialize();
    }

})();