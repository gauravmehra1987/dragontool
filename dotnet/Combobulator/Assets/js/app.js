
// Setting up social media values to use later
var socialMedia = {

	facebook: {
		link:			'https://minicombobulator.co.uk',
		message:		'Find the MINI for you with our clever Combobulator tool.',
		name:			'THE MINI COMBOBULATOR.',
		picture:		'https://minicombobulator.co.uk/Assets/social/combobulator_social_200x200.png',
		description:	"Want a shiny new MINI, but don't know your Countryman from your Convertible? Let the Combobulator find the right model for you, at the touch of a button. Choose how much you'd like to spend, how turbo-charged you want your engine, and throw in an extra or two."
	},

	twitter: {
		url:			'https://minicombobulator.co.uk',
		text:			'Find the MINI for you with our clever Combobulator tool.'
	}
};


// Setting up path values to use later
var system_paths = {

	// Dotnet version
	net: {
		assets:			'Assets/cars/',
		results:		'results?',
		spriteFallback:	'Assets/sprites',
		api:			'api/car',
		apiPostcode:	'api/postcodelookup',
		apiDealers:		'api/dealerlookup',
		preload:		'api/assets/svg',
		templates:		'Assets/js/tpl'
	},

	// PHP version
	php: {
		assets:			'assets/cars/',
		results:		'results.php?',
		spriteFallback:	'assets/sprites',
		api:			'json/data.json',
		apiPostcode:	'postcode.php',
		apiDealers:		'dealers.php',
		preload:		'preload.php',
		templates:		'assets/js/tpl'
	}
};
//
// And now, depending on which set up we are using (Dotnet or PHP), we can comment out the appropriate line below 
//
var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.net;
// var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.php;


// Setting up all the colors to use for the dashboard color changes
var carColors = {

	'Volcanic Orange':		'#f7941d',
	'Electric Blue':		'#30b6e8',
	'Lightning Blue':		'#1164ac',
	'Jungle Green':			'#426046',
	
	'Blazing Red':			'#d71d24',
	'Chili Red':			'#d71d24',
	
	'Pepper White':			'#e4dfce',
	'Light White':			'#e4dfce',

	// Extra colors
	'Toy brown':			'#47322e',
	'Rocket gold':			'gold'
}


// Setup namespace and some global variables
var $html	= $( 'html' );
var	$body	= $( 'body' );
var $sys	= $( '#system' );

var	w		= window;


// System messages
function sysMsg( message ) { $sys.attr( 'data-system-message', message ); }


// Set up a Mini object with some data we might need...
var Mini	= {
	//
	// Debug mode
	settings: {
		debug:			true,
	},
	//
	// Third party ID's
	thirdParty: {
		facebookID:		815494961880957,
		analyticsID:	'UA-62062073-2'
	},
	//
	// Browser and device information
	browser: {
		name:			$.browser.name,
		version:		$.browser.version,
		mobile: 		$.browser.mobile || false,
		platform:		$.browser.platform,
		//
		// Quick fuction to check IE version
		isIE:			function( version ) {

			switch( typeof( version ) ) {

				case 'string': return ( $.browser.name === 'msie' && $.browser.platform === 'win' && eval( parseInt( $.browser.version ) + version ) ); break;
				
				case 'number': return ( $.browser.name === 'msie' && $.browser.platform === 'win' && parseInt( $.browser.version ) === version ); break;

				default: return ( $.browser.name === 'msie' && $.browser.platform === 'win' ); break;
			}
		}
	}
};


// Add some useful classes to the <html> element
document.querySelector( 'html' ).className += ' ' + Mini.browser.platform;


// If browser is NOT IE...
if ( ! Mini.browser.isIE() ) {
	//
	// Add browser name via JavaScript
	document.querySelector( 'html' ).className += ' ' + Mini.browser.name;
	//
	// And remove IE class from the html
	$html.removeClass( 'ie' );
}


// If Modernizr is not defined...
// Manually append .js class to the <html> element
if ( typeof( Modernizr ) === 'undefined' ) {
	//
	var bodyClass = document.querySelector( 'html' ).className;
	//
	document.querySelector( 'html' ).className = bodyClass.replace( 'no-js', 'js' );
}



$.validator.setDefaults( {

	// Setup form validation rules here

	rules: {

		'name':				{

			required: true,
			regexName: true

		},
		'surname':			{

			required: true,
			regexSurame: true

		},
		'address_1':		{ required: true },
		'tel_home':			{

			required: true,
			regexPhoneUK: true

		},
		'dealer':			{ required: true },
		'title':			{ required: true },
		'postcode_search':	{

			required: true,
			regexPostcode: true

		},
		'email':			{

			required: true,
			email: true

		},

	},

	// And new messages here

	messages: {

		'name':				{ required: 'First name is required.' },
		'surname':			{ required: 'Last name is required.' },
		'address_1':		{ required: 'Address line 1 is required.' },
		'postcode': 		{ required: 'Postcode is required.' },
		'tel_home':			{ required: 'Home telephone is required.' },
		'dealer': 			{ required: 'Please choose a dealer from the list.' },
		'title': 			{ required: 'Title is required.' },
		'postcode_search': 	{ required: 'Postcode is required.' },
		'email':			{

			required: 'E-mail is required.',
			email: 'Please enter a valid e-mail address.'

		}

	}

} );

$.validator.addMethod(
	'regexPostcode',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp('^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$', 'i');
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid UK postcode.'
);


$.validator.addMethod(
	'regexPhoneUK',
	function(phone_number, element) {
		phone_number = phone_number.replace(/\s/g, '');
		return this.optional(element) || 
		phone_number.match(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/);
	},
	'Please specify a valid phone number.'
);


$.validator.addMethod(
	'regexName',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp("^[a-zA-Z]'?([a-zA-Z]|\.| |-)*$");
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid name.'
);

