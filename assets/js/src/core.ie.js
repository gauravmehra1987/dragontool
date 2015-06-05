// IE class

function IE() {

	// Some variables

	var slots	= [

		'#c-bums #roller1',
		'#c-bums #roller2',
		'#c-bums #roller3',
		'#c-bums #roller4',
		'#c-bums #roller5',
		'#c-speed .control.speed'

	];

	// Actual functions

	var obj = {

		loadFallbacks: function() {

			return ( Mini.browser.isIE( '<=9' ) && Mini.browser.isIE() );

		},

		polyfills: function() {

			console.log( 'Loading IE polyfills' );

			$( '#dash' ).addClass( 'ie-fallbacks' );

			if( typeof String.prototype.trim !== 'function' ) {

				String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

			}

		},

		flow: function() {

			// Mark document with browser version

			document.querySelector( 'html' ).className += ' oldie ie' + parseInt( Mini.browser.version );

			// Unwrap select elements

			$( '.checkbox > input' ).unwrap();

			// Do your stuff here

			ui.loadSVGs();

			$sys.remove();

			$( '.control.start .shape' ).on( 'click', function() { $( '#start' ).trigger( 'click' ); } );


		},

		rollers: {

			getSeats: function() {

				var values = [];

				$( _.initial( slots ) ).each( function( i, slot ) {

					var value	= $( slot ).find( '.active' ).data( 'value' ) || $( slot ).find( '.active' ).text();
					var v		= ( value === 'Empty' ) ? 0 : value;

					values.push( v );

				} );

				return values;

			},

			getSpeed: function() {

				return $( _.last( slots ) ).find( '.active' ).data( 'value' );

			},

			init: function() {

				// Remove reset button

				$( '#reset' ).remove();

				$( slots ).each( function( i, slot ) {

					var $slot = $( slot );
					var $list = $slot.find( '.list' );

					// Remove unnecessary elements

					$slot.find( '.fake-list, .item-extra, .bumper' ).remove();

					// Change slot class

					$list.addClass( 'list-static' ).removeClass( 'list' );

					// Set active items

					$slot.find( '.item:first' ).addClass( 'active' );

					// Bind events

					$list.on( 'click', function() {

						$( '.list-static' ).not( this ).removeClass( 'open' );

						$( this ).toggleClass( 'open' );

					} );

					$list.find( '.item' ).on( 'click', function( e ) {

						e.preventDefault();

						$( this ).addClass( 'active' ).siblings().removeClass( 'active' );

					} );

				} );

			}

		},

		speed: {

			init: function() {}

		},

		lifestyle: {

			w: $( '#c-lifestyle .window .items-wrapper' ),

			init: function() {

				this.w.addClass( 'ie-friendly' );

			},

			get: function() {

				var className = $( '.items-wrapper .item:first' ).attr( 'class' ).replace( 'item ', '' );

				return className;

			},

			next: function() {

				console.log( 'next' );

				var $items	= this.w.find( '.item' );
				var $first	= $items.filter( ':first' );
				var $last	= $items.filter( ':last' );

				$first.insertAfter( $last );

			},

			prev: function() {

				console.log( 'prev' );

				var $items	= this.w.find( '.item' );
				var $first	= $items.filter( ':first' );
				var $last	= $items.filter( ':last' );

				$last.insertBefore( $first );

			},

		}

	};

	// Initialize class

	if( obj.loadFallbacks() ) {

		obj.polyfills();

		$( document ).on( 'ready', function() { obj.flow(); } );

	}
	
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i += 1) {
		  if (this[i] === obj) { return i; }
		}
		return -1;
	  }
	}


	// Return function

	return obj;

}