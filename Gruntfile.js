module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngAnnotate: {
      build: {
        files: {
          'dist/<%= pkg.name %>.js': ['src/tpl/**/*.js','src/**/*.js']
        }
      }
    },
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js',
      }
    },
    watch: {
      build: {
        options: {
          livereload: 2342
        },
        files: ['src/directives/*.js','src/services/*.js', 'demo/*.html', 'demo/*.js', 'Gruntfile.js', 'src/tpl/*.html'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default', [
    'ngAnnotate',
    'uglify'
  ]);

  grunt.registerTask('default:watch', [
    'default',
    'watch'
  ]);
};