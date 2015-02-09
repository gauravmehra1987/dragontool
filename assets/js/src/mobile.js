// FastClick

if( 'addEventListener' in document ) { document.addEventListener('DOMContentLoaded', function() { FastClick.attach( document.body ); }, false ); }

// Mobile toggling

$( '.control-title' ).click( function( e ) {

	e.preventDefault();
	
	$( this ).toggleClass( 'open' );
	
	// Light

	var $light	= $( this ).find( '.light' );
	var color	= $( '.car-link' ).css( 'border-color' );

	if( $( this ).hasClass( 'open' ) ) {

		$light.addClass( 'switch-light' );
		$.publish( 'colour-change', color );

	}

	else {

		$light.removeClass( 'switch-light' );
		$light.removeAttr( 'style' );

	}

} );