var priceChanged	= false;
var ie				= new IE();
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();
var social			= new SocialMedia();
var carCode			= getQueryParameter( 'm' ) || false;

var addressObj;
var dealersObj;
var responsive;
var dashboard;
var postcodeTimer;

// Selectors for form fields

var form = {

	addresses:			'#addresses',
	address1:			'#address-1',
	address2:			'#address-2',
	address3:			'#address-3',
	addressChooser:		'#address-chooser',
	dealerChooser:		'#dealer-chooser',
	dealers:			'#dealers',

}

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

	$.subscribe( 'colour-change', function( e, color ) { dashboard.colors( color ); } );

	// Show first panel on a page

	ui.showPanel( 'default' );

	// Validate forms

	$( 'form' ).validate();

	// Handle successful form submission
	
	$.subscribe( 'form-ajax-results', function( e, data ) {

		if( data.success ) { ui.showPanel( 'thanks' ); }

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

		// Animate button

		TweenLite.from($( '#start' ), 0.5, {rotation: -360});

		// Scroll to top of page

		setTimeout( function() {

			$('#tablet-toggle').click();

			$('html, body').animate( {

				scrollTop: 0

			}, 600);

			return false;

		}, 400 );


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

// Postcode lookup, dealers lookup

var formatAddress = function( addrObj, skip ) {

	var skip	= skip || [];
	var address	= new String();

	// Strip unwanted values

	for( var i = 0; i < skip.length; i++ ) {

		var key = skip[ i ];

		delete addrObj[ key ];

	}

	// Construct string

	for( var key in addrObj ) if( ! _.isEmpty( addrObj[ key ] ) ) address += addrObj[ key ] + ', ';

	address = address.substr( 0, address.length - 2 );

	return address;

}

var handlePostcode = function( e ) {

	var postcode = $( '#postcode' ).val();

	// Enable fields

	$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

	// Get home addresses

	logic.getAddresses( postcode ).then( function( addresses ) {

		// Store addresses

		addressObj = addresses;

		formattedAddresses = [];

		// Remove existing addresses

		$( form.addressChooser ).contents().remove();

		// Construct address strings

		$( addresses ).each( function( i, addr ) {

			var address = new String();

			for( var key in addr ) if( ! _.isEmpty( addr[ key ] ) ) address += addr[ key ] + ', ';

			address = address.substr( 0, address.length - 2 );

			formattedAddresses.push( { id: i, address: address } );

		} );

		// Render template

		ui.getTpl( 'addresses' ).then( function( tpl ) {

			$( form.addressChooser ).append( ui.renderTpl( tpl, { addresses: formattedAddresses } ) );

			// We must add this field to the validator manually because it's dynamically created

			$( form.addresses ).rules( 'add', {

				required: true,
				messages: {

					required: 'Please select your address from the list.'

				}

			} );

		} );

	} );

	// Get dealers

	logic.getDealers( postcode ).then( function( dealers ) {

		// Store addresses

		dealersObj = dealers;

		formattedDealers = [];

		// Remove existing addresses

		$( form.dealerChooser ).contents().remove();

		// Construct address strings

		$( dealers ).each( function( i, addr ) {

			var address = formatAddress( addr );

			formattedDealers.push( { id: i, dealer: address } );

		} );

		// Render template

		ui.getTpl( 'dealers' ).then( function( tpl ) {

			$( form.dealerChooser ).append( ui.renderTpl( tpl, { dealers: formattedDealers } ) );

			// We must add this field to the validator manually because it's dynamically created

			$( form.dealers ).rules( 'add', {

				required: true,
				messages: {

					required: 'Please select your nearest dealer.'

				}

			} );

		} );

	} );

}

$( '#postcode' ).on( 'keyup', function( e ) {

	// Fire only when alphanumeric keys are pressed

	if( e.which <= 90 && e.which >= 48 ) {

		clearTimeout( postcodeTimer );

		postcodeTimer = setTimeout( handlePostcode, 600 );

	}

} );

$body.on( 'change', form.addresses, function( e ) {

	var address	= addressObj[ $( this ).val() ];

	if( ! _.isEmpty( $( this ).val() ) ) {

		$( form.address1 ).val( formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
		$( form.address2 ).val( address.Town );
		$( form.address3 ).val( address.County );

	}

	else {

		$( form.address1 ).val( null );
		$( form.address2 ).val( null );
		$( form.address3 ).val( null );

	}

} );

// Handle AJAX form results

var $thanks = $( '#thanks-left, #thanks-right' );
var $formContent = $( '.form-content' );

$thanks.hide();

$.subscribe( 'form-ajax-results', function( e, data ) {

	console.log( data );

	$formContent.slideUp( 600 );
	$thanks.slideDown( 600 );

	alert( 'Thanks! Data has been logged to the console.' );

} );





