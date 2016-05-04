module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		html2js: {
			options: {
				base: 'client/src/templates'
			},
			main: {
				src: ['client/src/templates/**/*.html'],
				dest: 'build/tmp/templates.js'
			},
		},

		browserify: {
			dist: {
				files: {
					'build/tmp/client.js': ['client/src/**/*.js']
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['build/tmp/client.js', 'build/tmp/templates.js'],
				dest: 'build/dist.js'
			}
		},

		karma: {
			unit: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					browsers: ['PhantomJS'],
					files: [
						'build/dist.js',
						'node_modules/angular-mocks/angular-mocks.js',
						'client/test/**/*.js'
					]
				}
			}
		},

		watch: {
			scripts: {
				files: ['client/**/*'],
				tasks: ['default'],
				options: {
					spawn: false,
				},
			},
		}

	});

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['html2js', 'browserify', 'concat', 'karma']);

};