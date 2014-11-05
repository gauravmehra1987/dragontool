'use strict';

var LIVERELOAD_PORT = 35729,
	SERVER_PORT = 9000,
	TEST_PORT = 9001,
	lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
	mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

//******************************************************
//*
//* 	Globbing
//* 	for performance reasons we're only matching one level down:
//* 	'test/spec/{,*/}*.js'
//* 	use this if you want to match all subfolders:
//* 	'test/spec/**/*.js'
//* 	templateFramework: 'lodash'
//*******************************************************/

module.exports = function (grunt) {
	
	require('time-grunt')(grunt); // show elapsed time at the end
	require('load-grunt-tasks')(grunt); // load all grunt tasks

	/******************************************************
	*
	*	Configuration paths
	*******************************************************/
	var YEOMAN = {
		src: 'src',
		dist: 'dist',
		test: 'test',
		tmp: '.tmp'
	};

	grunt.initConfig({

		yeoman: YEOMAN,

		/******************************************************
		*
		*	run tasks whenever watched files change
		*	https://github.com/gruntjs/grunt-contrib-watch
		*/
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},

			livereload: {
				options: {
					livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
				},
				files: [
					'{<%= yeoman.tmp %>,<%= yeoman.src %>}/{,*/}*.html',
					'<%= yeoman.tmp %>/styles/{,*/}*.css',
					'{<%= yeoman.tmp %>,<%= yeoman.src %>}/scripts/{,*/}*.js',
					'<%= yeoman.src %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.src %>/scripts/templates/*.{ejs,mustache,hbs}',
					'test/spec/**/*.js'
				]
			},

			compass: {
				files: ['<%= yeoman.src %>/sass/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},

			scripts: {
				files: ['<%= yeoman.src %>/scripts/{,*/}*.js']
			},

			jade: {
				files: ['<%= yeoman.src %>/{,*/}*.jade', '<%= yeoman.src %>/jade/{,*/}*.jade'],
				tasks: ['jade:server']
			},

			// jst: {
			// 	files: [
			// 		'<%= yeoman.src %>/scripts/templates/*.ejs'
			// 	],
			// 	tasks: ['jst']
			// },

			//DEVNOTE: suspect it is this watch directive that is executing the grunt:test task
			//test: {
			//	files: ['<%= yeoman.src %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
			//	tasks: ['test:true']
			//}
		},

		/******************************************************
		*
		*	local node webserver
		*	https://github.com/gruntjs/grunt-contrib-connect
		*/
		connect: {
			options: {
				port: grunt.option('port') || SERVER_PORT,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
				//hostname: '0.0.0.0'
			},

			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, YEOMAN.tmp),
							mountFolder(connect, YEOMAN.src)
						];
					}
				}
			},

			test: {
				options: {
					port: TEST_PORT,
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, YEOMAN.tmp),
							mountFolder(connect, YEOMAN.test),
							mountFolder(connect, YEOMAN.src)
						];
					}
				}
			},

			build: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, YEOMAN.dist)
						];
					}
				}
			}
		},

		/******************************************************
		*
		*	
		*	
		*/
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			},

			test: {
				path: 'http://localhost:<%= connect.test.options.port %>'
			}
		},

		/******************************************************
		*
		*	deletion task
		*	https://github.com/gruntjs/grunt-contrib-clean
		*/
		clean: {
			server: [
				'<%= yeoman.tmp %>'
			],

			build: {
				files: [{
					dot: true,
					src: [
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			}
		},

		/******************************************************
		*
		*	copy task
		*	https://github.com/gruntjs/grunt-contrib-copy
		*/
		copy: {
			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.src %>',
					src: [
						'*.{ico,png,txt}',
						'img/{,*/}*.{webp,gif}',
						'fonts/{,*/}*.{ttf,eot,svg,woff}',
						'img/{,*/}*.{jpg,jpeg,png,webp,gif}',
						'content/{,*/}*.*',
						'!{,*/}_*.{jpg,jpeg,png,webp,gif}',
						'css/{,**/}*.css',
						'php/{,**/}*'
					],
					//dest: '<%= yeoman.dist %>'
					dest: '<%= yeoman.tmp %>' //ADDED
				}, {
					src: 'node_modules/apache-server-configs/dist/.htaccess',
					dest: '<%= yeoman.dist %>/.htaccess'
				}]
			},

			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.src %>',
					src: [
						'.htaccess',
						'*.{ico,png,txt}',
						'img/{,*/}*.{webp,gif}',
						'fonts/{,*/}*.{ttf,eot,svg,woff}',
						'img/{,*/}*.{jpg,jpeg,png,webp,gif}',
						'content/{,*/}*.*',
						'!{,*/}_*.{jpg,jpeg,png,webp,gif}',
						'css/{,**/}*.css',
						'php/{,**/}*'
					],
					dest: '<%= yeoman.dist %>'
				}, {
					src: 'node_modules/apache-server-configs/dist/.htaccess',
					dest: '<%= yeoman.dist %>/.htaccess'
				}]
			}
		},

		//ADDED
		/******************************************************
		*
		*	jade --> html compiler
		*	https://github.com/gruntjs/grunt-contrib-jade
		*/
		jade: {
			options: {
				pretty: true
			},

			server:{
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>',
					ext: '.html',
					src: ['{,**/}*.jade', '!{_*/,**/_*/}*.jade', '!{,**/}[0-9]*.jade'],
					dest: '<%= yeoman.tmp %>',
					rename: function(dist, filepath){
						return dist + "/" + filepath.replace(/^jade\//, "html/");
					}
				}]
			},

			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>',
					ext: '.html',
					src: ['{,**/}*.jade', '!{_*/,**/_*/}*.jade'],
					dest: '<%= yeoman.dist %>',
					rename: function(dist, filepath){
						return dist + "/" + filepath.replace(/^jade\//, "html/");
					}
				}]
			}
		},

		//ADDED
		/******************************************************
		*
		*	SASS/compass --> css compiler
		*	https://github.com/gruntjs/grunt-contrib-compass
		*/
		compass: {
			options: {
				sassDir: '<%= yeoman.src %>/sass',
				imagesDir: '<%= yeoman.src %>/img',
				fontsDir: '<%= yeoman.src %>/fonts',
				javascriptsDir: '<%= yeoman.src %>/scripts',
				importPath: '<%= yeoman.src %>/bower_components',
				linecomments: false,
				relativeAssets: false,
				assetCacheBuster: false,
				require: [
					'breakpoint' // dependancy through ruby
				],
				debugInfo: false
			},

			server: {
				options: {
					cssDir: '<%= yeoman.tmp %>/styles',
					outputStyle: 'expanded',
					environment: 'development',
					debugInfo: true
				}
			},

			build: {
				options: {
					cssDir: '<%= yeoman.dist %>/styles',
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},

		//ADDED
		/******************************************************
		*
		*	css parser add vendor prefixes
		*	https://github.com/nDmitry/grunt-autoprefixer
		*/
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},

			server: {
				options:{
					cascade: true
				},

				files: [{
					expand: true,
					cwd: '<%= yeoman.tmp %>/styles',
					src: '{,*/}*.css',
					dest: '<%= yeoman.tmp %>/styles'
				}]
			},

			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/styles',
					src: '{,*/}*.css',
					dest: '<%= yeoman.dist %>/styles'
				}]
			}
		},

		/******************************************************
		*
		*	
		*	
		*/
		bower: {
			all: {
				rjsConfig: '<%= yeoman.src %>/scripts/main.js'
			}
		},

		/******************************************************
		*
		*	
		*	
		*/
		jst: {
			options: {
				amd: true
			},
			compile: {
				files: {
					'.tmp/scripts/templates.js': ['<%= yeoman.src %>/scripts/templates/*.ejs']
				}
			}
		},

		/******************************************************
		*
		*	requirejs compiler/optimisation
		*	https://github.com/gruntjs/grunt-contrib-requirejs
		*/
		requirejs: {
			build: {
				options: {
					baseUrl: '<%= yeoman.src %>/scripts',
					optimize: 'none',
					paths: {
						'templates': '../../.tmp/scripts/templates',
						'jquery': '../../<%= yeoman.src %>/bower_components/jquery/dist/jquery',
						'underscore': '../../<%= yeoman.src %>/bower_components/lodash/dist/lodash',
						'backbone': '../../<%= yeoman.src %>/bower_components/backbone/backbone'
					},
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true
					//uglify2: {} // https://github.com/mishoo/UglifyJS2
				}
			}
		},

		// requirejs: {
		// 	options: {
		// 		baseUrl: '<%= yeoman.src %>/scripts',
		// 		mainConfigFile: '<%= yeoman.src %>/scripts/main.js'
		// 	},

		// 	server: {
		// 		options: {
		// 			name: '../bower_components/requirejs/require',
		// 			include: 'main',

		// 			out: '<%= yeoman.tmp %>/scripts/main.js',
		// 			optimize: 'none', //will uglify by default - may want to let usemin do
		// 			preserveLicenseComments: false
		// 		}
		// 	},

		// 	build: {
		// 		options: {
		// 			//bundle with almond
		// 			name: '../bower_components/almond/almond',
		// 			include: 'main',

		// 			//bundle with require
		// 			/*name: '../bower_components/requirejs/require',
		// 			include: 'main',*/

		// 			//bundle with require - alternative
		// 			/*paths:{
		// 				requireLib: '../bower_components/requirejs/require'
		// 			},
		// 			include: 'requireLib'*/

		// 			out: '<%= yeoman.dist %>/scripts/main.min.js',
		// 			preserveLicenseComments: true,
		// 			useStrict: true,
		// 			wrap: true
		// 		}
		// 	}
		// },

		//ADDED
		/******************************************************
		*
		*	html build preprocessor - modification based on environment
		*	https://github.com/Modernizr/grunt-modernizr
		*/
		processhtml: {
			options: {
				commentMarker: 'process'
			},

			server: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.tmp %>',
					ext: '.html',
					src: ['{,**/}*.html', '!{_*/,**/_*/}*.html'],
					dest: '<%= yeoman.tmp %>'
				}]
			},

			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					ext: '.html',
					src: ['{,**/}*.html', '!{_*/,**/_*/}*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		/******************************************************
		*
		*	static asset revision logging(for cache busting)
		*	https://github.com/cbas/grunt-rev
		*/
		rev: {
			build: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
						'/styles/fonts/{,*/}*.*',
					]
				}
			}
		},

		/******************************************************
		*
		*	concat --> minification, concat --> uglify/obfuscation
		*	https://github.com/yeoman/grunt-usemin
		*/
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},

			html: '<%= yeoman.src %>/index.html'
		},

		// useminPrepare: {
		// 	options: {
		// 		root: '<%= yeoman.dist %>',
		// 		staging: '<%= yeoman.tmp %>',
		// 		dest: '<%= yeoman.dist %>'
		// 	},

		// 	server: {
		// 		options:{
		// 			root: '<%= yeoman.tmp %>'
		// 		},
		// 		src: ['<%= yeoman.tmp %>/index.html']
		// 	},

		// 	build: {
		// 		options:{
		// 			root: '<%= yeoman.src %>',
		// 			staging: '<%= yeoman.tmp %>',
		// 			dest: '<%= yeoman.dist %>'
		// 		},
		// 		src: ['<%= yeoman.dist %>/index.html']
		// 	}
		// },

		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
		},

		/******************************************************
		*
		*	image optimization
		*	https://github.com/gruntjs/grunt-contrib-imagemin
		*/
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>/img',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/img'
				}]
			}
		},

		/******************************************************
		*
		*	svg optimization
		*	https://github.com/sindresorhus/grunt-svgmin
		*/
		svgmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>/img',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/img'
				}]
			}
		},

		/******************************************************
		*
		*	
		*	
		*/
		cssmin: {
			build: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.src %>/styles/{,*/}*.css'
					]
				}
			}
		},

		/******************************************************
		*
		*	html optimization
		*	https://github.com/gruntjs/grunt-contrib-htmlmin
		*/
		htmlmin: {
			build: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},

				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]

				// files: [{
				// 	expand: true,
				// 	cwd: '<%= yeoman.dist %>',
				// 	src: '{,*/}*.html',
				// 	dest: '<%= yeoman.dist %>'
				// }]
			}
		},

		/******************************************************
		*
		*	js linting/validation
		*	https://github.com/gruntjs/grunt-contrib-jshint
		*/
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				//ignores: ['<%= yeoman.src %>/scripts/{,*/}_*.js'], //ADDED
				reporter: require('jshint-stylish')
			},

			all: [
				'Gruntfile.js',
				'<%= yeoman.src %>/scripts/{,*/}*.js',
				'!<%= yeoman.src %>/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},

		/******************************************************
		*
		*	automated testing
		*	https://github.com/kmiyashiro/grunt-mocha
		*/
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
				}
			}
		},

		//ADDED
		/******************************************************
		*
		*	generate xml sitemap for seo
		*	https://github.com/RayViljoen/grunt-sitemap
		*/
		sitemap: {
			dist: {
				//siteRoot: 'dist/',
				//pattern: 'html/{,**/}*.html',
				siteRoot: 'dist/html/',
				homepage: 'http://'

			}
		},

		//ADDED
		/******************************************************
		*
		*	Concurrent/parallel task handler (build performance optimization)
		*	https://github.com/sindresorhus/grunt-concurrent
		*/
		concurrent: {
			server: [
				'copy:server',
				'jade:server',
				'compass:server'
				//'requirejs:server'
			],

			test: [
				'copy:server',
				'jade:server',
				'compass:server'
				//'requirejs:server'
			],

			build: [
				'copy:build',
				'jade:build',
				'compass:build',
				'requirejs:build'
				//'imagemin', //DEVNOTE: if used modify copy task re: imagery
				//'svgmin',
				//'htmlmin'
			]
		}
	});

	/******************************************************
	*
	*	GRUNT TASKRUNNERS
	*******************************************************/
	grunt.registerTask('trace', 'Log some stuff.', function(target) {
		grunt.log.write('Logging some stuff... ', grunt).ok();
	});

	// grunt.registerTask('createDefaultTemplate', function () {
	// 	grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
	// });

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve' + (target ? ':' + target : '')]);
	});

	grunt.registerTask('serve', function (target){

		/*if(target === 'build'){
			return grunt.task.run(['build', 'open:server', 'connect:build:keepalive']);
		}

		if(target === 'test'){
			return grunt.task.run([
				'clean:server',
				'concurrent:test', //ADDED
				'autoprefixer:server', //ADDED
				'concurrent:server',
				//'createDefaultTemplate',
				//'jst',
				'connect:test',
				'open:test',
				'watch'
			]);
		}*/

		grunt.task.run([
			'clean:server',
			'concurrent:server', //ADDED
			'autoprefixer:server', //ADDED
			//'createDefaultTemplate',
			//'jst',
			'connect:livereload',
			'open:server',
			'watch'
		]);
	});

	grunt.registerTask('test', function (isConnected) {

		//DEVNOTE: this switch/flah causes test task to execute when local server is active/running --> param is passed in via directive in watch task
		isConnected = Boolean(isConnected);
		var testTasks = [
			'clean:server',
			'concurrent:test', //ADDED
			'autoprefixer:server', //ADDED
			//'createDefaultTemplate',
			//'jst',
			'connect:test'//,
			//'mocha',
		];

		if(!isConnected){
			return grunt.task.run(testTasks);
		}else{
			// already connected so not going to connect again, remove the connect:test task
			testTasks.splice(testTasks.indexOf('connect:test'), 1);
			return grunt.task.run(testTasks);
		}
	});

	grunt.registerTask('build', [
		'clean',
		'concurrent:build', //ADDED
		'processhtml', //ADDED
		'autoprefixer', //ADDED
		//'createDefaultTemplate',
		//'jst',
		'useminPrepare',
		//'useminPrepare:build', //ADDED
		'requirejs',
		'imagemin',
		'htmlmin',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'rev',
		'usemin'
		//'sitemap' //ADDED
	]);

	grunt.registerTask('default', [
		//'jshint',
		//'test',
		'build'
	]);
};
