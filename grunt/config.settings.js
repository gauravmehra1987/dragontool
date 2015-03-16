/*! (c) 2015 John Przeslakowski | Code released under the MIT license | goodpixels.co.uk */

grunt.config.merge( {

	processhtml: {
		
		options: {

			strip:				true,
			recursive:			true,

			// Use the following file for string replacement inside HTML files

			data: {

				global:			grunt.file.readJSON( razor + '/global.json' ),
				form:			grunt.file.readJSON( razor + '/form.json' ),
				results:		grunt.file.readJSON( razor + '/results.json' ),
				home:			grunt.file.readJSON( razor + '/home.json' ),
				dashboard:		grunt.file.readJSON( razor + '/dashboard.json' ),

			}

		},

		razor: {

			files: {

				// Dashboard

				'<%= project.paths.templates %>/Home/Index.cshtml':							[ 'home.php' ],
				
				'<%= project.paths.templates %>/Home/_Dashboard.cshtml':					[ 'dashboard.php' ],

				'<%= project.paths.templates %>/Home/_ControlBums.cshtml':					[ 'control-bums.php' ],
				'<%= project.paths.templates %>/Home/_ControlLifestyle.cshtml':				[ 'control-lifestyle.php' ],
				'<%= project.paths.templates %>/Home/_ControlLuggage.cshtml':				[ 'control-luggage.php' ],
				'<%= project.paths.templates %>/Home/_ControlMpg.cshtml':					[ 'control-mpg.php' ],
				'<%= project.paths.templates %>/Home/_ControlOptions.cshtml':				[ 'control-options.php' ],
				'<%= project.paths.templates %>/Home/_ControlPrice.cshtml':					[ 'control-price.php' ],
				'<%= project.paths.templates %>/Home/_ControlSpeed.cshtml':					[ 'control-speed.php' ],
				'<%= project.paths.templates %>/Home/_ControlStart.cshtml':					[ 'control-start.php' ],
				
				// Results

				'<%= project.paths.templates %>/Results/Index.cshtml':						[ 'results.php' ],
				'<%= project.paths.templates %>/Results/_ResultDetail.cshtml':				[ 'results-details.php' ],

				// Form

				'<%= project.paths.templates %>/Form/_Index.cshtml':						[ 'form.php' ],
				'<%= project.paths.templates %>/Form/_Form.cshtml':							[ 'form-new-customer.php' ],

				// Partials

				'<%= project.paths.templates %>/Shared/_Header.cshtml':						[ 'header.php' ],
				'<%= project.paths.templates %>/Shared/_Footer.cshtml':						[ 'footer.php' ],

			}

		},

	},

	prettify: {

		options: {

			condense: false,
			indent: 1,
			indent_char: '	',

		},
	
		razor: {		
			
			expand:	true,
			cwd:	'<%= project.paths.templates %>',
			src:	[ '**/*.{cshtml,CSHTML}' ],
			dest:	'<%= project.paths.templates %>',

		}

	},

	// Icons

	webfont: {

		options: {

			engine: '<%= project.settings.iconEngine %>',
			stylesheet: 'less',
			htmlDemo: false,
			template: '<%= project.paths.icons %>/template.css',
			templateOptions: {

				classPrefix: '<%= project.settings.iconPrefix %>',

			},

		},
	
		icons: {
			
			src: '<%= project.paths.icons %>/*.svg',
			dest: '<%= project.paths.fonts %>/icons',
			destCss: '<%= project.paths.less %>',

		},

	},

	// Sprites

	svg2png: {

		default: {
		
			cwd: '<%= project.paths.sprites %>/svg/',
			src: [ '*.svg '],
			dest: '<%= project.paths.sprites %>'

		}

	},

	// web fonts

	ttf2woff: {

		default: {
		
			src: [ '<%= project.paths.fonts %>/mini/*.ttf' ],
			dest: '<%= project.paths.fonts %>'

		}

	},

	ttf2eot: {

		default: {
		
			src: [ '<%= project.paths.fonts %>/mini/*.ttf' ],
			dest: '<%= project.paths.fonts %>'

		}

	},

	fontface: {

		dist: {
		
			options: {
			
				fontDir: '<%= project.paths.fonts %>/mini',
				template: "@font-face {" +
							"font-family: '{{font}}';" +
							"src: url('../fonts/{{font}}.eot?#iefix') format('embedded-opentype')," +
							"url('../fonts/{{font}}.woff') format('woff')," +
							"}",
				outputFile: '<%= project.paths.less %>/fonts.less'

			}

		}

	},	

	// Compile LESS
	
	less: {

		dev: {

			options: {

				paths:				[ '<%= project.paths.less %>' ],
				sourceMap:			true,
				sourceMapFilename: 	'<%= project.paths.css %>/style.css.map',
				sourceMapURL:		'style.css.map',
				sourceMapRootpath:	'../../'

			
			},

			files: {

				'<%= project.paths.css %>/ie.css':	[ '<%= project.paths.less %>/ie.less' ],
				'<%= project.paths.css %>/style.css':	[ '<%= project.paths.less %>/style.less' ],

			}


		},

		dist: {

			options: {

				cleancss: true,
				paths: [ '<%= project.paths.less %>' ]
			
			},

			files: {

				'<%= project.paths.css %>/style.css':	[ '<%= project.paths.less %>/style.less' ],
				'<%= project.paths.css %>/ie.css':	[ '<%= project.paths.less %>/ie.less' ]

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

			dest: '<%= project.paths.js %>/lib.js',

			src: [

				// List bower components
				
				'<%= project.paths.bower %>/mustache.js/mustache.js',
				'<%= project.paths.bower %>/store/store.js',
				'<%= project.paths.bower %>/svg-injector/svg-injector.js',
				'<%= project.paths.bower %>/taffydb/taffy.js',
				'<%= project.paths.bower %>/fastclick/lib/fastclick.js',
				'<%= project.paths.bower %>/underscore/underscore.js',
				'<%= project.paths.bower %>/jquery/dist/jquery.js',
				'<%= project.paths.bower %>/jquery-tiny-pubsub/dist/ba-tiny-pubsub.js',
				'<%= project.paths.bower %>/jquery.browser/dist/jquery.browser.js',
				'<%= project.paths.bower %>/jquery-validation/dist/jquery.validate.js',
				'<%= project.paths.bower %>/jquery-validation/dist/additional-methods.js',
				'<%= project.paths.bower %>/slick.js/slick/slick.js',
				
				// Greensock

				'<%= project.paths.js %>/src/ThrowPropsPlugin.js',
				'<%= project.paths.bower %>/greensock/src/uncompressed/plugins/CSSPlugin.js',
				'<%= project.paths.bower %>/greensock/src/uncompressed/TweenLite.js',
				'<%= project.paths.bower %>/greensock/src/uncompressed/utils/Draggable.js',

				// Plugins

				'<%= project.paths.js %>/src/jquery.plugins.js',

			],
		
		},

		js: {

			dest: '<%= project.paths.js %>/app.js',

			src: [

				// List scripts
				
				'<%= project.paths.js %>/src/config.js',
				'<%= project.paths.js %>/src/validation.rules.js',
				'<%= project.paths.js %>/src/validation.js',
				'<%= project.paths.js %>/src/core.logic.js',
				'<%= project.paths.js %>/src/core.dials.js',
				'<%= project.paths.js %>/src/core.dashboard.js',
				'<%= project.paths.js %>/src/core.ui.js',
				'<%= project.paths.js %>/src/core.utils.js',
				'<%= project.paths.js %>/src/core.responsive.js',
				'<%= project.paths.js %>/src/script.js',
				'<%= project.paths.js %>/src/core.ie.js',

			],
		
		},

		ielib: {

			dest: '<%= project.paths.js %>/ie-lib.js',

			src: [

				// First IE-specific libraries

				'<%= project.paths.bower %>/html5shiv/dist/html5shiv.js',
				'<%= project.paths.bower %>/base64/base64.js',

			]

		},

		ie: {

			dest: '<%= project.paths.js %>/ie.js',

			src: [

				'<%= project.paths.js %>/src/ie.js'

			]

		},

	},

	// Compress JS
	
	uglify: {

		dist: {

			options: {

				preserveComments:	'some',
				mangle:				true,
				compress: {

					sequences:		true,
					dead_code:		true,
					conditionals:	true,
					booleans:		true,
					unused:			true,
					if_return:		true,
					join_vars:		true,
					drop_console:	true

				}

			},

			files: {

				'<%= project.paths.js %>/app.js':	[ '<%= project.paths.js %>/app.js' ],
				'<%= project.paths.js %>/lib.js':	[ '<%= project.paths.js %>/lib.js' ],
				'<%= project.paths.js %>/ie.js':	[ '<%= project.paths.js %>/ie.js' ],
				'<%= project.paths.js %>/ie-lib.js':	[ '<%= project.paths.js %>/ie-lib.js' ],

			}

		}

	},

	// Squash images
	
	imagemin: {

		dynamic: {

			options: { optimizationLevel: 3 },

			files: [ {

				expand:	true,
				cwd:	'<%= project.paths.img %>',
				src:	[ '**/*.{png,jpg,gif,PNG,JPG,GIF,jpeg,JPEG}' ],
				dest:	'<%= project.paths.img %>/optimized',

			} ]
		}

	},

	// Copy images
	
	copy: {

		htc: {

			files: [ {
			
				expand:		true,
				flatten:	true,
				src:		[

								'<%= project.paths.bower %>/background-size-polyfill/backgroundsize.htc',
								'<%= project.paths.bower %>/box-sizing-polyfill/boxsizing.htc'

							],
				dest:		'<%= project.paths.js %>/htc/'

			} ]

		},

		slick: {

			files: [ {

				expand:	true,
				cwd:	'<%= project.paths.bower %>/slick.js/slick',
				src:	[ '**/*.{gif,eot,svg,ttf,woff,GIF,EOT,SVG,TTF,WOFF}' ],
				dest:	'<%= project.paths.img %>/slick.js'

			} ]

		},

		templates: {

			files: [ {

				expand:	true,
				cwd:	'<%= project.paths.templates %>',
				src:	[ '**/*.cshtml' ],
				dest:	'dotnet/Combobulator/Views/'

			} ]

		},

		images: {

			files: [ {

				expand:	true,
				cwd:	'<%= project.paths.img %>/optimized',
				src:	[ '**' ],
				dest:	'<%= project.paths.img %>'

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
				cwd:	'<%= project.paths.templates %>',
				src:	[ '**' ],
				dest:	'dotnet/Combobulator/Views'

			} ]

		},

	},

	// Sprites

	sprite: {

		all: {
		
			src: '<%= project.paths.sprites %>/*.png',
			dest: '<%= project.paths.img %>/sprites/sprites.png',
			destCss: '<%= project.paths.less %>/sprites.less',
			cssTemplate: 'sprites.tpl.mustache'

		},

	},

	// Watch file changes
	
	watch: {

		options: { livereload: true },

		self: {

			files: [ 'gruntfile.js' ],
		
		},

		html: {			

			files: [

				'**/*.html',
				'**/*.php'

			],

			tasks: [ 'templates' ]
		
		},

		json: {			

			files: [

				razor + '/*.*',

			],

			tasks: [ 'templates' ]
		
		},

		icons: {

			files: [ '<%= project.paths.icons %>/*.svg' ],

			tasks: [ 'icons' ]
		
		},

		sprites: {

			files: [ '<%= project.paths.sprites %>/*.*' ],

			tasks: [ 'images' ]
		
		},

		styles: {

			files: [ '<%= project.paths.less %>/**/*.less' ],
			tasks: [ 'less:dev', 'notify:css' ]
		
		},

		scripts: {

			files: [ '<%= project.paths.js %>/src/*.js' ],
			tasks: [ 'concat', 'notify:js' ]

		}

	},

	// Clean repo
	
	clean: {

		htc: [ '<%= project.paths.js %>/htc' ],

		images: [

			'<%= project.paths.img %>/**',
			'!<%= project.paths.img %>',
			'!<%= project.paths.img %>/*.{png,PNG,jpg,JPG,gif,GIF,jpeg,JPEG,svg,SVG}',

		],

		sprites: [

			'<%= project.paths.sprites %>/*.{png,PNG}',

		],

		templates: [ '<%= project.paths.templates %>' ],

		dotnet: [ 'dotnet/Combobulator/Assets', ],

		dotnet_assets: [

			'dotnet/Combobulator/<%= project.paths.less %>',
			'dotnet/Combobulator/<%= project.paths.js %>/src',
			'dotnet/Combobulator/<%= project.paths.sprites %>/psd',

		],

		dotnet_templates: [

			'dotnet/Combobulator/Views/**/*.cshtml',
			'!dotnet/Combobulator/Views/Shared/_Layout.cshtml',
			'!dotnet/Combobulator/Views/Shared/Error.cshtml',
			'!dotnet/Combobulator/Views/**/_ViewStart.cshtml',
			'!dotnet/Combobulator/Views/**/Web.config',

		],

		fonts: [
			
			'<%= project.paths.fonts %>/*.*',

		],

		optimized: [ '<%= project.paths.img %>/optimized' ],

		js: [
			
			'<%= project.paths.js %>/app.js',
			'<%= project.paths.js %>/lib.js',
			'<%= project.paths.js %>/ie.js',
			'<%= project.paths.js %>/ie-lib.js',

		],

		less: [

			'<%= project.paths.less %>/icon-codes.less',
			'<%= project.paths.less %>/sprites.less',
			'<%= project.paths.less %>/fonts.less',

		],

		css: [ '<%= project.paths.css %>' ],

		other: [ '**/.DS_Store' ],

		windows: [


			'<%= project.paths.fonts %>/icons', // Remove exclamation mark to clean
			'<%= project.paths.less %>/icons.less', // Remove exclamation mark to clean


		]

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
		
		js: {
		
			options: {
			
				title: '<%= project.name %>',					
				message: 'JavaScript finished compiling.',
			
			}

		},

		css: {
		
			options: {
			
				title: '<%= project.name %>',					
				message: 'LESS finished compiling.',
			
			}

		}
	
	}

} );