$.validator.addMethod(
	'regexSurame',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp("^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$");
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid last name.'
);
$.validator.setDefaults( {

	showErrors: function( errors, elements ) {

		if( elements.length > 0 ) {

			$( elements ).each( function( i, el ) {

				// Add the .error class to the element

				var el				= el.element;
				var elementType		= el.tagName.toLowerCase();

				if( elementType === 'select' ) {

					$( el ).parent().addClass( 'error' );

				}

				else {

					$( el ).addClass( 'error' );

				}

				// Validate the fields here

				console.log( el );
				console.log( errors[ el.name ] );

			} );

		}

	},

	submitHandler: function( form ) {

		var ajaxURL = $( form ).attr( 'action' ),
			ajaxDelay = 1000; // Not needed but included here to illustrate the loading DIV behaviour

		var ajaxRequest = function() {
		
			var formData = {
					info: $( 'form' ).serializeObject(),
					car: carCode,
					input: store.get( 'miniInput' )
				};

			var json = JSON.stringify(formData);

			var token = $('input[name="__RequestVerificationToken"]').val();
			$.ajax( {
				type: 'POST',
				url: ajaxURL,
				contentType: 'application/json',
				data: json,
				headers: { "__RequestVerificationToken": token },
				complete: function() {

					$( form ).toggleClass( 'busy' );

					$( '.form-control .button' ).removeAttr( 'disabled' );
					$( '.form-control .button' ).removeClass( 'disabled' );
					$( '.form-sumbitting-overlay' ).removeClass('active');

				},
				success: function( data ) { $.publish( 'form-ajax-results', data ); },
				error: function (request, error) {
					var response = JSON.parse(request.responseText);
					for (var i = 0; i < response.length; i++) {
						var error = response[i];
						var fieldKey = error.Key;
						var message = error.Message;
						// apply custom logic with field keys and messages
						var input = $('#' + fieldKey).addClass('error');
						input.attr('aria-required', 'true');
						/*
						var select = input.parent('.select');


						if (select) {
							select.addClass('error');
						} else if (input) {
							$(this).addClass('error');
						}
						*/
					}
				},
				beforeSend: function() { if( Mini.settings.debug ) console.log( 'Submitting form to: ' + ajaxURL ); } // Feel free to remove this if not needed

			} );

		};

		// Disable the form to prevent accidental submission while the request is pending

		$( form ).toggleClass( 'busy' );

		$( '.form-control .button' ).attr( 'disabled', true );
		$( '.form-control .button' ).addClass( 'disabled' );
		$( '.form-sumbitting-overlay' ).addClass('active');

		// Perform the call

		setTimeout( function() { ajaxRequest(); }, ajaxDelay );

	},

	ignore: false,

	onkeyup: function( el ) {

		$( el ).removeClass( 'error' );
		$( el ).parent().removeClass( 'error' );
		$( el ).closest( '.form-control' ).find( '.form-error' ).remove();

	},
	onfocusout: function( el ) {

		$( el ).removeClass( 'error' );
		$( el ).parent().removeClass( 'error' );
		$( el ).closest( '.form-control' ).find( '.form-error' ).remove();

	}

} );
function DashboardLogic() {
	//
	// Save 'this' to refer to this object later
	var _this = this;

	//
	// All the filters (based on the dashboard dials)
	var filters = [ 'lifestyle', 'economy', 'speed', 'price', 'convertible', 'high', 'awd', 'luggage', 'capacity' ];
	//
	// An empty object to drop filters later
	var droppedFilters	= [];
	//
	// An empty db object to fill database
	var db;
	var cars; // Cars data (defined later in the populateDB function)	


	/**
     * Optimizes the car data from the json to have property values of integars
     * @return {Array} Array of car objects and all their data
    */
	this.optimizeData = function() {
		//
		// Iterate over the cars data...
		$( cars ).each( function( i, el ) {
			//
			// Optimize each car and all it's properties in the array, to have integars as values
			cars[ i ].awd			= parseInt( el.awd );
			cars[ i ].high			= parseInt( el.high );
			cars[ i ].convertible	= parseInt( el.convertible );
			cars[ i ].price			= parseInt( el.price );
			cars[ i ].cost			= parseInt( el.cost );
			cars[ i ].speed			= parseInt( el.speed );
			cars[ i ].mph			= parseInt( el.mph );
			cars[ i ].economy		= parseInt( el.economy );
			cars[ i ].mpg			= parseFloat( el.mpg );
		} );
		//
		// Return newly optimized cars data
		return cars;
	}


	/**
     * Eggs
     * @param {Object} User selection data
     * @return {Array} Array of eggs based on the user selection
    */
	this.eggs = function( data ) {
		//
		// Define an array of eggs that could be selected on the bums on seats dial
		var seatTriggers = [ 'Alien', 'Dog', 'Cat' ];
		//
		// Define the last seat as the extra seat (the only seat which may have eggs)
		var extraSeat = data.seats[ 4 ];
		//
		// Create an empty array of eggs
		var eggs = [];
		//
		// Check if Any of the seatTriggers are in the extra seat and save to 'i'
		var i = $.inArray( extraSeat, seatTriggers );

		// ALIEN, DOG, CAT
		// If 'i' has any of the seatTriggers...
		if ( i >= 0 ) {
			//
			// Push all the values into the eggs array (as lowercase)
			eggs.push( seatTriggers[ i ].toLowerCase() );
		}
		//
		// ROCKET CAR
		// If speed is the 5th option (lightspeed)
		if ( data.speed === 5 ) {
			//
			// Push the value 'rocket' into the eggs array
			eggs.push( 'rocket' );
		}
		//
		// NO EGGS
		// If no eggs...
		if ( eggs.length <= 0 ) {
			//
			// Set eggs to false 
			eggs = false;
		}
		//
		// Return the eggs array
		return eggs;
	}


	/**
     * Sends the database and query to the dataLogic function
     * to filter down.
    */
	this.getCars = function( q ) {
		console.log('getCars')
		//
		// If there is an eggs object in the data
		if ( typeof q.eggs === 'object' ) {
			console.log('q.eggs')
			//
			// Console log
			console.log( 'Easter eggs triggered' );
			//
			// Return the data to be an easter egg
			return { data: 'easter egg' };
		}
		//
		// Else, if there are no eggs, do some logic to return the correct car
		else {
			console.log('sending to dataLogic')
			console.log(this)
			//
			// Results will contain an array of all the cars
			var results = db().get();

			dataLogic.query = q.raw;
			dataLogic.carCollectionController(results);

		}
	}

	/**
     * Accepts the filtered car from dataLogic
     * sends it to the UI to render in the view
    */
	this.publishCar = function(car){
		ui.render(car);
	}


	/**
	 * Get cars by name
	 * @param {String} Name of the car
	 * @return {Object} Returns all the data for that car
	*/
	this.getCarByName = function( name ) {

		console.log('name:');
		console.log(name);
		//
		// Queries the database to get data about that car

		console.log(db( { name: name } ).first());
		return db( { name: name } ).first();
	}


	/**
	 * Get a car data by code
	 * @param {String} Code of the car
	 * @return {Object} Returns all the data for that car
	*/
	this.getCarByCode = function( code ) {
		//
		console.log('getCarByCode');
		console.log(code);
		//
		// Queries the database to get data about that car
		return db( { code: code } ).first();
	}


	/**
	 * Query
	 * Contains various functions to query the database
	*/
	this.query = function() {

		/**
		 * Filter the user input results and lose the filters that are not necessary
		 * @param {Object} query (all the user input results)
		 * @param {Array} filters to loose
		 * @return {Object} query with only the relevant filters
		*/
		this.filter = function( query, filtersToLose ) {
			//
			// If there is already filtersToLose, use that. Otherwise create an empty array
			var filtersToLose = filtersToLose || [];
			//
			// Get rid of empty values in the query
			if( ! query.capacity )		delete query.capacity;
			if( ! query.luggage )		delete query.luggage;
			if( ! query.lifestyle )		delete query.lifestyle;
			if( ! query.awd )			delete query.awd;
			if( ! query.high )			delete query.high;
			if( ! query.convertible )	delete query.convertible;
			if( ! query.price )			delete query.price;
			if( ! query.speed )			delete query.speed;
			if( ! query.economy )		delete query.economy;
			//
			// Iterate through the filtersToLose array...
			for ( var i = 0; i < filtersToLose.length; i++ ) {
				//
				// Delete those filters from the query (user inputs)
				delete query[ filtersToLose[ i ] ];
			}
			//
			// Return the query, which will now contain only the relevant filters
			return query;
		}


		/**
		 * Build
		 * @param {Object} query
		 * @param {Array} filters to loose (I don't think we need this??)
		 * @return {Object} Returns an object containing both the raw user input data (initially passed in), and a newly preparred data which is formatted correctly
		*/
		this.build = function( queryObj, filtersToLose ) {
			//
			// Set some variables to use
			var dbQuery	= {};
			var q = queryObj;
			var obj;
			var options = [];
			//
			// Here we are building a new 'dbQuery' object based on the values of the passed in queryObj
			// The new 'dbQuery' object needs to be formatted in a certain way...
			// We will do this using various if statements that query the queryObj, and then create the format we need for the new dbQuery object
			if ( q.capacity ) dbQuery.capacity				= { likenocase: q.capacity };

			if ( q.luggage ) dbQuery.luggage				= { likenocase: q.luggage }
				else { queryObj.luggage = 0 };

			if ( q.lifestyle ) dbQuery.lifestyle			= { likenocase: q.lifestyle } 
				else { queryObj.lifestyle = 0 };

			if ( q.awd ) { 
				dbQuery.awd						= q.awd;
				options.push('1');
				queryObj.awd = 1;
			}
			if ( q.high ) {
				dbQuery.high						= q.high;
				options.push('3');
				queryObj.high = 1;

			}
			if ( q.convertible ) {
				dbQuery.convertible		= q.convertible;
				options.push('2');
				queryObj.convertible = 1;

			}

			if ( q.price ) dbQuery.price					= { lt: q.price + 1 }
				else { queryObj.price = 0 };

			if ( q.speed ) dbQuery.speed					= { gt: q.speed - 1 }
				else { queryObj.speed = 0 };

			if ( q.economy ) dbQuery.economy				= { gt: q.economy - 1}
				else { queryObj.economy = 0 };

			if(options.length > 0) queryObj.options = options
				else { queryObj.options = 0 };

			//
			// The final object will contain both the initially passed in 'queryObj' object, as well as the newly formatted 'dbQuery' object
			obj = { prepared: dbQuery, raw: queryObj };
			//
			// Return the above object
			return obj;
		}


		/**
		 * Converts dashboard input to a query matching the data format
		 * @param {Object} data
		 * @return {Object} A converted object
		*/
		this.convert = function( data ) {

			/**
			 * MPG
			 * @param {Number} user input value for the mpg dial
			 * @return {Number} Returns an integar (1 to 4)
			*/
			function mpg( v ) {

				if( v < 25 ) return 0;
				if( v >= 25 && v < 46 ) return 1;
				if( v >= 46 && v < 61 ) return 2;
				if( v >= 61 && v < 70 ) return 3;
				if( v >= 70 ) return 4;
			}

			/**
			 * Price
			 * @param {Number} user input value for the price dial
			 * @return {Number} Returns an integar (1 to 5)
			*/
			function price( v ) {

				if( v < 191 ) return 0;
				if( v >= 191 && v < 216 ) return 1;
				if( v >= 216 && v < 246 ) return 2;
				if( v >= 246 && v < 270 ) return 3;
				if( v >= 270 && v < 295 ) return 4;
				if( v >= 295 ) return 5;
			}

			/**
			 * Luggage
			 * @param {String} user input value for the luggage dial
			 * @return {Number} Returns an integar (1 to 4)
			*/
			function luggage( v ) {

				if ( v === 'minimalist' )	return 1;
				if ( v === 'light-packer' )	return 2;
				if ( v === 'lugger' )		return 3;
				if ( v === 'big-loader' )	return 4;
			}

			/**
			 * Seats
			 * @param {Array} user input values for the seats dials
			 * @return {Number} Returns an integar (1 to 4)
			*/
			function seats( arr ) {
				//
				// New object
				var obj = {};
				//
				// New object containing the information we need of what seats are required (person, child or infant)
				// All values set to 0, in order to populate based on user input in a sec...
				var o = {
					people:		0,
					children:	0,
					infants:	0
				}
				//
				// Remove empty values from the array
				arr = _.compact( arr );
				//
				// If the array is empty, return 0
				if ( arr.length < 1 ) return 0;
				//
				// Iterate over the array...
				for ( var i = 0; i < arr.length; i++ ) {
					//
					// Make each item in the array called person, to use in the following if statements...
					var person = arr[ i ];
					//
					// Some if statements to eliminate genders, and just find out if it is a person, child or infant
					// Add these values to the 'o' object created above
					if ( person === 'Man' || person === 'Woman')	o.people++;
					if ( person === 'Girl' || person === 'Boy' )	o.children++;
					if ( person === 'Infant' )						o.infants++;
				}
				//
				// Set 'family' equal to the value of the children and people
				o.family = o.people + o.children;

				if (o.family <= 2 && o.infants === 0) {
					console.log('o.family <= 2 && o.infants === 0');
					return 1;
				}

				if (o.people === 2 && (0 < o.children && o.children <= 2) && o.infants === 0) {
					console.log('o.people === 2 && (0 < o.children && o.children <= 2) && o.infants === 0');
					return 3;
				}
				if (o.people === 1 && (0 < o.children && o.children <= 3) && o.infants === 0) {
					console.log('o.people === 1 && (0 < o.children && o.children <= 3) && o.infants === 0');
					return 3;
				}

				if (o.family <= 4 && o.infants === 0){
					console.log('o.family <= 4 && o.infants === 0');
					return 2;
				}
				if (o.family <= 3 && o.infants === 1){
					console.log('o.family <= 3 && o.infants === 1');
					return 2;
				}

				if (o.family === 5) {
					console.log('o.family === 5');
					return 4;
				}

				if (o.family === 4 && o.infants === 1) {
					console.log('o.family === 4 && o.infants === 1');
					return 4;
				}

				if (o.family === 3 && o.infants === 2) {
					console.log('o.family === 3 && o.infants === 2');
					return 4;
				} else {
					return 1;
				}


				//
				// Some if statements determining the category each variation comes under, and returning integars
				// if ( o.family <= 2 && o.infants === 0 )													return 1;
				// if ( o.family <= 4 && o.infants === 0 )													return 2;
				// if ( o.family <= 3 && o.infants === 1 )													return 2;
				// if ( o.people === 2 && ( o.children > 0 && o.children <= 2 ) && o.infants === 0 )		return 3;
				// if ( o.people === 1 && ( o.children > 0 && o.children <= 3 ) && o.infants === 0 )		return 3;
				// if ( o.family === 5 ) 																	return 4;
				// if ( o.family === 4 && o.infants === 1 )												return 4;
				// if ( o.family === 3 && o.infants === 2 )												return 4;
				// if ( o.family <= 3 && o.family > 0 && o.infants > 0 && o.infants <= 2 )					return 4; // This fixes https://iris-worldwide.atlassian.net/browse/FRT-148?filter=15137
			}


			// Builds an object based on all the above functions
			// Also adding the other dials we didn't need a whole function for
			obj = {
				//
				// A number as a string (or false if no seats)
				capacity:		( _.compact( data.seats ).length > 0 ) ? seats( data.seats ).toString() : false,
				//
				// A number as a string
				luggage:		luggage( data.luggage ).toString(),
				//
				// A number as a string
				lifestyle:		parseInt( data.lifestyle ).toString(),
				//
				// A number
				price:			price( data.price ),
				//
				// A number (or a string if it's lightspeed)
				speed:			( data.speed === 'lightspeed' ) ? data.speed : parseInt( data.speed ),
				//
				// A number
				economy:		mpg( data.mpg ),
				//
				// A boolean
				awd:			data.options.awd || false,
				high:			data.options.hp || false,
				convertible:	data.options.dt || false
			}
			//
			// console.log('coverted data object:');
			// console.log(obj);
			//
			// Returns the formatted object
			return obj;
		}
	}


	/**
	 * Populate the database
	 * @param {Array} an array of car objects
	 * @return {Object} database
	*/
	var populateDB = function( data ) {
		console.log('populateDB')


		//
		// Give the data passed in a better name of 'cars'
		cars = data;
		//
		// Converts the cars array to a JSON object
		// Passes to TAFFY method which turns it into a database structure, saving the result as db
		db = TAFFY( JSON.stringify( cars ) );

		console.log(typeof db)
		
		//
		// Make dashboardLogic.database equal to db
		_this.database = db;
		//
		// Prints out how many rows of cars have been loaded in the database
		console.log( data.length + ' rows loaded successfully to the database' );
		//
		// Publish so that it can be subscribed to anywhere
		$.publish( 'data-loaded' );
		//
		// Return db results
		return db;
	}


	/**
	 * Load JSON data (array of car objects)
	 * Get data from local storage if it is there, otherwise ajax it in
	 * Pass the data into the populateDB function
	*/
	var loadData = function() {
		//
		// Data will contain miniData from local storage if it's there, otherwise make it false
		var data = store.get( 'miniData' ) || false;
		//
		// If data is true...
		if ( data ) {
			//
			// Let us know that we are accessing the data from local storage 
			console.log( 'loading database from local storage' );
			//
			// and pass that data to the populateDB function
			populateDB( data );
		}
		//
		// Else, if not in local storage...
		else {
			//
			// Let us know that we are going request the data
			console.log( 'requesting data to populate the database' );
			//
			// Load data via ajax
			$.ajax( {
				//
				// URL will be the path to the json file (getting the path from the core.Config file)
				url: path.api,
				error: function(){ alert( 'There\'s been a problem obtaining the results.' ); },
				success: function( data ) {
					//
					// If error, alert an arror
					if ( data.Error ) { alert( data.Error ); }
					//
					else {
						//
						// Pass the JSON data to the populateDB function 
						populateDB( data );
						//
						// Store the data in local storage as 'miniData'
						store.set( 'miniData', data );
					}
				},
			} );
		}
	}


	// Initialize loadData function
	// Which will get JSON data (array of cars)
	// Pass data to populateDB which creates a database from the data
	loadData();

}
function DataLogic() {
	var self = this;
	this.query = null;
	this.oldQuery = null;
	this.activeCar = null;
	this.repeatSearch = null;
	this.selection = ['capacity', 'luggage','convertible', 'high', 'awd', 'price', 'speed', 'economy', 'lifestyle' ];

	this.carCollectionController = function(response){

		var cars = response;
		var settings = {
			minNoResults: 2
		}

		var counter = {
			count:0,
			update: function(){
				this.count++;
			},
			echo: function(){
				return this.count;
			}
		}

		var Helpers = {

			shuffle: function(array) {
				console.log('shuffling');
				console.log(typeof array)
				var m = array.length, t, i;
				// While there remain elements to shuffle…
				while (m) {
					// Pick a remaining element…
					i = Math.floor(Math.random() * m--);
					// And swap it with the current element.
					t = array[m];
					array[m] = array[i];
					array[i] = t;
				}
				return array;
			},

			convertValueToArray: function(value){
				if(typeof value === 'number') {
					value = value.toString();
				}
				if(typeof value === 'string' && value.length > 1) {
					value = value.split('');
				}
				return value;
			},

			matchSingleValueInArrary: function(array, userProp){
				return array.indexOf(userProp) != -1;
			},

			matchArrayValuesInArrary: function(array, userArray){
				var len=userArray.length;
				var count=0;

				if (typeof userArray !== 'object') {return false;}

				// console.log('we got an array')
				// console.log(array);
				// console.log(userArray);

				// Match all userArray values to pass
				for (var i=0; i<len;i++) {
					if(!Helpers.matchSingleValueInArrary(array, userArray[i])) {
						return false;
					}
					count++;
					if (len===count){
						return true;
					}
				};
			},

			areValuesValid: function(dValue, qValue){
				return Helpers.isValueLegitimate(dValue) && Helpers.isValueLegitimate(qValue);
			},

			doValuesMatch: function(numberArray, qValue) {
				// attempt to match array values to target
				// else match single value to target
				return Helpers.matchArrayValuesInArrary(numberArray, qValue) || Helpers.matchSingleValueInArrary(numberArray, qValue)
			},

			isValueLegitimate: function(value){
				return value !== 'n/a' && value !== 'TBC' && typeof value !== 'undefined' && value !== null && value != 0;
			},

			shallWeContinueTheLoop: function(array, nextProperty){
				// console.log(array.length)
				// console.log(settings.minNoResults)
				// console.log(array.length > settings.minNoResults)
				// console.log(nextProperty)
				// console.log(typeof nextProperty !== 'undefined')
				// console.log(!!(array.length > settings.minNoResults && typeof nextProperty !== 'undefined'))
				return !!(array.length > settings.minNoResults && typeof nextProperty !== 'undefined');
			}
		}

		var Filter = {
			store : [],
			reduced : 0,

			outputDatasetMessages: function(queryProp, dataSet){
				console.log(this.reduced)
				if(this.reduced !== 0) {
					console.log('reduced by : ' + (dataSet.length - this.reduced));
				} else {
					console.log('not reduced')
				}
				console.log(Filter.store);
			},

			// accepts database value, query value, record
			// check: dataset & query value contains valid content
			// match: do any values in query match the values in the data
			matchDatasetValueAgainstQueryValue: function(dValue, qValue, obj){

				// convert the dataset value into an array
				var numberArray = Helpers.convertValueToArray(dValue);


				var matchAccept = function(){
					Filter.addObjectToCollection(obj);
					return true;
				}

				var matchReject = function(){
 					console.log('skipped value');
					console.log(qValue)
					console.log(dValue)
 				}
			
				if (qValue === undefined) {
					return matchAccept();
				}
				// ensure the query number is a string for matching
				qValue = qValue.toString();

				return !!Helpers.areValuesValid(dValue, qValue) && ( Helpers.doValuesMatch(numberArray, qValue) ? matchAccept() : matchReject() );
			},

			matchSingleRecord: function(object){
				var record = this;
				for (var prop in object) {
					if(Helpers.isValueLegitimate(object[prop]) && object[prop]==record[prop]){
						return true;
					}
				}
			},

			addObjectToCollection: function(obj){
				//console.log('added')
				Filter.store.push(obj);
				Filter.reduced++;
			},

			// requires array of objects, search order array
			// check: are the conditions right to break out of loop
			// recurse with next filter property or render final results
			haveWeReachedTheEnd: function(resultCollection, order) {

				var continueLoop = function(){
					counter.update();
					console.log('Dataset still large so next is > ' + order[counter.echo()]);
					filterObjectsWithProperty(resultCollection, order[counter.echo()]);
				}

				var endLoopThenRender = function(){
					self._collection.add(resultCollection);

					// Get the latest search results object
					// Convert to array
					var carList = Array.prototype.slice.call(self._collection.latest());

					self.activeCar = carList[0];

					// Filering complete render a singe car
					dashboardLogic.publishCar( carList[0] );

				}

				return Helpers.shallWeContinueTheLoop( resultCollection, order[(counter.echo()+1)]) ? continueLoop() : endLoopThenRender();
			},


			endMasterLoop: function(dataSet, prop){
				console.log('end')

				// output console message
				Filter.outputDatasetMessages(prop, dataSet);

				if(this.reduced === 0) {
					Filter.store = dataSet;
				}

				// if endpoint not reached recurse
				// otherwise exit
				Filter.haveWeReachedTheEnd(Filter.store, self.selection);
			}
		}

		// accepts an array of objects & property string to match
		// match: success add parent object to collection
		// if break criteria is not met, call recursively
		function filterObjectsWithProperty(dataSet, prop){
			// reset values for this loop
			Filter.store = [];
			Filter.reduced = 0;

			var opt = {
				awd: 1,
				high: 3,
				convertible: 2
			}

			console.log(prop)

			console.log('This is ' + prop + ': ' + self.query[prop]);

			// Main loop through dataset
			for (var i=0; i<dataSet.length; i++) {
				var record = dataSet[i];

				// requires dataset value attempt to match with queryValue
				// success adds this record to the collection 
				Filter.matchDatasetValueAgainstQueryValue(record[prop], self.query[prop], record);

				// if last entry in set trigger end condition
				// else continue looping trough the data
				if(i===dataSet.length-1) { Filter.endMasterLoop(dataSet, prop) }

			};

			console.log('end of ' + prop);

		};

		console.log(cars)

		filterObjectsWithProperty(cars, self.selection[(counter.echo())]);


	}

	this.sendCarToRender = function(){

	}

	this.cycleThroughCarList = function(){
		var carList = Array.prototype.slice.call(self._collection.latest());
		var index = carList.indexOf(self.activeCar);
		console.log(carList);
		console.log(self.activeCar)

		if ((++index) <= carList.length-1 ) {
			console.log('next is ' + (index));
			self.activeCar = carList[index];
			dashboardLogic.publishCar( carList[index] );
		} else {
			console.log('restart');
			self.activeCar = carList[0];
			dashboardLogic.publishCar( carList[0] );
		}

	}

	// Seperate library service 
	function CarsFactory() {
		var collection = [];

		return {
			size: function() {
				return collection.length;
			},
			add: function(item){
				collection.push(item);
			},
			all: function(){
				return collection;
			},
			latest: function(){
				return collection.slice(-1).pop();
			}
		}
	}

	/**
     * Initialize
    */
	this.init = function() {
		console.log('DataLogic')

		this._collection = CarsFactory();

		console.log(this)

		$.subscribe('data-ready', function(data){
			console.log(e)
			console.log(data)
		})

	}

}


