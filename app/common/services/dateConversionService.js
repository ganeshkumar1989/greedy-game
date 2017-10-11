(function () {
    'use strict';

    angular.module('app.dateConversion', [])

            .factory('dateConversionService', dateConversionService);

    dateConversionService.$inject = [];

    function dateConversionService() {
        return {
            toDate: toDate,
            fromDate: fromDate
        };

        function toDate(dateStr) {
            var parts = dateStr.split("-");
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        
        function fromDate(dateObj) {
            var month = '' + (dateObj.getMonth() + 1),
                day = '' + dateObj.getDate(),
                year = dateObj.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    }
})();
