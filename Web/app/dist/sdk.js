//PACKAGING FUNCTION
angular.$createBundle = function(bundle, namespaces){

    //Create the namespace via angular style
    angular.forEach(namespaces, function(name){ 
        angular.module(name, []); 
    });

    //CREATE ANGULAR MODULE
    return angular.module(bundle, namespaces)
}

//Package Bundle
angular.$createBundle('sdk', [
    'sdk.directives',
    'sdk.filters',
    'sdk.services',
    'sdk.services.configuration',
    'sdk.services.rest',
    'sdk.services.storage'
])

.run(function ($Configuration, $LocalStorage, $log, GLOBAL_CONFIGURATION){
    //Do Nothing ;), only for instantation
    $log.debug("debugging enabled!"); //Show only in debug mode

    var fullVersion  = GLOBAL_CONFIGURATION.version;

    //GET CONFIGURATION VERSION
    var store_key = "$_appInformation";
    var conf = $LocalStorage.getObject(store_key);
    if(conf){
        
        //check version configuration , if old , broadcast a changeVersion event;
        if(conf.version != fullVersion || conf.environment != GLOBAL_CONFIGURATION.environment){

            $log.debug("a new configuration version is available, calling [on_build_new_version] if exist's !", GLOBAL_CONFIGURATION.version); //Show only in debug mode

            if(angular.isFunction(GLOBAL_CONFIGURATION["on_build_new_version"])){
                try{
                    GLOBAL_CONFIGURATION["on_build_new_version"](fullVersion , conf.version );

                    conf.version = fullVersion;
                    conf.environment = GLOBAL_CONFIGURATION.environment;
                    $LocalStorage.setObject(store_key, conf);

                }catch(e){
                    $log.debug("failed to execute [on_build_new_version] function defined in config.js", e);
                    throw e;
                }
            }
        }

    }else{
        $LocalStorage.setObject(store_key, {
            version: fullVersion,
            environment: GLOBAL_CONFIGURATION.environment,
            author: GLOBAL_CONFIGURATION.author,
            application_name: GLOBAL_CONFIGURATION.application_name
        });
    }



})

.config(['$logProvider', function($logProvider, $injector){
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
    var environment = (GLOBAL_CONFIGURATION.environment + "").toLowerCase();
    $http.get('config/env/' + environment + '.json')
    .success(function(data) {

        //SAVE CONSTANT WITH BASE COONFIGURATION
        angular.module(nmspc_confg).constant('ENVIRONMENT_CONFIGURATION', data);

        //--------------------------------------------------------------------------------------------------------------------
        //RESOURCES LOCALIZATION
        var lang = (GLOBAL_CONFIGURATION.language + "").toLowerCase();
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

});angular.module('sdk.directives')

.directive('selectTextOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                this.select();
            });
        }
    };
});;angular.module('sdk.directives')


.directive('toNumberOnBlur', function($filter,$locale) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            elm.bind('blur', function() {
                var filter = "number";
        		ctrl.$viewValue = $filter(filter)(ctrl.$modelValue);
        		ctrl.$render();
            });

            elm.bind('focus', function() {
        		ctrl.$viewValue = ctrl.$modelValue;
        		ctrl.$render();
            });
        }
    };  
});;/**
 * Created by Administrador on 26/08/14.
 */
angular.module('sdk.directives', [])

.directive('ngRange', function($log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            
            var min = parseInt(attrs["min"]);
            var max = parseInt(attrs["max"]);

            ctrl.$validators.range = function(modelValue, viewValue) {

                var value = parseInt(viewValue);

                if (ctrl.$isEmpty(modelValue)) {
                  // consider empty models to be valid
                  return true;
                }

                if (ctrl.$isEmpty(viewValue)) {
                    //is View Value is empty
                    return false;
                }

                if(!isNaN(min) && !isNaN(max)){
                    if (value >= min && value <= max) {
                        return true; 
                    }
                    return false;
                }

                if(!isNaN(min)){
                    if (value >= min) {
                        // it is valid
                        return true;
                    }
                    return false;
                }

                if(!isNaN(max)){
                    if (value <= max) {
                        // it is valid
                        return true;
                    }
                    return false;
                }

                // it is invalid
                return true;
            };

        }
    }
});/**
 * Created by Administrador on 26/08/14.
 */
angular.module('sdk.directives', [])
    .directive('ngRut', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attr, ctrl) {

                var validaRut = function (rutCompleto) {
                    var tmp = [];

                    if(rutCompleto.indexOf("-") > 0){
                        if (!/^[0-9]+-[0-9kK]{1}$/.test( rutCompleto )) return false;
                        tmp = rutCompleto.split('-');
                    }else{
                        //Sin Guion
                        var rut = rutCompleto.replace("-", "");

                        tmp.push(rut.substring(0, rut.length-1));
                        tmp.push(rut.substring(rut.length-1));

                    }
                    if(tmp.length<2){
                        return false;
                    }

                    return (dv(tmp[0])) == tmp[1].toLowerCase();
                }

                var dv  = function(T){
                    var M=0,S=1;
                    for(;T;T=Math.floor(T/10)){
                        S=(S+T%10*(9-M++%6))%11;
                    }
                    return S?S-1:'k';
                }

                ctrl.$validators.rut = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                      // consider empty models to be valid
                      return true;
                    }

                    if (ctrl.$isEmpty(viewValue)) {
                        //is View Value is empty
                        return false;
                    }

                    if (validaRut(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };

            }
        }
    });angular.module('sdk.filters')	

