( function( Mini ) {

	// If lower than IE 9...

	if( Mini.browser.isIE( '<=8' ) ) {

		// Mark document with browser version

		document.querySelector( 'html' ).className += ' oldie ie' + parseInt( Mini.browser.version );

		// Unwrap select elements
		
		$( '.select > select, .checkbox > input' ).unwrap();

		// Do your stuff here

	}

}( Mini ) );