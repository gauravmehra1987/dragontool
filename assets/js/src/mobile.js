// FastClick

if( 'addEventListener' in document ) { document.addEventListener('DOMContentLoaded', function() { FastClick.attach( document.body ); }, false ); }

// Mobile

if( Mini.browser.mobile ) {

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
// Tablet
$(".tablet-only.arrow").click(function() {
	
    $(this).toggleClass("chevron-first chevron");      //toggle second section up and down
    $(".column.left").toggleClass("slideup");
    if ($('.column.left').hasClass('slideup') === true) {
	$(".layer").css('opacity', '0.5'); 
 } else {
 	$(".layer").css('opacity', '0');
 }

});
 }

