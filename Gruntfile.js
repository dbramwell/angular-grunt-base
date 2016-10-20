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
				dest: 'build/js/dist.js'
			}
		},

		karma: {
			unit: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					browsers: ['PhantomJS'],
					files: [
						'build/js/dist.js',
						'node_modules/angular-mocks/angular-mocks.js',
						'client/test/**/*.js'
					]
				}
			}
		},

		watch: {
			client: {
				files: ['client/**/*', 'Gruntfile.js', 'public/**/*'],
				tasks: ['default', 'karma'],
				options: {
					spawn: false,
				},
			},
			server: {
				files: ['server/**/*', 'Gruntfile.js'],
				tasks: ['mochaTest'],
				options: {
					spawn: false,
				},
			}
		},

		protractor: {
			all: {
				options: {
					configFile: "client/e2eTest/conf.js",
					args: {}
				}
			},

		},

		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'public/',
					src: ['**'],
					dest: 'build/'
				}, {
					expand: true,
					flatten: true,
					src: [
						'node_modules/bootstrap/dist/css/bootstrap.min.css',
						'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
					],
					dest: 'build/css/'
				}]
			},
			test: {
				files: [{
					expand: true,
					flatten: true,
					src: [
						'node_modules/angular-mocks/angular-mocks.js'
					],
					dest: 'build/'
				}]
			}
		},

		clean: ['build'],

		express: {
			options: {
				port: 9000,
			},
			test: {
				options: {
					script: 'server/src/app.js'
				}
			}
		},

		mochaTest: {
			test: {
				src: ['server/test/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['clean', 'html2js', 'browserify', 'concat', 'copy']);
	grunt.registerTask('e2e', ['default', 'copy:test', 'express:test', 'protractor']);
};