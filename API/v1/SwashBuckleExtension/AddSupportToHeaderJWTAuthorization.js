$(function () {

    //Find the Security Definitions and add the according header's
    $('#input_apiKey').off("change");   //Clear previous event's
    $('#input_apiKey').change(function () {

        for (var name in window.swaggerApi.securityDefinitions) {
            var definition = window.swaggerApi.securityDefinitions[name];
            var key = $('#input_apiKey')[0].value;

            if (key && key.trim() != "") {
                window.authorizations.add(name, new ApiKeyAuthorization(definition.name, "Bearer " + key, definition.in));
            }
        }

    });

});