// Plugins

jQuery.fn.removeClassExcept = function ( val ) {

	return this.each( function( index, el ) {
		
		var keep = val.split( ' ' );
		var reAdd = [];
		var $el = $(el);
	
		for( var c = 0; c < keep.length; c++ ) {

			if( $el.hasClass( keep[ c ] ) ) reAdd.push( keep[ c ] );

		}

	
		$el.removeClass().addClass( reAdd.join( ' ' ) );
	
	} );

};

jQuery.fn.removeClassBeginningWith = function( className ) {

	return this.each( function() {

		var el = this;

		$( this.classList ).each( function( i, c ) {

			if( c.indexOf( className ) === 0 )

			$( el ).removeClass( c );

		} );

	} );

};