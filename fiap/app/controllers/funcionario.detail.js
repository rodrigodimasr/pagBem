(function () {
    "use strict";

    angular.module('fiap').controller('funcionarioDetailController', controller);
    controller.$inject = ['$scope', '$state', '$stateParams', '$window', 'funcionarioService', '$confirm', 'toastr', 'entidadeAuxiliarService'];

    function controller($scope, $state, $stateParams, $window, funcionarioService, $confirm, toastr, entidadeAuxiliarService) {
        //[Inicializa objetos]
        $scope.toastr = toastr;
        $scope.items = {
            auxiliar: [{ ID: 1, Nome: "Comercial" },
            { ID: 2, Nome: "Residencial" },
                { ID: 3, Nome: "Recado" }],
            cell: [{ ID: 0, Nome: "Celular" }],
            departamento: [
                { ID: 1, Nome: 'Diretoria' },
                { ID: 2, Nome: 'Administração' },
                { ID: 3, Nome: 'Tecnologia' },
                { ID: 4, Nome: 'Recursos Humano' },
                { ID: 5, Nome: 'Comercial' },
                { ID: 6, Nome: 'Operacional' }],
            data: { Codigo: decodeURIComponent($stateParams.id), CNPJMascara: '' },
            carregando: false,
            vazio: false,
            erro: {
                ativo: false,
                mensagem: ''
            }
        };
        $scope.auxiliar = {
            estado: { data: [] },
        };

        //[Inicializa funcões]
        $scope.initialize = function () {
            $scope.refresh();
        };
        $scope.historyBack = function () {
            $window.history.back();
        }
        $scope.get = function () {
            $scope.items.carregando = true;
            $scope.items.vazio = false;
            var codigo = decodeURIComponent($scope.items.data.Codigo);
            funcionarioService.get(codigo)
                .then(
                    function (response) {
                        if (response.Status < 0)
                            $scope.toastr.error(response.Message, 'Serviço');
                        else {
                            $scope.items.data = response.Data;
                            if (response.Data.CPF && response.Data.CPF != "")
                                response.Data.CPF = response.Data.CPF.trim().replace(".", "").replace(".", "").replace("-", "");

                        }

                        $scope.items.carregando = false;
                        $scope.items.vazio = ($scope.items.data == 0);
                    },
                    function (err) {
                        $scope.toastr.error(err);
                        $scope.items.carregando = false;
                        $scope.items.vazio = true;
                    }
                );
        };

        $scope.save = function () {


            funcionarioService
                .save($scope.items.data)
                .then(
                    function (response) {
                        if (response.Status < 0) {
                            $scope.toastr.error(response.Message, 'Serviço');
                        }
                        else {
                            $scope.toastr.success("funcionario salvo com sucesso");
                        }

                    },
                    function (error) {
                        $scope.toastr.error('Ao salvar o funcionario', 'Comunicação com o servidor');
                        console.error('Ao salvar o funcionario', error);
                    }
                );

        }

        $scope.getAllEstado = function () {
            entidadeAuxiliarService
                .getAllEstado()
                .then(
                    function (response) {
                        if (response.Status < 0)
                            $scope.$parent.toastr.error(response.Message, 'Serviço');
                        else
                            angular.copy(angular.fromJson(response.Data), $scope.auxiliar.estado.data);
                    },
                    function (err) { $scope.$parent.toastr.error(err); }
                );
        };

        $scope.refresh = function () {
            $scope.get();
            $scope.getAllEstado();
        };


        $scope.submit = function () {
            ;
            $scope.redirect = true;
            $scope.save();
        };

        $scope.validaCpf = function (cpf) {
            if ($state.current.name == "state-funcionario-detail") {
                return;
            }
            funcionarioService.validaCpf($scope.items.data.CPFMascara).then(
                function (response) {
                    $scope.items.data.CpfInvalido = !response.Data;

                    if (!response.Data) {
                        $scope.toastr.error("CPF inválido");
                    }
                });
        }

        $scope.update = function () {
            funcionarioService
                .update($scope.items.data)
                .then(
                    function (response) {
                        if (response.Status < 0) {
                            $scope.toastr.error(response.Message, 'Serviço');
                        }
                        else {
                            $scope.toastr.success("funcionario alterado com sucesso!");
                            $state.go("state-home");
                        }

                    },
                    function (error) {
                        $scope.toastr.error('Ao salvar o funcionario', 'Comunicação com o servidor');
                        console.error('Ao salvar o funcionario', error);
                    }
                );
        };
        $scope.delete = function () {
            funcionarioService
                .delete($scope.items.data.Codigo)
                .then(
                    function (response) {
                        if (response.Status < 0) {
                            $scope.toastr.error(response.Message, 'Serviço');
                        }
                        else {
                            $scope.toastr.success("funcionario deletadp com sucesso!");
                            $state.go("state-home");
                        }

                    },
                    function (error) {
                        $scope.toastr.error('Ao salvar o funcionario', 'Comunicação com o servidor');
                        console.error('Ao salvar o funcionario', error);
                    }
                );
        };

        /*Inicializa funções*/
        $scope.initialize();
    }

})();