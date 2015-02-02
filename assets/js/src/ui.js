// Variables

var slot_1		= '#c-bums #roller1 .fake-list';
var slot_2		= '#c-bums #roller2 .fake-list';
var slot_3		= '#c-bums #roller3 .fake-list';
var slot_4		= '#c-bums #roller4 .fake-list';
var slot_5		= '#c-bums #roller5 .fake-list';
var speed_control	= '#c-speed .control.speed .fake-list';

// Elements to inject

var svgs = document.querySelectorAll( '.svg' );

// Do the injection

SVGInjector( svgs, {

	pngFallback: 'assets/sprites',

	each: function( svg ) {

		$( svg ).hide().fadeIn( 600 );

	}

} );

// TODO: convert to OO

var $sys = $( '#system ' );

function sysMsg( message ) { $sys.attr( 'data-system-message', message ); }

$( '.control-title' ).click( function( e ) {

	e.preventDefault();
	
	$( this ).toggleClass( 'open' );
	
	// Light

	var $light = $( this ).find( '.light' );
	var color = $( '.car-link' ).css( 'border-color' );

	if( $( this ).hasClass( 'open' ) ) {

		$light.addClass( 'switch-light' );
		$.publish( 'colour-change', color );

	}

	else {

		$light.removeClass( 'switch-light' );
		$light.removeAttr( 'style' );

	}

} );

// Preload images to avoid nasty visual glitches

sysMsg( 'Loading: 0%' );

// Remove 'type' to preload PNGs instead

function preloadImages() {

	$.get( 'preload.php', { type: 'svg' }, function( images ){

		var loaded = 0;
		var $preloader = $( '<div>', { id: 'preloader' } );

		$body.append( $preloader );

		$.map( images, function( el ) {

			// SVGs

			var imgPreload = document.createElementNS( 'http://www.w3.org/2000/svg','image' );
			
			imgPreload.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', el );
			imgPreload.setAttributeNS( null, 'height', 0 );
			imgPreload.setAttributeNS( null, 'width', 0 );

			// Regular images

			// var imgPreload = new Image();

			// imgPreload.src = el;

			// This is needed because of the SVGs - they need to be injected in to the DOM for the load event to work
			
			$preloader.append( imgPreload );

			imgPreload.addEventListener( 'load', function() {

				loaded++;

				var unit = images.length / 100;
				var percentage = ( loaded / images.length ) * 100;
				var progress;

				progress = Math.floor( percentage );

				// SVGs

				console.debug( imgPreload.href.baseVal + ' preloaded sucessfully (' + progress + '%)' );
				
				// Regular images

				// console.debug( imgPreload.src + ' preloaded sucessfully.' );

				sysMsg( 'Loading: '+ progress + '%' );

				if( progress === 100 ) {

					$sys.toggleClass( 'hidden' );

					$preloader.remove();

				}

			}, false );

		} );

	} );

}

// ################################################## //
//
// FastClick & some global variables
//
// ################################################## //

if( 'addEventListener' in document ) {

	document.addEventListener('DOMContentLoaded', function() { FastClick.attach( document.body ); }, false );

}

// ################################################## //
//
// BG changer
//
// ################################################## //

$.subscribe( 'colour-change', function( e, color) {

	$( '.switch-bg' ).css( {

		'background-color': color,
		'border-color': color

	} );

	$( '.switch-fill path' ).css( {

		'fill': color,

	} );

	$( '.switch-light' ).css( {

		'-webkit-box-shadow': '0 0 5px ' + color + ', 0 0 15px ' + color,
		'-moz-box-shadow': '0 0 5px ' + color + ', 0 0 15px ' + color,
		'-box-shadow': '0 0 5px ' + color + ', 0 0 15px ' + color,
		'background-color': color

	} );

	$( '.switch-color' ).css( 'color', color );

} );

