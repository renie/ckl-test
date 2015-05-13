module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				style: 'compressed',
				sourcemap: 'none'
			},
			dist: {
				files: {
					'styles/css/lp.css': 'styles/sass/lp.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['styles/sass/**/*.scss'],
				tasks: ['sass'],
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['sass']);
	grunt.registerTask('w', ['watch']);
};