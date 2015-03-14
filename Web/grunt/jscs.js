//------------------------------------------------------
// Company: Valentys Ltda.
// Author: dmunozgaete@gmail.com
// 
// Description: Validate Javascript's Conventions 
// (AirBnb Configuration)
// 
// URL: https://www.npmjs.com/package/grunt-jscs
//------------------------------------------------------
module.exports = function(grunt, options) {

	grunt.registerTask('validate', ['jscs']);	//ALIAS

	var options = {
		"preset": "google",
		"requireYodaConditions": null,
		"validateIndentation": null
	}

	return {
		controllers: {
			src: [
				'app/controllers/**/*.js'
			],
			options: options
		},

		custom: {
			src: [
				'app/bundles/custom/js/**/*.js'
			],
			options: options
		}
	}
  
};