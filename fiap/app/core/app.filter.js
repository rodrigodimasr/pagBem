(function () {
    "use strict";

    angular.module("fiap").filter('abs', filter);

    function filter() {
        return function (val) {
            return Math.abs(val);
        }
    }

})();

(function () {
    "use strict";

    angular.module("fiap").filter('notes', filter);

    function filter() {
        return function (val) {
            return val.replace(/\r/g, '<br \/>');
        }
    }

})();

(function () {
    "use strict";

    angular.module("fiap").filter('toDate', filter);

    function filter() {
        return function (date) {
            if (date instanceof Date) {
                var dateObj = new Date(date);
                var dateWithoutTime = dateObj.toLocaleDateString();

                return dateWithoutTime;
            }
            else if (typeof date == "string") {
                var arrData = date.split('/');
                var dateObj = new Date(arrData[2], arrData[1] - 1, arrData[0]);
                var dateWithoutTime = dateObj.toLocaleDateString();

                if (dateWithoutTime == 'Invalid Date')
                    return null;

                return dateWithoutTime;
            }
            else {
                return null;
            }
        }
    }
})();

(function () {
    'use strict';
    angular.module("fiap").filter('cpf', filter);
    function filter() {
        return function (input) {
            var str = input + '';
            if (str.length <= 11) {
                str = str.replace(/\D/g, '');
                str = str.replace(/(\d{3})(\d)/, "$1.$2");
                str = str.replace(/(\d{3})(\d)/, "$1.$2");
                str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            }
            return str;
        };
    };
})();