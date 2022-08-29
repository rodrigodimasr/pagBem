(function () {
    "use strict";

    angular.module('fiap').controller('funcionarioAddController', controller);

    controller.$inject = ['$scope', '$state', 'toastr', 'funcionarioService', 'entidadeAuxiliarService'];

    function controller($scope, $state, toastr, funcionarioService, entidadeAuxiliarService) {

        $scope.toastr = toastr;
        //[Inicializa objetos]
        $scope.items = {
            auxiliar: [{ ID: 1, Nome: "Comercial" },
            { ID: 2, Nome: "Residencial" },
            { ID: 3, Nome: "Recado" }],
            data: {},
            cell: [{ ID: 0, Nome: "Celular" }],
            departamento: [
                { ID: 1, Nome: 'Diretoria' },
                { ID: 2, Nome: 'Administração' },
                { ID: 3, Nome: 'Tecnologia' },
                { ID: 4, Nome: 'Recursos Humano' },
                { ID: 5, Nome: 'Comercial' },
                { ID: 6, Nome: 'Operacional' }],
            carregando: false,
            vazio: false,
            erro: {
                ativo: false,
                mensagem: ''
            },
        };
        $scope.auxiliar = {
            estado: { data: [] },
        };
        $scope.campoInvalido = function (campo) {

            var isInvalid = function (value) {
                var invalid = (value == null || value == "");
                return invalid;
            }

            switch (campo) {
                case 'email':
                    var value = funcionarioForm.email.value;
                    return isInvalid(value);
                    break;
                default:
                    return false;
            }
        }

        $scope.validateEmail = function (email) {
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (reg.test(email)) {
                return true;
            }
            else {
                $scope.toastr.error("E-mail inválido!");
                var value = funcionarioForm.email.value;
                return isInvalid(value);
            }
        } 

        $scope.initialize = function () {
            $scope.refresh();
        };

        $scope.submit = function () {
            $scope.redirect = true;
            $scope.save();
        };

        $scope.save = function () {

            if (!$scope.validateEmail($scope.items.data.Email))
                return;

            funcionarioService.save($scope.items.data)
                .then(
                    function (response) {
                        if (response.Status < 0)
                            $scope.toastr.error(response.Message, 'Serviço');
                        else {
                            $scope.toastr.success("funcionario salvo com sucesso");
                            $state.go("state-home");
                        }

                    },
                    function (err) { $scope.toastr.error(err); }
                );
        }


        $scope.validaCpf = function (cpf) {
            funcionarioService.validaCpf(cpf).then(
                function (response) {
                    $scope.items.data.CpfInvalido = !response.Data;
                    if (!response.Data) {
                        $scope.toastr.error("CPF inválido");
                    }
                });
        }


        $scope.getEndereco = function () {
            entidadeAuxiliarService
                .getEndereco($scope.items.data.Endereco.CEP)
                .then(
                    function (endereco) {
                        if (endereco) {
                            $scope.items.data.Endereco.CEP = endereco.cep.replace('-', '');
                            $scope.items.data.Endereco.Linha1 = endereco.logradouro;
                            $scope.items.data.Endereco.Linha3 = endereco.complemento;
                            $scope.items.data.Endereco.Bairro = endereco.bairro;
                            $scope.items.data.Endereco.Estado = { Nome: endereco.uf, CodigoIBGE: endereco.ibge.substring(0, 2), Sigla: endereco.uf };
                            $scope.items.data.Endereco.Cidade = { Nome: endereco.localidade, CodigoIBGE: endereco.ibge };

                            $('[ng-model$=Linha2]').focus();
                        }
                    },
                    function (err) {
                        $scope.$parent.toastr.error(err);
                    }
                );
        };

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
            $scope.getAllEstado();
        };

        /*Inicializa funções*/
        $scope.initialize();
    }
})();