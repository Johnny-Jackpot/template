// Gruntfile with the configuration of grunt-express and grunt-open.
module.exports = function (grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configure Grunt 
    grunt.initConfig({

        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    // Replace with the directory you want the files served from
                    // Make sure you don't use `.` or `..` in the path as Express
                    // is likely to return 403 Forbidden responses if you do
                    // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                    bases: [__dirname],
                    livereload: true
                }
            }
        },

        // grunt-watch will monitor the projects files
        watch: {
            all: {
                // Replace with whatever file you want to trigger the update from
                // Either as a String for a single entry 
                // or an Array of String for multiple entries
                // You can use globing patterns like `css/**/*.css`
                // See https://github.com/gruntjs/grunt-contrib-watch#files
                files: ['index.html'],
                options: {
                    livereload: true
                }
            },

            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'uglify']
            },

            css: {
                files: ['src/css/*.css'],
                tasks: ['cmq']
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css',
                    watch: true,
                    outputStyle: 'expanded'
                }
            }
        },
        //combine media queries
        cmq: {
            options: {
                log: true
            },
            my_target: {
                  files: {
                    'css': ['src/css/*.css']
                  }
            }
        },

        concurrent: {
            target: {
                tasks: ['compass', 'server'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jshint: {
            options: {
                force: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            files: {
                src: ['src/js/*.js']
            }
        },

        uglify: {
            main: {
                files: {
                    'js/app.min.js': ['src/js/main.js']
                }
            }
        }              

    });

    
    // Creates the `server` task
    grunt.registerTask('server', [
        'express',
        'open',
        'watch'
    ]);

    grunt.registerTask('default', ['jshint', 'uglify', 'cmq', 'concurrent']);
};