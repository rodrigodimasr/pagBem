(function () {
    "use strict";
    angular.module('fiap').config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('state-home', { url: '/home', views: { 'body': { templateUrl: '/home/index', controller: 'homeController' } } })

            .state('state-funcionario', { url: '/funcionario', views: { 'body': { templateUrl: '/funcionario/index', controller: 'funcionarioController' } } })
            .state('state-funcionario-add', { url: '/funcionario/add', views: { 'body': { templateUrl: '/funcionario/add', controller: 'funcionarioAddController' } } })
            .state('state-funcionario-detail', { url: '/funcionario/detail/:id', views: { 'body': { templateUrl: '/funcionario/detail', controller: 'funcionarioDetailController' } } })
            .state('state-funcionario-edit', { url: '/funcionario/edit/:id', views: { 'body': { templateUrl: '/funcionario/edit', controller: 'funcionarioDetailController' } } })
            ;
        $locationProvider.html5Mode(false);
    }

})();