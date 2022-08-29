(function () {
    "use strict";

    angular.module('fiap').config(config);
    config.$inject = ['toastrConfig']

    function config(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            //allowHtml: false,
            //closeButton: false,
            //closeHtml: '<button>&times;</button>',
            //extendedTimeOut: 10000,
            //iconClasses: {
            //    error: 'toast-error',
            //    info: 'toast-info',
            //    success: 'toast-success',
            //    warning: 'toast-warning'
            //},
            //messageClass: 'toast-message',
            //onHidden: null,
            //onShown: null,
            //onTap: null,
            //progressBar: false,
            //tapToDismiss: true,
            //templates: {
            //    toast: 'directives/toast/toast.html',
            //    progressbar: 'directives/progressbar/progressbar.html'
            //},
            //timeOut: 5000,
            //titleClass: 'toast-title',
            //toastClass: 'toast'
        });
    }

})();