FastClick.attach( document.body );

// BG changer

$( '#bgcontrol input' ).on( 'change', function( e ) {

	var color = $( this ).val();

	$( '.control-bg' ).css( 'background-color', color );

} );

// Some global variables

var slotStartPosition	= 0;
var currentSlot			= 0;
var sh					= 75;

// Read values from controls

function getValues() {

	var $c = $( '#v_seats' );
	var $m = $( '#v_mpg' );
	var $l = $( '#v_luggage' );
	var $o = $( '#v_options' );	
	var $s = $( '#v_speed' );
	var $p = $( '#v_price' );

	$c.val( getSlotValue( $slot_1 )[ 1 ] + getSlotValue( $slot_2 )[ 1 ] + getSlotValue( $slot_3 )[ 1 ] + getSlotValue( $slot_4 )[ 1 ] + getSlotValue( $slot_5 )[ 1 ] );
	$m.val( mpg_knob._value );
	$l.val( $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim() );
	$s.val( getSlotValue( $speed )[ 1 ] );
	$o.val( getOptions() );
	$p.val( getPriceValue( price_slider.y )[ 1 ] );

}

$( '#get' ).on( 'click', function( e ) { e.preventDefault(); getValues(); } );

function getOptions() {

	var $inputs = $( '.control.options input:checked' );
	var values = [];

	$inputs.each( function( i, el ) {

		values.push( $( this ).val() );

	} );

	if( values.length <= 0 ) values = 'none selected';

	return values;

}

// Price slider

function getPriceValue( v ) {

	var position	= Math.abs( parseInt( v ) );	
	var level		= ( position / price_height ) * 100;
	var max			= 400;
	var value		= parseInt( ( max / 100 ) * level );

	return [ level, value ];

}

var price_el		= document.querySelector( '.control.slider .handle' );
var price_height	= parseInt( $( '.control.slider .control-bg-wrapper' ).height() );
var price_slider	= new Draggable( price_el, {

	type: 'y',
	edgeResistance: 1,
	bounds: '.control.slider .wrapper',
	throwProps: false,
	onDrag: function( e ) {

		var level = getPriceValue( this.y );

		$( '.control.slider .control-bg' ).css( 'height', level[ 0 ] + '%' );

	}

} );

// Slots

var $slot_1 = $( '#dial_s .control:nth-of-type( 1 )' );
var $slot_2 = $( '#dial_s .control:nth-of-type( 2 )' );
var $slot_3 = $( '#dial_s .control:nth-of-type( 3 )' );
var $slot_4 = $( '#dial_s .control:nth-of-type( 4 )' );
var $slot_5 = $( '#dial_s .control:nth-of-type( 5 )' );

var $speed = $( '#dial_v .control' );

// Hammer

function getSlotValue( $slot ) {

	var slotIndex	= getCurrentIndex( $slot );
	var label		= $( $slot.find( '.slot' )[ slotIndex ] ).text()

	return [ slotIndex, label ];

}

function slotExists( $slot, slotIndex ) { return ( slotIndex >=0 && slotIndex < $slot.find( '.slot' ).length ); }

function getCurrentIndex( $slot ) { return parseInt( Math.abs( parseInt( $slot.find( '.slots' ).css( 'top' ) ) ) / sh ); }

function showSlot( which, $slot ) { return $slot.find( '.slots' ).css( 'top', -( sh * ( which ) ) ); }

function initSlot( $slot ) {

	var handlePan = function( e, $slot ) {

		var delta = e.deltaY;

		switch( e.type ) {

			// Store original position

			case 'panstart':

				slotStartPosition	= parseInt( $slot.find( '.slots' ).css( 'top' ) );
				currentSlot			= getCurrentIndex( $slot );

			break;

			// Remove dragging class and snap to the slot

			case 'panend':

				$slot.removeClass( 'dragging' );

				console.log( currentSlot );

				var slotEndPosition	= parseInt( $slot.find( '.slots' ).css( 'top' ) );
				var direction		= slotStartPosition - slotEndPosition;
				var targetSlot		= ( direction >= 0 ) ? currentSlot + 1 : currentSlot - 1;

				setTimeout( function() {

					if( Math.abs( direction ) > sh / 4 ) {

						( slotExists( $slot, targetSlot ) ) ? showSlot( targetSlot, $slot ) : showSlot( currentSlot, $slot );

					}

					else {

						showSlot( currentSlot, $slot );

					}

				}, 0 );

			break;

			// Move slot

			case 'panmove':

				if( Math.abs( delta ) >= 0 && Math.abs( delta ) <= sh ) $slot.addClass( 'dragging' ).find( '.slots' ).css( 'top', ( e.deltaY / 2 ) + slotStartPosition );

			break;

		}

	}

	// hammer.js

	var hammer	= new Hammer.Manager( $slot.get( 0 ) );
	var pan		= new Hammer.Pan( {

		direction: Hammer.DIRECTION_VERTICAL,
		threshold: 0

	} );
	var swipe	= new Hammer.Swipe( {

		direction: Hammer.DIRECTION_VERTICAL,
		threshold: 10,
		velocity: 0.5,

	} );

	hammer.add( pan );
	hammer.add( swipe ).recognizeWith( pan );

	hammer.on( 'swipeup swipedown panmove panstart panend', function( e ) {

		switch( e.type ) {

			case 'swipeup': showSlot( $slot.find( '.slot' ).length - 1, $slot ); break;
			case 'swipedown': showSlot( 0, $slot ); break;
			default: handlePan( e, $slot ); break;

		}

	} );

}

