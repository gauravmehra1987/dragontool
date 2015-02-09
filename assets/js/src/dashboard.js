function Dashboard() {

	var dials		= new Dials();

	var price		= new dials.price();
	var mpg			= new dials.mpg();
	var luggage		= new dials.luggage();
	var options		= new dials.options();
	var lifestyle	= new dials.lifestyle();
	var speed		= new dials.roller( '#c-speed .control.speed .fake-list' );

	// BG changer

	this.colors = function( color ) {

		// Backgrounds

		$( '.switch-bg' ).css( {

			'background-color':	color,
			'border-color':		color

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

		var seats = this.seats();

		var data = {

			seats:		seats,
			mpg:		mpg.getMpg(),
			luggage:	luggage.getLuggage(),
			options:	options.getOptions(),
			speed:		speed.getValue(),
			price:		price.getPrice(),
			lifestyle:	lifestyle.getLifestyle()

		};

		return data;

	}

	this.seats();

}