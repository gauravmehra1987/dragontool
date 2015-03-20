/*! (c) 2015 John Przeslakowski | Code released under the MIT license | goodpixels.co.uk */

grunt	= require( 'grunt' );
razor	= 'razor_src'; // why does <%= project.paths.razor %> not work in grunt.file.readJSON()?!

require( './grunt/config.variables.js' );
require( './grunt/config.tasks.js' );
require( './grunt/config.settings.js' );

require( 'load-grunt-tasks' )( grunt, { pattern: [ 'grunt-*', 'assemble' ] } );