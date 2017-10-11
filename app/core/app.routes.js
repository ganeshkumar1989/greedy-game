(function () {
    'use strict';

    angular.module('app')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/ad_requests');
        $urlRouterProvider.when('/', '/ad_requests');
        $urlRouterProvider.when('/ad_requests', '/ad_requests');
        $urlRouterProvider.otherwise('/');
        $stateProvider
                .state('root', {
                    abstract: true,
                    url: '/',
                    views: {
                        'header': {
                            templateUrl: 'core/navigation/headerView.html',
                            controller: 'HeaderController',
                            controllerAs: 'HC'
                        },
                        'content': {
                            template: 'Choose option from menu...'
                        },
                        'footer': {
                            templateUrl: 'core/navigation/footerView.html',
                            controller: 'FooterController',
                            controllerAs: 'FC'
                        }
                    }
                })
                .state('root.ad_requests', {
                    url: 'ad_requests',
                    views: {
                        'content@': {
                            templateUrl: 'core/ad-request/listView.html',
                            controller: 'AdRequestController',
                            controllerAs: 'ARC'
                        }
                    }
                });
    }
    
    run.$inject = ['$state'];
    
    function run($state){
        $state.go('root.ad_requests');
    }
})();
