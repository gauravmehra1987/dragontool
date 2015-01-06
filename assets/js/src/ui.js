function scale( el, targetWidth ) {

	var elWidth	= $( el ).outerWidth();
	var scale	= ( targetWidth / elWidth );

	$( el ).css( {

		'transform': 'scale(' + scale + ')',
		'transform-origin': '0 0',

	} );

}

// BG changer

$( '#bgcontrol input' ).on( 'change', function( e ) { var color = $( this ).val(); $( '.control-bg' ).css( 'background-color', color ); } );

// ################################################## //
//
// FastClick & some global variables
//
// ################################################## //

FastClick.attach( document.body );

// Variables

var slot_1		= '#dial_s .control.slot:nth-of-type( 1 ) .slots';
var slot_2		= '#dial_s .control.slot:nth-of-type( 2 ) .slots';
var slot_3		= '#dial_s .control.slot:nth-of-type( 3 ) .slots';
var slot_4		= '#dial_s .control.slot:nth-of-type( 4 ) .slots';
var slot_5		= '#dial_s .control.slot:nth-of-type( 5 ) .slots';
var speed_slot	= '#dial_v .control.slot .slots';

// ################################################## //
//
// Read values from controls
//
// ################################################## //

function getValues() {

	var $c = $( '#v_seats' );
	var $m = $( '#v_mpg' );
	var $l = $( '#v_luggage' );
	var $o = $( '#v_options' );	
	var $s = $( '#v_speed' );
	var $p = $( '#v_price' );

	var c_v = new Array( getSlotValue( slot_1 ), getSlotValue( slot_2 ), getSlotValue( slot_3 ), getSlotValue( slot_4 ), getSlotValue( slot_5 ) );
	var m_v = mpg_knob._value;
	var l_v = $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();
	var s_v = getSlotValue( speed_slot );
	var o_v = getOptions();
	var p_v = getPriceValue( price_slider.y )[ 1 ];

	$c.val( c_v );
	$m.val( m_v );
	$l.val( l_v );
	$s.val( s_v );
	$o.val( o_v );
	$p.val( p_v );

	var data = {

		seats:		c_v,
		mpg:		m_v,
		luggage:	l_v,
		options:	o_v,
		speed:		s_v,
		price:		p_v,
		lifestyle:	'TBC'

	};

	console.log( "JSON.parse( '" + JSON.stringify(data ) + "' )" );
	console.log( data );

}

$( '#get' ).on( 'click', function( e ) { e.preventDefault(); getValues(); } );

function getOptions() {

	var $inputs = $( '.control.options input:checked' );
	var values = [];

	$inputs.each( function( i, el ) { values.push( $( this ).val() ); } );

	if( values.length <= 0 ) values = 'none';

	return values;

}

// ################################################## //
//
// Price slider
//
// ################################################## //

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

// ################################################## //
//
// Slots
//
// ################################################## //

function getSlotState( pos, height, padding ) {

	var currentPosition = Math.abs( pos ) - padding;
	var activeSlot		= Math.ceil( currentPosition / height );

	return Math.ceil( activeSlot );

}

function getSlotValue( slot ) {

	var slotHeight		= $( slot ).find( '.slot:first' ).height();
	var slotPadding 	= parseInt( $( slot ).css( 'padding-top' ) ).toFixed( 1 );
	var draggableY		= Draggable.get( slot ).y || -slotPadding;
	var activeSlot		= getSlotState( draggableY, slotHeight, slotPadding );
	var $slot			= $( slot ).find( '.slot' ).eq( activeSlot );
	var value			= $slot.data( 'value' ) || $slot.text();

	return ( value === 'Empty' ) ? false : value;

}

function setSlotValue( index, slot ) {

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var slotPadding = slotHeight / 2;
	var draggable	= Draggable.get( $( slot ) );
	var newPosition = -( index * slotHeight + slotPadding );

	TweenLite.to( $( slot ).get( 0 ), 0.6, {

		y: newPosition,
		onComplete: function() { draggable.update(); }

	} );

}

function initSlot( slot ) {

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var slotPadding = parseInt( $( slot ).css( 'padding-top' ) );
	var slot_dial	= new Draggable( slot, {

		type: 'y',
		bounds: $( slot ).parent(),
		throwProps: true,
		onRelease: function() {

			var endPosition	= Math.abs( this.endY + slotPadding );
			var end			= Math.abs( this.minY + slotPadding );
			var start		= Math.floor( this.maxY + slotPadding ); // do we really need to round it down?!

			var $c = $( slot ).contents();

			// Martin please help!

			if( endPosition > end - ( slotHeight * 2 ) ) {

				console.log( 'append at the bottom' );

			}

			else if( endPosition < ( slotHeight * 2 ) ) {

				console.log( 'append at the top' );

			}

		},
		snap: function( endValue ) {

			var parents		= $( slot ).parentsUntil( '.dial-control' );
			var $control	= $( parents[ parents.length - 1 ] );
			var newPosition = ( Math.round( endValue / slotHeight ) * slotHeight ) - slotPadding; // + padding

			return newPosition;

		}

	} );

}

// Init slots

initSlot( slot_1 );
initSlot( slot_2 );
initSlot( slot_3 );
initSlot( slot_4 );
initSlot( slot_5 );
initSlot( speed_slot );

// $( '.slot-wide .slots' ).slick( {

// 	// vertical: true,
// 	slide: '.slot'

// } );

// Randomize slots

$( '#rnd' ).on( 'click', function( e ) {

	e.preventDefault();

	setSlotValue( _.random( 0, $( slot_1 ).find( '.slot' ).length - 1 ), slot_1 );
	setSlotValue( _.random( 0, $( slot_2 ).find( '.slot' ).length - 1 ), slot_2 );
	setSlotValue( _.random( 0, $( slot_3 ).find( '.slot' ).length - 1 ), slot_3 );
	setSlotValue( _.random( 0, $( slot_4 ).find( '.slot' ).length - 1 ), slot_4 );
	setSlotValue( _.random( 0, $( slot_5 ).find( '.slot' ).length - 1 ), slot_5 );

} );

// ################################################## //
//
// MPG knob
//
// ################################################## //

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

// ################################################## //
//
// Luggage
//
// ################################################## //

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

	( e.type === 'mousedown' ) ? $( '.control.luggage .arrows' ).removeClass( 'right left' ).addClass( e.target.id ): $( '.control.luggage .arrows' ).removeClass( 'right left' );

} );

$( '#left, #right' ).on( 'click', function( e ) {

	e.preventDefault();

	// Remove all classes

	$( luggage_el ).removeClassExcept( 'dial' );

	var $dial		= $( '.control.luggage .dial' );
	var direction	= e.target.id;
	var nr			= ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;

	// Move to the initial position

	TweenLite.to( luggage_el, 1, { rotation: nr, onComplete: function( v ) { dial_class( nr ); } } );

	// Update rotation & value

	luggage_dial.update();
	luggage_end = nr;

} );