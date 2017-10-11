(function () {
    'use strict';

    angular.module('app.directives.lazyLoadingTableDirective', [])

            .directive('lazyLoadingTableDirective', lazyLoadingTableDirective);

    lazyLoadingTableDirective.$inject = [];
    
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function lazyLoadingTableDirective() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
            scope: {
                onDataNeeded: '&',
                adRequests: '='
            },
            template: '<div class="col-md-12 table-wrapper">'+
                '<div class="table-responsive col-md-12 table-scroll">'+
                    '<table class="table table-striped">'+
                        '<thead>'+
                            '<tr>'+
                                '<th class="col-xs-2">No.</th>'+
                                '<th class="col-xs-5">Date</th>'+
                                '<th class="col-xs-5">Ad Requests</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tr ng-repeat="adRequest in adRequests">'+
                            '<td>{{$index + 1}}. </td>'+
                            '<td><span>{{adRequest.date}}</span></td>'+
                            '<td><span>{{adRequest.adrequest}}</span></td>'+
                        '</tr>'+
                    '</table>'+
                '</div>'+
            '</div>'
        };

        return directive;
        
        function isScrollComplete(element){
            var scrolltop = element.scrollTop;  
            var scrollheight = element.scrollHeight;  
            var windowheight = element.clientHeight;  
            var scrolloffset=20;  
            if(scrolltop>=(scrollheight-(windowheight+scrolloffset)))  
            {  
                return true; 
            }
        }

        function linkFunc(scope, element, attrs) {
            var scrollableElement = element.find('.table-scroll');
            scrollableElement.on('scroll', debounce(function(e) {
                if(isScrollComplete(scrollableElement[0])){
                    scope.onDataNeeded();
                }
            }, 200));
        }
    }
})();
