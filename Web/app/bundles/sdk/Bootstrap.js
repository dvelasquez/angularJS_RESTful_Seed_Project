
//Package Bundle
angular.$createBundle('sdk', [
    'sdk.directives',
    'sdk.filters',
    'sdk.services',
    'sdk.services.security',
    'sdk.services.configuration',
    'sdk.services.rest',
    'sdk.services.storage'
])

.run(function ($Configuration, $LocalStorage, $log, GLOBAL_CONFIGURATION){
    //Do Nothing ;), only for instantation
    $log.debug("debugging enabled!"); //Show only in debug mode

    var stored_key = "$_application";
    var app_conf  = GLOBAL_CONFIGURATION.application;
    var app_stored = $LocalStorage.getObject(stored_key);

    if(app_stored){
        
        //check version configuration , if old , broadcast a changeVersion event;
        if(app_stored.version !== app_conf.version || app_stored.environment !== app_conf.environment){

            $log.debug("a new configuration version is available, calling [on_build_new_version] if exist's !", app_conf.version); //Show only in debug mode

            if(angular.isFunction(GLOBAL_CONFIGURATION.on_build_new_version)){
                try{
                    GLOBAL_CONFIGURATION.on_build_new_version(fullVersion , app_stored.version);
                }catch(e){

                    $log.debug("failed to execute [on_build_new_version] function defined in config.js", e);
                    throw e;
                }
            }
        }

    }

    //Update
    $LocalStorage.setObject(stored_key, app_conf);

})

.config(['$logProvider', function($logProvider){
    var $injector = angular.injector(['ng', 'sdk.services.configuration']);
    var ENVIRONMENT_CONFIGURATION = $injector.get('ENVIRONMENT_CONFIGURATION');
    $logProvider.debugEnabled(ENVIRONMENT_CONFIGURATION.debugging||false);
}]);


//BOOTSTRAP
angular.element(document).ready(function() {

    //Namespace Searching
    var nmspc_confg = 'sdk.services.configuration';
    var $injector = angular.injector(['ng', nmspc_confg]);
    var GLOBAL_CONFIGURATION = $injector.get('GLOBAL_CONFIGURATION');
    var $http = $injector.get('$http');


    //--------------------------------------------------------------------------------------------------------------------
    //ENVIRONMENT CONFIGURATION
    var environment = (GLOBAL_CONFIGURATION.application.environment + "").toLowerCase();
    $http.get('config/env/' + environment + '.json')
    .success(function(data) {

        //SAVE CONSTANT WITH BASE COONFIGURATION
        angular.module(nmspc_confg).constant('ENVIRONMENT_CONFIGURATION', data);

        //--------------------------------------------------------------------------------------------------------------------
        //RESOURCES LOCALIZATION
        var lang = (GLOBAL_CONFIGURATION.application.language + "").toLowerCase();
        $http.get('config/locales/' + lang + '.json')
        .success(function(data) {

            //SAVE CONSTANT WITH BASE COONFIGURATION
            angular.module(nmspc_confg).constant('RESOURCES', data);

            //MANUAL INITIALIZE ANGULAR
            angular.bootstrap(document, ['App']);

        })
        .error(function(data, status, headers, config) {
            throw Error("Can't get resources file (config/resources/" + lang + ".json)");
        });
        //--------------------------------------------------------------------------------------------------------------------

    })
    .error(function(data, status, headers, config) {
        throw Error("Can't get configuration file (config/env/" + environment + ".json)");
    });
    //--------------------------------------------------------------------------------------------------------------------
});