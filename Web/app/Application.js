angular.module('App', [
    'ui.router',                //NG ROUTE
    'ngMaterial',               //MATERIAL DESIGN DIRECTIVES
    'uiGmapgoogle-maps',        //GOOGLE MAPS
    'sdk',                      //VALENTYS SDK LIBRARY
    'custom'                    //CUSTOM PROJECT LIBRARY
])

.run(function($WebSQL) {
    $WebSQL.init();
})

.run(function ($rootScope, $state, $location, $log) {
    $log.debug("application is running!!");

    //RESTRICT ACCESS TO LOGIN USER'S ONLY
    $rootScope.$on('$stateChangeStart', function (event, toState) {
       
        if ( (toState.name == "services" || toState.name == "services-details") && !$Profile.isAuthenticated()) {
            $state.go('enrollment-step-1');
            event.preventDefault();
        }

    });

/*
    //REDIRECT TO DASHBOARD WHEN IS AUTHENTICATED
    if($Profile.isAuthenticated()){
        $location.path('/services'); 
    }
*/

    //CALL WHEN THE CONFIGURATION VERSION LABEL , HAS CHANGED
    $rootScope.$on('authentication.logout', function () {
        $state.go('enrollment-step-1');
    });
})

.constant('DB_CONFIG', {
    name: 'DB_v1',
    tables: [
        {
            name: 'timestamps',
            columns: [
                {name: 'name', type: 'TEXT NOT NULL PRIMARY KEY'},
                {name: 'value', type: 'TEXT'}
            ]
        },
        {
            name: 'configuration',
            columns: [
                {name: 'name', type: 'TEXT NOT NULL PRIMARY KEY'},
                {name: 'value', type: 'TEXT NOT NULL'},
                {name: 'type', type: 'TEXT'}
            ]
        }
    ]
})

.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
                          .primaryPalette('brown')
                          .accentPalette('red');
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('enrollment-step-1', {
        url: '/enrollment/step-1',
        templateUrl: 'views/enrollment/enrollment-step-1.html',
        controller: 'EnrollmentStep1Controller'
    })

    .state('enrollment-step-2', {
        url: '/enrollment/step-2',
        templateUrl: 'views/enrollment/enrollment-step-2.html',
        controller: 'EnrollmentStep2Controller'
    })

    .state('enrollment-step-3', {
        url: '/enrollment/step-3/:rut',
        templateUrl: 'views/enrollment/enrollment-step-3.html',
        controller: 'EnrollmentStep3Controller'
    })

    .state('services', {
        url: '/services',
        templateUrl: 'views/service/service-home.html',
        controller: 'ServiceController'
    })

    .state('service-details', {
        url: '/services/details/:token',
        templateUrl: 'views/service/service-details.html',
        controller: 'ServiceDetailsController'
    })

    .state('service-success', {
        url: '/services/success/:identifier',
        templateUrl: 'views/service/service-success.html',
        controller: 'ServiceSuccessController'
    })


    .state('service-description', {
        url: '/services/description/:token',
        templateUrl: 'views/service/service-description.html',
        controller: 'ServiceDescriptionController'
    })

    .state('account', {
        url: '/account',
        templateUrl: 'views/account/index.html',
        controller: 'AccountController'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/enrollment/step-1");

});