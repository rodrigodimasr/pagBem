(function () {
    "use strict";

    angular.module("fiap").directive('onErrorSrc', directive);

    function directive() {
        return {
            link: function (scope, element, attrs) {

                //[ trata imagens em branco ]
                scope.$watch(function () {
                    return attrs['ngSrc'];
                }, function (value) {
                    if (!value) {
                        element.attr('src', attrs.onErrorSrc);
                    }
                });

                //[ trata imagens não encontradas ]
                element.bind('error', function () {
                    if (attrs.src !== attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        }
    }

})();

(function () {
    "use strict";

    angular.module("fiap").directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);


})();



(function () {
    "use strict";

    angular.module("fiap").directive('backgroundImage', directive);

    function directive() {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                element.css({ 'background-image': 'url(' + attrs.backgroundImage + ')' });
            }
        }
    }

})();

(function () {
    "use strict";

    angular.module("fiap").directive('trackBy', directive);

    function directive() {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                ngValue: '=',
                trackBy: '@',
            },
            link: function (val) {
                if (val.ngValue[val.trackBy] === val.ngModel[val.trackBy]) {
                    val.ngModel = val.ngValue;
                }
            }
        };
    }

})();

(function () {
    "use strict";

    angular.module('fiap').directive('numbersOnly', directive);

    function directive() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function filterDigitacao(input) {
                    if (input) {
                        var transformedInput = input.replace(/[^0-9]/g, '');

                        if (transformedInput !== input) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(filterDigitacao);
            }
        };
    };
})();

(function () {
    "use strict";

    angular.module('fiap').directive('filterDateInput', directive);

    function directive() {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {

                function filterDayCharacters(dayPart) {
                    if (dayPart > 31)
                        return "";
                    else
                        return dayPart;
                }

                function filterMonthCharacters(monthPart) {
                    if (monthPart > 12)
                        return "";
                    else
                        return monthPart;
                }

                function filterYearCharacters(yearPart) {
                    if (yearPart > 2900)
                        return "";
                    else
                        return yearPart;
                }

                function filterDateInput(input) {
                    var transformedInput = '';
                    if (input) {
                        var dateValues = input.split('/');

                        if (input.length == 2) {
                            var dayPart = dateValues[0];
                            var returnedDayPart = filterDayCharacters(dayPart);

                            if (returnedDayPart != "")
                                transformedInput = returnedDayPart + "/";
                        }
                        else if (input.length == 5) {
                            var dayPart = dateValues[0];
                            var monthPart = dateValues[1];

                            var returnedDayPart = filterDayCharacters(dayPart);
                            var returnedMonthPart = filterMonthCharacters(monthPart);

                            if (returnedDayPart != "")
                                transformedInput = returnedDayPart + "/";
                            if (returnedMonthPart != "")
                                transformedInput += returnedMonthPart + "/";

                        }
                        else if (input.length == 10) {
                            var dayPart = dateValues[0];
                            var monthPart = dateValues[1];
                            var yearPart = dateValues[2];

                            var returnedDayPart = filterDayCharacters(dayPart);
                            var returnedMonthPart = filterMonthCharacters(monthPart);
                            var returnedYearPart = filterYearCharacters(yearPart);

                            if (returnedDayPart != "")
                                transformedInput = returnedDayPart + "/";
                            if (returnedMonthPart != "")
                                transformedInput += returnedMonthPart + "/";
                            if (returnedYearPart != "")
                                transformedInput += returnedYearPart;
                        }
                        else
                            transformedInput = input;

                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();

                        return transformedInput;
                    }
                    else
                        return undefined;
                }

                ngModelCtrl.$parsers.push(filterDateInput);
            }
        };
    };
})();

(function () {
    "use strict";

    angular.module('fiap').directive("formatDate", directive);

    function directive() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, modelCtrl) {
                modelCtrl.$formatters.push(function (modelValue) { return modelValue ? new Date(modelValue) : null; });
            }
        };
    }

})();

