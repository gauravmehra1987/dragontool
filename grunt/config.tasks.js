/*! (c) 2015 John Przeslakowski | Code released under the MIT license | goodpixels.co.uk */
	
// Placeholder task
grunt.loadNpmTasks('grunt-image-embed');
grunt.registerTask( 'noop', 'Empty task.', function() {} );

// Other tasks - to be updated with latest tasks

grunt.registerTask( 'icons', [ 'webfont', ] );

grunt.registerTask( 'sprites', 'sprite' );

grunt.registerTask( 'fonts', [ 'ttf2woff', 'ttf2eot', 'fontface' ] );

grunt.registerTask( 'images', [ 'imagemin', 'copy:images', 'clean:optimized' ] );

// grunt.registerTask( 'templates', [ 'clean:templates', 'clean:dotnet_templates', 'cleanempty', 'processhtml', 'prettify', 'copy:dotnet' ] );
grunt.registerTask( 'templates', [ 'clean:templates', 'clean:dotnet_templates', 'cleanempty', 'processhtml', 'copy:dotnet' ] );

grunt.registerTask( 'tidy', [

	'clean:htc',
	'clean:images',
	'clean:sprites',
	'clean:templates',
	'clean:dotnet',
	'clean:dotnet_assets',
	'clean:dotnet_templates',
	'clean:fonts',
	'clean:optimized',
	'clean:js',
	'clean:less',
	'clean:css',
	'clean:other',
	'cleanempty'

] );

grunt.registerTask( 'squeaky-clean', [

	'clean',
	'cleanempty'

] );

grunt.registerTask( 'dotnet', [ 'templates', 'copy:assets', 'clean:dotnet_assets' ] );

// Default task

grunt.registerTask( 'generate',	[

	'squeaky-clean',
	'svg2png',
	'sprites',
	'icons',
	'fonts',
	'copy:htc',

] );

grunt.registerTask( 'generate-windows',	[

	'tidy',
	'svg2png',
	'sprites',
	'fonts',
	'copy:htc',

] );

grunt.registerTask( 'compile-dev',	[

	'less:dev',
	'concat',
	'imageEmbed'

] );

grunt.registerTask( 'compile-dist',	[

	'less:dist',
	'concat',
	'imageEmbed',
	'uglify',

] );

grunt.registerTask( 'compile',	[ 'compile-dev' ] );

grunt.registerTask( 'build-staging',	[ 'compile-dev', 'dotnet' ] );

grunt.registerTask( 'build-live',	[ 'compile-dist', 'dotnet' ] );

grunt.registerTask( 'default',	[

	'compile',
	'watch'

] );