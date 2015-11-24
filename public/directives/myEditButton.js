(function () {
    'use strict';
    var myApp = angular.module('myApp');

    myApp.directive('myEditButton', function () {
        return {
            restrict: 'E',
            scope: {
                form: '=',
                collection: '=',
                item: '=',
                editor: '='
            },
            templateUrl: 'directives/myEditButton.html'
        };
    });
})();