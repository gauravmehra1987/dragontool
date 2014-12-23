// Setup namespace and some global variables

var $html	= $( 'html' );
var	$body	= $( 'body' );
var	w		= window;

var Mini	= {

	settings: {

		debug:			true,

	},

	thirdParty: {

		facebookID:		892580704115737,
		analyticsID:	'UA-000000-01'

	},

	browser: {

		name:			$.browser.name,
		version:		$.browser.version,
		mobile: 		$.browser.mobile || false,
		platform:		$.browser.platform,

		// Quick fuction to check IE version

		isIE:			function( version ) {

			switch( typeof( version ) ) {

				case 'string': return ( $.browser.name === 'msie' && $.browser.platform === 'win' && eval( parseInt( $.browser.version ) + version ) ); break;
				
				case 'number': return ( $.browser.name === 'msie' && $.browser.platform === 'win' && parseInt( $.browser.version ) === version ); break;

				default: return ( $.browser.name === 'msie' && $.browser.platform === 'win' ); break;

			}

		}

	}

};

// Add some useful classes to the <html> element

document.querySelector( 'html' ).className += ' ' + Mini.browser.platform;

// Add browser name via JavaScript if it's not IE

if( ! Mini.browser.isIE() ) document.querySelector( 'html' ).className += ' ' + Mini.browser.name;

// We have to manually append .js class to the <html> element if modernizr isn't used

if( typeof( Modernizr ) === 'undefined' ) {

	var bodyClass = document.querySelector( 'html' ).className;

	document.querySelector( 'html' ).className = bodyClass.replace( 'no-js', 'js' );

}

// Plugins

jQuery.fn.removeClassExcept = function ( val ) {

	return this.each( function( index, el ) {
		
		var keep = val.split( ' ' );
		var reAdd = [];
		var $el = $(el);
	
		for( var c = 0; c < keep.length; c++ ) {

			if( $el.hasClass( keep[ c ] ) ) reAdd.push( keep[ c ] );

		}

	
	$el.removeClass().addClass( reAdd.join( ' ' ) );
	
	} );

};
