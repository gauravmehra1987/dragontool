function Logic() {

	// Initalize vars

	var _this			= this;	
	var filters			= [ 'lifestyle', 'economy', 'speed', 'price', 'convertible', 'high', 'awd', 'luggage', 'capacity' ];
	var droppedFilters	= [];
	var cars;
	var db;

	// Public functions

	this.getCars = function( q ) {

		var results = db( q.prepared ).get();

		if( results.length > 0 ) {

			// Reset filters

			droppedFilters = [];

			console.debug( 'Found ' + results.length + ' matches' );

			var obj = {

				queryPrepared:		q.prepared,
				queryRaw:			q.raw,
				data:				results,

			};

			return obj;

		}

		else {

			droppedFilters.push( filters[ droppedFilters.length ] );

			console.debug( 'No results, dropping ' + droppedFilters[ droppedFilters.length - 1 ] );

			// Construct a new query

			var query = new _this.query();

			return this.getCars( query.build( query.filter( q.raw, droppedFilters ) ) );

		}

	}

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

			if( q.price ) dbQuery.price					= { lt: q.price };
			if( q.speed ) dbQuery.speed					= { gt: q.speed };
			if( q.economy ) dbQuery.economy				= { gt: q.economy };

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

					if( person === 'Man' || person === 'Woman') { o.people++; }
					if( person === 'Girl' || person === 'Boy' ) { o.children++; }
					if( person === 'Infant' ) { o.infants++; }

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

			var obj = {		
				
				capacity:		( _.compact( data.seats ).length > 0 ) ? seats( data.seats ).toString() : false,
				luggage:		luggage( data.luggage ).toString(),
				lifestyle:		parseInt( data.lifestyle ).toString(),
				
				price:			price( data.price ),
				speed:			parseInt( data.speed ),
				economy:		mpg( data.mpg ),

				awd:			data.options.awd || false,
				high:			data.options.hp || false,
				convertible:	data.options.dt || false,

			}

			return obj;

		}

	}

	var loadData = function() {

		$.get( path.api, function( data ) {

			cars	= JSON.stringify( data );
			db		= TAFFY( cars );

			console.debug( data.length + ' rows loaded successfully to the database' );

		} );
		
	}

	// Initialize class and load cars into the DB

	loadData();

}