function ui(){

	// ################################################## //
	//
	// Responsive tools
	//
	// ################################################## //

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

	// ################################################## //
	//
	// Read values from controls
	//
	// ################################################## //

	this.rv = readValues;

	function readValues() {

		var c_v = new Array( getSlotValue( slot_1 ), getSlotValue( slot_2 ), getSlotValue( slot_3 ), getSlotValue( slot_4 ), getSlotValue( slot_5 ) );
		var m_v = mpg_knob._value;
		var l_v = $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();
		var s_v = getSlotValue( speed_control );
		var o_v = getOptions();
		var p_v = getPriceValue( price_control.y )[ 1 ];
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

		return data;

	}

	function getValues( publish ) {

		var data = readValues();

		$.publish('combobulate-raw', data );

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
	// Price price
	//
	// ################################################## //

	function getPriceValue( v ) {

		var position	= Math.abs( parseInt( v ) );	
		var level		= Math.abs( ( position / price_control.minY ) * 100 );
		var min			= 190;
		var max			= 300;
		var range		= max - min;
		var value		= parseInt( ( range / 100 ) * level ) + min;

		return [ level, value ];

	}

	var price_el		= document.querySelector( '.control.price .handle' );
	var price_height	= parseInt( $( '.control.price .bounds' ).height() );
	var price_control	= new Draggable( price_el, {

		type: 'y',
		edgeResistance: 1,
		bounds: '.control.price .bounds',
		throwProps: false,
		onDrag: function( e ) {

			var level = getPriceValue( this.endY );

			$( '.control.price .switch-bg' ).css( 'height', level[ 0 ] + '%' );

		},
		// liveSnap: true,
		// snap: {
			
		// 	y: function( endValue ) { return Math.round( endValue / 50 ) * 50; }

		// }

	} );

	// ################################################## //
	//
	// Slots
	//
	// ################################################## //

	function resetSlot( slot ) {

		var $list = $( slot ).siblings( '.list' );

		var slotInstance = Draggable.get( slot );

		TweenLite.to( $( slot ).get( 0 ), 0.6, {

			y: 0,
			onComplete: function() { slotInstance.update(); }

		} );

		$list.find( '.item' ).removeClass( 'active' );
		$list.removeClass( 'dragging' ).removeAttr( 'style' );

		slotInstance.update();

	}

	function getSlotState( pos, height, padding ) {

		var currentPosition = Math.abs( pos );
		var activeSlot		= Math.ceil( currentPosition / height );

		return Math.ceil( activeSlot ) + 1;

	}

	function getSlotValue( slot ) {

		var $list			= $( slot ).siblings( '.list' );
		var slotHeight		= 80;
		var draggableY		= Draggable.get( slot ).y;
		var activeSlot		= getSlotState( draggableY, slotHeight, 0 );
		var $slot			= $list.find( '.item' ).eq( activeSlot );
		var value			= $slot.data( 'value' ) || $slot.text();

		return ( value === 'empty' ) ? false : value;

	}

	function initSlot( slot ) {

		var $list = $( slot ).siblings( '.list' );
		var slotHeight	= 80;

		// Make fake list the same height as the real one

		var listHeight = slotHeight * ( $list.find( '.item' ).length - 1 ) ;

		$( slot ).height( listHeight );

		// Initialize Draggable

		var slot_dial	= new Draggable( slot, {

			type: 'y',
			bounds: $( slot ).parent(),
			edgeResistance: 1,
			throwProps: true,
			onDrag: function() {

				var activeSlot		= getSlotState( this.y + 40, slotHeight, 0 );
				var $active			= $list.find( '.item' ).removeClass( 'active' ).eq( activeSlot ).addClass( 'active' );

				$list.addClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.y + 'px, 0px )' } );

			},
			onDragEnd: function() {

				$list.removeClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.endY + 'px, 0px )' } );

			},
			snap: function( endValue ) {

				var v = Math.round( endValue / slotHeight ) * slotHeight;

				return v;

			}

		} );

	}

	// Init slots

	initSlot( slot_1 );
	initSlot( slot_2 );
	initSlot( slot_3 );
	initSlot( slot_4 );
	initSlot( slot_5 );
	initSlot( speed_control );

	// Randomize slots

	$( '#reset' ).on( 'click', function( e ) {

		e.preventDefault();

		resetSlot( slot_1 );
		resetSlot( slot_2 );
		resetSlot( slot_3 );
		resetSlot( slot_4 );
		resetSlot( slot_5 );

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
	var mpg_snap	= 360 / 18;
	var mpg_knob	= new Draggable( mpg_el, {

		type:	'rotation',
		bounds:	{ minRotation: -mpg_bounds, maxRotation: mpg_bounds },
		// liveSnap: true,
		// throwProps: true,
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

		// snap: function( endValue ) { return Math.round( endValue / mpg_snap ) * mpg_snap; }

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

	var lifestyle_el		= document.querySelector( '.control.lifestyle .dial' );
	var lifestyle_bounds	= 5;
	var lifestyle_bounds	= 45;
	var lifestyle_steps		= 4;

	var lifestyle_direction;
	var slick = $( '.items-wrapper' ).slick( {

		arrows: false,
		infinite: true,
		slide: '.item',
		onAfterChange: function() { lifestyle_dial.enable(); }

	} );

	function updateLifestyleDial() {

		// Determine direction

		var direction = ( Math.abs( this.y ) > lifestyle_direction ) ? 'right' : 'left';

		// Temporarily disable dial

		// lifestyle_dial.disable();

		// Move content in the window

		( direction === 'right' ) ? slick.slickPrev() : slick.slickNext();

	};

	var lifestyle_snap		= 360 / 4;
	var lifestyle_dial		= new Draggable( lifestyle_el, {

		type:	'rotation',
		bounds:	{ minRotation: -lifestyle_bounds, maxRotation: lifestyle_bounds },
		throwProps: true,
		// dragResistance: 0.8,
		onDragStart: function() { lifestyle_direction = Math.abs( this.y ); },
		onDragEnd: function() {

			updateLifestyleDial();

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

		var className = e.target.id;

		( e.type === 'mousedown' ) ? $( this ).removeClass( 'right left' ).addClass( className ): $( this ).removeClass( 'right left' );

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

}

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) preloadImages();

// Dashboard

var ui;

$( document ).ready( function() {

	if( $( '#dash' )[ 0 ] ) {

		ui = new ui();

		// AJAX results page

		// $( '.car-link' ).click( function( e ) {

		// 	e.preventDefault();

		// 	$( '.layout' ).addClass( 'animated fadeOutLeftBig' );

		// 	setTimeout( function() {

		// 		$.get( 'results.php', function( data ) {

		// 			$( '.layout' ).replaceWith( $( data ).find( '.layout' ) );

		// 			Mini.DOMCtrl.panelControl( 'default' );

		// 			$( 'form' ).validate();

		// 			$.publish('colour-change', carColors[ 'Electric Blue' ] );

		// 			$( '#form-submit' ).click( function( e ) {

		// 				e.preventDefault();

		// 				Mini.DOMCtrl.panelControl( 'thanks' );

		// 			} );

		// 		} );

		// 	}, 250 );

		// } );

	}

	// Results page

	else {

		Mini.DOMCtrl.panelControl( 'default' );

		$( 'form' ).validate();

		$.publish('colour-change', carColors[ 'Electric Blue' ] );

		$( '#form-submit' ).click( function( e ) {

			e.preventDefault();

			Mini.DOMCtrl.panelControl( 'thanks' );

		} );

	}

	// $.subscribe('combobulate-raw', function( e, data ) { alert( data.price ); } );

} );