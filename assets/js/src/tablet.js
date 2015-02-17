// Tablet JS

$( '#tablet-toggle' ).on( 'click', function( e ) {

	e.preventDefault();

	$( '.layout > .column.left' ).toggleClass( 'open' );

} );

// Set correct height for all of the dashboard elements

$( window ).on( 'load resize', function() {

	$( '#page-home .layout, #dash' ).height( $( window ).innerHeight() - ( $( '.layout-header' ).height() + 4 ) );

} );