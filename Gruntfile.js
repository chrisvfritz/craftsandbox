/*!
 * MSUBootstrap Gruntfile
 * Copyright 2014 Michigan State University.
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Folders
  var bootstrapDir = './src/vendor/bootstrap/'

  var configBridge = grunt.file.readJSON(bootstrapDir + 'grunt/configBridge.json', { encoding: 'utf8' });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    bootstrap: grunt.file.readJSON(bootstrapDir + 'package.json'),

    // Task configuration.
    clean: {
      dist: 'public/assets'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'app.css.map',
          sourceMapFilename: 'public/assets/css/app.css.map'
        },
        src: 'src/css/app.less',
        dest: 'public/assets/css/app.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'public/assets/css/app.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'src/vendor/bootstrap/less/.csslintrc'
      },
      dist: [
        'public/assets/css/bootstrap.css'
      ]
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: 'public/assets/css/app.css',
        dest: 'public/assets/css/app.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'src/vendor/bootstrap/less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'public/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/assets/css/'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'src/vendor/bootstrap/dist/fonts/*',
        dest: 'public/assets/fonts',
        flatten: true
      },
      js: {
        expand: true,
        src: 'src/vendor/bootstrap/dist/js/*',
        dest: 'public/assets/js',
        flatten: true
      },
      img: {
        expand: true,
        src: 'src/img/*',
        dest: 'dist',
      },
      html: {}
    },

    watch: {
      source: {
        files: ['*.html','*.less'],
        tasks: ['less', 'copy']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: '.',
          port: 1855,
          open: true
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('build-css', ['less-compile', 'usebanner', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('build', ['clean:dist', 'build-css', 'copy:fonts', 'copy:js', 'copy:img', 'copy:html']);

  // run local dev server
  grunt.registerTask('serve', ['build','connect:server','watch']);

  // Default task.
  grunt.registerTask('default', ['build']);
};
