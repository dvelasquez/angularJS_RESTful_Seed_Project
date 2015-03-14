angular.module('sdk.services.configuration')

.constant('GLOBAL_CONFIGURATION', {
    environment: "development",
    author: "David Antonio Muñoz Gaete",
    version: "1.0.100",                     //{mayor_version}.{minor_version}.{build}
    language: 'es',

    //CLEAN STEP WHEN A NEW VERSION IS UPDATE!
    on_build_new_version: function(new_version, old_version){
    }
})