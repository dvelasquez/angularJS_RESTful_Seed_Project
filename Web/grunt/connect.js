//------------------------------------------------------
// Company: Valentys Ltda.
// Author: dmunozgaete@gmail.com
// 
// Description: Initialize a web Server
// 
// URL: https://www.npmjs.com/package/grunt-contrib-connect
//------------------------------------------------------
module.exports = function(grunt, options) {

    return {
		server: {
	        options: {
	            livereload:true,
	            base: options.server.path,
	            port: options.server.port,
	            hostname: options.server.hostname,
	            protocol: options.server.protocol
	        }
	    }
    }

};