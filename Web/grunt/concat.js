//------------------------------------------------------
// Company: Valentys Ltda.
// Author: dmunozgaete@gmail.com
// 
// Description: Unify all into one 'big' file
// 
// URL: https://www.npmjs.com/package/grunt-contrib-concat
// 
/// NOTE: If you want to add dependdencies THIS IS THE FILE ;)!
//------------------------------------------------------
module.exports = function(grunt, options) {
	var conf = {
		options: {
			separator: ';',
		},

		dependencies: {
			src: [
				//ANGULAR MATERIAL
				'app/bower_components/angular/angular.js',
				'app/bower_components/angular-animate/angular-animate.js',
				'app/bower_components/angular-aria/angular-aria.js',
				'app/bower_components/angular-material/angular-material.js',

				//ANGULAR UI ROUTE
				'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',

				//LODASH
				'app/bower_components/lodash/dist/lodash.min.js',

				//GOOGLE MAPS
				'app/bower_components/angular-google-maps/dist/angular-google-maps.min.js'
			],
			dest: 'app/dist/dependencies.js'
		},

		controllers: {
			src: [
				'app/controllers/**/*.js'
			],
			dest: 'app/dist/controllers.js'
		},

		sdk: {
			src: [
				'app/bundles/sdk/**/*.js'
			],
			dest: 'app/dist/sdk.js'
		},

		app: {
			src: [
				'app/bundles/app/js/**/*.js'
			],
			dest: 'app/dist/app.js'
		}
	};

	//---------------------------------------------------------------
	//Only rebuild dependencies only if not exists dependencies file 
	//Or send the --rebuild-dependencies arg
	var rebuild_dependencies = false;
	var exists_dependencies  = grunt.file.exists(conf.dependencies.dest);
	if(!exists_dependencies || options.rebuild_dependencies){
		rebuild_dependencies = true;
	}
	if(!rebuild_dependencies){
		delete conf.dependencies;
	}

	options["rebuild_dependencies"] = rebuild_dependencies;
	
	//---------------------------------------------------------------

    return conf;

};