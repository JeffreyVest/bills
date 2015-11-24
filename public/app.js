(function() {
    var myApp;

    myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'angularMoment', 'firebase']);

    myApp.filter('checkmark', function() {
        return function(input) {
            if (input) {
                return '\u2190';
            } else {
                return '';
            }
        };
    });

    myApp.filter('myCurrency', function(currencyFilter) {
        return function(input) {
            return currencyFilter(input).replace('(', '-').replace(')', '');
        }
    })

    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/cashFlow', {
                templateUrl: 'views/cashFlow.html',
                controller: 'CashFlowCtrl',
            }).
            when('/listBills', {
                templateUrl: 'views/listBills.html',
                controller: 'ListBillsCtrl',
            }).
            when('/balance', {
                templateUrl: 'views/balance.html',
                controller: 'BalanceCtrl',
            }).
            otherwise({
                redirectTo: '/cashFlow'
            });
    }]);

})();
