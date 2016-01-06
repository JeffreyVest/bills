(function () {
    'use strict';

    var myApp = angular.module('myApp');

    myApp.controller('CashFlowCtrl',

        /**
         *
         * @param {function (any): {$asObject: function}} $firebase
         * @param $scope
         * @param cashFlowService
         * @param firebaseService
         */
        function ($firebase, $scope, cashFlowService, firebaseService) {
            var cf = $scope;

            firebaseService.onLoginChanged('cashFlowCtrl',
                /**
                 * @param error
                 * @param {{id}} user
                 */
                function (error, user) {
                    if (user) {

                        /**
                         * @type {{balance: {balanceAmount, asOfDate}, $watch}}
                         */
                        var data;
                        var cashFlow;

                        var updateCashFlow = function () {
                            cashFlow =
                                cashFlowService.runCashFlow(
                                    data[user.id].bills,
                                    data[user.id].balance.balanceAmount,
                                    data[user.id].balance.asOfDate
                                );
                            cf.bills = cashFlow;
                        };

                        data = $firebase(firebaseService.firebase).$asObject();

                        data.$watch(updateCashFlow);
                    }
                }
            );

        });
})();
