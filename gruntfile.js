module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),

    /*============================================================
     Sass
     ============================================================*/
    sass: {
      compile: {
        options: {
            style: 'compressed',
            sourcemap: 'none',
            noCache: true
        },
        files: {
          'src/assets/css/main.css': 'src/assets/scss/main.scss',
        }
      }
    },

    /*============================================================
     Scss lint
     ============================================================*/
    scsslint: {
     // allFiles: ['src/wp-content/themes/krow/assets/scss/**/*.scss'],

      options: {
        exclude: ['node_modules/bootstrap-sass/assets/stylesheets/**/*.scss']
      }
    },

    /*============================================================
     Code Duplication
     ============================================================*/
    jscpd: {
      sass: {
		path: ['src/assets/scss/**/*'
		],
      },
      js: {
        path: 'src/assets/js/custom/**/*.js',
        exclude: ['src/assets/js/libs/**/*.js']
      }
    },

    /*============================================================
     JS hint
     ============================================================*/
    jshint: {
      options: {
            ignores: ['src/assets/js/libs/**/*.js'
			]
      }
    },

    /*============================================================
     Code Complexity
     ============================================================*/
    complexity: {
      generic: {
        src: ['src/assets/js/custom/**/*.js',
		],
        options: {
          breakOnErrors: true,
          errorsOnly: false, // show only maintainability errors
          cyclomatic: [6], // or optionally a single value, like 3
          halstead: [20], // or optionally a single value, like
          maintainability: 100,
          hideComplexFunctions: false, // only display maintainability
          broadcast: true // broadcast data over event-bus
        }
      }
    },

    /*============================================================
     JS concatenation
     ============================================================*/
    concat: {
      modules: {
        src: ['src/assets/js/custom/**/*.js'],
        dest: 'src/assets/js/script.js'
      },
    },

    /*============================================================
     Uglify
     ============================================================*/
    uglify: {
      dest: {
        files: {
          'src/assets/js/script.min.js': ['src/assets/js/script.js'],
        }
      }
    },

    /*============================================================
     Watch
     ============================================================*/
    watch: {
      js: {
        files: ['src/assets/js/custom/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      sass: {
		files: ['src/assets/scss/**/*.scss'
        ],
        tasks: ['sass', 'scsslint'],
        options: {
          livereload: true
        }
      }
    },

    /*============================================================
     Githooks
     ============================================================*/
    githooks: {
      all: {
        'pre-commit': 'jshint scsslint'
      }
    }

  });

  // Loads the required plugins.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscpd');
  grunt.loadNpmTasks('grunt-complexity');

  // Default tasks.
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

  // Executes test tasks.
  grunt.registerTask('test', ['scsslint', 'jshint', 'jscpd', 'complexity']);
  grunt.registerTask('testjs', ['jshint', 'jscpd:js', 'complexity']);
  grunt.registerTask('testsass', ['scsslint', 'jscpd:sass']);

};