function FormLogic() {

	// Initalize vars
	var _this = this;



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
	}


	/**
     * Gets addresses from a given postcode
     * @param {String} postcode
     * @return {Object} address options
    */
	this.getAddresses = function( postcode ) {

		return $.when(

			$.ajax( {

				url:		path.apiPostcode,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data, textStatus, jqXHR ) {

			if ( jqXHR.status === 200) { return data; };

		} );

	}


	/**
     * Gets a list of nearest dealers from a given postcode
     * @param {String} postcode
     * @return {Object} dealer address options
    */
	this.getDealers = function( postcode ) {

		return $.when(

			$.ajax( {

				url:		path.apiDealers,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data ) { return data; } );

	}


	/**
     * Returns finance options for a selected car - used within the terms and conditions
     * @param {String} code of the car
	 * @return {Object} finance details
    */
	this.getFinance = function( code ) {
		var car			= dashboardLogic.getCarByCode( code );
		var finance		= car.finance;

		finance.name = car.name;

		finance.payment = _this.numberWithCommas(Number(finance.payment).toFixed(2));
		finance.price = _this.numberWithCommas(Number(finance.price).toFixed(2));
		finance.deposit = _this.numberWithCommas(Number(finance.deposit).toFixed(2));
		finance.contribution = _this.numberWithCommas(Number(finance.contribution).toFixed(2));
		finance.purchase_fee = _this.numberWithCommas(Number(finance.purchase_fee).toFixed(2));
		finance.final_payment = _this.numberWithCommas(Number(finance.final_payment).toFixed(2));

		finance.total_deposit	= _this.numberWithCommas(Number(finance.total_deposit).toFixed(2));
		finance.total_amount	= _this.numberWithCommas(Number(finance.total_amount).toFixed(2));
		finance.credit_charge 	= _this.numberWithCommas(Number(finance.credit_charge).toFixed(2));
		finance.terms			= car.terms;

		return finance;
	}
	
	this.numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}


	/**
     * Postcode lookup, dealers lookup
     * @param {Object} Address
     * @param {String?} Skip
	 * @return {Object} Address
    */
	this.formatAddress = function( addrObj, skip ) {

		var skip	= skip || [];
		var address	= new String();

		// Strip unwanted values

		for( var i = 0; i < skip.length; i++ ) {

			var key = skip[ i ];

			delete addrObj[ key ];

		}

		// Construct string

		for( var key in addrObj ) if( ! _.isEmpty( addrObj[ key ] ) ) address += addrObj[ key ] + ', ';

		address = address.substr( 0, address.length - 2 );

		return address;

	}



	/**
     * Format dealers addresses
     * @param {Object} Address
	 * @return {Object} Address
    */
	this.formatDealerAddresses = function( addrObj ) {

		var address	= new String();

		// Construct string

		for ( var key in addrObj ) {

			if ( ! _.isEmpty( addrObj[ key ] ) ) {

				if ( key === 'Name' ) {

					address += addrObj[ key ] + ', ';

				}
				else if (key === 'Address') {
					
					var parts = addrObj[ key ].split(';');
					address += parts.slice(Math.max(parts.length - 2, 1)).join(', ') + ', '
					
				}

			}
		}

		address = address.substr( 0, address.length - 2 );

		return address;

	}



	/**
     * Handle postcode
     * @param {Event} Event
	 * @return { } ??
    */
	this.handlePostcode = function( e ) {

		var postcode = $( '#postcode_search' ).val();

		// Get home addresses

		formLogic.getAddresses( postcode ).then( function( addresses ) {

			if ( addresses === null ) { return; };

			// Enable fields

			$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

			// Store addresses

			addressObj = addresses;

			formattedAddresses = [];

			// Remove existing addresses

			$( form.addressChooser ).contents().remove();

			// Construct address strings

			$( addresses ).each( function( i, addr ) {

				var address = new String();

				for( var key in addr ) if( ! _.isEmpty( addr[ key ] ) ) address += addr[ key ] + ', ';

				address = address.substr( 0, address.length - 2 );

				formattedAddresses.push( { id: i, address: address } );

			} );

			// Render template

			ui.getTpl( 'addresses' ).then( function( tpl ) {

				$( form.addressChooser ).append( ui.renderTpl( tpl, { addresses: formattedAddresses } ) );

				// We must add this field to the validator manually because it's dynamically created

				$( form.addresses ).rules( 'add', {

					required: true,
					messages: {

						required: 'Please select your address from the list.'

					}

				} );

				$('.loader-inline').removeClass('active');

			} );

		} );

		// Get dealers

		formLogic.getDealers( postcode ).then( function( dealers ) {

			// Store addresses

			dealersObj = dealers;

			formattedDealers = [];

			// Remove existing addresses

			$( form.dealerChooser ).contents().remove();

			// Construct address strings

			$( dealers ).each( function( i, addr ) {

				var address = _this.formatDealerAddresses( addr );
				var dealerId = addr.DealerId;
				formattedDealers.push( { id: dealerId, dealer: address } );

			} );

			// Render template

			ui.getTpl( 'dealers' ).then( function( tpl ) {

				$( form.dealerChooser ).append( ui.renderTpl( tpl, { dealers: formattedDealers } ) );

				// We must add this field to the validator manually because it's dynamically created

				$( form.dealers ).rules( 'add', {

					required: true,
					messages: {

						required: 'Please select your nearest dealer.'

					}

				} );

			} );

		} );

	}


	this.addressStuff = function( e ) {

		var $target = $(e.target);

		var address	= addressObj[ $target.val() ];

		console.log(address.Postcode);

		if( ! _.isEmpty( $target.val() ) ) {
			
			var postcode_search = $( '#postcode_search' ).val();

			$( form.address1 ).val( _this.formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
			$( form.address2 ).val( address.Town );
			$( form.address3 ).val( address.County );
			$( form.postcode ).val( postcode_search );

		}

		else {

			$( form.address1 ).val( null );
			$( form.address2 ).val( null );
			$( form.address3 ).val( null );
			$( form.postcode ).val( null );

		}
	}


	this.postcodeStuff = function( e ) {

		e.preventDefault();

		$('#postcode_search').validate();

		if ( $('#postcode_search').valid() )  {

			$(e.target).next('.loader-inline').addClass('active');

			postcodeTimer = setTimeout( this.handlePostcode, 600 );

		};

	}


	// Handle AJAX form results
	this.ajaxFormResults = function() {

		var $thanks = $( '.thanks-content' );
		var $formContent = $( '.form-content' );

		$thanks.hide();
		// $formContent.hide();

		$.subscribe( 'form-ajax-results', function( e, data ) {

			console.log( data );

			$formContent.slideUp( 600 );
			$thanks.slideDown( 600 );

		} );

	}


	/**
	 * Activate forms
	*/
	this.activateForms = function() {
		//
		// Activate the color of submit button
		dashboard.activateDashColor();
		//
		// Validate forms
		$( 'form' ).validate();
		// Handle successful form submission
		$.subscribe( 'form-ajax-results', function( e, data ) {
			if( data.success ) {
				ui.showPanel( 'thanks' );
			} else {
				ui.showPanel( 'error' );
			}

		} );
	}


	this.eventListeners = function() {

		$body.on( 'change', form.addresses, function( e ) {
			_this.addressStuff( e );
		});

		$body.on( 'click', form.addressLookup, function( e ) {
			_this.postcodeStuff( e );
		});

		$('input').bind('keydown', function( e ) {
			if (e.which === 13) {
				e.stopPropagation();
				e.preventDefault();

				$(this).nextAll('input').eq(0).focus();
			}
		});

	}
	
	this.validateStoredInput = function() {
		console.log(store.get( 'miniInput' ));
		if (store.get( 'miniInput' ) === undefined && window.location.href.indexOf('/form') != -1) {
			
			window.location.href=window.location.href.replace('/form', '');
			
		}
		
	}
	
	this.enableUserTracking = function() {
		$('#results_recombobulate a,#results_back a').attr('href', '/' + window.location.search);
	}


	this.init = function() {
		_this.validateStoredInput();
		_this.enableUserTracking();
		_this.eventListeners();
		_this.ajaxFormResults();
		_this.activateForms();

	}

}
function Dials() {


	// DIAL: ROLLERS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * ROLLERS
	 * @param {String} Slot selector
	 * @return {Object} Returns the slot_dial draggable object with some more useful properties added
	*/
	this.roller = function( slot ) {

		// SET VARIABLES
		///////////////////////////
		//
		// Compile a list from the siblings of the passed in slot (.fake-list)
		var $list = $( slot ).siblings( '.list' );
		//
		// Get the height of each slot
		var slotHeight = $list.find( '.item:nth-child( 2 )' ).height();
		//
		// Get the entire list height
		var listHeight = slotHeight * ( $list.find( '.item' ).length - 1 );


		/**
		 * RESET
		 * All the slots using Greensock tweenLite
		*/
		var reset = function() {
			//
			// '_this' is an instance of the draggable object
			var _this = this;
			//
			// Greensock tween to the first fake-list item, for 0.6 seconds
			TweenLite.to( _this.$slot.get( 0 ), 0.6, {
				//
				// Lock axis to 'y' direction
				y: 0,
				//
				// Once complete, update the draggable object
				onComplete: function() { _this.update(); }
			} );
			//
			//
			// Find the item inside the list and remove the active class
			_this.$list.find( '.item' ).removeClass( 'active' );
			//
			// Remove dragging class and the style attr from the list
			_this.$list.removeClass( 'dragging' ).removeAttr( 'style' );
			//
			// Update the draggable object
			_this.update();
		}
		
		/**
		 * GET SLOT VALUE
		 * @return {String} Returns the value of the active slot (Man, Woman, Boy, Girl etc)
		*/
		var getSlotValue = function() {
			//
			// Passes the draggable object values into getSlotState to return the active slot
			var activeSlot = getSlotState( this.y, slotHeight, 0 );
			//
			// To get the slot, we find the item in the list which matches the number of the active slot
			var $slot = $list.find( '.item' ).eq( activeSlot );
			//
			// To get the string value, we get the data-value attr or the slot text
			var value = $slot.data( 'value' ) || $slot.text();
			//
			// Returns the value of the slot, or 'empty' if there is no value
			return ( value === 'Empty' ) ? 0 : value;
		}


		/**
		 * GET SLOT STATE
		 * @param {Number} Position
		 * @param {Number} Height
		 * @param {Number} Padding
		 * @return {Number} Returns the active slot
		*/
		var getSlotState = function( pos, height, padding ) {
			//
			// Current Position returns the absolute value of the position
			var currentPosition = pos - (height/2);
			//
			// Active Slot calculates the position and the height and rounds the number upwards
			var activeSlot = Math.ceil( currentPosition / height );
			//
						
			// Returns the active slot plus 1 (maybe because otherwise it would start at 0?)
			return Math.abs( activeSlot ) + 1;
		}


		// Make fake list the same height as the real one
		$( slot ).height( listHeight );


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the slot dial
		var slot_dial = new Draggable( slot, {
			//
			// Lock axis to 'y' direction
			type: 'y',
			//
			// Make the bounds the slots parent (the list element that holds all the slots)
			bounds:	$( slot ).parent(),
			//
			// Setting edge resistance to '1' doesn't allow it to drag past it's set bounds
			edgeResistance:	1,
			//
			// Gets the momentum of the users drag, using the throwProps plugin
			throwProps:	true,
			//
			// Applies everytime the slot gets dragged...
			onDrag:	function() {
				//
				// Passes the draggable object values into getSlotState to return the active slot
				var activeSlot = getSlotState( this.y + 40, slotHeight, 0 );
				//
				// Remove active class from all the slots, but add it to the active slot
				var $active	= $list.find( '.item' ).removeClass( 'active' ).eq( activeSlot ).addClass( 'active' );
				//
				// Add dragging class to the list, and CSS transform position based on the value of the 'y' position of the slot
				$list.addClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.y + 'px, 0px )' } );
			},
			//
			// Applies when the user stops dragging...
			onDragEnd: function() {
				//
				// Remove dragging class from the list, and CSS transform position to the value of where the drag will end (endY gives you this figure)
				$list.removeClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.endY + 'px, 0px )' } );
				//
				// Google Analytics
				var triggeredEvent = $( slot ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );
			},
			//
			// Defines a rule for where the slot will snap to...
			snap: function( endValue ) {
				//
				// Calculates the snap position based on the slot height and rounds up
				return Math.round( endValue / slotHeight ) * slotHeight;
			}
		} );


		// ADD TO SLOT DIAL OBJECT
		///////////////////////////
		//
		// Using the slot_dial instance of the draggable object...
		// We will add some useful properties to it based on the above functions
		slot_dial.getValue	= getSlotValue;
		slot_dial.reset		= reset;
		slot_dial.$list		= $list;
		slot_dial.$slot		= $( slot );


		// And return the slot_dial draggable object with our properties added
		return slot_dial;
	}




	// DIAL: LUGGAGE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * LUGGAGE
	 * @return {Object} Returns the luggage_dial draggable object with some more useful properties added
	*/
	this.luggage = function() {

		// SET VARIABLES
		///////////////////////////
		//
		// Set luggage_end to be 0
		var luggage_end	= 0;
		//
		// Set luggage_el to be a DOM element
		var luggage_el = document.querySelector( '.control.luggage .dial' );
		//
		// Set the luggage_snap to be a circle divided in quarters as there are 4 options
		var luggage_snap = 360 / 4;


		/**
		 * GET LUGGAGE
		 * @return {Number} Returns the active slot
		*/
		var getLuggage = function() {
			//
			// Gets the class of the luggage element and gets rid of and other classes so it is only 'dial'
			return $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();
		}


		/**
		 * SPIN LUGGAGE DIAL
		 * @param {String} Direction (left or right)
		*/
		var spinLuggageDial = function( direction ) {
			//
			// Remove all classes from the luggage element, except 'dial'
			$( luggage_el ).removeClassExcept( 'dial' );
			//
			// Save the dial element
			var $dial = $( '.control.luggage .dial' );
			//
			// If direction is 'left'...
			// Add the luggage_end and luggage_snap together
			// Else, minus them from eachother
			var nr = ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;
			// Use Greensock Tween to move to the initial position
			// 
			TweenLite.to( luggage_el, 1, {
				//
				// Rotation is based on the direction of the user click
				rotation: nr,
				//
				// On complete, pass in the rotation value to the dialClass function
				onComplete: function( v ) {

					dialClass( nr );

					// Google Analytics
					var triggeredEvent = $( luggage_el ).closest('.control-wrapper').attr('id');
					trackDialEvents( triggeredEvent );

				}
			} );

			// Update rotation & value
			luggage_dial.update();
			//
			// Set luggage_end to be based on the user click direction
			luggage_end = nr;
			// alert('click');
		};


		/**
		 * LUGGAGE DIAL ARROW UP
		 * @param {Object} Target parent (arrows parent)
		 * @param {String} Direction (left or right)
		*/
		var dialArrowUp = function( $targetParent, direction ) {
			//
			// Remove classes 'left' and 'right' from the arrows element
			$targetParent.removeClass( 'right left' );
			//
			// Spin the dial!
			spinLuggageDial( direction );
		};


		/**
		 * LUGGAGE DIAL ARROW DOWN
		 * @param {Object} Target parent (arrows parent)
		 * @param {String} Direction (left or right)
		*/
		var dialArrowDown = function( $targetParent, direction ) {
			//
			// Classes added to the arrows parent element determine the button style to show user interaction (up or down)
			// Remove classes 'left' and 'right' from the arrows parent element, but then add the class of the direction
			$targetParent.removeClass( 'right left' ).addClass( direction );
		};


		/**
		 * BIND EVENTS
		*/
		var bindEvents = function() {
			//
			// On user interaction with the luggage arrows...
			$( '#left, #right' ).on( 'mousedown mouseup touchstart touchend', function( e ) {

				e.stopPropagation();
				e.preventDefault();
				//
				// Getting the direction and the target
				var $targetParent = $( this ).parent();
				var direction = e.target.id;
				//
				// This adds a class of 'left' or 'right' to the arrows element, depending on user interaction...
				if ( e.type === 'mousedown' || e.type === 'touchstart' ) {
					dialArrowDown( $targetParent, direction );
				} else {
					dialArrowUp( $targetParent, direction );
				};

			} );
		}


		/**
		 * DIAL CLASS
		 * Adds a class to the luggage dial element based on user selection
		 * @param {Number} The dials rotation value, everytime the user clicks
		*/
		var dialClass = function( r ) {
			//
			// Some calculation to turn the rotation value into a number from -1 to -4
			var dial_class = ( ( ( r / luggage_snap ) % luggage_snap ) % 4 );
			//
			// Some logic to set a string to each number of the dial and save as 'final_class' to be added to the element
			if ( dial_class === -1 || dial_class === 3 ) { final_class = 'light-packer'; } // light packer
			if ( dial_class === -2 || dial_class === 2 ) { final_class = 'lugger'; } // lugger
			if ( dial_class === -3 || dial_class === 1 ) { final_class = 'big-loader'; } // big loader
			if ( dial_class === 0 ) { final_class = 'minimalist'; } // minimalist
			//
			// Remove all other classes except 'dial' and add the class which determines the user selection
			$( luggage_el ).removeClassExcept( 'dial' ).addClass( final_class );
		}


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the slot dial
		var luggage_dial = new Draggable( luggage_el, {
			//
			// Set type to rotation
			type: 'rotation',
			//
			// Allow user throw with momentum
			throwProps: true,
			//
			// On throw complete...
			onThrowComplete: function() {
				//
				// Pass the end rotaion value to the dial class function
				dialClass( parseInt( this.endRotation ) );
			},
			//
			// On drag start...
			onDragStart: function( e ) {
				//
				// Remove all classes from the luggage element, except for 'dial'
				$( luggage_el ).removeClassExcept( 'dial' );
			},
			// On drag end...
			onDragEnd: function( e ) {
				//
				// Update luggage end
				luggage_end = parseInt( this.endRotation );
			},
			//
			// Calculate at what point to snap to...
			snap: function( endValue ) {
				//
				return Math.round( endValue / luggage_snap ) * luggage_snap;
			}
		} );


		// Call the bindEvents function to listen to user interaction
		bindEvents();

		// Set a property of getLuggage to the draggable instance, to be that of the function above
		luggage_dial.getLuggage = getLuggage;

		// Return the draggable object
		return luggage_dial;
	}




	// DIAL: OPTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * OPTIONS
	*/
	this.options = function() {

		/**
		 * Get options
		 * @param {Object} Returns an object with the values the user has selected (booleans values for each option)
		*/
		this.getOptions = function() {
			//
			// Save the elements of the options checkbox inputs
			var $inputs	= $( '.control.options input' );
			//
			// Set values to an empty object
			var values	= {};
			
			// Iterate over each input checkbox inputs...
			$inputs.each( function( i, el ) {
				//
				// Setting the property to be the ID of the input, and the value to a boolean for if it is checked or not
				values[ $( this ).attr( 'id' ) ] = $( this ).hasClass( 'checked' );
			} );
			//
			// Returns the values, which is an object with all the options as properties and the values of those set to true or false
			return values;
		}

		// Fallback on click for IE, and useful for google analytics...
		// Normally we wouldn't need it, because in all normal browsers we can just use input:checked + label, but because of the stupid IE we need to do a fallback on click...
		$( '.option' ).on( 'click', function( e ) {
			//
			// Prevent default event
			e.preventDefault();
			//
			// Find the input element
			var $input = $( this ).find( 'input' );
			//
			// And toggle a checked class
			$input.toggleClass( 'checked' );
			//
			// Google Analytics
			var triggeredEvent = $( e.target ).closest('.control-wrapper').attr('id');
			trackDialEvents( triggeredEvent );
			//
		} );
	}




	// DIAL: LIFESTYLE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * LIFESTYLE
	 * @return {Object} Returns the lifestyle_dial draggable object with some more useful properties added
	*/
	this.lifestyle = function() {

		/**
		 * GET LIFESTYLE
		 * @return {String} Returns a number string from the data-value attr of the active slide
		*/
		var getLifestyle = function() {
			//
			// Slick-slide is part of the slick.js slider plugin, which is used to show the lifestyle images
			return $( '#c-lifestyle .slick-slide.slick-active' ).attr( 'data-value' );
		}


		// SET VARIABLES
		///////////////////////////
		//
		// Get the dial element (the rotating draggable element)
		var lifestyle_el = document.querySelector( '.control.lifestyle .dial' );
		//
		// Set the lifestyle bounds to be the number of slides?? No idea why it's defined twice
		var lifestyle_bounds = 5;
		var lifestyle_bounds = 45;
		//
		// Set an empty variable for the direction
		var lifestyle_direction;


		// SLICK.JS
		///////////////////////////
		//
		// For modern browsers, load slick.js slider
		if ( ! ie.loadFallbacks() ) {
			//
			// Set the wrapper of the slider
			var $slick = $( '.items-wrapper' ).slick( {
				//
				// Don't include arrows, infinate sliding (looping), and define the selector for the slides
				arrows:	false,
				infinite: true,
				slide: '.item',
				//
				// After slide change...
				onAfterChange: function() {
					//
					// Enable lifestyle_dial. Not sure where this function is??
					lifestyle_dial.enable();
				}
			} );
		}


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the lifestyle dial
		var lifestyle_dial = new Draggable( lifestyle_el, {

			type:			'rotation',
			bounds:			{ minRotation: -lifestyle_bounds, maxRotation: lifestyle_bounds },
			throwProps:		true,
			snap:			function( endValue ) { return true; },
			onDragStart:	function() { lifestyle_direction = Math.abs( this.y ); },
			onDragEnd:		function() {

				// Determine direction

				var direction = ( Math.abs( this.y ) > lifestyle_direction ) ? 'right' : 'left';

				slideContent( direction );

			}

		} );


		// Move content in the window
		function slideContent( direction ) {

			if ( ie.loadFallbacks() ) {

				( direction === 'right' ) ? ie.lifestyle.prev() : ie.lifestyle.next();

			} else {

				( direction === 'right' ) ? $slick.slick( 'slickPrev' ) : $slick.slick( 'slickNext' );

			}

			// Google Analytics
			var triggeredEvent = $($slick).closest('.control-wrapper').attr('id');
			trackDialEvents( triggeredEvent );

		}


		// Listen to click...
		$('.control.lifestyle').off('click').on('click', function( e ) {
			//
			// Get width of clicked element
			var width = $(this).width();
			//
			// Get offset of clicked element
			var posX = $(this).offset().left;
			//
			// Calculate clicked position from offset
			var clickedPos = e.pageX - posX;
			//
			// Calculate the half way position
			var halfWay = width / 2;

			// Set direction variable to be updated
			var direction;

			// If clicked position is less than half way...
			if ( clickedPos < halfWay ) {
				//
				// Direction is left
				direction = 'left';
			//
			// More than half way...
			} else {
				//
				// Direction is right
				direction = 'right';
			}
			//
			// Pass the position to the slideContent func
			slideContent( direction );
		});


		lifestyle_dial.getLifestyle = getLifestyle;

		return lifestyle_dial;

	}




	// DIAL: MPG
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * MPG
	 * @return {}
	*/
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

				$( '.control.mpg' ).addClass('scale-' + css_name).removeClassExcept( 'control mpg scale-' + css_name );
				$( '#mpg_value' ).text( v );

				// Google Analytics
				var triggeredEvent = $( mpg_el ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );

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


	// DIAL: PRICE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * PRICE
	 * @return {}
	*/

	this.price = function() {

		var getPrice = function() {

			var height		= getHeight( dialPrice ) || 0;
			var min			= 190;
			var max			= 300;				
			var range		= max - min;

			return parseInt( ( range / 100 ) * height ) + min;

		}


		var getHeight = function( v ) {

			var position = Math.abs( parseInt( v.endY ) );	

			var height = Math.abs( ( position / v.minY ) * 100 );

			return height;

		}


		var getbgColorHeight = function( v ) {

			var position = Math.abs( parseInt( v.endY ) );	

			var height = position + 13 + 'px';

			return height;

		}


		var dialPrice = new Draggable( '.control.price .handle', {

			type: 'y',

			edgeResistance:	1,

			bounds:	'.control.price .bounds',

			throwProps: false,

			onDragStart: function() { priceChanged = true; },

			onDrag:	function() {

				$( '.control.price .switch-bg' ).css( 'height', getbgColorHeight(this) );

				// Google Analytics
				var triggeredEvent = $( '.control.price' ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );

			},

		} );

		dialPrice.getPrice = getPrice;

		return dialPrice;

	}

}


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
			// Google Analytics
			var triggeredEvent = $( e.target ).closest('.control-wrapper').attr('id');
			trackDialEvents( triggeredEvent );
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

		console.log(">>> activateDashColor >>> carCode: " + carCode + ", color: " + color);
		//
		// If 'color' is set above, set the dashboard to that color, otherwise set a hard coded color
		var dashColor = ( color ) ? color : 'Blazing Red';
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