initSlot( $slot_1 );
initSlot( $slot_2 );
initSlot( $slot_3 );
initSlot( $slot_4 );
initSlot( $slot_5 );
initSlot( $speed );

// Randomize slots

$( '#rnd' ).on( 'click', function( e ) {

	e.preventDefault();

	showSlot( _.random( 0, $slot_1.find( '.slot ').length - 1 ), $slot_1 );
	showSlot( _.random( 0, $slot_2.find( '.slot ').length - 1 ), $slot_2 );
	showSlot( _.random( 0, $slot_3.find( '.slot ').length - 1 ), $slot_3 );
	showSlot( _.random( 0, $slot_4.find( '.slot ').length - 1 ), $slot_4 );
	showSlot( _.random( 0, $slot_5.find( '.slot ').length - 1 ), $slot_5 );

} );

// MPG knob

var mpg_el		= document.querySelector( '.control.mpg .arrow' );
var mpg_bounds	= 120;
var mpg_steps	= 13;
var mpg_min		= 25;
var mpg_max		= 69;
var mpg_knob	= new Draggable( mpg_el, {

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

mpg_knob.update();
mpg_knob._value = mpg_min;

$( '#mpg_value' ).text( mpg_knob._value );

// Luggage

function dial_class( r ) {

	var dial_class	= ( ( ( r / luggage_snap ) % luggage_snap ) % 4 );

	if( dial_class === -1 || dial_class === 3 ) { final_class = 'light-packer'; } // light packer
	if( dial_class === -2 || dial_class === 2 ) { final_class = 'lugger'; } // lugger
	if( dial_class === -3 || dial_class === 1 ) { final_class = 'big-loader'; } // big loader
	if( dial_class === 0 ) { final_class = 'minimalist'; } // minimalist
		
	$( luggage_el ).removeClassExcept( 'dial' ).addClass( final_class );

}

var luggage_end		= 0;
var luggage_el		= document.querySelector( '.control.luggage .dial' );
var luggage_snap	= 360 / 4;
var luggage_dial	= new Draggable( luggage_el, {

	type:	'rotation',
	throwProps: true,
	onThrowComplete: function() {

		var r = parseInt( this.endRotation );

		dial_class( r );

	},
	onDragStart: function( e ) {

		// Remove all classes

		$( luggage_el ).removeClassExcept( 'dial' );

	},
	onDragEnd: function( e ) {

		var r = parseInt( this.endRotation );

		// Update luggage_end

		luggage_end = r;

	},
	snap: function( endValue ) { return Math.round( endValue / luggage_snap ) * luggage_snap; }

} );

$( '.control.luggage .arrows' ).on( 'mousedown mouseup', function( e ) {

	e.preventDefault();

	if( e.type === 'mousedown' ) {

		$( '.control.luggage .arrows' ).removeClass( 'right left' ).addClass( e.target.id );

	}

	else {

		$( '.control.luggage .arrows' ).removeClass( 'right left' );

	}

} );

$( '#left, #right' ).on( 'click', function( e ) {

	e.preventDefault();

	// Remove all classes

	$( luggage_el ).removeClassExcept( 'dial' );

	var $dial		= $( '.control.luggage .dial' );
	var direction	= e.target.id;
	var nr			= ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;

	// Move to the initial position

	TweenLite.to( luggage_el, 1, { rotation: nr, onComplete: function( v ) {

		dial_class( nr );

	} } );

	// Update rotation & value

	luggage_dial.update();
	luggage_end = nr;

} );