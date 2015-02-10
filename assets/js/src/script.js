var priceChanged	= false;
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();

var dashboard;

function checkForEasterEggs( data ) {

	var seatTriggers	= [ 'Alien', 'Dog', 'Cat' ];
	var extraSeat		= data.seats[ 4 ];
	var eggs			= [];
	var i				= $.inArray( extraSeat, seatTriggers );

	// Alien, cat, dog

	if( i >= 0 ) { eggs.push( seatTriggers[ i ].toLowerCase() ); }

	// Teleportation

	if( data.options.tp ) { eggs.push( 'teleport' ); }

	// Rocket car

	if( data.speed === 5 ) { eggs.push( 'rocket' ); }

	// Toy car

	if( priceChanged && data.price <= 190 ) { eggs.push( 'toy' ); }

	// No eggs at all

	if( eggs.length <= 0 ) eggs = false;

	// Return the array

	return eggs;

}

// Preload images if it's not IE

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) ui.preloadImages();

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	dashboard	= new Dashboard();

	// Color switcher

	$.subscribe( 'colour-change', function( e, color) { dashboard.colors( color ); } );

	if( $( '#dash' )[ 0 ] ) {

		ui.showPanel( 'default' );

		dashboard.colors( carColors[ 'Electric Blue' ] );

		// Execute search

		$( '#start' ).on( 'click', function( e ) {

			e.preventDefault();	

			// Check if there are any easter eggs being triggered

			var eggs = checkForEasterEggs( dashboard.values() );

			if(

				$.inArray( 'toy', eggs ) >= 0 ||
				$.inArray( 'rocket', eggs ) >= 0

			) {

				alert( 'Trigger either a toy or a rocket.' );

				return;

			}

			// Display results!

			else {

				var search		= query.build( query.convert( dashboard.values() ) );
				var results		= logic.getCars( search );
				var cars		= results.data;

				if( cars.length > 0 ) {

					// Take the first car only

					var car				= cars[ 0 ];
					var $panel			= $body.find( '.panel-results' );
					var customerId		= $body.find( '#uid' ).val()
					var resultsPageUrl	= function( url, user, code ) {

						var link = ( typeof user === 'undefined' ) ? url + 'm=' + code : url + 'c=' + user + '&m=' + code;

						return link;

					};

					// Easter eggs

					if(

						$.inArray( 'teleport', eggs ) >= 0 ||
						$.inArray( 'dog', eggs ) >= 0 ||
						$.inArray( 'cat', eggs ) >= 0 ||
						$.inArray( 'alien', eggs ) >= 0

					) { alert( 'These search results will either include a teleport or one of the creatures.' ); }

					// Populate results

					$panel.find( '[data-model-name]' ).html (car.name );
					$panel.find( '[data-model-code]' ).html( car.code );
					$panel.find( '[data-model-price]' ).html( car.cost );				
					$panel.find( '[data-terms]' ).html( car.terms );
					$panel.find( '[data-results-link]' ).attr( { href: resultsPageUrl( path.results, customerId, car.code ) } );
					$panel.find( '[data-model-image]' ).hide().attr( { src: path.assets + car.code + '.jpg' } ).fadeIn( 200 );

					dashboard.colors( carColors[ car.color ] );

					ui.showPanel( 'results' );

				}
			}

		} );

	}

	// Results page

	else {

		ui.showPanel( 'default' );

		$( 'form' ).validate();

	}

} );