function Combobulate() {
	//
	// Save 'this' to refer to this object later
	var _this = this;	


	/**
     * Do some animation
     * @param {Object} Button click event
    */
	this.animateCombobulate = function( e ) {
		//
		// prevent default of button
		e.preventDefault();
		//
		// Get the clicked button
		var $button = $(e.target).parent();
		//
		// Disable users clicking the button again
		$button.css('pointer-events', 'none');
		//
		// Animate the combobulate button
		TweenMax.from($( '#start .button-inner' ), 0.5, {
			//
			// Roatate all the way round
			rotation: -360,
			//
			// On complete...
			onComplete: function() {
				//
				// Call the scroll to top of the page function
				scrollToTop();
				//
				// And allow the user to click the button again
				$button.css('pointer-events', 'auto');
				//
				setTimeout( function() {
					$('#tablet-toggle').click();
					$( '.layout-dash > .column.left' ).removeClass( 'open' );
				}, 600);


			}
		});
		//
		// Scroll to top of page
		function scrollToTop() {
			//
			$('html, body').animate({
			    scrollTop: 0
			}, 600);
			//
			return false;
		}
	};


	/**
     * Execute the search of the cars based on the user input from the dashboard
     * Pass results to ui.eggs function
    */
	this.executeSearch = function() {
		//
		// Save the values of the dashboard as 'userSelection'
		var userSelection = dashboard.values();
		console.log(userSelection)
		//
		// Set miniInput to have the value of the userSelection
		store.set( 'miniInput', userSelection );
		//
		// On the html, remove all classes beginning with 'egg'
		$html.removeClassBeginningWith( 'egg' );
		//
		// The function dashboardLogic.eggs will return an array of eggs based on the user input (if there are any eggs)
		var eggs = dashboardLogic.eggs( userSelection );

		// If there is a toy or rocket in the array...
		// Pass the name as a string, and the array itelf to the UI.eggs function
		if ( $.inArray( 'toy', eggs ) >= 0 || $.inArray( 'rocket', eggs ) >= 0 ) {
			console.log('no')
			//
			if ( $.inArray( 'rocket', eggs ) >= 0 && $.inArray( 'toy', eggs ) >= 0 ) {
				//
				ui.eggs( 'rocket', eggs );
			//
			} else if ( $.inArray( 'toy', eggs ) >= 0 ) {
				//
				ui.eggs( 'toy', eggs );
			//
			} else {
				//
				ui.eggs( 'rocket', eggs );
			//
			}
			//
			return;
		}
		//
		// Else... if there is not a toy or rocket...
		else {

			// 
			// Convert user input values to an appropriate structure
			var search = query.build( query.convert( dashboard.values() ) );

			console.log(search)

			if ( _.isEqual(dataLogic.oldQuery, search) ) {

				console.log('identical query');
				dataLogic.cycleThroughCarList();

			} else {

				// Get the car results using the dashboardLogic.getCars function and passing in the above search structure from user input
				var results	= dashboardLogic.getCars( search );

				// Store the current query
				dataLogic.oldQuery = search;

			};

			// When results exsist, activate color again
			runWhenElementExsists( $('#tpl-results .model-name'), reActivateColor );

			function reActivateColor() {
				var color = $( '.button-inner .switch-bg' ).css( 'background-color' );
				$.publish( 'colour-change', color );
			}

		}
	}


	/**
     * Show alternative cars
     * @param {Object} Button clicked event
    */
	this.showAlternateCars = function( e ) {
		//
		// Prevent button event default
		e.preventDefault();
		//
		// Get the clicked on elements thumbnail
		var $targetLink = $(e.target).parent();
		//
		// Get link of the clicked thumbnail
		var link = $targetLink.attr( 'href' );
		//
		// Get the car name from the link
		var car	= dashboardLogic.getCarByCode( link.substring( 1 ) );
		//
		// Remove active classes from all the thumbnails, but add active class to the thumbnail clicked
		$( '.car-changer' ).removeClass( 'active' ).filter( $targetLink ).addClass( 'active' );
		//
		// Pass to the UI render function, the clicked on car name and whether it has related cars
		ui.render( car, true );
	}


	/**
     * Event listeners
    */
	this.eventListeners = function() {
		//
		// On click of the car changer
		$body.on( 'click', '.car-changer', function( e ) {
			_this.showAlternateCars( e );

			// Google Analytics
			_gaq.push(['_trackEvent', 'Dashboard', 'Related cars' ]);

		});

		// On click of the combobulate button
		$( '#start' ).on( 'click', function( e ) {
			_this.animateCombobulate( e );
			_this.executeSearch();

			// Google Analytics
			_gaq.push(['_trackEvent', 'Dashboard', 'Combobulate button' ]);

		});

		$.subscribe('sort-finished', function(e, data){
			console.log('sort-finished');
			console.log(data)
			ui.render( data );
		});
	}


	/**
     * Initialize
    */
	this.init = function() {
		//
		// Listen to events
		_this.eventListeners();
	}

}
function Finance() {

	// Initalize vars
	var _this = this;	


	/**
	 * RENDER FINANCE TEMPLATE
	*/
	this.renderFinanceTpl = function() {
		//
		// If we are on the results page...
		if ( $( '#page-results' ).length > 0 ) {
			//
			// Get the car finance data by passing in the car code to the getFinance function
			var carFinance = formLogic.getFinance( carCode );
			//
			// Get finance template
			ui.getTpl( 'finance' ).then( function( tpl ) {
				//
				// Replace the contents of the div, with the template contents...
				$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, carFinance ) );

				// When payment plan table exsists (meaning the template has been rendered), manipulate the finance template
				runWhenElementExsists( $('#finance-template'), manipulateFinanceTpl );
				//
				function manipulateFinanceTpl() {
					//
					// Check if contibution is 0 and if so, hide it and hide the customer deposit
					if ( parseInt(carFinance.contribution) === 0 ) {
						//
						$('.retailer-deposit-contribution--row').addClass('hide');
						$('.customer-deposit--row').addClass('hide');
					}
					//
					// Slide up T&Cs to start
					$('.terms-toggle .hide-terms').addClass('hide');
					$('.terms').slideUp(1, function() {
						//
						// Once slide is complete, fade in the entire template
						$('#finance-template').addClass('fadeIn');
					});
					//
					// Bind a click event to toggle the terms
					$('.terms-toggle').on('click', function() {

						if ( $('.terms-toggle').hasClass('open') ) {

							$('.terms').slideUp();
							$('.terms-toggle').removeClass('open');
							$('.terms-toggle .hide-terms').addClass('hide');
							$('.terms-toggle .show-terms').removeClass('hide');

						} else {

							$('.terms').slideDown();
							$('.terms-toggle').addClass('open');
							$('.terms-toggle .show-terms').addClass('hide');
							$('.terms-toggle .hide-terms').removeClass('hide');

						}



					})
				}

			} );
		}
	}


	/**
	 * INITIALIZE
	*/
	this.init = function() {
		_this.renderFinanceTpl();
	}

}
function UI() {

	var _this = this;

	this.$panel = $body.find( '.panel-results' );

	// Load / cache template

	this.getTpl = function( name ) {

		var promise	= new $.Deferred();
	    var cached	= store.get( 'miniTemplates' ) || {};

	    if( cached.hasOwnProperty( name ) ) {

	        console.log( 'template ' + name + '.mustache found in cache' );

		    promise.resolve( cached[ name ] );

	    }

	    else {

	        console.log( 'requesting ' + name + '.mustache template via AJAX' );

	        promise = $.get( path.templates + '/' + name + '.mustache' ).then( function( data ) {

	        	var cached      = store.get( 'miniTemplates' ) || {};
		        var newTemplate = {};

		        newTemplate[ name ] = data;

		        if( ! cached.hasOwnProperty( name ) ) store.set( 'miniTemplates', _.extend( cached, newTemplate ) );

		        return data;

	        } );

	    }

	    return promise;

	}

	// Render template

	this.renderTpl = function( tpl, data ) { return Mustache.render( tpl, data ); }

	// Results URL generator

	var resultsPageUrl	= function( url, code ) {

		var user = $body.find( '#uid' ).val();

		return ( typeof user === 'undefined' ) ? url + 'm=' + code : url + 'm=' + code + '&c=' + user;

	};

	// SVG loader

	this.loadSVGs = function() {

		var svgs = document.querySelectorAll( '.svg' );

		SVGInjector( svgs, {

			pngFallback: path.spriteFallback,

			each: function( svg ) {

				$( svg ).hide().fadeIn( 600 );

			}

		} );

	}

	// Panels

	this.showPanel = function( panel ) {

		$body.find( '[data-panel-name]' ).removeClass( 'panel-active' );
		$body.find( '[data-panel-name="' + panel + '"]' ).addClass( 'panel-active' );

	}
	
	this.currentScale = 0;
	this.fudgeMpg = function() {
		$('.control.mpg').prop('class', 'control mpg scale-' + _this.currentScale);
		if (_this.currentScale == 14) {
			$('.control.mpg').prop('class', 'control mpg scale-0');
			$sys.toggleClass( 'hidden' );
			setTimeout(function() {introAnimations.init();}, 2000);
		}
		++_this.currentScale;
		setTimeout(_this.fudgeMpg, 1000);
	}

	// Image preloader

	this.preloadImages = function() {

		this.loadSVGs();
		$(window).load(function(){
			
			
			$sys.toggleClass( 'hidden' );
			setTimeout(function() {introAnimations.init();}, 500);
			
		} );
	// Initialize intro animations on the dashboard
		
		
	}
	// Render results

	this.render = function( car, related ) {

		var _this	= this;
		var related	= related || false;


		var renderRelatedCars = function( car, skipRelated ) {

			var $cars			= _this.$panel.find( '.car-changer' );
			var skipRelated		= skipRelated || false;

			var alt_1 = dashboardLogic.getCarByCode( car.alt_1 );
			var alt_2 = dashboardLogic.getCarByCode( car.alt_2 );
			var alt_3 = dashboardLogic.getCarByCode( car.alt_3 );

			// console.log(alt_1);
			// console.log(alt_2);
			// console.log(alt_3);

			// console.log(skipRelated);

			if ( alt_1 === false || alt_2 === false || alt_3 === false ) {

				alert( 'missing alternate car - check console.log for missing value' )

				console.log( 'Original car:' );
				console.log( car );

				var alt_1_status = _.isObject( alt_1 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;
				var alt_2_status = _.isObject( alt_2 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;
				var alt_3_status = _.isObject( alt_3 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;

				console.log( 'Alternative 1 - ' + car.alt_1 + alt_1_status );
				console.log( 'Alternative 2 - ' + car.alt_2 + alt_2_status );
				console.log( 'Alternative 3 - ' + car.alt_3 + alt_3_status );

			} else {

				if ( ! skipRelated ) {

					console.log( 'replacing related cars' );

					$cars.removeClass( 'active' ).filter( ':first' ).addClass( 'active' );

					$cars.eq( 0 ).attr( 'href', '#' + car.code ).find( 'img' ).attr( 'src', path.assets + 'thumbnails/' + car.code + '.jpg' );
					$cars.eq( 1 ).attr( 'href', '#' + alt_1.code ).find( 'img' ).attr( 'src', path.assets + 'thumbnails/' + alt_1.code + '.jpg' );
					$cars.eq( 2 ).attr( 'href', '#' + alt_2.code ).find( 'img' ).attr( 'src', path.assets + 'thumbnails/' + alt_2.code + '.jpg' );
					$cars.eq( 3 ).attr( 'href', '#' + alt_3.code ).find( 'img' ).attr( 'src', path.assets + 'thumbnails/' + alt_3.code + '.jpg' );

				}

			}

		}

		// Hide the dashboard on mobile

		if( Mini.browser.mobile ) setTimeout( function() { $( '#layout-dash > .column.left' ).removeClass( 'open' ); }, 0 );

		// Render actual results

		car.url = resultsPageUrl( path.results, car.code );
		car.img = path.assets + car.code + '.jpg';

		// Render car templates

		// If rocket car...
		if ( car.code === "RKT" ) {

			this.getTpl( 'rocketcar' ).then( function( tpl ) {

				$( '#tpl-results' ).contents().remove();
				$( '#tpl-results' ).append( _this.renderTpl( tpl, car ) );

				_this.rocketcar();

			} );

		// If any other car...
		} else {

			this.getTpl( 'results' ).then( function( tpl ) {

				$( '#tpl-results' ).contents().remove();
				$( '#tpl-results' ).append( _this.renderTpl( tpl, car ) );

			} );

		}

		renderRelatedCars( car, related );

		// Reveal results

		this.showPanel( 'results' );

		// Change dashboard color

		dashboard.colors( carColors[ car.color ] );

		// If mobile, scroll to the top

		if( Mini.browser.mobile ) $( [ $html[ 0 ], $body[ 0 ] ] ).animate( { scrollTop: 0 }, 600 );

	}


	/**
     * Eggs
     * @param {String} Trigger - car to show
     * @param {Array} Data - user selection data
    */
	this.eggs = function( trigger, data ) {
		//
		// Eggs are the wild cards that a user can select, which will result in made up cars
		//
		// Create an object containing data for the eggs
		var eggsData = {

			rocket: {
				'brand': 	'MINI',
				'code':		'RKT',
				'color':	'Blazing Red',
				'name':		'ALPHA CENTURA',
				'cost':		'n/a',
				'alt_1': 	'SX92',
				'alt_2': 	'MR92',
				'alt_3': 	'SS92'
			}
		};

		// Removes old egg classes from the html and adds a new one based on the trigger
		$html.removeClassBeginningWith( 'egg' ).addClass( 'egg-' + trigger );
		//
		// Based on the trigger passed in, render appropriate data from the eggsData above
		switch( trigger ) {
			case 'rocket': this.render( eggsData.rocket );
			break;
		}

	}


	/**
     * Animate rocket car
    */
	this.rocketcar = function() {

		var $rocketCarCar = $('.rocket-car--car');
		var $rocketCarGlow = $('.rocket-car--glow');
		var $rocketCarShadow = $('.rocket-car--shadow');

		TweenMax.to($rocketCarCar, 1, {
			top: "-10px",
			repeat: -1,
			yoyo: true,
			ease: Linear.easeNone
		});

		TweenMax.to($rocketCarGlow, 1, {
			top: "-10px",
			alpha: 1,
			repeat: -1,
			yoyo: true,
			ease: Linear.easeNone
		});

		TweenMax.to($rocketCarShadow, 1, {
			alpha: 0.3,
			repeat: -1,
			yoyo: true,
			ease: Linear.easeNone
		});

	};



	// Initialize
	this.init = function( panel ) {
		_this.showPanel( panel );
	}

}
function SocialMedia() {

	// Facebook

	var facebook = function( website ) {

		// Direct post

		if( $( website ).data( 'fb-mode' ) === 'direct' ) {

			FB.login( function( data ) {
			
				if( data.authResponse ) {

					FB.api(

						'/me/feed',
						'POST',
						socialMedia.facebook,
						function ( data ) {

							( data.error ) ? alert( data.error.error_user_msg ) : alert( 'Thanks! Posting completed.' );

						}

					);

				}

				else { alert( 'We couldn\'t authorise you. Sorry for the inconvenience.' ); }

			}, {

				scope: 'publish_actions',
				return_scopes: true

			} );

		}

		// Or just a share dialog

		else {

			FB.ui( {

				method:	'share',
				href:	socialMedia.facebook.link,

			},
			function( response ) {
			
				if( response && ! response.error_code ) {
				
					alert( 'Thanks! Posting completed.' );

				}

				else {

					alert( 'We couldn\'t post to your wall.' );
				}

			} );

		}

	}

	// Twitter

	var twitter = function( website ) {

		var hashtags		= ( socialMedia.twitter.hashtags !== undefined ) ? socialMedia.twitter.hashtags : '';
		var twitterShareURL	= 'https://twitter.com/intent/tweet?' + 'hashtags=' + hashtags + '&text=' + socialMedia.twitter.text + '&url=' + socialMedia.twitter.url;

		window.open( twitterShareURL, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600' );

	}

	// Bind clicks

	$body.on( 'click', '.js-sharer li a', function( e ) {

		e.preventDefault();

		var website = $( this ).parent();

		switch( $( website ).attr( 'class') ) {

			case 'facebook': facebook( website ); break;

			case 'twitter': twitter( website ); break;

		}

	} );
	
}
// FastClick

if( 'addEventListener' in document ) { document.addEventListener('DOMContentLoaded', function() { FastClick.attach( document.body ); }, false ); }

// Media queries

function Responsive() {

	var mobile		= matchMedia( '( max-width: 767px )' );
	var tablet		= matchMedia( '( min-width: 768px ) and ( max-width: 1179px )' );
	var desktop		= matchMedia( '( min-width: 1180px )' );


	var handleMobile = function( mediaQuery ) {

		this.on = function() {
			//
			// Add mobile class to body
			$( 'body' ).addClass('mobile');

			// Toggling dial tabs
			//
			// Get the dial tabs trigger
			var $controlTitle = $( '.control-title' );
			//
			// On click of dial tab trigger
			$controlTitle.off( 'click' ).on( 'click', function( e ) {
				//
				// Prevent default event
				e.preventDefault();

				// Check if dial tab is already open...
				if ( $( this ).hasClass( 'open' ) ) {
					//
					// Close it
					$controlTitle.removeClass( 'open' );
				//
				// Else, if it is not open...
				} else {
					//
					// Close all the other tabs
					$controlTitle.removeClass( 'open' );
					//
					// And open the selected one
					$( this ).addClass( 'open' );
				}

				
				// Lighting up the dial tabs light
				//
				// Get the light
				var $light = $( this ).find( '.light' );
				//
				// Get the color
				var color = $( '.switch-bg' ).css( 'background-color' );
				//
				// Add a light class to the clicked tab to show the user has opened it
				$( this ).addClass('light');
				//
				// If the dial tab has the light class...
				if ( $( this ).hasClass( 'light' ) ) {
					//
					$light.addClass( 'switch-light' );
					$.publish( 'colour-change', color );
					//
				} else {
					//
					$light.removeClass( 'switch-light' );
					$light.removeAttr( 'style' );
				}

			} );

		};

		this.off = function() {

			// Remove mobile class from body
			$( 'body' ).removeClass('mobile');

			// Remove all appended classes and inline CSS

			$( '.control-title' ).removeClass( 'open' ).off();
			$( '.control-title' ).removeClass( 'light' ).off();
			$( '.control-title .light' ).removeAttr( 'style' ).removeClass( 'switch-light' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleTablet = function( mediaQuery ) {

		this.on = function() {
			//
			// Add tablet class to body
			$( 'body' ).addClass('tablet');

			// Handle toggle arrow

			$( '#tablet-toggle' ).off( 'click' ).on( 'click', function( e ) {

				e.preventDefault();

				// When the dashboard is in view

				$( '#layout-dash > .column.left' ).toggleClass( 'open' );
				$('#layout-dash').toggleClass('dash-open');

				// When the results screen is in view

				if ( !($('#layout-dash').hasClass('dash-open')) && $('#results').is(':visible') ) {

					var resultsHeight = $('#results').height() + 270 + 'px';
					$('#layout-dash').css('height', resultsHeight);

				} else {

					$('#layout-dash').removeAttr('style');

				};

				// Scroll to top

				setTimeout( function() {

					$('html, body').animate( {

						scrollTop: 0

					}, 600);

					return false;

				}, 200 );

			} );

		};

		this.off = function() {
			//
			// Remove tablet class from body
			$( 'body' ).removeClass('tablet');

			// Unbind events and inline CSS

			$( '#tablet-toggle' ).off();

			$( '#layout-dash > .column.left' ).removeClass( 'open' );

			$( '#layout-dash, #dash' ).removeAttr( 'style' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleDesktop = function( mediaQuery ) {

		this.on = function() {
			//
			// Add desktop class to body
			$( 'body' ).addClass('desktop');
		};

		this.off = function() {
			//
			// Remove desktop class from body
			$( 'body' ).removeClass('desktop');
		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var init = function () {

		var detectMedia = function() {

			// Call match media upon load

			if( mobile.matches ) handleMobile( mobile );
			if( tablet.matches ) handleTablet( tablet );
			if( desktop.matches ) handleDesktop( desktop );

		};

		// And bind to viewport changes

		mobile.addListener( handleMobile );
		tablet.addListener( handleTablet );
		desktop.addListener( handleDesktop );

		$( window ).on( 'load orientationchange', detectMedia );

	}

	init();

}

// Intro animations
function IntroAnimations() {

	// Initalize vars
	var _this = this;	

	/**
	 * BG COLOR
	*/
	this.bg = function() {
		//
		// Create an array of the colors in the order we want to animate (taking colours from the object in the config file)
		var colors = [
			carColors[ 'Electric Blue' ],
			carColors[ 'Pepper white' ],
			carColors[ 'Lightning Blue' ],
			carColors[ 'Volcanic Orange' ],
			carColors[ 'Jungle Green' ],
			carColors[ 'Blazing Red' ]
		];
		//
		// Set the iterator to 0
		var i = 0;
		//
		//
		var t;

		var increment = function() {

			$.publish('colour-change', colors[ i ]);

			( i < colors.length ) ? i++ : clearInterval( t );

		};

		t = setInterval( increment, 300 );
	};



	/**
	 * BUMS ON SEATS
	*/
	this.bums = function() {
		//
		// Get all the roller slots
		var $list = $( '#c-bums .roller .list' );
		var timeOut = 0;
		//
		// Iterate over all the slots...
		$list.each( function( i, val ) {
			//
			// Get the height of the slot
			var slotHeight = $(val).height() - 160;
			// 
			// 
			timeOut = timeOut + 100;

			setTimeout( function() {
				TweenMax.to( val, 0.4, {
					y: -slotHeight,
					repeat: 1,
					yoyo: true,
					repeatDelay: 0.5
				});
			}, timeOut );

		})
	};


	/**
	 * MPG
	*/
	this.mpg = function() {
		//
		// Get the elements to tween
		var $wrap = $('.control.mpg');
		var $arrow = $('.control.mpg .arrow');
		var $value = $('.control.mpg .value');

		// To tween the handle...
		// Tween the arrow rotation up and down
		TweenLite.to( $arrow, 0.5, {
			rotation: 120,
			onComplete: function() {
				this.reverse();
			}
		});

		// To animate the notches...
		// The notches are made up of a series of images which are swapped by giving a different class the the wrapper
		// The class we need to give is 'scale-x' and the 'x' would be a number from 1 to 13 to display each notch image
		//
		// Call the function to animate notches up (explained below)
		animateNotchesUp();
		//
		// First we need to set an iterator which will be animated up and down in the following functions
		var x = 0;
		//
		// Create a function to animate the notches up...
		function animateNotchesUp() {
			//
			// Set the counter from 1 to 13
			$({ Counter: 1 }).animate({ Counter: 13 }, {
				//
				// The duration needs to be in sync with the handle
				duration: 500,
				easing: 'swing',
				//
				// Each step...
				step: function () {
					//
					// Set our iterator to the number in the animation
					x = Math.ceil(this.Counter);
					//
					// And use the iterator to give the wrapper the correct class name
					$wrap.addClass('scale-' + x).removeClassExcept( 'control mpg scale-' + x);
				},
				//
				// Once the sequence is complete...
				complete: function() {
					//
					// We will call the animate down function which does the oposite sequence
					animateNotchesDown();
				}
			});
		};
		//
		// The following function is to animate the notches down...
		// It does the same as the animate up function above, but on complete it will remove the scale class completely
		function animateNotchesDown() {
			$({ Counter: 13 }).animate({ Counter: 1 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					x = Math.ceil(this.Counter);
					$wrap.addClass('scale-' + x).removeClassExcept( 'control mpg scale-' + x);
				},
				complete: function() {
					$wrap.removeClassExcept( 'control mpg' );
				}
			});
		};

		// To animate the value...
		// Very similar to the notches animations above
		//
		// Call the function to animate the value up (explained below)
		animateValueUp();
		//
		// First we need to set an iterator which will be animated up and down in the following functions
		var j = 0;
		//
		// Create a function to animate the value up...
		function animateValueUp() {
			//
			// Set the counter from 25 to 80
			$({ Counter: 25 }).animate({ Counter: 80 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					j = Math.ceil(this.Counter);
					// And use the iterator to give the correct value to the element
					$value.text(j);
				},
				complete: function() {
					animateValueDown();
				}
			});
		};
		//
		// The following function is to animate the value down...
		function animateValueDown() {
			$({ Counter: 80 }).animate({ Counter: 24 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					j = Math.ceil(this.Counter);
					$value.text(j);
				}
			});
		};

	};




	/**
	 * OPTIONS
	*/
	this.options = function() {
		//
		// Get the number of input fields (and minus one due to the 0 indexing)
		var inputsLength = $( '.control.options input' ).length - 1;
		//
		// Set up a function to animate the checkboxes on and off
		var animateOptions = function() {
			//
			// Iterate over input fields...
			$( '.control.options input' ).each( function( i, el ) {
				//
				// Add a class of checked to the input
				setTimeout( function() {
					$( el ).addClass('checked');
				}, (i * 100) );
				//
				// Remove the 'checked' class
				setTimeout( function() {
					$( el ).removeClass('checked');
				}, ( i * 100 ) + 400 );
			} );
		}
		//
		// Call the checkboxes animation
		animateOptions();
		//
		// And call again once the animation is complete
		setTimeout( function() {
			animateOptions();
		}, (inputsLength * 100) + 500 );
	};


	/**
	 * PRICE
	*/
	this.price = function() {
		//
		// Get the elements we are going to tween
		var $handle = $( '.control.price .handle' );
		var $bgColor = $( '.control.price .switch-bg' );
		//
		// Set the max height and top position for the elements to tween to
		var handleTopPosition = "-390px";
		var bgColorMaxHeight = "403px";
		//
		// Tween the handle
		TweenMax.to( $handle, 0.5, { 
			y: handleTopPosition,
			yoyo: true,
			repeat: 1
		});
		//
		// Tween the color behind
		TweenMax.to( $bgColor, 0.5, {
			height: bgColorMaxHeight,
			yoyo: true,
			repeat: 1
		});
	};



	/**
	 * LIFESTYLE
	*/
	this.lifestyle = function() {
		//
		// Get lifestyle dial to tween
		var $lifestyleDial = $( '.control.lifestyle .dial' );
		var $slickWrap = $( '.items-wrapper' );
		//
		// Animate slides
		var animateSlides = setInterval(function() {
			$slickWrap.slick( 'slickPrev' );
		}, 0);
		//
		// Stop the slides animating once it gets back to the beginning
		setTimeout(function() {
			clearInterval(animateSlides);
		}, 2000);	
	};


	/**
	 * SPEED
	*/
	this.speed = function() {
		//
		// Get all the roller slot
		var $list = $( '.control.speed .roller .list' );
		//
		// Get the height of the slot
		var slotHeight = $list.height() - 160;
		// 
		//
		TweenMax.to( $list, 0.5, {
			y: -slotHeight,
			repeat: 1,
			yoyo: true,
			repeatDelay: 0.5
		});
	};


	/**
	 * LUGGAGE
	*/
	this.luggage = function() {
		//
		// Get the luggage dial element
		var $luggageDial = $( '.control.luggage .dial' );
		//
		// Tween rotate it full circle
		TweenLite.from( $luggageDial, 2, {
			rotation: 360 }
		);
	};


	/**
	 * BUTTON
	*/
	this.button = function() {
		// Get the button element to rotate as well as the button element to be clicked (one is inside the other)
		var $button = $( '.control.start #start' );
		var $buttonInner = $button.find( '.button-inner' );
		//
		// Disable the user clicking the button to combobulate until the animation is complete
		$button.css('pointer-events', 'none');
		//
		// Tween the button to rotate 3 times full circle and on complete re-enable the button click
		TweenMax.from( $buttonInner, 2, {
			rotation: -1080,
			onComplete: function() {
				$button.css('pointer-events', 'auto');
			}
		});
	};



	this.startAnimations = function() {
		//
		// Show the dash overlay to prevent users from interacting with the intro animations
		$('.dash-overlay').removeClass('hide');
		//
		// Start some of the dials animating...
		_this.bums();
		_this.bg();
		_this.luggage();
		_this.button();
		_this.lifestyle();
		//
		// And set some timeouts before executing the rest of the animations
		setTimeout( function() {
			_this.mpg();
			_this.options();
			_this.speed();
		}, 500 );

		setTimeout( function() {
			_this.price();
		}, 1000 );

		// Hide overlay once all animations are complete
		setTimeout( function() {
			$('.dash-overlay').addClass('hide');
		}, 2500 );
	};


	/**
     * Initialize
    */
	this.init = function() {
		//
		// For modern browers only
		if ( ! ie.loadFallbacks() ) {
			//
			// If dashboard exsists...
			if ( $( '#dash' ).length ) {
				//
				// If desktop...
				if ( $( 'body' ).hasClass('desktop') ) {
					//
					// Start animations
					_this.startAnimations();
				//
				// Else if tablet...
				} else if ( $( 'body' ).hasClass('tablet') ) {
					//
					// set a timeout before starting animations
					setTimeout( function() {
						_this.startAnimations();
					}, 2000 );
				}
			}
		}
	};

}

// Horrible hack to clear the local cache after a day. Implimented an hour before departure. I am sorry.
var lastAccess = store.get('last-access');
if (lastAccess !== undefined) {
	expire = new Date(parseInt(lastAccess) + 86400000);
	var currentDate = new Date();
	if (expire < currentDate) {
		store.clear();
	}
}
else {
	store.clear();
}
store.set('last-access', +new Date())


// Setting up some global variables...
// Creating instances of all the functions and saving as global variables
var ie				= new IE();
var ui				= new UI();
var dataLogic       = new DataLogic();
var dashboardLogic	= new DashboardLogic();
var formLogic		= new FormLogic();
var combobulate 	= new Combobulate();
var finance 		= new Finance();
var query			= new dashboardLogic.query();
var dashboard 		= new Dashboard();
var social			= new SocialMedia();
var dials			= new Dials();
var introAnimations	= new IntroAnimations();
//
// Initialize dataLogic
dataLogic.init();
// carCode is set to false unless it is ??? (not sure what this does)
var carCode	= getQueryParameter( 'm' ) || false;
//
// priceChanged changes based on whether the price dial is changed
// We are setting it to false to start with
var priceChanged = false;
//
// Setting up some more empty global variables to set later
var addressObj;
var dealersObj;
var responsive;
var postcodeTimer;
//
// Creating a form object with selectors for form fields
var form = {
	addresses:			'#addresses',
	address1:			'#address_1',
	address2:			'#address_2',
	address3:			'#address_3',
	postcodeSearch: 	'#postcode_search',
	postcode:			'#postcode',
	addressLookup: 		'#address_lookup',
	addressChooser:		'#address_chooser',
	dealerChooser:		'#dealer_chooser',
	dealers:			'#dealers'
}
//
// Google analytics helper function for tracking the dashboard dials
var lastTriggeredEvent;

function trackDialEvents( triggeredEvent ) {

	if ( triggeredEvent != lastTriggeredEvent ) {

		_gaq.push(['_trackEvent', 'Dashboard', triggeredEvent ]);

		lastTriggeredEvent = triggeredEvent;

	}
}

//
// For modern browsers...
// If browser is above IE8 or not IE at all
if ( Mini.browser.isIE( '>9' ) || ! Mini.browser.isIE() ) {
	//
	// Preload images
	ui.preloadImages();
	//
	// Create a new instance of the responsive function, making everything responsive
	responsive = new Responsive();
}


// On load!!
// Initialize everything after the page has fully loaded
$( window ).load( function() {

	// Initialize dashboard
	// Which will activate all the dials and change the dashboard color
	dashboard.init();


	// Initialize UI
	// Which will show the first panel, passed in
	ui.init( 'default' );

	// Initialize form logic
	formLogic.init();

	// Initialze finance
	// Which will render the template for the terms and conditions for whichever car in view
	finance.init();

	// Initialize combobulate
	// Which will listen to the on click of the combobulate button
	combobulate.init();
} );


// IE class

function IE() {

	// Some variables

	var slots	= [

		'#c-bums #roller1',
		'#c-bums #roller2',
		'#c-bums #roller3',
		'#c-bums #roller4',
		'#c-bums #roller5',
		'#c-speed .control.speed'

	];

	// Actual functions

	var obj = {

		loadFallbacks: function() {

			return ( Mini.browser.isIE( '<=9' ) && Mini.browser.isIE() );

		},

		polyfills: function() {

			console.log( 'Loading IE polyfills' );

			$( '#dash' ).addClass( 'ie-fallbacks' );

			if( typeof String.prototype.trim !== 'function' ) {

				String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

			}

		},

		flow: function() {

			// Mark document with browser version

			document.querySelector( 'html' ).className += ' oldie ie' + parseInt( Mini.browser.version );

			// Unwrap select elements

			$( '.checkbox > input' ).unwrap();

			// Do your stuff here

			ui.loadSVGs();

			$sys.remove();

			$( '.control.start .shape' ).on( 'click', function() { $( '#start' ).trigger( 'click' ); } );


		},

		rollers: {

			getSeats: function() {

				var values = [];

				$( _.initial( slots ) ).each( function( i, slot ) {

					var value	= $( slot ).find( '.active' ).data( 'value' ) || $( slot ).find( '.active' ).text();
					var v		= ( value === 'Empty' ) ? 0 : value;

					values.push( v );

				} );

				return values;

			},

			getSpeed: function() {

				return $( _.last( slots ) ).find( '.active' ).data( 'value' );

			},

			init: function() {

				// Remove reset button

				$( '#reset' ).remove();

				$( slots ).each( function( i, slot ) {

					var $slot = $( slot );
					var $list = $slot.find( '.list' );

					// Remove unnecessary elements

					$slot.find( '.fake-list, .item-extra, .bumper' ).remove();

					// Change slot class

					$list.addClass( 'list-static' ).removeClass( 'list' );

					// Set active items

					$slot.find( '.item:first' ).addClass( 'active' );

					// Bind events

					$list.on( 'click', function() {

						$( '.list-static' ).not( this ).removeClass( 'open' );

						$( this ).toggleClass( 'open' );

					} );

					$list.find( '.item' ).on( 'click', function( e ) {

						e.preventDefault();

						$( this ).addClass( 'active' ).siblings().removeClass( 'active' );

					} );

				} );

			}

		},

		speed: {

			init: function() {}

		},

		lifestyle: {

			w: $( '#c-lifestyle .window .items-wrapper' ),

			init: function() {

				this.w.addClass( 'ie-friendly' );

			},

			get: function() {

				var className = $( '.items-wrapper .item:first' ).attr( 'class' ).replace( 'item ', '' );

				return className;

			},

			next: function() {

				console.log( 'next' );

				var $items	= this.w.find( '.item' );
				var $first	= $items.filter( ':first' );
				var $last	= $items.filter( ':last' );

				$first.insertAfter( $last );

			},

			prev: function() {

				console.log( 'prev' );

				var $items	= this.w.find( '.item' );
				var $first	= $items.filter( ':first' );
				var $last	= $items.filter( ':last' );

				$last.insertBefore( $first );

			},

		}

	};

	// Initialize class

	if( obj.loadFallbacks() ) {

		obj.polyfills();

		$( document ).on( 'ready', function() { obj.flow(); } );

	}
	
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i += 1) {
		  if (this[i] === obj) { return i; }
		}
		return -1;
	  }
	}


	// Return function

	return obj;

}