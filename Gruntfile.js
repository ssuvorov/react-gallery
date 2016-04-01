'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            main: {
                src: ['src/**/*.rt.js']
            }
        },
        eslint: {
            all: {
                src: [
                    'src/**/*.js',
                    '!src/**/*.rt.js'
                ]
            }
        },
        watch: {
            sass: {
                files: [
                    'src/scss/*.scss'
                ],
                tasks: ['styles'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'src/css/main.css': 'src/scss/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['styles']);

    grunt.registerTask('all', ['default', 'test']);
};
