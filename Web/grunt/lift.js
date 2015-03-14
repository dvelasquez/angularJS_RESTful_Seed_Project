//------------------------------------------------------
// Company: Valentys Ltda.
// Author: dmunozgaete@gmail.com
// 
// Description: Lift Web Server , and run some tasks
//------------------------------------------------------
module.exports = function(grunt, options) {
	
	var on_after_lift_tasks = [
		'concat',
		'uglify',
		'connect:server',
		'watch',
	];

	grunt.registerTask('lift', function(){
        
        //Clear Console
		var util = require('util');
		util.print("\u001b[2J\u001b[0;0H");

		grunt.log.ok("-------------------------------------------------------------------------");
		grunt.log.ok("Valentys Ltda.");
		grunt.log.ok("AngularJS Seed Template");
		grunt.log.ok("Contact: dmunozgaete@gmail.com");
		grunt.log.ok(" ");

		//SERVER INFO
		grunt.log.warn("Web server: " + 
			options.server.protocol + "://" + 
			options.server.hostname + ":" + 
			options.server.port
		);

		//LIVE RELOAD
		if(options.livereload){
			grunt.log.warn("Livereload: enabled, (to disable set arg --no-livereload when run grunt)");
		}else{
			grunt.log.warn("Livereload: disabled");
		}

		//SERVER PATH INFO
		grunt.log.warn("Base path: '" + 
			options.server.path + "'"
		);
		grunt.log.ok(" ");

		//REBUILD DEPENDENCIES
		if(!options.rebuild_dependencies){
			grunt.log.warn("(dependencies was ignored, (to rebuild set arg --rebuild-dependencies when run grunt)");
		}else{
			grunt.log.warn("(rebuild dependencies...(slow lifting)");
		}
		grunt.log.ok(" ");
				
		grunt.log.ok("Lifting...settings thing's up");
		grunt.log.ok("-------------------------------------------------------------------------");
        

        //Other TASKS
        for(var task in on_after_lift_tasks){
        	grunt.task.run(on_after_lift_tasks[task]);
        }
    });

}