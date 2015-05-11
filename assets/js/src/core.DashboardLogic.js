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