( function( Mini ) {
	
	$body.on( 'click', '.js-sharer li a', function( e ) {

		e.preventDefault();

		var $link		= $( this );
		var website		= $( this ).parent();
		var title		= website.attr( 'title' );
		var currentURL	= location.href;

		switch( $( website ).attr( 'class') ) {

			case 'facebook':

				// Direct post

				if( $( website ).data( 'fb-mode' ) === 'direct' ) {

					FB.login( function( data ) {
					
						if( data.authResponse ) {

							FB.api(

								'/me/feed',
								'POST',
								social.facebook,
								function ( data ) {					

									console.log( data );

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
						href:	social.facebook.link,

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

			break;

			case 'twitter':

				var hashtags		= ( social.twitter.hashtags !== undefined ) ? social.twitter.hashtags : '';
				var twitterShareURL	= 'https://twitter.com/intent/tweet?' + 'hashtags=' + hashtags + '&text=' + social.twitter.text + '&url=' + social.twitter.url;

				window.open( twitterShareURL, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' );

			break;

		}

	} );

} )( Mini );