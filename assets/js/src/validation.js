$.validator.setDefaults( {

	showErrors: function( errors, elements ) {

		if( elements.length > 0 ) {

			$( elements ).each( function( i, el ) {

				// Add the .error class to the element

				var el				= el.element;
				var elementType		= el.tagName.toLowerCase();					

				if( elementType === 'select' ) {

					$( el ).parent().addClass( 'error' );

				}
				
				else {

					$( el ).addClass( 'error' );

				}

				// Validate the fields here

				console.log( el );
				console.log( errors[ el.name ] );

			} );

		}

	},

	submitHandler: function( form ) {

		var ajaxURL = $( form ).attr( 'action' ),
			ajaxDelay = 1000; // Not needed but included here to illustrate the loading DIV behaviour

		var ajaxRequest = function() {
			
			var formData = {
					info: $( 'form' ).serializeObject(),
					car: carCode,
					input: store.get( 'miniInput' )
				};
			
			var json = JSON.stringify(formData);
			
			var token = $('input[name="__RequestVerificationToken"]').val();
			$.ajax( {
				type: 'POST',
				url: ajaxURL,
				contentType: 'application/json',
				data: json,
				headers: { "__RequestVerificationToken": token },
				/*
				dataType: 'json',
				*/
				complete: function() {

					$( form ).toggleClass( 'busy' );

				},
				success: function( data ) { $.publish( 'form-ajax-results', data ); },
				error: function (request, error) {
					alert(error);
					//var response = JSON.parse(error.responseText);
				},
				beforeSend: function() { if( Mini.settings.debug ) console.log( 'Submitting form to: ' + ajaxURL ); } // Feel free to remove this if not needed

			} );	

		};

		// Disable the form to prevent accidental submission while the request is pending

		$( form ).toggleClass( 'busy' );

		// Perform the call

		setTimeout( function() { ajaxRequest(); }, ajaxDelay );			

	},

	ignore: false,

	onkeyup: function( el ) {

		$( el ).removeClass( 'error' );
		$( el ).parent().removeClass( 'error' );
		$( el ).closest( '.form-control' ).find( '.form-error' ).remove();

	},
	onfocusout: function( el ) {

		$( el ).removeClass( 'error' );
		$( el ).parent().removeClass( 'error' );
		$( el ).closest( '.form-control' ).find( '.form-error' ).remove();

	}

} );