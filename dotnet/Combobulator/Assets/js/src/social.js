( function( Mini ) {
	
	$body.on( 'click', '.js-sharer li a', function( e ) {

		e.preventDefault();

		var $link		= $( this );
		var website		= $( this ).parent();
		var title		= website.attr( 'title' );
		var currentURL	= location.href;

		switch( $( website ).attr( 'class') ) {

			case 'facebook':

				FB.ui( {
					
					method: 'share',
					href: currentURL,

				},

				function( response ) {

					console.log( response );

				} );

			break;

			case 'twitter':

				var hashtags = website.data( 'hashtags' );

				if( hashtags === undefined ) hashtags = '';

				window.open( 'https://twitter.com/intent/tweet?url=' + currentURL + '&hashtags=' + hashtags, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' );

			break;

			case 'gplus':

				window.open( 'http://plus.google.com/share?url=' + currentURL, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' );

			break;

			case 'print': window.print(); break;
			
			case 'mail':

				dialog( 'Please enter your friend\'s e-mail address.', 'prompt', function() {

					var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				
					if( regex.test( this ) ) {

						window.location.href = 'mailto:' + this + '?subject=Check this out&body=Hello there, I thought you\'ll find it interesting: ' + currentURL;

					}
					else{

						dialog( 'The e-mail address seems invalid. Please try again.' );

					}

				} );

			break;

		}

	} );

} )( Mini );