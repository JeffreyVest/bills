(function () {
    'use strict';
    var myApp = angular.module('myApp');

    myApp.directive('myDeleteButton', function () {
        return {
            restrict: 'E',
            scope: {
                collection: '=',
                item: '=',
                editor: '='
            },
            templateUrl: 'directives/myDeleteButton.html'
        };
    });
})();