$( '#terms-link' ).on( 'click', function( e ) {

	e.preventDefault();

	var _this	= this;
	var target	= $( this ).attr( 'href' );
	var $close	= $( target ).find( '.close' );

	$( 'html' ).removeClass( 'terms-visible' ).addClass( 'terms-visible' );

	$close.on( 'click', function( e ) {

		e.preventDefault();

		$( 'html' ).removeClass( 'terms-visible' );

	} );

} );