angular.module('App', [
    'ui.router',                //NG ROUTE
    'ngMaterial',               //MATERIAL DESIGN DIRECTIVES
    'uiGmapgoogle-maps',        //GOOGLE MAPS
    'sdk',                      //VALENTYS SDK LIBRARY
    'app'                       //CUSTOM PROJECT LIBRARY
])

.run(function($WebSQL) {
    $WebSQL.init();
})

.run(function ($rootScope, $state, $location, $log, $User) {
    $log.debug("application is running!!");

    //RESTRICT ACCESS TO LOGIN USER'S ONLY
    $rootScope.$on('$stateChangeStart', function (event, toState) {
       
        if ( toState.name !== "login" && !$User.isAuthenticated() ) {
            $state.go('login');
            event.preventDefault();
        }

    });

    //REDIRECT TO DASHBOARD WHEN IS AUTHENTICATED
    if($User.isAuthenticated()){
        $location.path('/home'); 
    }

    //CALL WHEN THE CONFIGURATION VERSION LABEL , HAS CHANGED
    $rootScope.$on('security.logout', function () {
        $state.go('login');
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
    .primaryPalette('blue')
    .accentPalette('orange');
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'views/security/login.html',
        controller: 'LoginController'
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "views/shared/layout.html",
        controller: "LayoutController"
    })

    .state('app.home', {
        url: '/home',
        views: {
            content: {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController'
            }   
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/login");

});