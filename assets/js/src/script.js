var priceChanged	= false;
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();

var dashboard;

// Preload images if it's not IE

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) ui.preloadImages();

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	dashboard	= new Dashboard();

	// Initialize controls on the homepage

	if( $( '#dash' ).length ) dashboard.init();

	// Color switcher

	$.subscribe( 'colour-change', function( e, color) { dashboard.colors( color ); } );

	// Show first panel on a page

	ui.showPanel( 'default' );

	// Load initial color

	dashboard.colors( carColors[ 'Electric Blue' ] );

	// Validate forms

	$( 'form' ).validate();

	// Execute search

	$( '#start' ).on( 'click', function( e ) {

		e.preventDefault();	

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

				// Take the first car only

				var car		= cars[ _.random( cars.length - 1 ) ];
				var user	= $body.find( '#uid' ).val()

				// Easter eggs

				if(

					$.inArray( 'dog', eggs ) >= 0 ||
					$.inArray( 'cat', eggs ) >= 0 ||
					$.inArray( 'alien', eggs ) >= 0

				) { ui.eggs( 'creature', eggs ); }

				else if( $.inArray( 'teleport', eggs ) >= 0 ) { ui.eggs( 'teleport', eggs ); }

				// Populate results

				ui.render( car, user );

			}
		}

	} );

} );