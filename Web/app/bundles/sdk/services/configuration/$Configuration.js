angular.module('sdk.services.configuration')

.service('$Configuration', function ($rootScope, $LocalStorage, GLOBAL_CONFIGURATION, ENVIRONMENT_CONFIGURATION) {
    var _values             = {};

    //LOAD THE INITIAL CONFIGURATION
    for(var name in ENVIRONMENT_CONFIGURATION){
        set(name, ENVIRONMENT_CONFIGURATION[name]);
    }

    for(var name in GLOBAL_CONFIGURATION){
        set(name, GLOBAL_CONFIGURATION[name]);
    }
    
    function get(name, defaultValue){
        var v = _values[name]; 
        if(typeof v == undefined){
            if(defaultValue){
                return defaultValue
            }
            throw Error(name + " don't exists in configuration");
        }
        return _values[name];
    }

    function exists(name){
        return _values[name] != null;
    }

    function set(name, value){
        _values[name] = value;
    }

    return {
        get: get,
        exists: exists
    }
});