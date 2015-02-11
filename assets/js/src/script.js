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

	ui.showPanel( 'default' );

	dashboard.colors( carColors[ 'Electric Blue' ] );

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

			if( $.inArray( 'rocket', eggs ) >= 0 && $.inArray( 'toy', eggs ) >= 0 ) {

				alert( 'Trigger a rocket.' );

			}

			else if( $.inArray( 'toy', eggs ) >= 0 ) {

				alert( 'Trigger a toy.' );

			}

			else {

				alert( 'Trigger a rocket.' );

			}

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

					$.inArray( 'dog', eggs ) >= 0 ||
					$.inArray( 'cat', eggs ) >= 0 ||
					$.inArray( 'alien', eggs ) >= 0

				) {

					alert( 'These search results will show one of the creatures.' );

				}

				else if( $.inArray( 'teleport', eggs ) >= 0 ) {

					alert( 'Trigger teleportation.' );

				}

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

} );