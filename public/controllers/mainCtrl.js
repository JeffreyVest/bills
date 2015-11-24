(function () {
    'use strict';
    var myApp = angular.module('myApp');


    myApp.controller('MainCtrl',
        /**
         * @param {$location} $location
         * @param {$rootScope.Scope} $scope
         * @param {firebaseService} firebaseService
         */
        function ($location, $scope, firebaseService) {
            /**
             * @type {{needsLogin: Boolean, login: Function, logout: Function, selectedTab: any}}
             */
            var main = this;

            main.needsLogin = true;

            firebaseService.onLoginChanged('mainCtrl', function (error, user) {
                $scope.$apply(function () {
                    main.needsLogin = !user;
                });
            });

            main.login = function () {
                firebaseService.auth.login('facebook');
            };

            main.logout = function () {
                firebaseService.auth.logout();
            };

            $scope.$watch(
                function () {
                    return $location.path();
                },
                function (newValue) {
                    main.selectedTab = newValue;
                }
            );

        });
})();
