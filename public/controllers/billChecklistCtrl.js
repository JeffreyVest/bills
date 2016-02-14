(function () {
    'use strict';

    var myApp = angular.module('myApp');

    myApp.controller('BillChecklistCtrl',
        function ($firebase, $scope, firebaseService, cashFlowService) {
            var bills = $scope;
            var _user;

            bills.populateBillCheckList = function () {
                var firebase = firebaseService.firebase;
                firebase.child(_user.uid + '/bills').once('value', function(snapshot){
                    var masterBillList = snapshot.val();
                    var cashFlow = cashFlowService.runCashFlowForDates(
                        masterBillList,
                        moment().date(1),
                        moment().date(1).add(1, 'months'),
                        false);
                    _.forEach(cashFlow, function(cashFlowItem) {
                        cashFlowItem.date = cashFlowItem.date.format('l');
                        cashFlowItem.scheduled = false;
                        cashFlowItem.paid = false;
                        bills.billChecklist.$add(cashFlowItem);
                    });
                });
            };

            bills.saveBill = function (bill) {
                bills.billChecklist.$save(bill);
            }

            bills.clearBillCheckList = function() {
                var firebase = firebaseService.firebase;
                firebase.child(_user.uid + '/billChecklist').set(null);
            };

            firebaseService.onLoginChanged('listBillsCtrl',
                /**
                 * @param error
                 * @param {{id}} user
                 */
                function (error, user) {
                    if (user) {
                        _user = user;
                        var firebase = firebaseService.firebase;
                        bills.billChecklist = $firebase(firebase.child(_user.uid + '/billChecklist')).$asArray();
                    }
                }
            );
        });
})();