(function () {
    "use strict";

    angular.module("fiap").directive('coverImage', directive);

    function directive() {
        return {
            link: function (scope, element, attrs) {
                element.css({ 'background-image': 'url(/content/img/capa.jpg?v=' + scope.$parent.cacheVersion.get() + ')' });
            }
        }
    }

})();

(function () {
    "use strict";

    angular.module("fiap").directive('authorizationRequired', directive);
    directive.$inject = ['$timeout'];

    function directive($timeout) {
        return {
            restrict: 'A',
            scope: {
                ngClick: '&',
                callbackReturn: '&',
                authorizationRequired: '@',
                authorizationEvent: '@',
                showReason: '@'

            },
            link: function (scope, element, attrs) {
                if (scope.authorizationRequired == "" || (angular.isDefined(eval(scope.authorizationRequired)) && !eval(scope.authorizationRequired)))
                    return;
                var show = true;
                if (angular.isDefined(eval(scope.showReason))) {
                    show = eval(scope.showReason);
                }

                element.unbind("click").bind("click", function ($event) {
                    $event.preventDefault();

                    //Verifica se a autorização ainda é requirida.
                    if (!eval(scope.authorizationRequired)) {
                        scope.$apply(scope.ngClick());
                        return;
                    }

                    $timeout(function () {
                        if (scope.showReason == "false")
                            console.log(scope.showReason);
                        scope.$parent.$parent.autorizacaoGerente.request = scope.authorizationEvent;
                        scope.$parent.$parent.autorizacaoGerente.ativo = true;
                        scope.$parent.$parent.autorizacaoGerente.reason = "";
                        scope.$parent.$parent.autorizacaoGerente.pin = "";
                        scope.$parent.$parent.autorizacaoGerente.callback = scope.ngClick;
                        scope.$parent.$parent.autorizacaoGerente.callbackReturn = scope.callbackReturn;
                        scope.$parent.$parent.autorizacaoGerente.showReason = show;
                    });
                });
            }
        }
    }

})();



