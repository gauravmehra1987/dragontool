/*! by John Przeslakowski - visit me at http://goodpixels.co.uk */

var social = {

	facebook: {

		link:			'http://google.com',
		message:		'This is the message which will be posted to the user\'s wall.',
		name:			'Image name',
		caption:		'Image caption',
		picture:		'http://placehold.it/200x200',
		description:	'Just a test description.'

	},
	
	twitter: {

		url:			'http://sony.com',
		text:			'This is the message which will be posted to the user\'s wall.',
		hashtags:		'mini,cooper'

	}

};

var system_paths = {

	net: {

		assets:			'Assets/cars/',
		results:		'results?',
		spriteFallback:	'Assets/sprites',
		api:			'api/car',
		preload:		'api/assets/svg',		

	},

	php: {

		assets:			'assets/cars/',
		results:		'results.php?',
		spriteFallback:	'assets/sprites',
		api:			'json/car.json',
		preload:		'preload.php',

	}

};

var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.net;

var carColors = {
					
	'Volcanic Orange':		'#f7941d',
	'Electric Blue':		'#30b6e8',
	'Lightning Blue':		'#1164ac',
	'Jungle Green':			'#426046',
	
	'Chili red':			'#d71d24',
	'Blazing Red':			'#c10000',
	
	'Pepper white':			'#e4dfce',
	'Light white':			'#e4dfce',

	// Extra colors

	'Toy brown':			'#47322e',
	'Rocket gold':			'gold'

}

// Setup namespace and some global variables

var $html	= $( 'html' );
var	$body	= $( 'body' );
var $sys	= $( '#system' );

var	w		= window;

// System messages

function sysMsg( message ) { $sys.attr( 'data-system-message', message ); }

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

jQuery.fn.removeClassBeginningWith = function( className ) {

	return this.each( function() {

		var el = this;

		$( this.classList ).each( function( i, c ) {

			if( c.indexOf( className ) === 0 )

			$( el ).removeClass( c );

		} );

	} );

};