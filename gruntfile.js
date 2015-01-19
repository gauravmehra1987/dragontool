/*! (c) 2014 John Przeslakowski | Code released under the MIT license | goodpixels.co.uk */

module.exports = function( grunt ) {

	var projectName		= 'Mini Combobulator';
	var paths			= {

		icons:		'assets/fonts/icons',
		bower:		'bower_components/',
		dotnetAssets:'dotnet/Combobulator/Assets/'

	};

	grunt.initConfig( {

		// Grunt variables

		pkg: grunt.file.readJSON( 'package.json' ),
		fixturesPath: "fixtures",

		processhtml: {
		
			options: {

				// Use the following file for string replacement inside HTML files

				data: {

					global:			grunt.file.readJSON( 'razor_src/global.json' ),
					exCustomer:		grunt.file.readJSON( 'razor_src/existing-customer.json' ),
					newCustomer:	grunt.file.readJSON( 'razor_src/new-customer.json' ),
					details:		grunt.file.readJSON( 'razor_src/details.json' ),
					results:		grunt.file.readJSON( 'razor_src/results.json' ),
					home:			grunt.file.readJSON( 'razor_src/home.json' ),
					dashboard:		grunt.file.readJSON( 'razor_src/dashboard.json' ),

				}

			},

			dist: {

				files: {

					// Dashboard

					'razor_templates/Home/Index.cshtml':							[ 'index.php' ],
					
					'razor_templates/Home/_Dashboard.cshtml':						[ 'dashboard.php' ],

					'razor_templates/Home/_ControlBums.cshtml':						[ 'control-bums.php' ],
					'razor_templates/Home/_ControlLifestyle.cshtml':				[ 'control-lifestyle.php' ],
					'razor_templates/Home/_ControlLuggage.cshtml':					[ 'control-luggage.php' ],
					'razor_templates/Home/_ControlMpg.cshtml':						[ 'control-mpg.php' ],
					'razor_templates/Home/_ControlOptions.cshtml':					[ 'control-options.php' ],
					'razor_templates/Home/_ControlPrice.cshtml':					[ 'control-price.php' ],
					'razor_templates/Home/_ControlSpeed.cshtml':					[ 'control-speed.php' ],
					'razor_templates/Home/_ControlStart.cshtml':					[ 'control-start.php' ],
					
					// Results

					'razor_templates/Results/Index.cshtml':						[ 'results.php' ],

					'razor_templates/Results/_Details.cshtml':						[ 'details.php' ],
					'razor_templates/Results/_ExistingCustomerForm.cshtml':			[ 'existing-customer.php' ],
					'razor_templates/Results/_NewCustomerForm.cshtml':				[ 'new-customer.php' ],					

					// Partials

					'razor_templates/Shared/_Header.cshtml':						[ 'header.php' ],
					'razor_templates/Shared/_Footer.cshtml':						[ 'footer.php' ],

				}

			},

		},

		// Icons

		webfont: {

			options: {

				engine: 'node',
				stylesheet: 'less',
				htmlDemo: false,
				template: 'assets/icons/template.css',
				templateOptions: {

					classPrefix: 'icon-',

				},

			},
		
			icons: {
				
				src: 'assets/icons/*.svg',
				dest: paths.icons,
				destCss: 'assets/less',

			},

		},

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
					'assets/css/ie.css':	[ 'assets/less/ie.less' ]

				}


			},

			dist: {

				options: {

					cleancss: true,
					paths: [ 'assets/less' ]
				
				},

				files: {

					'assets/css/style.css':	[ 'assets/less/style.less' ],
					'assets/css/ie.css':	[ 'assets/less/ie.less' ]

				}

			},

		},

		php: {
			dist: {
				options: {
					keepalive: true,
					port: 5000
				}
			}
		},

		// Merge JS files
		
		concat: {

			lib: {

				dest: 'assets/js/lib.js',

				src: [

					// List bower components
					
					paths.bower + 'fastclick/lib/fastclick.js',
					paths.bower + 'underscore/underscore.js',
					paths.bower + 'jquery/dist/jquery.js',
					paths.bower + 'jquery.browser/dist/jquery.browser.js',
					paths.bower + 'slick.js/slick/slick.js',
					// paths.bower + 'fancybox/source/jquery.fancybox.js',
					
					// Greensock
					'assets/js/src/ThrowPropsPlugin.js',
					paths.bower + 'greensock/src/uncompressed/plugins/CSSPlugin.js',
					paths.bower + 'greensock/src/uncompressed/TweenLite.js',
					paths.bower + 'greensock/src/uncompressed/utils/Draggable.js',

				],
			
			},

			js: {

				dest: 'assets/js/app.js',

				src: [

					// List scripts
					
					'assets/js/src/config.js',
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

					// Then the script

					'assets/js/src/ie.js'

				]

			},

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

			razor_templates: {

				files: [ {

					expand:	true,
					cwd:	'razor_templates',
					src:	[ '**/*.cshtml' ],
					dest:	'dotnet/Combobulator/Views/'

				} ]

			},

			images: {

				files: [ {

					expand:	true,
					cwd:	'assets/img/optimized',
					src:	[ '**' ],
					dest:	'assets/img'

				} ]
			},

			// For .net

			assets: {
				
				files: [ {

					expand:	true,
					cwd:	'assets',
					src:	[ '**' ],
					dest:	'dotnet/Combobulator/Assets'

				} ]

			},

			dotnet: {

				files: [ {

					expand:	true,
					cwd:	'razor_templates',
					src:	[ '**' ],
					dest:	'dotnet/Combobulator/Views'

				} ]

			},

		},

		// Sprites

		sprite: {

			all: {
			
				src: 'assets/sprites/*.png',
				dest: 'assets/img/sprites/sprites.png',
				destCss: 'assets/less/sprites.less',
				cssTemplate: 'sprites.tpl.mustache'

			},

		},

		// Watch file changes
		
		watch: {

			options: { livereload: true },

			html: {			

				files: [

					'**/*.html',
					'**/*.php'

				],

				tasks: [ 'templates' ]
			
			},

			json: {			

				files: [

					'razor_src/*.*',

				],

				tasks: [ 'templates' ]
			
			},

			icons: {

				files: [ 'assets/icons/*.svg' ],

				tasks: [ 'icons' ]
			
			},

			sprites: {

				files: [ 'assets/sprites/*.*' ],

				tasks: [ 'images' ]
			
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

			templates: [ 'razor_templates' ],

			dotnet: [ 'dotnet/Combobulator/Assets', ],

			dotnet_assets: [

				'dotnet/Combobulator/Assets/less',
				'dotnet/Combobulator/Assets/js/src',
				'dotnet/Combobulator/Assets/sprites/psd',

			],

			dotnet_templates: [

				'dotnet/Combobulator/Views/**/*.cshtml',
				'!dotnet/Combobulator/Views/Shared/_Layout.cshtml',
				'!dotnet/Combobulator/Views/Shared/Error.cshtml',
				'!dotnet/Combobulator/Views/**/_ViewStart.cshtml',
				'!dotnet/Combobulator/Views/**/Web.config',

			],

			fonts: [
				
				paths.icons,
				'assets/less/icons.less',

			],

			optimized: [ 'assets/img/optimized' ],

			js: [
				
				'assets/js/app.js',
				'assets/js/lib.js',
				'assets/js/ie.js',

			],

			less: [

				'assets/less/icon-codes.less',
				'assets/less/sprites.less',

			],

			css: [ 'assets/css' ],

			other: [ '**/.DS_Store' ],

		},

		// Clean empty directories

		cleanempty: {

			options: {

				files: false,

			},

			src: [ 'dotnet/Combobulator/Views/**/*' ],

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

	// Local modules

	grunt.loadNpmTasks( 'grunt-php' );

	// Load modules
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-cleanempty' );
	grunt.loadNpmTasks( 'grunt-webfont' );
	grunt.loadNpmTasks( 'grunt-spritesmith' );
	grunt.loadNpmTasks( 'grunt-newer' );
	grunt.loadNpmTasks( 'grunt-notify' );
	grunt.loadNpmTasks( 'grunt-processhtml' );

	// Other tasks

	grunt.registerTask( 'icons', [

		'clean:fonts',
		'webfont',

	]);

	grunt.registerTask( 'images', [

		'clean:images',
		'sprites',
		'imagemin',
		'copy',
		'clean:optimized'

	] );

	grunt.registerTask( 'dev', [

		'less:dev',
		'newer:concat',
		'notify',

	] );

	grunt.registerTask( 'build', [
		
		'tidy',
		'icons',
		'images',
		'less:dist',
		'concat',
		'uglify',
		'dotnet',

	] );

	// Placeholder task
	
	grunt.registerTask( 'noop', 'Empty task.', function() {} );

	// Other tasks - to be updated with latest tasks
	
	grunt.registerTask( 'templates', [ 'clean:templates', 'clean:dotnet_templates', 'cleanempty', 'processhtml', 'copy:dotnet' ] );
	grunt.registerTask( 'sprites', 'sprite' );
	grunt.registerTask( 'styles', 'less:dev' );
	grunt.registerTask( 'tidy', [ 'clean', 'cleanempty' ] );
	grunt.registerTask( 'dotnet', [ 'templates', 'copy:assets', 'clean:dotnet_assets' ] );

	// Default task 
	
	grunt.registerTask( 'default',	[

		'tidy',
		'icons',
		'images',
		'less:dev',
		'concat',
		'dotnet',
		'watch',

	] );

};