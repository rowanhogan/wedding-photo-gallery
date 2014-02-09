module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist'
        }
      }
    },
    watch: {
      css: {
        files: ['source/**/*'],
        tasks: ['compass', 'coffee'],
        options: {
          livereload: {
            port: 32145
          },
          force: true
        }
      }
    },
    concat: {
      dist: {
        src: ['source/vendor/scripts/**/*.js'],
        dest: 'dist/vendor.js'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'source/styles/',
          cssDir: 'dist/',
          environment: 'production'
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'dist/scripts.js': ['source/scripts/vendor/*', 'source/scripts/*.coffee']
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    webfont: {
      icons: {
        src: 'source/icons/svg/*',
        dest: 'dist/icons',
        destCss: 'source/styles/icons',
        options: {
          font: 'icons',
          stylesheet: 'scss',
          syntax: 'bootstrap',
          relativeFontPath: 'icons'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-webfont');

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  grunt.registerTask('default', ['connect', 'concat', 'coffee', 'compass', 'watch']);
  grunt.registerTask('build', ['compass', 'concat', 'coffee', 'webfont', 'gh-pages']);
}
