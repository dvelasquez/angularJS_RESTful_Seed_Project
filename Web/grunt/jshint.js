module.exports = function(grunt, options) {

    grunt.registerTask('validate_code', ['jscs']);   //ALIAS

    return {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            //reporter: require('jshint-stylish')
        },

        controllers: {
            src: [
                'app/controllers/**/*.js'
            ]
        },

        custom: {
            src: [
                'app/bundles/**/*.js'
            ]
        }
    }

};