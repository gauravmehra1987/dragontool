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

jQuery.fn.serializeObject = function() {
    
    var o = {};
    var a = this.serializeArray();

    $.each( a, function() {
        
        if( o[ this.name ] !== undefined ) {

            if( ! o[ this.name ].push ) o[ this.name ] = [ o[ this.name ] ];

            o[ this.name ].push( this.value || '');

        }

        else { o[ this.name ] = this.value || ''; }
    } );

    return o;

};


//touch click helper

jQuery.fn.tclick = function ( onclick ) {

	this.bind( "touchstart", function ( e ) {
		onclick.call( this, e );
		e.stopPropagation();
		e.preventDefault();
	});

	this.bind( "click", function ( e ) {
		onclick.call(this, e);
	}); // substitute mousedown event for exact same result as touchstart    

	return this;
};


// Other helpers...


// Run a function when the element exists
function runWhenElementExsists( element, functionToRun ) {

	var interval = setInterval( function() {

		if ( $(element).length > 0 ) {

			functionToRun();

			clearInterval(interval);
		}

	}, 500);
}


function getQueryParameter( name ) {

    name = name.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );

    var regex	= new RegExp( "[\\?&]" + name + "=([^&#]*)" );
    var results	= regex.exec(location.search);
    
    return results === null ? "" : decodeURIComponent( results[ 1 ].replace( /\+/g, " " ) );

}