var system_paths = {

	net: {

		assets:		'Assets/cars/',
		results:	'results?',
		api:		'api/car',
		preload:	'api/assets/svg',

	},

	php: {

		assets:		'assets/cars/',
		results:	'results.php?',
		api:		'api/car.json',
		preload:	'preload.php',

	}

};

var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.php;

var carColors = {
					
	'Volcanic Orange':		'#f7941d',
	'Electric Blue':		'#30b6e8',
	'Lightning Blue':		'#1164ac',
	'Jungle Green':			'#426046',
	
	'Chili red':			'#d71d24',
	'Blazing Red':			'#d71d24',
	
	'Pepper white':			'#e4dfce',
	'Light white':			'#e4dfce',

}

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


var o = $({});

$.subscribe = function() {
	o.on.apply(o, arguments);
};

$.unsubscribe = function() {
	o.off.apply(o, arguments);
};

$.publish = function() {
	o.trigger.apply(o, arguments);
};