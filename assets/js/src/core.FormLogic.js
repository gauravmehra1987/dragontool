function FormLogic() {

	// Initalize vars
	var _this = this;	


	/**
     * Gets addresses from a given postcode
     * @param {String} postcode
     * @return {Object} address options
    */
	this.getAddresses = function( postcode ) {

		return $.when( 

			$.ajax( {

				url:		path.apiPostcode,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data ) { return data; } );

	}


	/**
     * Gets a list of nearest dealers from a given postcode
     * @param {String} postcode
     * @return {Object} dealer address options
    */
	this.getDealers = function( postcode ) {

		return $.when( 

			$.ajax( {

				url:		path.apiDealers,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data ) { return data; } );

	}


	/**
     * Returns finance options for a selected car - used within the terms and conditions
     * @param {String} code of the car
	 * @return {Object} finance details
    */
	this.getFinance = function( code ) {

		var car			= dashboardLogic.getCarByCode( code );
		var finance		= car.finance;

		finance.total_deposit	= finance.deposit + finance.contribution;
		finance.total_amount	= finance.price + finance.credit_charge;
		finance.terms			= car.terms;

		return finance;

	}


	/**
     * Postcode lookup, dealers lookup
     * @param {Object} Address
     * @param {String?} Skip
	 * @return {Object} Address
    */
	this.formatAddress = function( addrObj, skip ) {

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


	/**
     * Handle postcode
     * @param {Event} Event
	 * @return { } ??
    */
	this.handlePostcode = function( e ) {

		var postcode = $( '#postcode' ).val();

		// Enable fields

		$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

		// Get home addresses

		formLogic.getAddresses( postcode ).then( function( addresses ) {

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

		formLogic.getDealers( postcode ).then( function( dealers ) {

			// Store addresses

			dealersObj = dealers;

			formattedDealers = [];

			// Remove existing addresses

			$( form.dealerChooser ).contents().remove();

			// Construct address strings

			$( dealers ).each( function( i, addr ) {

				var address = _this.formatAddress( addr );

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


	this.addressStuff = function( e ) {

		var $target = $(e.target);

		var address	= addressObj[ $target.val() ];

		if( ! _.isEmpty( $target.val() ) ) {

			$( form.address1 ).val( _this.formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
			$( form.address2 ).val( address.Town );
			$( form.address3 ).val( address.County );

		}

		else {

			$( form.address1 ).val( null );
			$( form.address2 ).val( null );
			$( form.address3 ).val( null );

		}
	}

	this.postcodeStuff = function( e ) {

		// Fire only when alphanumeric keys are pressed

		if( e.which <= 90 && e.which >= 48 ) {

			clearTimeout( postcodeTimer );

			postcodeTimer = setTimeout( this.handlePostcode, 600 );

		}

	}

	// Handle AJAX form results
	this.ajaxFormResults = function() {

		var $thanks = $( '#thanks-left, #thanks-right' );
		var $formContent = $( '.form-content' );

		$thanks.hide();

		$.subscribe( 'form-ajax-results', function( e, data ) {

			console.log( data );

			$formContent.slideUp( 600 );
			$thanks.slideDown( 600 );

			alert( 'Thanks! Data has been logged to the console.' );

		} );

	}


	/**
	 * Activate forms
	*/
	this.activateForms = function() {
		// Validate forms
		$( 'form' ).validate();

		// Handle successful form submission
		$.subscribe( 'form-ajax-results', function( e, data ) {

			if( data.success ) { ui.showPanel( 'thanks' ); }

		} );
	}


	this.eventListeners = function() {

		$body.on( 'change', form.addresses, function( e ) {
			_this.addressStuff( e );
		});

		$( '#postcode' ).on( 'keyup', function( e ) {
			_this.postcodeStuff( e );
		});

	}


	this.init = function() {

		_this.eventListeners();
		_this.ajaxFormResults();
		_this.activateForms();

	}

}