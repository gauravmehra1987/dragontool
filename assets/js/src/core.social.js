function SocialMedia() {

	// Facebook

	var facebook = function( website ) {

		// Direct post

		if( $( website ).data( 'fb-mode' ) === 'direct' ) {

			FB.login( function( data ) {
			
				if( data.authResponse ) {

					FB.api(

						'/me/feed',
						'POST',
						socialMedia.facebook,
						function ( data ) {

							( data.error ) ? alert( data.error.error_user_msg ) : alert( 'Thanks! Posting completed.' );

						}

					);

				}

				else { alert( 'We couldn\'t authorise you. Sorry for the inconvenience.' ); }

			}, {

				scope: 'publish_actions',
				return_scopes: true

			} );

		}

		// Or just a share dialog

		else {

			FB.ui( {

				method:	'share',
				href:	socialMedia.facebook.link,

			},
			function( response ) {
			
				if( response && ! response.error_code ) {
				
					alert( 'Thanks! Posting completed.' );

				}

				else {

					alert( 'We couldn\'t post to your wall.' );
				}

			} );

		}

	}

	// Twitter

	var twitter = function( website ) {

		var hashtags		= ( socialMedia.twitter.hashtags !== undefined ) ? socialMedia.twitter.hashtags : '';
		var twitterShareURL	= 'https://twitter.com/intent/tweet?' + 'hashtags=' + hashtags + '&text=' + socialMedia.twitter.text + '&url=' + socialMedia.twitter.url;

		window.open( twitterShareURL, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' );

	}

	// Bind clicks

	$body.on( 'click', '.js-sharer li a', function( e ) {

		e.preventDefault();

		var website = $( this ).parent();

		switch( $( website ).attr( 'class') ) {

			case 'facebook': facebook( website ); break;

			case 'twitter': twitter( website ); break;

		}

	} );
	
}