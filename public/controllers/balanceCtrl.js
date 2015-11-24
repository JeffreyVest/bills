(function () {
    'use strict';
    var myApp = angular.module('myApp');

    myApp.controller('BalanceCtrl',
        /**
         * @param $firebase
         * @param $scope
         * @param {firebaseService} firebaseService
         */
        function ($firebase, $scope, firebaseService) {

            firebaseService.onLoginChanged('balanceCtrl',
                /**
                 * @param error
                 * @param {{id}} user
                 */
                function (error, user) {

                    if (user) {
                        var firebase = firebaseService.firebase;
                        $firebase(firebase.child(user.id + '/balance')).$asObject().$bindTo($scope, 'balance');
                    }

                }
            );

        });
})();