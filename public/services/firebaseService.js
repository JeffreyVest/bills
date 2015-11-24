(function () {
    'use strict';
    var myApp = angular.module('myApp');

    myApp.factory('firebaseService',

        /**
         * @returns {{onLoginChanged: Function, auth: FirebaseSimpleLogin, firebase: Firebase}}
         */
        function () {

            var externalListeners = {};
            var lastArgs;

            var loginChanged = function (error, user) {
                lastArgs = arguments;
                _.forOwn(externalListeners, function (listener) {
                    listener(error, user);
                });
            };

            /**
             * @param {string} name
             * @param {function(any, string)} fn
             */
            var onLoginChanged = function (name, fn) {
                externalListeners[name] = fn;
                if (lastArgs) {
                    fn.apply(null, lastArgs);
                }
            };

            var firebase = new Firebase('https://jvestnet.firebaseio.com/');
            var auth = new FirebaseSimpleLogin(firebase, loginChanged);

            return {
                onLoginChanged: onLoginChanged,
                auth: auth,
                firebase: firebase
            };

        });

})();