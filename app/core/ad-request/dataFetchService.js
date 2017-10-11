(function () {
    'use strict';

    angular.module('app.dataFetchService', ['app.dateConversion', 'app.constants'])

            .factory('dataFetchService', dataFetchService);

    dataFetchService.$inject = ['$http', '$log', '$q', 'dateConversionService', 'maxRequestSize'];

    function dataFetchService($http, $log, $q, dateConversionService, maxRequestSize) {
        var startingDate, endingDate,
            retrivedEndDate;
        
        return {
            fetchData: fetchData,
            fetchNextData: fetchNextData
        };

        function fetchData(startDate, endDate) {
            startingDate = startDate;
            endingDate = endDate;
            
            var tempDate = dateConversionService.toDate(startingDate);
            tempDate.setDate(tempDate.getDate() + maxRequestSize);
            
            endDate = ((tempDate<dateConversionService.toDate(endDate))? dateConversionService.fromDate(tempDate): endDate);
            
            return retriveData(startDate, endDate);
        }
        
        function fetchNextData() {
            if(retrivedEndDate === endingDate){
                return $q.resolve({data: []});    
            }
            
            var startDate = retrivedEndDate;
            var endDate = endingDate;
            
            var tempDate = dateConversionService.toDate(startDate);
            tempDate.setDate(tempDate.getDate() + maxRequestSize);
            
            endDate = ((tempDate<dateConversionService.toDate(endDate))? dateConversionService.fromDate(tempDate): endDate);
            
            return retriveData(startDate, endDate);
        }
        
        function retriveData(startDate, endDate){
            return $http.get('http://104.197.128.152/data/adrequests?from=' + startDate + '&to=' + endDate)
                    .then(getTodosComplete)
                    .catch(getTodosFailed);

            function getTodosComplete(response) {    
                retrivedEndDate = endDate;
                return response.data;
            }

            function getTodosFailed(e) {
                var newMessage = 'XHR Failed for getTodos.';
                $log.error(newMessage);
                return $q.reject(e);
            }
        }       
    }
})();
