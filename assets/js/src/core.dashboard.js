function Dashboard() {
	//
	// Save 'this' to refer to this object later
	var _this = this;
	//
	// Initalize all the dials
	var dials;
	var price;
	var mpg;
	var luggage;
	var options;
	var lifestyle;
	var speed;


	/**
     * Color changer
     * Any color passed in, will change all the nessisary elements back ground colors/paths/strokes/borders etc
     * @param {String} Color
    */
	this.colors = function( color ) {
		//
		// Background colors
		$( '.switch-bg' ).css({
			'background-color':	color
		});
		//
		// Borders
		$('.related .active').css ({
			'border-color':	color
		});
		//
		// SVGs
		$( '.switch-fill path' ).css({
			'fill': color
		});
		//
		// Lights
		$( '.switch-light' ).css({
			'-webkit-box-shadow':	'0 0 5px ' + color + ', 0 0 15px ' + color,
			'-moz-box-shadow':		'0 0 5px ' + color + ', 0 0 15px ' + color,
			'-box-shadow':			'0 0 5px ' + color + ', 0 0 15px ' + color,
			'background-color':		color
		});
		//
		// Colors
		$( '.switch-color' ).css({
			'color': color
		});
	}


	/**
     * Bums on seats
	 * @return {Array} Color
    */
	this.seats = function() {
		//
		// Create 5 new instances of the dials.roller
		var slot_1 = new dials.roller( '#c-bums #roller1 .fake-list' );
		var slot_2 = new dials.roller( '#c-bums #roller2 .fake-list' );
		var slot_3 = new dials.roller( '#c-bums #roller3 .fake-list' );
		var slot_4 = new dials.roller( '#c-bums #roller4 .fake-list' );
		var slot_5 = new dials.roller( '#c-bums #roller5 .fake-list' );

		// Returns an array of values selected by the user
		var getSeats = function() {
			//
			// Define an empty array
			var seats = [];
			//
			// Push the user selected values of the roller dials into the above array
			seats.push( slot_1.getValue() );
			seats.push( slot_2.getValue() );
			seats.push( slot_3.getValue() );
			seats.push( slot_4.getValue() );
			seats.push( slot_5.getValue() );
			//
			// Return the array of user selected values
			return seats;
		}

		// On click of the reset button...
		$( '#reset' ).on( 'click', function( e ) {
			//
			// Prevent default of the click event
			e.preventDefault();
			//
			// Reset all the slots
			slot_1.reset();
			slot_2.reset();
			slot_3.reset();
			slot_4.reset();
			slot_5.reset();
		} );

		// Call the getSeats function which returns all the user input values of the 'Bums on seats' slots
		return getSeats();
	}


	/**
     * Values
	 * @return {Object} A data object, containing all the user input values from the dashboard dials
    */
	this.values = function() {
		//
		// Here we are saving the seats, speed and lifestyle values...
		// If the browser is IE8 or less, then save the values using the IE specific functions
		// Otherwise use the normal functions
		var ctrl_seats			= ( ie.loadFallbacks() ) ? ie.rollers.getSeats() : _this.seats();
		var ctrl_speedRoller	= ( ie.loadFallbacks() ) ? ie.rollers.getSpeed() : speed.getValue();
		var ctrl_lifestyle		= ( ie.loadFallbacks() ) ? ie.lifestyle.get() : lifestyle.getLifestyle();

		// Create a new data object containing all the values of the dashboard user input
		var data = {
			//
			// The first lot (in no particular order) fall back to other functions for IE 8
			seats:		ctrl_seats,
			lifestyle:	ctrl_lifestyle,
			speed:		ctrl_speedRoller,
			//
			// The rest stays the same across all browsers
			mpg:		mpg.getMpg(),
			luggage:	luggage.getLuggage(),
			options:	options.getOptions(),
			price:		price.getPrice(),
		};

		// Return the data, containing all the user input values
		return data;
	}


	/**
	 * Initialize dashboard color
	*/
	this.activateDashColor = function() {
		//
		// If we have a car code, set the 'color' to the color of that car, if not set 'color' to false
		var color = ( carCode ) ? dashboardLogic.getCarByCode( carCode ).color : false;
		//
		// If 'color' is set above, set the dashboard to that color, otherwise set a hard coded color
		var dashColor = ( color ) ? color : 'Chili red';
		//
		// Pass in the dashboard color set above to the dashboard.colors function to do all the color changing
		dashboard.colors( carColors[ dashColor ] );
		//
		// Subscribe to colour change
		$.subscribe( 'colour-change', function( e, color ) { dashboard.colors( color ); formLogic.colors( color ); } );
	}


	/**
     * Activate the dashboard
    */
	this.activateDashboard = function() {
		// 
		// Initialse the dials and set them to the variables at the top of this function
		dials		= new Dials();
		price		= new dials.price();
		mpg			= new dials.mpg();
		luggage		= new dials.luggage();
		options		= new dials.options();
		lifestyle	= new dials.lifestyle();

		// If borowser is IE9 or less...
		if( ie.loadFallbacks() ) {
			//
			// Call the IE specific functions
			ie.rollers.init();
			ie.speed.init();
			//
			// In addition to new dials.lifestyle()
			ie.lifestyle.init();
			//
			// Activate the colour when the element exists
			runWhenElementExsists( '#bums #rollers .item svg', dashboard.activateDashColor );
		//
		// Else, for modern browsers...
		} else {
			//
			// Initialse 'speed' and set to be a variable at the top of this function, with the rest
			speed = new dials.roller( '#c-speed .control.speed .fake-list' );
			//
			// Call the bums on seats function
			_this.seats();
		}
	}


	/**
     * Initialize
    */
	this.init = function() {
		//
		// If dashboard exsists...
		if ( $( '#dash' ).length ) {
			//
			// Call function to activate dashboard color once the SVGs have been loaded
			_this.activateDashColor();
			//
			// Call function to activate the dashboard dials
			_this.activateDashboard();
		}
	}

}

