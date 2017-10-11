(function () {
    'use strict';

    angular.module('app.ad-request.list', ['app.dataFetchService', 'app.dateConversion'])

            .controller('AdRequestController', AdRequestController);

    AdRequestController.$inject = ['$scope', 'dataFetchService', 'dateConversionService'];

    function AdRequestController($scope, dataFetchService, dateConversionService) {
        var vm = this;
        
        vm.adRequests = [];
        
        vm.fetchMoreData = function(){
            dataFetchService.fetchNextData()
                .then(function (data) {
                    vm.adRequests = vm.adRequests.concat(data.data);
                });
        };

        vm.errMsg = 'Select both Start and End Dates';
        
        vm.dateChanged = function(){
            vm.adRequests.splice(0, vm.adRequests.length);
            vm.errMsg = '';
            if(vm.startDate && vm.endDate){
                var startDate = dateConversionService.toDate(vm.startDate);
                var endDate = dateConversionService.toDate(vm.endDate);
                if(startDate <= endDate){
                    if(endDate < new Date()){
                        dataFetchService.fetchData(vm.startDate, vm.endDate)
                            .then(function (data) {
                                vm.adRequests = data.data;
                            });
                    }
                    else{
                        vm.errMsg = 'End date should not be in future';
                    }
                }
                else{
                    vm.errMsg = 'Start date should be less than End date';
                }
            }
            else{
                vm.errMsg = 'Select both Start and End Dates';
            }
        };
    }
})();
