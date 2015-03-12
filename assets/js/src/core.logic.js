function Logic() {

	// Initalize vars

	var _this			= this;	
	var filters			= [ 'lifestyle', 'economy', 'speed', 'price', 'convertible', 'high', 'awd', 'luggage', 'capacity' ];
	var droppedFilters	= [];
	var db;
	var cars;	

	// Public functions

	this.optimizeData = function() {

		$( cars ).each( function( i, el ) {

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

		return cars;

	}

	this.getFinance = function( code ) {

		var car			= this.getCarByCode( code );
		var finance		= car.finance;

		finance.total_deposit	= finance.deposit + finance.contribution;
		finance.total_amount	= finance.price + finance.credit_charge;
		finance.terms			= car.terms;

		return finance;

	}

	this.eggs = function( data ) {

		var seatTriggers	= [ 'Alien', 'Dog', 'Cat' ];
		var extraSeat		= data.seats[ 4 ];
		var eggs			= [];
		var i				= $.inArray( extraSeat, seatTriggers );

		// Alien, cat, dog

		if( i >= 0 ) { eggs.push( seatTriggers[ i ].toLowerCase() ); }

		// Rocket car

		if( data.speed === 5 ) { eggs.push( 'rocket' ); }

		// Toy car

		if( priceChanged && data.price <= 190 ) { eggs.push( 'toy' ); }

		// No eggs at all

		if( eggs.length <= 0 ) eggs = false;

		// Return the array

		return eggs;

	}

	this.getCars = function( q ) {

		console.log( q );

		// Handle easter eggs

		if( typeof q.eggs === 'object' ) {

			console.log( 'Easter eggs triggered' );

			return { data: 'easter egg' };

		}

		// Return cars

		else {

			var results = db( q.prepared ).get();

			if( results.length > 0 ) {

				// Reset filters

				droppedFilters = [];

				console.log( 'Found ' + results.length + ' matches' );

				var obj = {

					queryPrepared:		q.prepared,
					queryRaw:			q.raw,
					data:				results,

				};

				return obj;

			}

			else {

				droppedFilters.push( filters[ droppedFilters.length ] );

				console.log( 'No results, dropping ' + droppedFilters[ droppedFilters.length - 1 ] );

				// Construct a new query

				var query = new _this.query();

				return this.getCars( query.build( query.filter( q.raw, droppedFilters ) ) );

			}

		}

	}

	this.getCarByName = function( name ) { return db( { name: name } ).first(); }
	
	this.getCarByCode = function( code ) { return db( { code: code } ).first(); }

	this.query = function() {

		this.filter = function( query, filtersToLose ) {

			var filtersToLose	= filtersToLose || [];

			// Get rid of empty values

			if( ! query.capacity )		delete query.capacity;
			if( ! query.luggage )		delete query.luggage;
			if( ! query.lifestyle )		delete query.lifestyle;
			if( ! query.awd )			delete query.awd;
			if( ! query.high )			delete query.high;
			if( ! query.convertible )	delete query.convertible;
			if( ! query.price )			delete query.price;
			if( ! query.speed )			delete query.speed;
			if( ! query.economy )		delete query.economy;

			// Remove excessive filters

			for( var i = 0; i < filtersToLose.length; i++ ) delete query[ filtersToLose[ i ] ];

			return query;

		}

		this.build = function( queryObj, filtersToLose ) {

			var dbQuery			= {};
			var q				= queryObj;
			var obj;

			if( q.capacity ) dbQuery.capacity			= { likenocase: q.capacity };
			if( q.luggage ) dbQuery.luggage				= { likenocase: q.luggage };
			if( q.lifestyle ) dbQuery.lifestyle			= { likenocase: q.lifestyle };
			
			if( q.awd ) dbQuery.awd						= q.awd;
			if( q.high ) dbQuery.high					= q.high;
			if( q.convertible ) dbQuery.convertible		= q.convertible;

			if( q.price ) dbQuery.price					= { lt: q.price + 1 };
			if( q.speed ) dbQuery.speed					= { gt: q.speed - 1 };
			if( q.economy ) dbQuery.economy				= { gt: q.economy - 1};

			obj = { prepared: dbQuery, raw: queryObj };

			return obj;

		}

		// Martin's stuff - converts dashboard input to a query matching the data format

		this.convert = function( data ) {

			function mpg( v ) {

				if( v < 25 ) return 0;
				if( v >= 25 && v < 46 ) return 1;
				if( v >= 46 && v < 61 ) return 2;
				if( v >= 61 && v < 70 ) return 3;
				if( v >= 70 ) return 4;

			}

			function price( v ) {

				if( v < 191 ) return 0;
				if( v >= 191 && v < 216 ) return 1;
				if( v >= 216 && v < 246 ) return 2;
				if( v >= 246 && v < 270 ) return 3;
				if( v >= 270 && v < 295 ) return 4;
				if( v >= 295 ) return 5;

			}

			function luggage( v ) {

				if( v === 'minimalist' )	return 1;
				if( v === 'light-packer' )	return 2;
				if( v === 'lugger' )		return 3;
				if( v === 'big-loader' )	return 4;

			}

			function seats( arr ) {

				var obj = {};

				var o = {

					people:		0,
					children:	0,
					infants:	0

				}

				// Remove empty stuff

				arr = _.compact( arr );

				if( arr.length < 1 ) return 0;

				for( var i = 0; i < arr.length; i++ ) {

					var person = arr[ i ];

					if( person === 'Man' || person === 'Woman')	o.people++;
					if( person === 'Girl' || person === 'Boy' )	o.children++;
					if( person === 'Infant' )					o.infants++;

				}

				o.family = o.people + o.children;

				if( o.family <= 2 && o.infants === 0 )												return 1;
				if( o.family <= 4 && o.infants === 0 )												return 2;
				if( o.family <= 3 && o.infants === 1 )												return 2;
				if( o.people === 2 && ( 0 < o.children && o.children <= 2 ) && o.infants === 0 )	return 3;
				if( o.people === 1 && ( 0 < o.children && o.children <= 3 ) && o.infants === 0 )	return 3;
				if( o.family === 5 ) 																return 4;
				if( o.family === 4 && o.infants === 1 )												return 4;
				if( o.family === 3 && o.infants === 2 )												return 4;

			}

			obj = {		
				
				capacity:		( _.compact( data.seats ).length > 0 ) ? seats( data.seats ).toString() : false,
				luggage:		luggage( data.luggage ).toString(),
				lifestyle:		parseInt( data.lifestyle ).toString(),
				
				price:			price( data.price ),
				speed:			( data.speed === 'lightspeed' ) ? data.speed : parseInt( data.speed ),
				economy:		mpg( data.mpg ),

				awd:			data.options.awd || false,
				high:			data.options.hp || false,
				convertible:	data.options.dt || false

			}

			return obj;

		}

	}

	var populateDB = function( data ) {

		cars			= data;
		db				= TAFFY( JSON.stringify( cars ) );
		_this.database	= db;

		console.log( data.length + ' rows loaded successfully to the database' );

		return db;

	}

	var loadData = function() {

		var data = store.get( 'miniData' ) || false;

		if( data ) {

			console.log( 'loading database from local storage' );

			populateDB( data ); }
		
		else {

			console.log( 'requesting data to populate the database' );

			$.ajax( {

				url:		path.api,
				async:		false, // Deprecated, but in reality not for a looong time! :)
				error:		function(){ alert( 'There\'s been a problem obtaining the results.' ); },
				success:	function( data ) {

					if( data.Error ) { alert( data.Error ); }

					else {

						populateDB( data );

						store.set( 'miniData', data );

					}

				},

			} );

		}
		
	}

	// Initialize class and load cars into the DB

	loadData();

}