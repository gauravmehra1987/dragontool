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

		finance.payment = Number(finance.payment).toFixed(2);
		finance.price = Number(finance.price).toFixed(2);
		finance.deposit = Number(finance.deposit).toFixed(2);
		finance.contribution = Number(finance.contribution).toFixed(2);
		finance.purchase_fee = Number(finance.purchase_fee).toFixed(2);
		finance.final_payment = Number(finance.final_payment).toFixed(2);

		finance.total_deposit	= Number(Number(finance.deposit) + Number(finance.contribution)).toFixed(2);
		finance.total_amount	= Number(finance.total_amount).toFixed(2);
		finance.credit_charge 	= Number(finance.credit_charge).toFixed(2);
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

		var postcode = $( '#postcode_search' ).val();

		// Get home addresses

		formLogic.getAddresses( postcode ).then( function( addresses ) {

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

				//console.log(address);
				formattedAddresses.push( { id: i, address: address } );

				//console.log(formattedAddresses.length);

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

			$( form.address1 ).val( _this.formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
			$( form.address2 ).val( address.Town );
			$( form.address3 ).val( address.County );
			$( form.postcode ).val( address.Postcode );

		}

		else {

			$( form.address1 ).val( null );
			$( form.address2 ).val( null );
			$( form.address3 ).val( null );
			$( form.postcode ).val( null );

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

		$( '#postcode_search' ).on( 'change keyup input', function( e ) {
			_this.postcodeStuff( e );
		});

	}


	this.init = function() {

		_this.eventListeners();
		_this.ajaxFormResults();
		_this.activateForms();

	}

}