function scale( el, scale, targetWidth ) {

	var targetWidth 	= targetWidth || $( '#dash' ).width();
	var scale			= scale || false;
	var elWidth			= $( el ).outerWidth();
	var targetScale		= scale ? scale : ( targetWidth / elWidth );

	$( el ).css( {

		'transform': 'scale(' + targetScale + ')',
		// 'transform-origin': '0 0',

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

var slot_1		= '#c-bums .control.slot:nth-of-type( 1 ) .slots';
var slot_2		= '#c-bums .control.slot:nth-of-type( 2 ) .slots';
var slot_3		= '#c-bums .control.slot:nth-of-type( 3 ) .slots';
var slot_4		= '#c-bums .control.slot:nth-of-type( 4 ) .slots';
var slot_5		= '#c-bums .control.slot:nth-of-type( 5 ) .slots';
var speed_slot	= '#c-speed .control.slot .slots';

// ################################################## //
//
// Read values from controls
//
// ################################################## //

function getValues() {

	var c_v = new Array( getSlotValue( slot_1 ), getSlotValue( slot_2 ), getSlotValue( slot_3 ), getSlotValue( slot_4 ), getSlotValue( slot_5 ) );
	var m_v = mpg_knob._value;
	var l_v = $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();
	var s_v = getSlotValue( speed_slot );
	var o_v = getOptions();
	var p_v = getPriceValue( price_slider.y )[ 1 ];
	var x_v = getLifestyle();

	var data = {

		seats:		c_v,
		mpg:		m_v,
		luggage:	l_v,
		options:	o_v,
		speed:		s_v,
		price:		p_v,
		lifestyle:	x_v

	};

	alert( "JSON.parse( '" + JSON.stringify(data ) + "' );" );

}

$( '#get, #start' ).on( 'click', function( e ) { e.preventDefault(); getValues(); } );

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
	var max			= 315;
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

	function moveToFrame(amount){
		// nippy -ori -440
		// lightspeed -ori -760
		TweenLite.set( speed_slot, { y: amount } );
		Draggable.get( speed_slot ).update()
	}

	var slotHeight	= $( slot ).find( '.slot:first' ).height();
	var slotPadding = parseInt( $( slot ).css( 'padding-top' ) );
	var slot_dial	= new Draggable( slot, {

		type: 'y',
		bounds: $( slot ).parent(),
		edgeResistance: 1,
		throwProps: true,
		onThrowComplete: function() {
			
			console.log('onThrowComplete')

			var endPosition	= Math.abs( this.endY + slotPadding );
			var end			= Math.abs( this.minY + slotPadding );
			var start		= Math.floor( this.maxY + slotPadding ); // do we really need to round it down?!

			var $c = $( slot ).contents();

			// if( endPosition > end - ( slotHeight * 2 ) ) {

			// 	console.log( 'append at the bottom' );
			// 	moveToFrame(-760);

			// }

			// else if( endPosition < ( slotHeight * 2 ) ) {

			// 	console.log( 'append at the top' );
			// 	moveToFrame(-440);

			// }

		},
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
var mpg_max		= 80;
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
// Lifestyle dial
//
// ################################################## //

var lifestyle_dial_el		= document.querySelector( '.control.lifestyle .dial' );
var lifestyle_labels_el	= document.querySelector( '.control.lifestyle .labels' );
var lifestyle_bounds	= 5;
var lifestyle_steps		= 4;

var lifestyle_direction;
var slick = $( '.items-wrapper' ).slick( {

	arrows: false,
	infinite: true,
	slide: '.item',
	onAfterChange: function() { lifestyle_dial.enable(); }

} );

var lifestyle_labels = new Draggable( lifestyle_labels_el, {

	type: 'rotation',
	throwProps: true

} );

var currentLabelPosition = lifestyle_labels.y;

var lifestyle_dial		= new Draggable( lifestyle_dial_el, {

	type:	'rotation',
	bounds:	{ minRotation: -lifestyle_bounds, maxRotation: lifestyle_bounds },
	throwProps: true,
	dragResistance: 0.8,
	onDragStart: function() { lifestyle_direction = Math.abs( this.y ); },
	onDragEnd: function() {

		// Determine direction

		var direction = ( Math.abs( this.y ) > lifestyle_direction ) ? 'right' : 'left';		
		var newLabelPosition;

		// Temporarily disable dial

		this.disable();

		// Move content in the window

		if( direction === 'right' ) {

			slick.slickPrev();
			newLabelPosition = currentLabelPosition + ( 360 / lifestyle_steps );

		}

		else {

			slick.slickNext();
			newLabelPosition = currentLabelPosition - ( 360 / lifestyle_steps );

		}

		// Update label

		TweenLite.to( lifestyle_labels_el, 1, { rotation: newLabelPosition } );

		// Update old position reference

		currentLabelPosition = newLabelPosition;

	},
	snap: function( endValue ) { return true; }

} );

function getLifestyle() { return $( '#c-lifestyle .slick-slide.slick-active' ).attr( 'data-value' ); }


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