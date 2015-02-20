// IE class

function IE() {

	this.loadFallbacks = function() {

		return ( Mini.browser.isIE( '<=8' ) && Mini.browser.isIE() );

	}

	this.rollers = function() {

		console.log( 'rollers' );

	},

	this.speed = function() {

		console.log( 'speed' );

	}

	// Polyfills

	this.polyfills = function() {

		console.log( 'Loading IE polyfills' );

		if( typeof String.prototype.trim !== 'function' ) {

			String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

		}

	}

	if( this.loadFallbacks() ) this.polyfills();

}

if( ie.loadFallbacks() ) {

	// If lower than IE 9...

	if( Mini.browser.isIE( '<=8' ) ) {

		// Mark document with browser version

		document.querySelector( 'html' ).className += ' oldie ie' + parseInt( Mini.browser.version );

		// Unwrap select elements
		
		$( '.select > select, .checkbox > input' ).unwrap();

		// Do your stuff here

		ui.loadSVGs();

		$sys.toggleClass( 'hidden' );

		$( '.control.start .shape' ).on( 'click', function() {

			$( '#start' ).trigger( 'click' );

		} );

	}
	
}