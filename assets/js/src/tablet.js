// Tablet JS

$( '#tablet-toggle' ).on( 'click', function( e ) {

	e.preventDefault();

	$( '.layout > .column.left' ).toggleClass( 'open' );

} );