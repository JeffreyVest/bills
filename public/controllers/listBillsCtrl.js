(function () {
    'use strict';

    var myApp = angular.module('myApp');

    myApp.controller('ListBillsCtrl',
        /**
         * @param {function} $firebase
         * @param {{editor: {editRecord, deleteRecord, lastDeletedBill}, addBill, undo, dayOrder, monthlyBills}} $scope
         * @param {firebaseService} firebaseService
         */
        function ($firebase, $scope, firebaseService) {
            var bills = $scope;
            bills.editor = {};

            bills.editor.editRecord = function (form, billsArray, bill) {
                var isEditing = !bill.isEditing;

                if (!isEditing) {
                    if (form.$valid) {
                        delete bill.isEditing;
                        billsArray.$save(bill);
                    } else {
                        isEditing = true;
                    }
                }

                bill.isEditing = isEditing;
            };

            bills.editor.deleteRecord = function (billsArray, bill) {
                bills.editor.lastDeletedBill = bill;
                billsArray.$remove(bill);
            };

            bills.undo = function (billsArray) {
                if (bills.editor.lastDeletedBill) {
                    billsArray.$add(bills.editor.lastDeletedBill);
                    delete bills.editor.lastDeletedBill;
                }
            };

            bills.addBill = function (billsArray) {
                var bill = {
                    amount: null,
                    day: null,
                    desc: '',
                    isEditing: true
                };
                billsArray.$add(bill);
            };

            bills.dayOrder = function (bill) {
                if (bill.day) return bill.day;
                return 0;
            };

            firebaseService.onLoginChanged('listBillsCtrl',
                /**
                 * @param error
                 * @param {{id}} user
                 */
                function (error, user) {
                    if (user) {
                        var firebase = firebaseService.firebase;

                        bills.monthlyBills = $firebase(firebase.child(user.id + '/bills/monthlyBills')).$asArray();
                        $firebase(firebase.child(user.id + '/viewState')).$asObject().$bindTo(bills, 'viewState');
                    }
                }
            );

        });
})();