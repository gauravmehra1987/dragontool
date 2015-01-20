( function( Mini ) {

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

				} );

				if( Mini.settings.debug ) {

					console.warn( 'The following form inputs have errors:' );

					$( elements ).each( function( i, el ) {

						$( el.element ).closest( '.form-control' ).append( '<span class="form-error">' + el.message + '</span>' );

					} );

				}

			}

		},

		submitHandler: function( form ) {

			var ajaxURL = $( form ).attr( 'action' ),
				ajaxDelay = 1000; // Not needed but included here to illustrate the loading DIV behaviour

			var ajaxRequest = function() {

				$.ajax( {

					type: 'POST',
					async: false,
					url: ajaxURL,
					data: $( form ).serialize(),
					dataType: 'json',
					complete: function() {

						$( form ).toggleClass( 'busy' );

					},
					success: function( data ) {

						if( Mini.settings.debug ) {

							console.log( 'Successfully submitted form to: ' + ajaxURL );
							console.log( data );

						}

						// Process data here

						// This is for mobile, so the form stays in view

						$( 'html, body' ).animate( {

							scrollTop: $( form ).offset().top

						}, 200 );

					},
					error: function( xhr ) {

						if( Mini.settings.debug ) {

							console.log( 'Couldn\'t submit the form with AJAX, returning XHR object:' );
							console.log( xhr );

						}

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

} )( Mini );