(function () {
    "use strict";

    angular.module("fiap").directive('pendingInvoices', directive);
    directive.$inject = ['$state', '$confirm', 'notaFiscalService'];

    function directive($state, $confirm, notaFiscalService) {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/pendingInvoices.html',
            scope: {
                showPendingInvoices: '=',
                askToShow: '=',
                onClose: '&',
            },
            link: function (scope, element, attrs) {

                scope.$watch('showPendingInvoices', function (newValue, oldValue) {
                    if (newValue === true) {
                        scope.showPendingInvoices = newValue;
                        scope.getNotasPendentes();
                    }
                });

                /* Propriedades */
                scope.state = {
                    notasPendentes: [],
                    notaSelecionada: {},
                    reenvioLog: '',
                    showObs: false,
                    showReenvioLog: false,
                    reenviarTodasNotas: false,
                    carregandoNotasPendentes: false,
                    reenviandoNotasPendentes: false,
                    asked: false,
                    statusSearch: ''
                };

                /* Métodos */
                scope.redirect = function (item) {
                    ;

                    //Caso seja feito um redirecionamento para os detalhes da nota, impede uma possível ação de Logoff e inativa o menu lateral caso ativo.
                    scope.onClose = undefined;
                    scope.closePendingInvoices();

                    if (scope.$parent.environment) {
                        scope.$parent.environment.sideNav.ativo = false;
                    }

                    $state.go("state-nota-fiscal-detail", { numero: item.Numero, serie: item.Serie.Codigo, terminal: item.Terminal.Codigo, chave: item.NFE.Chave });
                }

                scope.closePendingInvoices = function () {
                    scope.showPendingInvoices = false;
                    if (!angular.isUndefined(scope.onClose)) {
                        scope.onClose();
                    }
                };

                scope.toogleModalObs = function () {
                    scope.state.showObs = !scope.state.showObs;
                };
                scope.showNotaObs = function (nota) {
                    scope.state.notaSelecionada = nota;
                    scope.toogleModalObs();
                };

                scope.toogleModalReenvioLog = function () {
                    scope.state.showReenvioLog = !scope.state.showReenvioLog;
                };
                scope.showReenvioLog = function (log) {
                    scope.state.reenvioLog = log;
                    scope.toogleModalReenvioLog();
                };

                scope.checkNotas = function () {
                    var check = scope.state.reenviarTodasNotas;
                    scope.state.notaSelecionada = scope.state.notasPendentes.map(function (nota) {
                        nota.Checado = check;
                        return nota;
                    });
                }
                scope.hasNotasSelecionadas = function () {
                    return scope.state.notasPendentes.some(function (nota) {
                        return nota.Checado;
                    });
                }
                scope.getNotasPendentes = function () {
                    scope.state.carregandoNotasPendentes = true;

                    notaFiscalService.getAllPendentes().then(
                        function (response) {
                            if (response.Status < 0) {
                                scope.state.carregandoNotasPendentes = false;
                                if (scope.state.notasPendentes.length == 0 && !angular.isUndefined(scope.onClose)) {
                                    scope.closePendingInvoices();
                                }
                            }
                            else {
                                scope.state.notasPendentes = angular.copy(response.Data);
                                scope.state.carregandoNotasPendentes = false;

                                if (scope.askToShow && scope.state.notasPendentes.length > 0) {
                                    scope.state.asked = true;

                                    $confirm({ text: "Existem notas pendentes a serem enviadas, deseja verificar?" }).then(
                                        function () {
                                            //OK
                                            scope.state.asked = false;
                                        }, function () {
                                            //Cancel
                                            scope.showPendingInvoices = false;
                                            scope.state.asked = true;
                                        }
                                    );
                                }

                                if (scope.state.notasPendentes.length == 0 && !angular.isUndefined(scope.onClose)) {
                                    scope.closePendingInvoices();
                                }
                            }
                        },
                        function (error) {
                            scope.state.carregandoNotasPendentes = false;
                            if (scope.state.notasPendentes.length == 0 && !angular.isUndefined(scope.onClose)) {
                                scope.closePendingInvoices();
                            }
                        }
                    );
                };
                scope.reenviarNotasSelecionadas = function () {
                    scope.state.reenviandoNotasPendentes = true;

                    var notasSelecionadas = scope.state.notasPendentes.filter(nota => nota.Checado);
                    notaFiscalService.reenviarNotasPendentes(notasSelecionadas).then(
                        function (response) {
                            if (response.Status < 0) {
                                scope.state.reenviandoNotasPendentes = false;
                                console.log(response.Message);
                            }
                            else {
                                scope.state.reenviandoNotasPendentes = false;

                                // Item1: Nota | Item2: Status Reenvio | Item3: Log de envio
                                var reenvioReturn = angular.copy(response.Data);

                                //Remove notas processadas da listagem.
                                var notasReenviadas = reenvioReturn.filter(r => r.Item2).map(n => n.Item1);
                                angular.forEach(notasReenviadas, function (nota, key) {
                                    var nf = scope.state.notasPendentes.find(np => np.Numero == nota.Numero && np.Serie.Codigo == nota.Serie.Codigo);
                                    var index = scope.state.notasPendentes.indexOf(nf);

                                    if (index >= 0) {
                                        scope.state.notasPendentes.splice(index, 1);
                                    }
                                });

                                //Apresenta o log de reenvio.
                                var log = reenvioReturn.map(r => r.Item3).join('');
                                scope.showReenvioLog(log);
                            }
                        },
                        function (error) {
                            scope.state.reenviandoNotasPendentes = false;
                            console.error(error);
                        }
                    );
                }

            }
        }
    }

})();

