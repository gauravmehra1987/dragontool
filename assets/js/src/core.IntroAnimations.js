( function( Mini ) {
	
} )( Mini );

// Intro animations

function animate() {

	this.bg = function() {

		var colors = [

			'#f7941d',
			'#30b6e8',
			'#1164ac',
			'#426046',
			'#d71d24',
			'#d71d24',
			'#e4dfce'

		];

		var i = 0;

		var t;

		var increment = function() {

			$.publish('colour-change', colors[ i ]);

			( i < colors.length ) ? i++ : clearInterval( t );

		};

		t = setInterval( increment, 100 );

	};

	this.bums = function() {

		setSlotValue( _.random( 0, $( slot_1 ).find( '.slot' ).length - 1 ), slot_1 );
		setSlotValue( _.random( 0, $( slot_2 ).find( '.slot' ).length - 1 ), slot_2 );
		setSlotValue( _.random( 0, $( slot_3 ).find( '.slot' ).length - 1 ), slot_3 );
		setSlotValue( _.random( 0, $( slot_4 ).find( '.slot' ).length - 1 ), slot_4 );
		setSlotValue( _.random( 0, $( slot_5 ).find( '.slot' ).length - 1 ), slot_5 );

	};

	this.mpg = function() {

		TweenLite.to( mpg_el, 0.6, { rotation: 120 } );
		setTimeout( function() { TweenLite.to( mpg_el, 0.6, { rotation: -120 } ); }, 600 );

	};

	this.options = function() {

		$( '.option input' ).each( function( i, el ) {

			setTimeout( function() { $( el ).prop( 'checked', true ); }, i * 100 );
			
			setTimeout( function() { $( el ).prop( 'checked', false ); }, ( i * 100 ) + 400 );

		} );

	};

	this.price = function() {

		TweenLite.to( price_el, 0.6, { y: price_slider.minY } );
		setTimeout( function() { TweenLite.to( price_el, 0.6, { y: price_slider.maxY } ); }, 600 );

	};

	this.lifestyle = function() {

		TweenLite.to( lifestyle_el, 0.6, {

			rotation: lifestyle_dial.minRotation,
			onComplete: function() { updateLifestyleDial(); }

		} ); // left

		setTimeout( function() { TweenLite.to( lifestyle_el, 0.6, { rotation: 0 } ); }, 600 ); // right

	};

	this.speed = function() { setSlotValue( $( speed_control ).find( '.slot' ).length - 2, speed_control ); };

	this.luggage = function() {

		TweenLite.to( luggage_el, 2, { rotation: 360 } );

	};

	this.bums();
	this.mpg();
	this.options();
	this.price();
	this.lifestyle();
	this.speed();
	this.luggage();
	this.bg();

}

animate();