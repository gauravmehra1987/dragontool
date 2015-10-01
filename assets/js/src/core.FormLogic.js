function FormLogic() {

	// Initalize vars
	var _this = this;



	/**
     * Color changer
     * Any color passed in, will change all the nessisary elements back ground colors/paths/strokes/borders etc
     * @param {String} Color
    */
	this.colors = function( color ) {
		//
		// Background colors
		$( '.switch-bg' ).css({
			'background-color':	color
		});
	}


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

		).then( function( data, textStatus, jqXHR ) {

			if ( jqXHR.status === 200) { return data; };

		} );

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

		finance.name = car.name;

		var _fields = [
			'payment', 'price', 'deposit', 'contribution', 'purchase_fee', 'credit_charge',
			'final_payment', 'dealer_discount', 'total_deposit', 'total_amount'
		];

		for( i=0; i<_fields.length; i++ ) {
			var param = _fields[i];
			finance[ param ] = _this.numberWithCommas(
				Number( finance[param] ).toFixed(2)
			);
		}

		finance.terms = car.terms;

		return finance;
	}

	this.numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

		console.log(address);

		return address;

	}



	/**
     * Format dealers addresses
     * @param {Object} Address
	 * @return {Object} Address
    */
	this.formatDealerAddresses = function( addrObj ) {

		var address	= new String();

		// Construct string

		for ( var key in addrObj ) {

			if ( ! _.isEmpty( addrObj[ key ] ) ) {

				if ( key === 'Name' ) {

					address += addrObj[ key ] + ', ';

				}
				else if (key === 'Address') {

					var parts = addrObj[ key ].split(';');
					address += parts.slice(Math.max(parts.length - 2, 1)).join(', ') + ', '

				}

			}
		}

		address = address.substr( 0, address.length - 2 );

		return address;

	}



	/**
     * Handle postcode
     * @param {Event} Event
	 * @return { } ??
    */
	this.handlePostcode = function( e ) {

		var postcode = $( '#postcode_search' ).val();

		// Get home addresses

		formLogic.getAddresses( postcode ).then( function( addresses ) {

			if ( addresses === null ) { return; };

			// Enable fields

			$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

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

				$('.loader-inline').removeClass('active');

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

				var address = _this.formatDealerAddresses( addr );
				var dealerId = addr.DealerId;
				formattedDealers.push( { id: dealerId, dealer: address } );

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

		console.log(address.Postcode);

		if( ! _.isEmpty( $target.val() ) ) {

			var postcode_search = $( '#postcode_search' ).val();

			//$( form.address1 ).val( _this.formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
			$( form.address1 ).val( address.Address1 );
			$( form.address2 ).val( address.Address2 );
			$( form.address3 ).val( address.Address3 );
			$( form.town ).val( address.Town );
			$( form.postcode ).val( postcode_search );

		}

		else {

			$( form.address1 ).val( null );
			$( form.address2 ).val( null );
			$( form.address3 ).val( null );
			$( form.town ).val( null );
			$( form.postcode ).val( null );

		}
	}


	this.postcodeStuff = function( e ) {

		e.preventDefault();

		$('#postcode_search').validate();

		if ( $('#postcode_search').valid() )  {

			$(e.target).next('.loader-inline').addClass('active');

			postcodeTimer = setTimeout( this.handlePostcode, 600 );

		};

	}

	// Format phone number
	this.phoneNumber = function( e ) {

		var phone_number = $(e.target).val();
		phone_number = phone_number.replace(/[\s().-]+/g, '');

		$(e.target).val( phone_number );
	}


	// Handle AJAX form results
	this.ajaxFormResults = function() {

		var $thanks = $( '.thanks-content' );
		var $formContent = $( '.form-content' );

		$thanks.hide();
		// $formContent.hide();

		$.subscribe( 'form-ajax-results', function( e, data ) {

			console.log( data );

			$formContent.slideUp( 600 );
			$thanks.slideDown( 600 );

		} );

	}


	/**
	 * Activate forms
	*/
	this.activateForms = function() {
		//
		// Activate the color of submit button
		dashboard.activateDashColor();
		//
		// Validate forms
		$( 'form' ).validate();
		// Handle successful form submission
		$.subscribe( 'form-ajax-results', function( e, data ) {
			if( data.success ) {
				ui.showPanel( 'thanks' );
			} else {
				ui.showPanel( 'error' );
			}

		} );
	}


	this.eventListeners = function() {

		$body.on( 'change', form.addresses, function( e ) {
			_this.addressStuff( e );
		});

		$body.on( 'click', form.addressLookup, function( e ) {
			_this.postcodeStuff( e );
		});

		$('input').bind('keydown', function( e ) {
			if (e.which === 13) {
				e.stopPropagation();
				e.preventDefault();

				$(this).nextAll('input').eq(0).focus();
			}
		});

		$('#tel_home').on('blur', function( e ) {
			_this.phoneNumber( e );
		});
	}

	this.validateStoredInput = function() {
		console.log(store.get( 'miniInput' ));
		if (store.get( 'miniInput' ) === undefined && window.location.href.indexOf('/form') != -1) {

			window.location.href=window.location.href.replace('/form', '');

		}

	}

	this.enableUserTracking = function() {
		$('#results_recombobulate a,#results_back a').attr('href', '/' + window.location.search);
	}


	this.init = function() {
		_this.validateStoredInput();
		_this.enableUserTracking();
		_this.eventListeners();
		_this.ajaxFormResults();
		_this.activateForms();

	}

}