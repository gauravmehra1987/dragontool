function sharing() {

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
	
}

// TODO: Needs to use only one renderer to avoid WARNING: Too many active WebGL contexts. Oldest context will be lost.

function teleport( image ) {

	var carImage            = image;
	var displacementImage   = 'assets/img/teleport-scanlines.jpg';

	var maxDistortion       = 50;
	var minDistortion       = 2;

	var count				= 0;
	var skip				= false;

	var renderer            = PIXI.autoDetectRenderer();

	var stage               = new PIXI.Stage( 0x000000, true );
	var sceneContainer      = new PIXI.DisplayObjectContainer();

	var bg                  = PIXI.Sprite.fromImage( carImage );
	var displacementTexture	= PIXI.Texture.fromImage( displacementImage );

	var scanlines			= new PIXI.DisplacementFilter( displacementTexture );

	scanlines.scale.x = maxDistortion;
	scanlines.scale.y = _.random( minDistortion );

	stage.addChild( sceneContainer );

	sceneContainer.addChild( bg );
	sceneContainer.filters = [ scanlines ];

	requestAnimFrame( animate );

	function animate() {
		
		count += 1;

		if( count % 180 === 0 || count % 120 === 0 ) {

			scanlines.scale.x = maxDistortion;
			scanlines.scale.y = maxDistortion;

		}

		else {

			 if( scanlines.scale.x <= maxDistortion && scanlines.scale.x > minDistortion ) {

				scanlines.scale.x -= 10;
				scanlines.scale.y = _.random( minDistortion );

			}

		}

		scanlines.offset.y = count * 10;
		scanlines.offset.x = count * 10;
		
		renderer.render(stage);
		requestAnimFrame( animate );

	}

	renderer.view.id = 'car-teleport';

	return renderer.view;

}