(function() {
    var myApp = angular.module('myApp');

    myApp.factory('cashFlowService', function () {

        var runCashFlow = function(cashFlow, balance, asOfDate) {
            var startDate = moment(asOfDate);
            var baseDate = moment(startDate).date(1);
            var endDate = moment(baseDate).add(12, 'months');
            return runCashFlowForDates(cashFlow, startDate, endDate, true, balance);
        };

        var runCashFlowForDates = function(masterBillList, startDate, endDate, computeRunningBalances, balance) {
            var cashFlow = [];

            var startBalance = balance;
            var baseDate = moment(startDate).date(1);

            if (computeRunningBalances) {
                cashFlow.push({
                    description: "Balance",
                    amount: startBalance,
                    date: startDate,
                    running: 0,
                    min: false
                });
            }

            _.forOwn(masterBillList.monthlyBills, function(bill) {
                var monthOffset = 0;
                var date = moment(baseDate).date(Math.min(bill.day, baseDate.daysInMonth()));
                while (date.isBefore(endDate)) {
                    cashFlow.push({
                        date: date,
                        description: bill.desc,
                        amount: bill.amount ||  0,
                        running: 0,
                        min: false
                    });
                    monthOffset++;
                    date = moment(baseDate).add(monthOffset, 'months');
                    date.date(Math.min(bill.day, date.daysInMonth()));
                }
            });

            cashFlow = _(cashFlow).sortBy('amount').reverse().sortBy('date').filter(function(b) {
                return b.date >= startDate;
            }).valueOf();

            if (computeRunningBalances) {
                var running = 0;
                var j;
                for (j = 0; j < cashFlow.length; j++) {
                    var bill = cashFlow[j];
                    running += bill.amount;
                    bill.running = running;
                }

                _.min(cashFlow, function (b) {
                    return b.running;
                }).min = true;
            }

            return cashFlow;
        };

        return {
            runCashFlow: runCashFlow,
            runCashFlowForDates: runCashFlowForDates
        }
    });

})();
