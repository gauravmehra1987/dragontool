var priceChanged	= false;
var ie				= new IE();
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();
var carCode			= getQueryParameter( 'm' ) || false;

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

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	// We need to update dashboard color once the SVGs have been loaded

	var color		= ( carCode ) ? logic.getCarByCode( carCode ).color : false;
	var dashColor	= ( color ) ? color : 'Electric Blue';

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

	// Render finance template

	if( $( '#tpl-finance' ).length > 0 ) {

		ui.getTpl( 'finance' ).then( function( tpl ) {

			$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, logic.getFinance( carCode ) ) );

		} );

	}

	// Execute search

	$( '#start' ).on( 'click', function( e ) {

		e.preventDefault();

		var userSelection = dashboard.values();

		store.set( 'miniInput', userSelection );

		// Remove rotten eggs

		$html.removeClassBeginningWith( 'egg' );

		// Check if there are any easter eggs being triggered

		var eggs = logic.eggs( userSelection );

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

				// Easter eggs

				if(

					$.inArray( 'dog', eggs ) >= 0 ||
					$.inArray( 'cat', eggs ) >= 0 ||
					$.inArray( 'alien', eggs ) >= 0

				) {

					ui.eggs( 'creature', eggs );

					// Populate results

					ui.render( car );

				}

				else {

					// Populate results

					ui.render( car );
					
				}

			}
		}

	} );

	// Show alternative cars

	$body.on( 'click', '.car-changer', function( e ) {

		e.preventDefault();

		var link	= $( this ).attr( 'href' );
		var car		= logic.getCarByCode( link.substring( 1 ) );

		$( '.car-changer' ).removeClass( 'active' ).filter( this ).addClass( 'active' );

		ui.render( car, true );

	} );

} );

// Postcode

var addrTpl = $( '#addresses' ).html();
var sta;

$( '#field-postcode' ).on( 'change', function( e ) {

	var postcode = $( this ).val();

	logic.getPostcode( postcode ).then( function( addresses ) {

		// Store addresses

		addressObj = addresses;

		formattedAddresses = [];

		// Remove existing addresses

		$( '#address-chooser' ).contents().remove();

		// Construct address strings

		$( addresses ).each( function( i, addr ) {

			var address = new String();

			for( var key in addr ) if( ! _.isEmpty( addr[ key ] ) ) address += addr[ key ] + ', ';

			address = address.substr( 0, address.length - 2 );

			formattedAddresses.push( { id: i, address: address } );

		} );

		// Render template

		ui.getTpl( 'addresses' ).then( function( tpl ) {

			$( '#address-chooser' ).append( ui.renderTpl( tpl, { addresses: formattedAddresses } ) );

		} );

	} );

} );

$body.on( 'change', '#addresses', function( e ) {

	var id = $( this ).val();

	console.log( addressObj[ id ] );

} );

$.subscribe( 'form-ajax-results', function( e, data ) {

	console.log( data );

} );





