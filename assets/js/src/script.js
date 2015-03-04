var priceChanged	= false;
var ie				= new IE();
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();

var responsive;
var dashboard;

// Some not IE-friendly stuff

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) {

	// Preload images

	ui.preloadImages();

	// Make everything responsive

	responsive = new Responsive();

}

// Start dashboard

dashboard = new Dashboard();

// Load initial color

var dashColor = ( location.hash.length > 0 ) ? atob( location.hash.substring( 1 ) ) : 'Electric Blue';

dashboard.colors( carColors[ dashColor ] );

// Load car onto the results page - this should be done with .NET

var carModel = location.search.split( '?m=' )[ 1 ];

$( '#results-car' ).attr( 'src', path.assets + carModel + '.png' );

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	// We need to update dashboard color once the SVGs have been loaded

	dashboard.colors( carColors[ dashColor ] );

	// Initialize controls on the homepage

	if( $( '#dash' ).length ) dashboard.init();

	// Color switcher

	$.subscribe( 'colour-change', function( e, color) { dashboard.colors( color ); } );

	// Show first panel on a page

	ui.showPanel( 'default' );

	// Validate forms

	$( 'form' ).validate();

	// Handle successful form submission

	$.subscribe( 'form-ajax-results', function( e, data ) {

		if( data.success ) { ui.showPanel( 'thanks' ); }

	} );

	// Handle social media

	sharing();

	// Events - let's start with the backdrop

	$( '#terms-link' ).on( 'click', function( e ) {

		e.preventDefault();

		var _this	= this;
		var target	= $( this ).attr( 'href' );
		var $close	= $( target ).find( '.close' );

		$( 'html' ).removeClass( 'terms-visible' ).addClass( 'terms-visible' );

		$close.on( 'click', function( e ) {

			e.preventDefault();

			$( 'html' ).removeClass( 'terms-visible' );

		} );

	} );

	// Execute search

	$( '#start' ).on( 'click', function( e ) {

		e.preventDefault();	

		// Remove rotten eggs

		$html.removeClassBeginningWith( 'egg' );

		// Check if there are any easter eggs being triggered

		var eggs = logic.eggs( dashboard.values() );

		if(

			$.inArray( 'toy', eggs ) >= 0 ||
			$.inArray( 'rocket', eggs ) >= 0

		) {

			if( $.inArray( 'rocket', eggs ) >= 0 && $.inArray( 'toy', eggs ) >= 0 ) { ui.eggs( 'rocket', eggs ); }

			else if( $.inArray( 'toy', eggs ) >= 0 ) { ui.eggs( 'toy', eggs ); }

			else { ui.eggs( 'rocket', eggs ); }

			return;

		}

		// Display results!

		else {

			var search		= query.build( query.convert( dashboard.values() ) );
			var results		= logic.getCars( search );
			var cars		= results.data;

			if( cars.length > 0 ) {

				// Randomly choose a car

				var car		= cars[ _.random( cars.length - 1 ) ];
				var user	= $body.find( '#uid' ).val()

				// Easter eggs

				if(

					$.inArray( 'dog', eggs ) >= 0 ||
					$.inArray( 'cat', eggs ) >= 0 ||
					$.inArray( 'alien', eggs ) >= 0

				) {

					ui.eggs( 'creature', eggs );

					// Populate results

					ui.render( car, user );

				}

				else {

					// Populate results

					ui.render( car, user );
					
				}

			}
		}

	} );

} );