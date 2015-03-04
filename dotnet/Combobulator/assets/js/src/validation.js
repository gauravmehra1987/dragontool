$.validator.setDefaults( {

	showErrors: function( errors, elements ) {

		if( elements.length > 0 ) {

			$( elements ).each( function( i, el ) {

				// Add the .error class to the element

				var el = el.element,
					elementType = el.tagName.toLowerCase();					

				if( elementType === 'select' ) {

					$( el ).parent().addClass( 'error' );

				}
				
				else {

					$( el ).addClass( 'error' );

				}

				// Validate the fields here

				console.log( el );

			} );

		}

	},

	submitHandler: function( form ) {

		var ajaxURL = $( form ).attr( 'action' ),
			ajaxDelay = 1000; // Not needed but included here to illustrate the loading DIV behaviour

		var ajaxRequest = function() {

			$.ajax( {

				type: 'POST',
				// async: false,
				url: ajaxURL,
				data: $( form ).serialize(),
				dataType: 'json',
				complete: function() {

					$( form ).toggleClass( 'busy' );

				},
				success: function( data ) { $.publish( 'form-ajax-results', data ); },
				error: function( xhr ) {

					alert( 'Couldn\'t submit the form with AJAX, returning XHR object to the console:' );
					console.log( xhr );

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