module.exports = function(grunt){

	//Configure tasks(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			buildMain: {
				src: 'src/js/main/*.js',
				dest: 'js/main.min.js'
			},
			buildLib: {
				src: 'src/js/lib/*.js',
				dest: 'js/lib.min.js'
			}
		}
	});

	//Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Register task(s)
	grunt.registerTask('default', ['uglify:buildMain', 'uglify:buildLib']);

};