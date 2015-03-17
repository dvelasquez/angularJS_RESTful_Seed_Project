module.exports = function(grunt) {
    var path = require('path');
    var config = {

        //Global Configuration
        data: {
            environment: 'development',
            server: {
                hostname: 'localhost',
                port: 8000,
                protocol: 'http',
                path: 'app'
            },
            banner: {
                date_version: grunt.template.today("yyyy-mm-dd"),
                company: 'Valentys Ltda.',
                author: 'David Antonio Muñoz Gaete',
                email: 'dmunozgaete@gmail.com'
            },
            livereload: !grunt.option('no-livereload'),
            openBrowser: grunt.option('open-browser'),
            rebuild: grunt.option('rebuild'),
        }
    };

    require('load-grunt-config')(grunt, config);
};
