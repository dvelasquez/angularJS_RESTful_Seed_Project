//------------------------------------------------------
// Company: Valentys Ltda.
// Author: dmunozgaete@gmail.com
// 
// Description: Dynamic Files Injector
// 
// URL: https://www.npmjs.com/package/grunt-html-build
//------------------------------------------------------
module.exports = function(grunt, options) {

	var conf = {
        development: {
            files: {
                'app/index.html': [
                    'app/bundles/**/*.js',
                    'app/controllers/**/*.js',
                    'app/bundles/**/*.css',
                ]
            }
        },
        production: {
            files: {
                'app/index.html': [
                    'app/dist/**/*.min.js',
                    '!app/dist/**/dependencies*.js'
                ]
            }
        }
	};

    return {
        options: {
            ignorePath: 'app/'
        },
        files: conf[options.environment]
    };
};