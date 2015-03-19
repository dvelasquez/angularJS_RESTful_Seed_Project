angular.module("sdk.services.configuration")

.constant("GLOBAL_CONFIGURATION", {

	application: {
		version: "1.0.100",
		author: "David Antonio Muñoz Gaete",
		environment: "development",
		language: "es",
		name: "Sistema de Monitoreo Digital de Servicios"
	},

    //CLEAN STEP WHEN A NEW VERSION IS UPDATE!
    on_build_new_version: function(new_version, old_version){
    }
    
});