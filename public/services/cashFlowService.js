(function() {
    var myApp = angular.module('myApp');

    myApp.factory('cashFlowService', function () {
        return function(cashFlow, balance, asOfDate) {
            var bills = [];
            var startBalance = balance;
            var startDate = moment(asOfDate);
            var baseDate = moment(startDate).date(1);
            var endDate = moment(startDate).date(1).add(12, 'months');
            bills.push({
                description: "Balance",
                amount: startBalance,
                date: startDate,
                running: 0,
                min: false
            });

            var m;
            var date;
            var monthlyBill;
            var j;
            _.forOwn(cashFlow.monthlyBills, function(bill) {
                m = 0;
                date = moment(baseDate).date(Math.min(bill.day, baseDate.daysInMonth()));
                while (date.isBefore(endDate)) {
                    bills.push({
                        date: date,
                        description: bill.desc,
                        amount: bill.amount ||  0,
                        interestRate: bill.interestRate,
                        running: 0,
                        min: false
                    });
                    m++;
                    date = moment(baseDate).add(m, 'months');
                    date.date(Math.min(bill.day, date.daysInMonth()));
                }
            });

            //var weeklyBill;
            //var w;
            //_.forOwn(cashFlow.weeklyBills, function(bill) {
            //    w = 0;
            //    baseDate = moment(startDate).day(bill.dayOfWeek);
            //    date = moment(baseDate);
            //    while (date.isBefore(endDate)) {
            //        bills.push({
            //            date: date,
            //            description: bill.desc,
            //            amount: bill.amount,
            //            running: 0,
            //            min: false
            //        });
            //        w++;
            //        date = moment(baseDate).add(w, 'weeks');
            //    }
            //});

            bills = _(bills).sortBy('amount').reverse().sortBy('date').filter(function(b) {
                return b.date >= startDate;
            }).valueOf();

            var running = 0;
            var bill;
            for (j = 0; j < bills.length; j++) {
                bill = bills[j];
                bill.interestRate && (bill.amount = (bill.interestRate / 12) * running);
                running += bill.amount;
                bill.running = running;
            }

            _.min(bills, function(b) { return b.running; }).min = true;

            return bills;
        };
    });

})();
