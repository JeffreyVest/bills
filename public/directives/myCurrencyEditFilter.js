(function () {
    'use strict';
    var myApp = angular.module('myApp');

    myApp.directive('myCurrencyEditFilter',
        /**
         * @returns {{restrict: string, require: string, link: Function}}
         */
        function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, el, attrs, ngModelCtrl) {

                    attrs.$set('step', '0.01');

                    el.bind('blur', function () {
                        var value = ngModelCtrl.$modelValue;
                        if (value) {
                            ngModelCtrl.$setViewValue(value.toFixed(2));
                            ngModelCtrl.$render();
                        }
                    });

                    ngModelCtrl.$parsers.push(function (value) {
                        return +value;
                    });

                    ngModelCtrl.$formatters.push(function (value) {
                        return (+value).toFixed(2);
                    });

                }
            };
        });
})();