.filter('Localize', function ($Localization, $log, $interpolate) {
	return function (text, parameters) {

		try {

			var template = $Localization.get(text);

			if(parameters){
				var exp = $interpolate(template);
	            template = exp({
	            	parameters: parameters
	            });
	        }

            return template;

		}catch(e){
			return text
		}
	};
});;angular.module('sdk.filters')	

.filter('Template', function ($log,$interpolate) {
	return function (template, parameters) {

            var exp = $interpolate(template);
            var content = exp({
            	data: parameters
            });
           
           return content;
	};
});;angular.module('sdk.services.configuration')

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
});;angular.module('sdk.services.configuration')

.service('$Localization', function (RESOURCES) {

	function get(name, defaultValue){
        var v = RESOURCES[name]; 
        if(typeof v == undefined){
            if(defaultValue){
                return defaultValue
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
    }

});
;angular.module('sdk.services')

.service('$Api', function ($http, ENVIRONMENT_CONFIGURATION, $log) {
    var _endpoint       =   ENVIRONMENT_CONFIGURATION.endpoint;

    function get_endpoint(){
        if(!_endpoint){
            throw Error("endpoint is not defined , you must define a variable endpoint for use $RestApi service");
        }

        return _endpoint;
    }

    function invoke(method, url, body) {

        var cfg = {
            url: get_endpoint() + url,
            method: method/*,
            headers: {
                'Authorization': 'Basic YmVlcDpib29w'
            }*/
        };
        
        cfg[(method == "GET" ? "params": "data")] = body;

        $log.debug("["+method+" " + url + "] parameters: " , body);


        var http = $http(cfg)
        .success(function (data, status, headers, config) {
            //IF DEBUGGING??
            //console.log(arguments)
        })

        .error(function (data, status, headers, config) {
            //IF DEBUGGING??
            //console.log(arguments)
        });

        return http;
    }

    return {
        get_endpoint: get_endpoint,
        invoke: invoke
    }

});;angular.module('sdk.services')

.factory('$LocalStorage', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = angular.toJson(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || null);
        },
        remove: function(key){
            $window.localStorage.removeItem(key);
        },
        clear: function () {
            $window.localStorage.clear();
        },
        exists: function (name){
             return $window.localStorage[key] != null;
        }
    }
});;angular.module('sdk.services')

// DB wrapper
.factory('$WebSQL', function($q, DB_CONFIG, $log) {
    var self = this;
    self.db = null;
    
    var createSchema = function() {
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            $log.debug('Table ' + table.name + ' initialized');
        });
    }

    var clearSchema = function(){
        angular.forEach(DB_CONFIG.tables, function(table) {
 
            var query = 'DROP TABLE ' + table.name;
            self.query(query);
            $log.debug('Table ' + table.name + ' dropped');
        });
    }

    self.clearSchema  = function(){
        clearSchema();
        createSchema()
    }

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 40 * 1024 * 1023);
        
        if (window.sqlitePlugin){
            self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
        }else if (window.openDatabase){
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 40 * 1024 * 1023);
        }

        createSchema();
    };
    
    self.insertAll = function(tableName, data) {
        var columns = [],
            bindings = [];
        var deferred = $q.defer();
        var table = _.first(_.where(DB_CONFIG.tables, {name: tableName}));

        for (var columnName in table.columns) {
            columns.push(table.columns[columnName].name);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';


        for (var i = 0; i < data.length; i++) {
            var values = [];
            for (var j = 0; j < columns.length; j++) {
                values.push(data[i][columns[j]]);
            }

            self.query(sql, values).success(function(){})
        }
    };

    self.insert = function(tableName, data) {
        var columns = [],
            bindings = [];

        var deferred = $q.defer();
        var table = _.first(_.where(DB_CONFIG.tables, {name: tableName}));

        for (var columnName in table.columns) {
            columns.push(table.columns[columnName].name);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';

        var values = [];
        for (var j = 0; j < columns.length; j++) {
            values.push(data[columns[j]]);
        }

        self.db.transaction(function(transaction) {
            transaction.executeSql(sql, values, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };

     self.bulkQuery = function(query, values) {
        
        var deferred = $q.defer();
        var count = 1;
        
        self.db.transaction(function(transaction) {

            angular.forEach(values, function(bindings){
                var _values = [];

                for(var pair in bindings){
                    _values.push(bindings[pair]);

                };

                
                transaction.executeSql(query, _values, 
                    function(){

                        if(count == values.length){
                            deferred.resolve();
                        }

                        count++;
                    }, 
                    function(error){
                        deferred.reject(error);
                    }
                );
            });

        });
 
        return deferred.promise;
    };

 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
})