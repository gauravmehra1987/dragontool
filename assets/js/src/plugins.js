// Avoid console errors in browsers that lack a console

( function( Mini ) {

	var method,
		noop	= function () {},
		methods	= [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ],
		length	= methods.length,
		console	= ( window.console = window.console || {} );

	while( length-- ) {
	
		method = methods[ length ];

		// Only add undefined methods
		
		if( ! console[ method ] ) console[ method ] = noop;

	}

	var log = console.log.bind( console );

} ( Mini ) );