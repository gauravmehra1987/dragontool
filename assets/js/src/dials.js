function Dials() {

	// Rollers

	this.roller = function( slot ) {

		var $list		= $( slot ).siblings( '.list' );
		var slotHeight	= $list.find( '.item:nth-child( 2 )' ).height();
		var listHeight	= slotHeight * ( $list.find( '.item' ).length - 1 );

		var reset = function() {

			var _this = this;

			TweenLite.to( this.$slot.get( 0 ), 0.6, {

				y: 0,
				onComplete: function() { _this.update(); }

			} );

			this.$list.find( '.item' ).removeClass( 'active' );
			this.$list.removeClass( 'dragging' ).removeAttr( 'style' );

			this.update();

		}

		var getSlotValue = function() {

			var activeSlot		= getSlotState( this.y, slotHeight, 0 );
			var $slot			= $list.find( '.item' ).eq( activeSlot );
			var value			= $slot.data( 'value' ) || $slot.text();

			return ( value === 'Empty' ) ? 0 : value;

		}

		var getSlotState = function( pos, height, padding ) {

			var currentPosition = Math.abs( pos );
			var activeSlot		= Math.ceil( currentPosition / height );

			return Math.ceil( activeSlot ) + 1;

		}

		$( slot ).height( listHeight ); // Make fake list the same height as the real one


		// Initialize Draggable

		var slot_dial = new Draggable( slot, {

			type:			'y',
			bounds:			$( slot ).parent(),
			edgeResistance:	1,
			throwProps:		true,
			onDrag:			function() {

				var activeSlot		= getSlotState( this.y + 40, slotHeight, 0 );
				var $active			= $list.find( '.item' ).removeClass( 'active' ).eq( activeSlot ).addClass( 'active' );

				$list.addClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.y + 'px, 0px )' } );

			},
			onDragEnd:		function() { $list.removeClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.endY + 'px, 0px )' } ); },
			snap:			function( endValue ) { return Math.round( endValue / slotHeight ) * slotHeight; }

		} );

		slot_dial.getValue	= getSlotValue;
		slot_dial.reset		= reset;
		slot_dial.$list		= $list;
		slot_dial.$slot		= $( slot );

		return slot_dial;

	}

	// Luggage

	this.luggage = function() {

		var luggage_end		= 0;
		var luggage_el		= document.querySelector( '.control.luggage .dial' );
		var luggage_snap	= 360 / 4;

		var getLuggage = function() { return $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim(); }

		var bindEvents = function() {

			$( '.control.luggage .arrows' ).on( 'mousedown mouseup touchstart touchend', function( e ) {

			e.preventDefault();

				( e.type === 'mousedown' ) ? $( this ).removeClass( 'right left' ).addClass( e.target.id ) : $( this ).removeClass( 'right left' );

			} );

			$( '#left, #right' ).on( 'click', function( e ) {

				e.preventDefault();

				// Remove all classes

				$( luggage_el ).removeClassExcept( 'dial' );

				var $dial		= $( '.control.luggage .dial' );
				var direction	= e.target.id;
				var nr			= ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;

				// Move to the initial position

				TweenLite.to( luggage_el, 1, { rotation: nr, onComplete: function( v ) { dialClass( nr ); } } );

				// Update rotation & value

				luggage_dial.update();
				luggage_end = nr;

			} );

		}

		var dialClass = function( r ) {

			var dial_class	= ( ( ( r / luggage_snap ) % luggage_snap ) % 4 );

			if( dial_class === -1 || dial_class === 3 ) { final_class = 'light-packer'; } // light packer
			if( dial_class === -2 || dial_class === 2 ) { final_class = 'lugger'; } // lugger
			if( dial_class === -3 || dial_class === 1 ) { final_class = 'big-loader'; } // big loader
			if( dial_class === 0 ) { final_class = 'minimalist'; } // minimalist
				
			$( luggage_el ).removeClassExcept( 'dial' ).addClass( final_class );

		}

		var luggage_dial	= new Draggable( luggage_el, {

			type:				'rotation',
			throwProps: 		true,
			onThrowComplete:	function() { dialClass( parseInt( this.endRotation ) ); },
			onDragStart:		function( e ) { $( luggage_el ).removeClassExcept( 'dial' ); }, // Remove all classes
			onDragEnd:			function( e ) { luggage_end = parseInt( this.endRotation ); }, // Update luggage_end
			snap:				function( endValue ) { return Math.round( endValue / luggage_snap ) * luggage_snap; }

		} );

		bindEvents();

		luggage_dial.getLuggage = getLuggage;

		return luggage_dial;

	},

	// Options

	this.options = function() {

		this.getOptions = function() {

			var $inputs	= $( '.control.options input:checked' );
			var values	= {};

			$inputs.each( function( i, el ) { values[ $( this ).attr( 'id' ) ] = parseInt( $( this ).val() ); } );

			if( Object.keys( values ).length <= 0 ) values = false;

			return values;

		}

	}

	// Lifestyle

	this.lifestyle = function() {

		var getLifestyle = function() { return $( '#c-lifestyle .slick-slide.slick-active' ).attr( 'data-value' ); }

		var lifestyle_el		= document.querySelector( '.control.lifestyle .dial' );
		var lifestyle_bounds	= 5;
		var lifestyle_bounds	= 45;

		var lifestyle_direction;
		
		var $slick = $( '.items-wrapper' ).slick( {

			arrows:				false,
			infinite:			true,
			slide:				'.item',
			onAfterChange:		function() { lifestyle_dial.enable(); }

		} );

		var lifestyle_dial = new Draggable( lifestyle_el, {

			type:			'rotation',
			bounds:			{ minRotation: -lifestyle_bounds, maxRotation: lifestyle_bounds },
			throwProps:		true,
			snap:			function( endValue ) { return true; },
			onDragStart:	function() { lifestyle_direction = Math.abs( this.y ); },
			onDragEnd:		function() {

				// Determine direction

				var direction = ( Math.abs( this.y ) > lifestyle_direction ) ? 'right' : 'left';

				// Move content in the window

				( direction === 'right' ) ? $slick.slick( 'slickPrev' ) : $slick.slick( 'slickNext' );

			}

		} );

		lifestyle_dial.getLifestyle = getLifestyle;

		return lifestyle_dial;

	}

	// MPG knob

	this.mpg = function() {

		var mpg_el		= document.querySelector( '.control.mpg .arrow' );
		var mpg_bounds	= 120;
		var mpg_steps	= 13;
		var mpg_min		= 25;
		var mpg_max		= 80;
		var mpg_snap	= 360 / 18;

		var getMpg = function() { return dialMpg._value; }
		
		var dialMpg = new Draggable( mpg_el, {

			type:	'rotation',
			bounds:	{ minRotation: -mpg_bounds, maxRotation: mpg_bounds },
			onDrag:	function() {

				var actual_value	= ( this.rotation + mpg_bounds ) / ( mpg_bounds * 2 );
				var css_name		= parseInt( ( actual_value + ( 1 / ( mpg_steps * 2 ) ) ) * mpg_steps );
				var diff			= mpg_max - mpg_min;
				var v				= parseInt( mpg_min + ( actual_value * diff ) );

				// Update object value

				this._value = v;

				// Update CSS classes

				$( '.control.mpg' ).removeClassExcept( 'control mpg' ).addClass( 'control mpg scale-' + css_name );
				$( '#mpg_value' ).text( v );

			},

		} );

		// Move to the initial position

		TweenLite.set( mpg_el, { rotation: -mpg_bounds } );

		// Update rotation & value

		dialMpg.update();
		dialMpg._value = mpg_min;

		$( '#mpg_value' ).text( dialMpg._value );

		dialMpg.getMpg = getMpg;

		return dialMpg;

	}

	// Price dial

	this.price = function() {

		var getPrice = function() {

			var height		= getHeight( dialPrice ) || 0;
			var min			= 190;
			var max			= 300;				
			var range		= max - min;

			return parseInt( ( range / 100 ) * height ) + min;

		}

		var getHeight = function( v ) {

			var position	= Math.abs( parseInt( v.endY ) );	
			var height		= Math.abs( ( position / v.minY ) * 100 );

			return height;

		}

		var dialPrice = new Draggable( '.control.price .handle', {

			type:					'y',
			edgeResistance:			1,
			bounds:					'.control.price .bounds',
			throwProps:				false,
			onDragStart:			function() { priceChanged = true; },
			onDrag:					function() { $( '.control.price .switch-bg' ).css( 'height', getHeight( this ) + '%' ); },

		} );

		dialPrice.getPrice = getPrice;

		return dialPrice;

	}

}