(function () {
    'use strict';

    angular.module('app.directives.datepicker', [])

            .directive('ngDatePicker', ngDatePicker);

    ngDatePicker.$inject = [];

    function ngDatePicker() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunc,
            scope: {
                onChange: '&'
            }
        };

        return directive;

        function linkFunc(scope, element, attrs, ctrl) {
            element.datepicker({
                changeYear: true,
                changeMonth: true,
                showWeek: false,
                firstDay: 1,
                dayNames: 'en',
                dateFormat: 'yy-mm-dd',
                onSelect: onSelectFunc
            });

            function onSelectFunc(date, b, c, s) {
                ctrl.$setViewValue(date);
                scope.onChange();
                scope.$apply();
            }
        }
    }
})();
