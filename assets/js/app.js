/*! by John Przeslakowski - visit me at http://goodpixels.co.uk */


// Setting up social media values to use later
var socialMedia = {

	facebook: {
		link:			'http://google.com',
		message:		'This is the message which will be posted to the user\'s wall.',
		name:			'Image name',
		caption:		'Image caption',
		picture:		'http://placehold.it/200x200',
		description:	'Just a test description.'
	},

	twitter: {
		url:			'http://google.com',
		text:			'This is the message which will be posted to the user\'s wall.',
		hashtags:		'mini,cooper'
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
		apiPostcode:	'api/dealerlookup',
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
// var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.net;
var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.php;


// Setting up all the colors to use for the dashboard color changes
var carColors = {

	'Volcanic Orange':		'#f7941d',
	'Electric Blue':		'#30b6e8',
	'Lightning Blue':		'#1164ac',
	'Jungle Green':			'#426046',
	
	'Chili red':			'#d71d24',
	'Blazing Red':			'#c10000',
	
	'Pepper white':			'#e4dfce',
	'Light white':			'#e4dfce',

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
		facebookID:		892580704115737,
		analyticsID:	'UA-000000-01'
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

		'name':			{ required: true },
		'surname':		{ required: true },
		'address-1':	{ required: true },
		'address-2':	{ required: true },
		'address-3':	{ required: true },
		'address-4':	{ required: true },
		'tel-home':		{ required: true },
		'tel-work':		{ required: true },
		'tel-mobile':	{ required: true },
		'dealer':		{ required: true },
		'title':		{ required: true },
		'postcode':		{ required: true },
		'email':		{

			required: true,
			email: true

		},

	},

	// And new messages here
	
	messages: {

		'name':			{ required: 'First name is required.' },
		'surname':		{ required: 'Last name is required.' },
		'address-1':	{ required: 'Address line 1 is required.' },
		'address-2':	{ required: 'Address line 2 is required.' },
		'address-3':	{ required: 'Address line 3 is required.' },
		'address-4':	{ required: 'Address line 4 is required.' },
		'tel-home':			{ required: 'Home telephone is required.' },
		'tel-work':			{ required: 'Work telephone is required.' },
		'tel-mobile':		{ required: 'Mobile telephone is required.' },
		'dealer':		{ required: 'Please choose a dealer from the list.' },
		'title':		{ required: 'Title is required.' },
		'postcode':		{ required: 'Postcode is required.' },
		'email':		{

			required: 'E-mail is required.',
			email: 'Please enter a valid e-mail address.'

		}

	}
	
} );
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

			$.ajax( {

				type: 'POST',
				url: ajaxURL,
				data: {

					form: $( 'form' ).serializeObject(),
					car: carCode,
					input: store.get( 'miniInput' ),
					localDealer: dealersObj[ $( '#dealers' ).val() ]

				},
				dataType: 'json',
				complete: function() {

					$( form ).toggleClass( 'busy' );

				},
				success: function( data ) { $.publish( 'form-ajax-results', data ); },
				error: function( xhr ) {

					alert( 'Couldn\'t submit the form with AJAX, returning XHR object to the console:' );
					console.log( xhr );

				},
				beforeSend: function() { if( Mini.settings.debug ) console.log( 'Submitting form to: ' + ajaxURL ); } // Feel free to remove this if not needed

			} );	

		};

		// Disable the form to prevent accidental submission while the request is pending

		$( form ).toggleClass( 'busy' );

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
		// TOY CAR
		// If price dial is 190 or less...
		if ( priceChanged && data.price <= 190 ) {
			//
			// Push 'toy' into the eggs array
			eggs.push( 'toy' );
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
     * Get an array of matching cars, from user input
     * @param {Object} Formatted user selection data, passed in on click of the combobulate button
     * @return {Object} Returns an array of cars matching the users input, as well as other data from the user input
    */
	this.getCars = function( q ) {
		//
		// If there is an eggs object in the data
		if ( typeof q.eggs === 'object' ) {
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
			//
			// Results will contain an array of all the cars
			var results = db( q.prepared ).get();

			// If results contains any cars...
			if ( results.length > 0 ) {
				//
				// Reset dropped filters
				droppedFilters = [];
				//
				// Prints out how many matches were found
				console.log( 'Found ' + results.length + ' matches' );
				//
				// Create an object containing all the details we might need
				var obj = {
					//
					// Tells us all the values of the user input in different formats
					queryPrepared: q.prepared,
					queryRaw: q.raw,
					//
					// The array of cars
					data: results
				};
				//
				// Returns the object with all the info we need for a users input
				// Including an array of cars that match the user input
				return obj;
			}
			// Else, if results don't contain cars...
			else {
				//
				// 'filters' is the array defined at the top of this function (names of all the dials/filters)
				// Creates an array of filters to drop, by...???
				droppedFilters.push( filters[ droppedFilters.length ] );
				//
				// Printing out which filters are being dropped
				console.log( 'No results, dropping ' + droppedFilters[ droppedFilters.length - 1 ] );
				//
				// Construct a new query
				var query = new _this.query();
				//
				// Calls this function again, but passing in new data via the query functions...
				// Returns an array of cars and the user selection data
				return this.getCars( query.build( query.filter( q.raw, droppedFilters ) ) );
			}
		}
	}


	/**
	 * Get cars by name
	 * @param {String} Name of the car
	 * @return {Object} Returns all the data for that car
	*/
	this.getCarByName = function( name ) {
		//
		// Queries the database to get data about that car
		return db( { name: name } ).first();
	}


	/**
	 * Get a car data by code
	 * @param {String} Code of the car
	 * @return {Object} Returns all the data for that car
	*/
	this.getCarByCode = function( code ) {
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
			//
			// Here we are building a new 'dbQuery' object based on the values of the passed in queryObj
			// The new 'dbQuery' object needs to be formatted in a certain way...
			// We will do this using various if statements that query the queryObj, and then create the format we need for the new dbQuery object
			if ( q.capacity ) dbQuery.capacity				= { likenocase: q.capacity };
			if ( q.luggage ) dbQuery.luggage				= { likenocase: q.luggage };
			if ( q.lifestyle ) dbQuery.lifestyle			= { likenocase: q.lifestyle };
			
			if ( q.awd ) dbQuery.awd						= q.awd;
			if ( q.high ) dbQuery.high						= q.high;
			if ( q.convertible ) dbQuery.convertible		= q.convertible;

			if ( q.price ) dbQuery.price					= { lt: q.price + 1 };
			if ( q.speed ) dbQuery.speed					= { gt: q.speed - 1 };
			if ( q.economy ) dbQuery.economy				= { gt: q.economy - 1};
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
				//
				// Some if statements determining the category each variation comes under, and returning integars
				if ( o.family <= 2 && o.infants === 0 )													return 1;
				if ( o.family <= 4 && o.infants === 0 )													return 2;
				if ( o.family <= 3 && o.infants === 1 )													return 2;
				if ( o.people === 2 && ( o.children > 0 && o.children <= 2 ) && o.infants === 0 )		return 3;
				if ( o.people === 1 && ( o.children > 0 && o.children <= 3 ) && o.infants === 0 )		return 3;
				if ( o.family === 5 ) 																	return 4;
				if ( o.family === 4 && o.infants === 1 )												return 4;
				if ( o.family === 3 && o.infants === 2 )												return 4;
				if ( o.family <= 3 && o.family > 0 && o.infants > 0 && o.infants <= 2 )					return 4; // This fixes https://iris-worldwide.atlassian.net/browse/FRT-148?filter=15137
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
		//
		// Give the data passed in a better name of 'cars'
		cars = data;
		//
		// Converts the cars array to a JSON object
		// Passes to TAFFY method which turns it into a database structure, saving the result as db
		db = TAFFY( JSON.stringify( cars ) );
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
function FormLogic() {

	// Initalize vars
	var _this = this;	


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

		).then( function( data ) { return data; } );

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

		finance.total_deposit	= finance.deposit + finance.contribution;
		finance.total_amount	= finance.price + finance.credit_charge;
		finance.terms			= car.terms;

		return finance;

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
     * Handle postcode
     * @param {Event} Event
	 * @return { } ??
    */
	this.handlePostcode = function( e ) {

		var postcode = $( '#postcode' ).val();

		// Enable fields

		$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

		// Get home addresses

		formLogic.getAddresses( postcode ).then( function( addresses ) {

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

				var address = _this.formatAddress( addr );

				formattedDealers.push( { id: i, dealer: address } );

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

		var address	= addressObj[ $( this ).val() ];

		if( ! _.isEmpty( $( this ).val() ) ) {

			$( form.address1 ).val( _this.formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
			$( form.address2 ).val( address.Town );
			$( form.address3 ).val( address.County );

		}

		else {

			$( form.address1 ).val( null );
			$( form.address2 ).val( null );
			$( form.address3 ).val( null );

		}
	}

	this.postcodeStuff = function( e ) {

		// Fire only when alphanumeric keys are pressed

		if( e.which <= 90 && e.which >= 48 ) {

			clearTimeout( postcodeTimer );

			postcodeTimer = setTimeout( this.handlePostcode, 600 );

		}

	}

	// Handle AJAX form results
	this.ajaxFormResults = function() {

		var $thanks = $( '#thanks-left, #thanks-right' );
		var $formContent = $( '.form-content' );

		$thanks.hide();

		$.subscribe( 'form-ajax-results', function( e, data ) {

			console.log( data );

			$formContent.slideUp( 600 );
			$thanks.slideDown( 600 );

			alert( 'Thanks! Data has been logged to the console.' );

		} );

	}


	/**
	 * Activate forms
	*/
	this.activateForms = function() {
		// Validate forms
		$( 'form' ).validate();

		// Handle successful form submission
		$.subscribe( 'form-ajax-results', function( e, data ) {

			if( data.success ) { ui.showPanel( 'thanks' ); }

		} );
	}


	this.eventListeners = function() {

		$body.on( 'change', form.addresses, function( e ) {
			_this.addressStuff( e );
		});

		$( '#postcode' ).on( 'keyup', function( e ) {
			_this.postcodeStuff( e );
		});

	}


	this.init = function() {

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
			var currentPosition = Math.abs( pos );
			//
			// Active Slot calculates the position and the height and rounds the number upwards
			var activeSlot = Math.ceil( currentPosition / height );
			//
			// Returns the active slot plus 1 (maybe because otherwise it would start at 0?)
			return Math.ceil( activeSlot ) + 1;
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
		 * BIND EVENTS
		*/
		var bindEvents = function() {
			//
			// On user interaction with the luggage arrows...
			$( '.control.luggage .arrows' ).on( 'mousedown mouseup touchstart touchend', function( e ) {
				//
				// Prevent default event
				e.preventDefault();
				//
				// This adds a class of 'left' or 'right' to the arrows element, depending on user interaction...
				// 'this' refers to the 'arrows' element and 'e.target' refers to the 'left' and 'right' elements inside
				// So...
				// If event is mousedown... Remove classes 'left' and 'right' from the arrows element, but then add the class of the e.target ID (either 'left' or 'right').
				// If not a mousedown event (so when the user clicks away etc), remove classes 'left' and 'right' from the arrows element
				( e.type === 'mousedown' ) ? $( this ).removeClass( 'right left' ).addClass( e.target.id ) : $( this ).removeClass( 'right left' );
			} );
			//
			// On click of the right and left elements
			$( '#left, #right' ).on( 'click', function( e ) {
				//
				// Prevent default event
				e.preventDefault();
				//
				// Remove all classes from the luggage element, except 'dial'
				$( luggage_el ).removeClassExcept( 'dial' );
				//
				// Save the dial element
				var $dial = $( '.control.luggage .dial' );
				//
				// Get the direction of user click from the target
				var direction = e.target.id;
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
					}
				} );

				// Update rotation & value
				luggage_dial.update();
				//
				// Set luggage_end to be based on the user click direction
				luggage_end = nr;
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

		// Fallback on click for IE...
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

				// Move content in the window

				if( ie.loadFallbacks() ) {

					( direction === 'right' ) ? ie.lifestyle.prev() : ie.lifestyle.next();

				}

				else {

					( direction === 'right' ) ? $slick.slick( 'slickPrev' ) : $slick.slick( 'slickNext' );

				}

			}

		} );

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

				$( '.control.mpg' ).removeClassExcept( 'control mpg' ).addClass( 'control mpg scale-' + css_name );
				$( '#mpg_value' ).text( v );

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

			var position	= Math.abs( parseInt( v.endY ) );	
			var height		= Math.abs( ( position / v.minY ) * 100 );

			return height;

		}

		var dialPrice = new Draggable( '.control.price .handle', {

			type:					'y',
			edgeResistance:			1,
			bounds:					'.control.price .bounds',
			throwProps:				false,
			onDragStart:			function() { priceChanged = true; },
			onDrag:					function() { $( '.control.price .switch-bg' ).css( 'height', getHeight( this ) + '%' ); },

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
		$.subscribe( 'colour-change', function( e, color ) { dashboard.colors( color ); } );
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

		// If borowser is IE8 or less...
		if( ie.loadFallbacks() ) {
			//
			// Call the IE specific functions
			ie.rollers.init();
			ie.speed.init();
			//
			// In addition to new dials.lifestyle()
			ie.lifestyle.init();
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
		// Animate the combobulate button
		TweenLite.from($( '#start .button-inner' ), 0.5, {rotation: -360});
		//
		// Set a timeout
		setTimeout( function() {
			//
			// Toggle the screen view to show results
			$('#tablet-toggle').click();
			//
			// Scroll to top of page
			$('html, body').animate( {
				//
				scrollTop: 0
				//
			}, 600);
			//
			return false;
			//
		}, 400 );
	};


	/**
     * Execute the search of the cars based on the user input from the dashboard
     * Pass results to ui.eggs function
    */
	this.executeSearch = function() {
		//
		// Save the values of the dashboard as 'userSelection'
		var userSelection = dashboard.values();
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
			//
			// Get the car results using the dashboardLogic.getCars function and passing in the above search structure from user input
			var results	= dashboardLogic.getCars( search );
			//
			// Get an array of all the cars data from the results object
			var cars = results.data;
			//
			// If the cars array has anything in...
			if ( cars.length > 0 ) {
				//
				// Randomly choose a car
				var car	= cars[ _.random( cars.length - 1 ) ];
				//
				// If the car array contains eggs...
				// Pass 'creature' and the array itself to the UI.eggs function
				if ( $.inArray( 'dog', eggs ) >= 0 || $.inArray( 'cat', eggs ) >= 0 || $.inArray( 'alien', eggs ) >= 0 ) {
					// 
					ui.eggs( 'creature', eggs );
					//
					// Populate results
					ui.render( car );
				}
				//
				else {
					//
					// Populate results
					ui.render( car );
				}
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
		});

		// On click of the combobulate button
		$( '#start' ).on( 'click', function( e ) {
			_this.animateCombobulate( e );
			_this.executeSearch();
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
	 * Render finance template
	*/
	this.renderFinanceTpl = function() {
		//
		// If finance template div exsists...
		if ( $( '#tpl-finance' ).length > 0 ) {
			//
			// 
			ui.getTpl( 'finance' ).then( function( tpl ) {

				$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, formLogic.getFinance( carCode ) ) );

			} );
		}
	}


	/**
	 * Initialize
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

	// Image preloader

	this.preloadImages = function() {

		this.loadSVGs();

		// Preload images to avoid nasty visual glitches

		sysMsg( 'Loading: 0%' );

		$.get( path.preload, { type: 'svg' }, function( images ){

			var loaded = 0;

			$.map( images, function( el ) {

				$.get( el, function() {

					var img	= new Image();

					img.src = el;

					$( img ).on( 'load', function() {

						loaded++;

						var unit		= images.length / 100;
						var percentage	= ( loaded / images.length ) * 100;
						var progress	= 0;

						progress = Math.floor( percentage );

						sysMsg( 'Loading: '+ progress + '%' );

						if( progress === 100 ) $sys.toggleClass( 'hidden' );

					} );

				} );

			} );

		} );

	}

	// Render results

	this.render = function( car, related ) {

		var _this	= this;
		var related	= related || false;		

		var renderRelatedCars = function( car, skipRelated ) {

			var $cars			= _this.$panel.find( '.car-changer' );
			var skipRelated		= skipRelated || false;

			var alt_1 = dashboardLogic.getCarByName( car.alt_1 );
			var alt_2 = dashboardLogic.getCarByName( car.alt_2 );
			var alt_3 = dashboardLogic.getCarByName( car.alt_3 );

			if( alt_1 === false || alt_2 === false || alt_3 === false ) {

				alert( 'missing alternate car - check console.log for missing value' )

				console.log( 'Original car:' );
				console.log( car );

				var alt_1_status = _.isObject( alt_1 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;
				var alt_2_status = _.isObject( alt_2 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;
				var alt_3_status = _.isObject( alt_3 ) ? '' : ' - NO MATCH FOUND IN ' + path.api;
				
				console.log( 'Alternative 1 - ' + car.alt_1 + alt_1_status );
				console.log( 'Alternative 2 - ' + car.alt_2 + alt_2_status );
				console.log( 'Alternative 3 - ' + car.alt_3 + alt_3_status );

			}
			
			else {

				if( ! skipRelated ) {

					console.log( 'replacing related cars' );

					$cars.removeClass( 'active' ).filter( ':first' ).addClass( 'active' );

					$cars.eq( 0 ).attr( 'href', '#' + car.code ).find( 'img' ).attr( 'src', path.assets + car.code + '.png' );
					$cars.eq( 1 ).attr( 'href', '#' + alt_1.code ).find( 'img' ).attr( 'src', path.assets + alt_1.code + '.png' );
					$cars.eq( 2 ).attr( 'href', '#' + alt_2.code ).find( 'img' ).attr( 'src', path.assets + alt_2.code + '.png' );
					$cars.eq( 3 ).attr( 'href', '#' + alt_3.code ).find( 'img' ).attr( 'src', path.assets + alt_3.code + '.png' );

				}

			}

		}

		// Hide the dashboard on mobile

		if( Mini.browser.mobile ) setTimeout( function() { $( '.layout > .column.left' ).removeClass( 'open' ); }, 0 );

		// Render actual results

		car.url = resultsPageUrl( path.results, car.code );
		car.img = path.assets + car.code + '.png';

		// Render car template

		this.getTpl( 'results' ).then( function( tpl ) {

			$( '#tpl-results' ).contents().remove();
			$( '#tpl-results' ).append( _this.renderTpl( tpl, car ) );

		} );		

		renderRelatedCars( car, related );

		// Change dashboard color

		dashboard.colors( carColors[ car.color ] );

		// Reveal results

		this.showPanel( 'results' );

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

		// Create an object containing data for the eggs
		var eggsData = {

			rocket: {
				'code': 'RKT',
				'color': 'Rocket gold',
				'name':	'Rocket Car!',
				'cost':	'n/a',
				'terms':'A ro-ro-ro-rocket car!',
				 "alt_1": "Roadster JCW",
				 "alt_2": "Convertible JCW",
				 "alt_3": "Paceman JCW ALL4"
			},
			toy: {
				'code':	'TOY',
				'color': 'Toy brown',
				'name':	'Toy Car',
				'cost':	'n/a',
				'terms': 'Just a silly toy...',
				 "alt_1": "Roadster JCW",
				 "alt_2": "Convertible JCW",
				 "alt_3": "Paceman JCW ALL4"
			}
		};

		// Removes old egg classes from the html and adds a new one based on the trigger
		$html.removeClassBeginningWith( 'egg' ).addClass( 'egg-' + trigger );
		//
		// Based on the trigger passed in, render appropriate data from the eggsData above
		switch( trigger ) {
			case 'toy': this.render( eggsData.toy ); break;
			case 'rocket': this.render( eggsData.rocket ); break;
			case 'creature': alert( 'These search results will show one of the creatures.' ); break;
		}

	}


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

			console.log( 'Responsive: mobile mode on' );

			// Show / hide controls on tap

			$( '.control-title' ).off( 'click' ).on( 'click', function( e ) {

				e.preventDefault();

				// Close all controls

				$( '.control-title' ).removeClass( 'open' );
				
				// Open targetted control

				$( this ).toggleClass( 'open' );
				
				// Light up the light

				var $light	= $( this ).find( '.light' );
				var color	= $( '.car-changer' ).css( 'border-color' );

				if( $( this ).hasClass( 'open' ) ) {

					$light.addClass( 'switch-light' );
					$.publish( 'colour-change', color );

				}

				else {

					$light.removeClass( 'switch-light' );
					$light.removeAttr( 'style' );

				}

			} );

		};

		this.off = function() {

			console.log( 'Responsive: mobile mode off' );

			// Remove all appended classes and inline CSS

			$( '.control-title' ).removeClass( 'open' ).off();
			$( '.control-title .light' ).removeAttr( 'style' ).removeClass( 'switch-light' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleTablet = function( mediaQuery ) {

		this.on = function() {

			console.log( 'Responsive: tablet mode on' );

			// Handle toggle arrow

			$( '#tablet-toggle' ).off( 'click' ).on( 'click', function( e ) {

				e.preventDefault();

				// When the dashboard is in view

				$( '.layout > .column.left' ).toggleClass( 'open' );
				$('.layout').toggleClass('dash-open');

				// When the results screen is in view

				if ( !($('.layout').hasClass('dash-open')) && $('#results').is(':visible') ) {

					var resultsHeight = $('#results').height() + 270 + 'px';
					$('.layout').css('height', resultsHeight);

				} else {

					$('.layout').removeAttr('style');

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

			console.log( 'Responsive: tablet mode off' );

			// Unbind events and inline CSS

			$( '#tablet-toggle' ).off();

			$( '.layout > .column.left' ).removeClass( 'open' );

			$( '#page-home .layout, #dash' ).removeAttr( 'style' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleDesktop = function( mediaQuery ) {

		this.on = function() { console.log( 'desktop on' ); };

		this.off = function() { console.log( 'desktop off' ); };

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

// Setting up some global variables...
// Creating instances of all the functions and saving as global variables
var ie				= new IE();
var ui				= new UI();
var dashboardLogic	= new DashboardLogic();
var formLogic		= new FormLogic();
var combobulate 	= new Combobulate();
var finance 		= new Finance();
var query			= new dashboardLogic.query();
var dashboard 		= new Dashboard();
var social			= new SocialMedia();
var dials			= new Dials();
//
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
	address1:			'#address-1',
	address2:			'#address-2',
	address3:			'#address-3',
	addressChooser:		'#address-chooser',
	dealerChooser:		'#dealer-chooser',
	dealers:			'#dealers',
}


// For modern browsers...
// If browser is above IE8 or not IE at all
if ( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) {
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

			return ( Mini.browser.isIE( '<=8' ) && Mini.browser.isIE() );

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
			
			$( '.select > select, .checkbox > input' ).unwrap();

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

	// Return function

	return obj;

}