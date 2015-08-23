module.exports = function(grunt) {

  grunt.initConfig({

    concat: {

      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/jQuery/dist/jquery.js', 'dev/js/pyramid.js'],
        dest: 'dev/all.js',
      },
    },

    uglify: {

      main: {
        files: {
          'dist/all.min.js': ['dev/all.js']
        }
      }
    },


    
    watch: {

    	main: {
    		files: ['dev/*.html', 'dev/**/*.scss', 'dev/js/*.js'],
    		tasks: ['concat', 'uglify', 'sass', 'postcss', 'copy', 'clean:css'],
    		options: {
      			livereload: true,
    		},
    	}
    },

    copy: {
    	main: {
    		files: [{
    			cwd: 'dev/',
    			expand: true,
    			src: ['*.html', '*.css', '**/*.png'],
    			dest: 'dist/',
    			filter: 'isFile'
    		}]
    	}
    },

    sass: {
    	dist: {
      		files: {
       			'dev/pyramid.css': 'dev/sass/pyramid.scss'
      		}
    	}
  	},

  	clean: {
  		dist: ["dist"],
      css: ["dev/*.css", 'dev/*.css.map']
  	},

    postcss: {
      options: {

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dev/pyramid.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.registerTask('default', ['clean:dist', 'concat', 'uglify', 'sass', 'postcss', 'copy', 'clean:css', 'watch']);

};