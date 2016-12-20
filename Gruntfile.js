module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		env : {
            e2e : {
 	            MONGODB_URI: 'mongodb://localhost:55555'
            }
        },

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
			}
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
		},

		shell: {
			makeMongoDir: {
				command: 'mkdir -p ./build/tmp/.data/db'
			},
            mongo: {
                command: 'mongod --dbpath ./build/tmp/.data/db --smallfiles --port 55555',
                options: {
                    async: true,
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
                }
            },
            buildDb: {
            	command: 'sleep 15; node server/data/build.js'
            }
        }
	});

    grunt.loadNpmTasks('grunt-env');
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
	grunt.loadNpmTasks('grunt-shell-spawn');

	grunt.registerTask('default', ['clean', 'html2js', 'browserify', 'concat', 'copy']);
	grunt.registerTask('createDb', ['env:e2e', 'shell:makeMongoDir', 'shell:mongo', 'shell:buildDb']);
	grunt.registerTask('e2e', ['default', 'copy:test', 'createDb', 'express:test', 'protractor']);
	grunt.registerTask('allTests', ['default', 'karma', 'mochaTest', 'copy:test', 'createDb', 'express:test', 'protractor']);
};