(function () {
    "use strict";

    angular.module('fiap').run(run);
    run.$inject = ['$rootScope', '$timeout', '$state', '$confirmModalDefaults'];

    function run($rootScope, $timeout, $state, $confirmModalDefaults) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toStateParams, fromState, fromStateParams) {
            var scope = angular.element($('[ng-controller="homeController"]')).scope();
        });

        $rootScope.$on("$stateChangeSuccess", function (event, toState, toStateParams, fromState, fromStateParams) {
            var scope = angular.element($('[ng-controller="homeController"]')).scope();
        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            var scope = angular.element($('[ng-controller="homeController"]')).scope();

            if (error.status == 401)
                $state.go("state-home");
        });

        /* default para o módulo angular-confirm */
        //$confirmModalDefaults.defaultLabels.title = 'Confirmação';
        //$confirmModalDefaults.defaultLabels.ok = 'OK, Confirmado';
        //$confirmModalDefaults.defaultLabels.cancel = 'Voltar';

        ///TODO: transformar em angular futuramente.
        $(window).scroll(function () {
            if ($('.activate-on-scroll').length) {

                if ($(window).scrollTop() > 100) {
                    $('header').removeClass('navbar-transparent');
                }
                else {
                    $('header').addClass('navbar-transparent');
                }
            }
        });

    }

})();