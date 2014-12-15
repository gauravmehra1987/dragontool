/*! (c) 2014 John Przeslakowski | Code released under the MIT license | goodpixels.co.uk */

module.exports = function( grunt ) {

	var projectName		= 'Mini Combobulator';
	var paths			= {

		fontello:	'assets/fonts/',
		bower:		'bower_components/',

	};

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		// Compile LESS
		
		less: {

			dev: {

				options: {

					paths:				[ 'assets/less' ],
					sourceMap:			true,
					sourceMapFilename: 	'assets/css/style.css.map',
					sourceMapURL:		'style.css.map',
					sourceMapRootpath:	'../../'

				
				},

				files: {

					'assets/css/style.css':	[ 'assets/less/style.less' ],				
					'assets/css/ie.css':	[ 'assets/less/ie.less' ],

				}

			
			},

			dist: {

				options: {

					cleancss: true,
					paths: [ 'assets/less' ],
				
				},

				files: {

					'assets/css/style.css':	[ 'assets/less/style.less' ],
					'assets/css/ie.css':	[ 'assets/less/ie.less' ],

				}

			}

		},

		// Merge JS files
		
		concat: {

			lib: {

				dest: 'assets/js/lib.js',

				src: [

					// List bower components
					
					paths.bower + 'jquery/dist/jquery.js',
					paths.bower + 'jquery.browser/dist/jquery.browser.js',
					paths.bower + 'fancybox/source/jquery.fancybox.js',
					paths.bower + 'slick.js/slick/slick.js',

				],
			
			},

			js: {

				dest: 'assets/js/app.js',

				src: [

					// List scripts
					
					'assets/js/src/config.js',
					'assets/js/src/plugins.js',
					'assets/js/src/social.js',
					'assets/js/src/logic.js',
					'assets/js/src/ui.js',

				],
			
			},

			ie: {

				dest: 'assets/js/ie.js',

				src: [

					// First IE-specific libraries

					paths.bower + 'html5shiv/dist/html5shiv.js',
					paths.bower + 'jquery-migrate/jquery-migrate.js',

					// Then the script

					'assets/js/src/ie.js'

				],

			}

		},

		// Compress JS
		
		uglify: {

			dist: {

				options: { preserveComments: false },

				files: {

					'assets/js/app.js':	[ 'assets/js/app.js' ],
					'assets/js/lib.js':	[ 'assets/js/lib.js' ],
					'assets/js/ie.js':	[ 'assets/js/ie.js' ],

				}

			}

		},

		// Squash images
		
		imagemin: {

			dynamic: {

				options: { optimizationLevel: 3 },

				files: [ {

					expand:	true,
					cwd:	'assets/img',
					src:	[ '**/*.{png,jpg,gif,PNG,JPG,GIF,jpeg,JPEG}' ],
					dest:	'assets/img/optimized',

				} ]
			}

		},

		// Copy images
		
		copy: {

			fancybox: {

				files: [ {

					expand:	true,
					cwd:	paths.bower + 'fancybox/source',
					src:	[ '**/*.{png,jpg,gif,PNG,JPG,GIF,jpeg,JPEG}' ],
					dest:	'assets/img/fancybox'

				} ]

			},

			slick: {

				files: [ {

					expand:	true,
					cwd:	paths.bower + 'slick.js/slick',
					src:	[ '**/*.{gif,eot,svg,ttf,woff,GIF,EOT,SVG,TTF,WOFF}' ],
					dest:	'assets/img/slick.js'

				} ]

			},

			images: {

				files: [ {

					expand:	true,
					cwd:	'assets/img/optimized',
					src:	[ '**' ],
					dest:	'assets/img'

				} ]
			}

		},

		// Build fonts
		
		fontello: {

			dist: {

				options: {

					config:	paths.fontello + '/config.json',

					fonts:	paths.fontello + '/icons',

					styles:	paths.fontello + '/css',

					force:	true

				}

			}

		},

		// Watch file changes
		
		watch: {

			options: { livereload: true },

			html: {			

				files: [

					'**/*.html',
					'**/*.php'

				]
			
			},

			icons: {

				files: [ paths.fontello + '/config.json' ],

				tasks: [ 'icons' ]
			
			},

			styles: {

				files: [ 'assets/less/**/*.less' ],
				tasks: [ 'dev' ]
			
			},

			scripts: {

				files: [ 'assets/js/src/*.js' ],
				tasks: [ 'dev' ]

			}

		},

		// Clean repo
		
		clean: {

			images: [

				'assets/img/**',
				'!assets/img',
				'!assets/img/*.{png,PNG,jpg,JPG,gif,GIF,jpeg,JPEG,svg,SVG}',

			],

			fonts: [
				
				paths.fontello + '/icons',
				paths.fontello + '/css',
				'!' + paths.fontello,
				'!' + paths.fontello + '/config.json'

			],

			optimized: [ 'assets/img/optimized' ],

			js: [
				
				'assets/js/app.js',
				'assets/js/lib.js',
				'assets/js/ie.js',

			],

			css: [ 'assets/css' ],

			other: [ '**/.DS_Store' ]

		},

		// Notifications
		
		notify: {
			
			dev: {
			
				options: {
				
					title: projectName,					
					message: 'JavaScript and LESS have been recompiled.',
				
				}

			}
		
		}

	} );

// Load modules
	
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-fontello' );
	grunt.loadNpmTasks( 'grunt-newer' );
	grunt.loadNpmTasks( 'grunt-notify' );

	// Default task 
	
	grunt.registerTask( 'default',	[

		'clean',
		'icons',
		'images',
		'dev',
		'watch'

	] );

	// Custom tasks
	
	grunt.registerTask( 'fontello-less', 'This task converts fontello CSS to LESS mixins.', function() {

		var file = paths.fontello + '/css/fontello.css';

		if( grunt.file.exists( file ) ) {

			var css			= grunt.file.read( file );
			var startIndex	= css.indexOf( '.icon' );
			var endIndex	= css.lastIndexOf( '*/' );
			var trimFile	= css.substring( startIndex, endIndex + 2 );
			var less		= trimFile.split( ':before' ).join( '()' );

			if( grunt.file.write( 'assets/less/icon-codes.less', less ) ) {

				grunt.log.ok( file + ' processed successfully.' );

			}

			else {

				grunt.fail.warn( 'Can\'t write ' + file + '. Aborting.' );

			}

		}

		else {

			grunt.fail.warn( 'File ' + file + ' does not exist. Aborting.' );

		}

	} );

	// Placeholder task
	
	grunt.registerTask( 'noop', 'Empty task.', function() {} );

	// Other tasks 
	
	grunt.registerTask( 'styles', 'less:dev' );

	grunt.registerTask( 'icons', [

		'clean:fonts',
		'fontello',
		'fontello-less'

	] );

	grunt.registerTask( 'images', [

		'imagemin',
		'clean:images',
		'copy',
		'clean:optimized'

	] );

	grunt.registerTask( 'dev', [

		'less:dev',
		'newer:concat',
		'notify',

	] );

	grunt.registerTask( 'build', [
		
		'clean',
		'icons',
		'less:dist',
		'concat',
		'uglify',
		'images',

	] );

};