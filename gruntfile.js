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
    },

    copy: {
    	main: {
    		files: [{
    			cwd: 'dev/',
    			expand: true,
    			src: ['*.html', '*.css'],
    			dest: 'dist/',
    			filter: 'isFile'
    		}]
    	}
    },

    watch: {

    	html: {
    		files: ['dev/*.html'],
    		tasks: ['copy'],
    		options: {
      			livereload: true
    		},
    	},

    	css: {
    		files: ['dev/**/*.scss'],
    		tasks:['sass', 'postcss', 'copy', 'clean:css'],
    		options: {
      			livereload: true
    		},
    	},

    	js: {
    		files: ['dev/js/*.js'],
    		tasks: ['concat', 'uglify','copy'],
    		options: {
      			livereload: true
    		},
    	}

    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.registerTask('default', ['clean:dist', 'concat', 'uglify', 'sass', 'postcss', 'copy', 'clean:css']);
  grunt.registerTask('dev', ['clean:dist', 'concat', 'uglify', 'sass', 'postcss', 'copy', 'clean:css', 'watch']);

};