module.exports = function(grunt){

	//Configure tasks(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			buildMain: {
				src: 'babelified/js/main/*.js',
				dest: 'js/main.min.js'
			},
			buildLib: {
				src: 'babelified/js/lib/*.js',
				dest: 'js/lib.min.js'
			},
			devMain: {
				options: {
					beautify: true,
					mangle: false,
					compress: false,
					preserveComments: 'all'
				},
				src: 'babelified/js/main/*.js',
				dest: 'js/main.min.js'
			},
			devLib: {
				options: {
					beautify: true,
					mangle: false,
					compress: false,
					preserveComments: 'all'
				},
				src: 'babelified/js/lib/*.js',
				dest: 'js/lib.min.js'
			}
		},
		sass: {
			build: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'css/taylorswiftipsum.css': 'src/sass/taylorswiftipsum.scss'
				}
			},
			dev: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					'css/taylorswiftipsum.css': 'src/sass/taylorswiftipsum.scss'
				}
			}
		},
		watch: {
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify:devMain', 'uglify:devLib']
			},
			css: {
				files: ['src/sass/*.scss'],
				tasks: ['sass:dev']
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});

	//Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-karma');

	//Register task(s)
	grunt.registerTask('default', ['uglify:devMain', 'uglify:devLib', 'sass:dev']); //grunt
	grunt.registerTask('build', ['uglify:buildMain', 'uglify:buildLib', 'sass:build']); //grunt build
	grunt.registerTask('dev', ['uglify:devMain', 'uglify:devLib', 'sass:dev']); //grunt dev
	grunt.registerTask('ci', ['karma:unit']); //grunt ci

};

