module.exports = function(grunt){

	//Configure tasks(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'src/js/main/*.js',
				dest: 'js/script.min.js'
			}
		}
	});

	//Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Register task(s)
	grunt.registerTask('default', ['uglify:build']);

};