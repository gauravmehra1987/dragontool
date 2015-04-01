/*! by John Przeslakowski - visit me at http://goodpixels.co.uk */


// Setting up social media values to use later
var socialMedia = {

	facebook: {
		link:			'http://google.com',
		message:		'Find the perfect MINI for you with our nifty Combobulator tool:',
		name:			'Image name',
		caption:		'Image caption',
		picture:		'http://placehold.it/200x200',
		description:	'Just a test description.'
	},

	twitter: {
		url:			'http://google.com',
		text:			'Find the perfect MINI for you with our nifty Combobulator tool:',
		hashtags:		''
	}
};


// Setting up path values to use later
var system_paths = {

	// Dotnet version
	net: {
		assets:			'Assets/cars/',
		results:		'results?',
		spriteFallback:	'Assets/sprites',
		api:			'api/car',
		apiPostcode:	'api/postcodelookup',
		apiPostcode:	'api/dealerlookup',
		preload:		'api/assets/svg',
		templates:		'Assets/js/tpl'
	},

	// PHP version
	php: {
		assets:			'assets/cars/',
		results:		'results.php?',
		spriteFallback:	'assets/sprites',
		api:			'json/data.json',
		apiPostcode:	'postcode.php',
		apiDealers:		'dealers.php',
		preload:		'preload.php',
		templates:		'assets/js/tpl'
	}
};
//
// And now, depending on which set up we are using (Dotnet or PHP), we can comment out the appropriate line below 
//
var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.net;
//var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.php;


// Setting up all the colors to use for the dashboard color changes
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


// Set up a Mini object with some data we might need...
var Mini	= {
	//
	// Debug mode
	settings: {
		debug:			true,
	},
	//
	// Third party ID's
	thirdParty: {
		facebookID:		892580704115737,
		analyticsID:	'UA-000000-01'
	},
	//
	// Browser and device information
	browser: {
		name:			$.browser.name,
		version:		$.browser.version,
		mobile: 		$.browser.mobile || false,
		platform:		$.browser.platform,
		//
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


// If browser is NOT IE...
if ( ! Mini.browser.isIE() ) {
	//
	// Add browser name via JavaScript
	document.querySelector( 'html' ).className += ' ' + Mini.browser.name;
	//
	// And remove IE class from the html
	$html.removeClass( 'ie' );
}


// If Modernizr is not defined...
// Manually append .js class to the <html> element
if ( typeof( Modernizr ) === 'undefined' ) {
	//
	var bodyClass = document.querySelector( 'html' ).className;
	//
	document.querySelector( 'html' ).className = bodyClass.replace( 'no-js', 'js' );
}


