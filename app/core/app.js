(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.index',
        'app.nav.footer',
        'app.nav.header',
        'app.ad-request.list',
        'app.directives.datepicker',
        'app.directives.lazyLoadingTableDirective'
	]);
})();
