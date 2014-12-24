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

	$c.val( getSlotValue( slot_1 ) + getSlotValue( slot_2 ) + getSlotValue( slot_3 ) + getSlotValue( slot_4 ) + getSlotValue( slot_5 ) );
	$m.val( mpg_knob._value );
	$l.val( $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim() );
	$s.val( getSlotValue( speed_slot ) );
	$o.val( getOptions() );
	$p.val( getPriceValue( price_slider.y )[ 1 ] );

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

function getSlotValue( slot ) {

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var draggableY	= parseInt( Draggable.get( slot ).y ) || 0;
	var activeSlot	= Math.abs( draggableY ) / slotHeight;

	return $( slot ).find( '.slot' ).eq( activeSlot ).text();

}

function setSlotValue( index, slot ) {

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var draggable	= Draggable.get( $( slot ) );

	TweenLite.to( $( slot ).get( 0 ), 0.6, {

		y: -( index * slotHeight ),
		onComplete: function() {

			draggable.update();

			console.log( draggable.y );

		}

	} );

}

function initSlot( slot ) {

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var slot_dial	= new Draggable( slot, {

		type: 'y',
		bounds: $( slot ).parent(),
		throwProps: true,
		snap: function( endValue ) { return Math.round( endValue / slotHeight ) * slotHeight; }

	} );

}

// Init slots

initSlot( slot_1 );
initSlot( slot_2 );
initSlot( slot_3 );
initSlot( slot_4 );
initSlot( slot_5 );
initSlot( speed_slot );

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