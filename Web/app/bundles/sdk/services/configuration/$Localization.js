angular.module('sdk.services.configuration')

.service('$Localization', function (RESOURCES) {

	function get(name, defaultValue){
        var v = RESOURCES[name]; 
        if(typeof v === undefined){
            if(defaultValue){
                return defaultValue;
            }
            throw Error(name + " don't exists in resources");
        }
        return RESOURCES[name];
    }

    function exists(name){
        return RESOURCES[name] != null;
    }

    return {
        get: get,
        exists: exists
    };

});
