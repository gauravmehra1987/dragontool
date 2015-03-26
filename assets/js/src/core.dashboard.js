function Dashboard() {

	var dials;
	var price;
	var mpg;
	var luggage;
	var options;
	var lifestyle;
	var speed;

	// BG changer

	this.colors = function( color ) {

		console.log( 'changing color to: ' + color );

		// Backgrounds

		$( '.switch-bg' ).css( {

			'background-color':	color

		} );

		// Borders

		$('.related .active').css ( {

			'border-color':	color

		} );

		// SVGs

		$( '.switch-fill path' ).css( { 'fill': color, } );

		// Lights

		$( '.switch-light' ).css( {

			'-webkit-box-shadow':		'0 0 5px ' + color + ', 0 0 15px ' + color,
			'-moz-box-shadow':			'0 0 5px ' + color + ', 0 0 15px ' + color,
			'-box-shadow':				'0 0 5px ' + color + ', 0 0 15px ' + color,
			'background-color':			color

		} );

		// Colors
		
		$( '.switch-color' ).css( 'color', color );

	}

	this.seats = function() {

		var slot_1		= new dials.roller( '#c-bums #roller1 .fake-list' );
		var slot_2		= new dials.roller( '#c-bums #roller2 .fake-list' );
		var slot_3		= new dials.roller( '#c-bums #roller3 .fake-list' );
		var slot_4		= new dials.roller( '#c-bums #roller4 .fake-list' );
		var slot_5		= new dials.roller( '#c-bums #roller5 .fake-list' );

		var getSeats = function() {

			var seats = [];

			seats.push( slot_1.getValue() );
			seats.push( slot_2.getValue() );
			seats.push( slot_3.getValue() );
			seats.push( slot_4.getValue() );
			seats.push( slot_5.getValue() );

			return seats;

		}

		// Randomize slots

		$( '#reset' ).on( 'click', function( e ) {

			e.preventDefault();

			slot_1.reset();
			slot_2.reset();
			slot_3.reset();
			slot_4.reset();
			slot_5.reset();

		} );

		return getSeats();

	}

	this.values = function() {

		var ctrl_seats			= ( ie.loadFallbacks() ) ? ie.rollers.getSeats() : this.seats();
		var ctrl_speedRoller	= ( ie.loadFallbacks() ) ? ie.rollers.getSpeed() : speed.getValue();
		var ctrl_lifestyle		= ( ie.loadFallbacks() ) ? ie.lifestyle.get() : lifestyle.getLifestyle();

		var data = {

			// The first two (in no particular order) fall back to other functions for IE 8

			seats:		ctrl_seats,
			lifestyle:	ctrl_lifestyle,
			speed:		ctrl_speedRoller,
			
			// The rest stays the same across all browsers

			mpg:		mpg.getMpg(),
			luggage:	luggage.getLuggage(),
			options:	options.getOptions(),
			price:		price.getPrice(),

		};

		return data;

	}

	this.init = function() {

		dials		= new Dials();

		price		= new dials.price();
		mpg			= new dials.mpg();
		luggage		= new dials.luggage();
		options		= new dials.options();
		lifestyle	= new dials.lifestyle();
		
		if( ie.loadFallbacks() ) {

			ie.rollers.init();
			ie.speed.init();

			// In addition to new dials.lifestyle()

			ie.lifestyle.init();

		}
		
		else {

			speed = new dials.roller( '#c-speed .control.speed .fake-list' );

			this.seats();

		}

	}

}