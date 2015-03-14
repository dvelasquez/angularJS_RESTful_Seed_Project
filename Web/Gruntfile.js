module.exports = function(grunt) {
    var path = require('path');
    var config = {

        //Global Configuration
        data: {
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
            rebuild_dependencies: grunt.option('rebuild-dependencies')
        }
    };

    require('load-grunt-config')(grunt, config);
};
