angular.module('sdk.services')

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
        
        cfg[(method === "GET" ? "params": "data")] = body;

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
    };

});