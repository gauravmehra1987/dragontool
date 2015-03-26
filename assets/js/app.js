/*! by John Przeslakowski - visit me at http://goodpixels.co.uk */

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

var system_paths = {

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

//var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.net;

var path = ( location.href.indexOf( 'mini.fs' ) >= 0 ) ? system_paths.php : system_paths.php;

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

var Mini	= {

	settings: {

		debug:			true,

	},

	thirdParty: {

		facebookID:		892580704115737,
		analyticsID:	'UA-000000-01'

	},

	browser: {

		name:			$.browser.name,
		version:		$.browser.version,
		mobile: 		$.browser.mobile || false,
		platform:		$.browser.platform,

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

// Add browser name via JavaScript if it's not IE

if( ! Mini.browser.isIE() ) {

	document.querySelector( 'html' ).className += ' ' + Mini.browser.name;

	// Remove IE

	$html.removeClass( 'ie' );

}

// We have to manually append .js class to the <html> element if modernizr isn't used

if( typeof( Modernizr ) === 'undefined' ) {

	var bodyClass = document.querySelector( 'html' ).className;

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

	this.getAddresses = function( postcode ) {

		return $.when( 

			$.ajax( {

				url:		path.apiPostcode,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data ) { return data; } );

	}


	this.getDealers = function( postcode ) {

		return $.when( 

			$.ajax( {

				url:		path.apiDealers,
				data:		{ postcode: postcode },
				error:		function( xhr ) { tpl = false; }

			} )

		).then( function( data ) { return data; } );

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
				if( o.people === 2 && ( o.children > 0 && o.children <= 2 ) && o.infants === 0 )	return 3;
				if( o.people === 1 && ( o.children > 0 && o.children <= 3 ) && o.infants === 0 )	return 3;
				if( o.family === 5 ) 																return 4;
				if( o.family === 4 && o.infants === 1 )												return 4;
				if( o.family === 3 && o.infants === 2 )												return 4;
				if( o.family <= 3 && o.family > 0 && o.infants > 0 && o.infants <= 2 )				return 4; // This fixes https://iris-worldwide.atlassian.net/browse/FRT-148?filter=15137

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

		$.publish( 'data-loaded' );

		return db;

	}

	var loadData = function() {

		var data = store.get( 'miniData' ) || false;

		if( data ) {

			console.log( 'loading database from local storage' );

			populateDB( data );

		}
		
		else {

			console.log( 'requesting data to populate the database' );

			$.ajax( {

				url:		path.api,
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
function Dials() {

	// Rollers

	this.roller = function( slot ) {

		var $list		= $( slot ).siblings( '.list' );
		var slotHeight	= $list.find( '.item:nth-child( 2 )' ).height();
		var listHeight	= slotHeight * ( $list.find( '.item' ).length - 1 );

		var reset = function() {

			var _this = this;

			TweenLite.to( this.$slot.get( 0 ), 0.6, {

				y: 0,
				onComplete: function() { _this.update(); }

			} );

			this.$list.find( '.item' ).removeClass( 'active' );
			this.$list.removeClass( 'dragging' ).removeAttr( 'style' );

			this.update();

		}

		var getSlotValue = function() {

			var activeSlot		= getSlotState( this.y, slotHeight, 0 );
			var $slot			= $list.find( '.item' ).eq( activeSlot );
			var value			= $slot.data( 'value' ) || $slot.text();

			return ( value === 'Empty' ) ? 0 : value;

		}

		var getSlotState = function( pos, height, padding ) {

			var currentPosition = Math.abs( pos );
			var activeSlot		= Math.ceil( currentPosition / height );

			return Math.ceil( activeSlot ) + 1;

		}

		$( slot ).height( listHeight ); // Make fake list the same height as the real one


		// Initialize Draggable

		var slot_dial = new Draggable( slot, {

			type:			'y',
			bounds:			$( slot ).parent(),
			edgeResistance:	1,
			throwProps:		true,
			onDrag:			function() {

				var activeSlot		= getSlotState( this.y + 40, slotHeight, 0 );
				var $active			= $list.find( '.item' ).removeClass( 'active' ).eq( activeSlot ).addClass( 'active' );

				$list.addClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.y + 'px, 0px )' } );

			},
			onDragEnd:		function() { $list.removeClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.endY + 'px, 0px )' } ); },
			snap:			function( endValue ) { return Math.round( endValue / slotHeight ) * slotHeight; }

		} );

		slot_dial.getValue	= getSlotValue;
		slot_dial.reset		= reset;
		slot_dial.$list		= $list;
		slot_dial.$slot		= $( slot );

		return slot_dial;

	}

	// Luggage

	this.luggage = function() {

		var luggage_end		= 0;
		var luggage_el		= document.querySelector( '.control.luggage .dial' );
		var luggage_snap	= 360 / 4;

		var getLuggage = function() {

			return $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();

		}

		var bindEvents = function() {

			$( '.control.luggage .arrows' ).on( 'mousedown mouseup touchstart touchend', function( e ) {

			e.preventDefault();

				( e.type === 'mousedown' ) ? $( this ).removeClass( 'right left' ).addClass( e.target.id ) : $( this ).removeClass( 'right left' );

			} );

			$( '#left, #right' ).on( 'click', function( e ) {

				e.preventDefault();

				// Remove all classes

				$( luggage_el ).removeClassExcept( 'dial' );

				var $dial		= $( '.control.luggage .dial' );
				var direction	= e.target.id;
				var nr			= ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;

				// Move to the initial position

				TweenLite.to( luggage_el, 1, { rotation: nr, onComplete: function( v ) { dialClass( nr ); } } );

				// Update rotation & value

				luggage_dial.update();
				luggage_end = nr;

			} );

		}

		var dialClass = function( r ) {

			var dial_class	= ( ( ( r / luggage_snap ) % luggage_snap ) % 4 );

			if( dial_class === -1 || dial_class === 3 ) { final_class = 'light-packer'; } // light packer
			if( dial_class === -2 || dial_class === 2 ) { final_class = 'lugger'; } // lugger
			if( dial_class === -3 || dial_class === 1 ) { final_class = 'big-loader'; } // big loader
			if( dial_class === 0 ) { final_class = 'minimalist'; } // minimalist
				
			$( luggage_el ).removeClassExcept( 'dial' ).addClass( final_class );

		}

		var luggage_dial	= new Draggable( luggage_el, {

			type:				'rotation',
			throwProps: 		true,
			onThrowComplete:	function() { dialClass( parseInt( this.endRotation ) ); },
			onDragStart:		function( e ) { $( luggage_el ).removeClassExcept( 'dial' ); }, // Remove all classes
			onDragEnd:			function( e ) { luggage_end = parseInt( this.endRotation ); }, // Update luggage_end
			snap:				function( endValue ) { return Math.round( endValue / luggage_snap ) * luggage_snap; }

		} );

		bindEvents();

		luggage_dial.getLuggage = getLuggage;

		return luggage_dial;

	},

	// Options

	this.options = function() {

		this.getOptions = function() {

			var $inputs	= $( '.control.options input' );
			var values	= {};

			// $inputs.each( function( i, el ) { values[ $( this ).attr( 'id' ) ] = parseInt( $( this ).val() ); } );

			// if( $.isEmptyObject( values ) ) values = false;

			$inputs.each( function( i, el ) {

				values[ $( this ).attr( 'id' ) ] = $( this ).hasClass( 'checked' );

			} );

			return values;

		}

		// Normally we wouldn't need it, because in all normal browsers we can just use input:checked + label, but because of the stupid IE we need to do a fallback on click...

		$( '.option' ).on( 'click', function( e ) {

			e.preventDefault();

			var $input = $( this ).find( 'input' );

			$input.toggleClass( 'checked' );

		} );

	}

	// Lifestyle

	this.lifestyle = function() {

		var getLifestyle = function() { return $( '#c-lifestyle .slick-slide.slick-active' ).attr( 'data-value' ); }

		var lifestyle_el		= document.querySelector( '.control.lifestyle .dial' );
		var lifestyle_bounds	= 5;
		var lifestyle_bounds	= 45;

		var lifestyle_direction;
		
		// Load slick.js only for not IE browsers

		if( ! ie.loadFallbacks() ) {

			var $slick = $( '.items-wrapper' ).slick( {

				arrows:				false,
				infinite:			true,
				slide:				'.item',
				onAfterChange:		function() { lifestyle_dial.enable(); }

			} );

		}

		// Initialize draggable

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

	// MPG knob

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

	// Price dial

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

			var alt_1 = logic.getCarByName( car.alt_1 );
			var alt_2 = logic.getCarByName( car.alt_2 );
			var alt_3 = logic.getCarByName( car.alt_3 );

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

	// Easter eggs

	this.eggs = function( trigger, data ) {

		var eggsData = {

			rocket: {

				'code':		'RKT',
				'color':	'Rocket gold',
				'name':		'Rocket Car!',
				'cost':		'n/a',
				'terms':	'A ro-ro-ro-rocket car!'

			},

			toy: {

				'code':		'TOY',
				'color':	'Toy brown',
				'name':		'Toy Car',
				'cost':		'n/a',
				'terms':	'Just a silly toy...'

			}

		};

		$html.removeClassBeginningWith( 'egg' ).addClass( 'egg-' + trigger );

		switch( trigger ) {

			case 'toy': this.render( eggsData.toy ); break;
			
			case 'rocket': this.render( eggsData.rocket ); break;

			case 'creature':

				alert( 'These search results will show one of the creatures.' );

			break;

		}

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
var priceChanged	= false;
var ie				= new IE();
var ui				= new UI();
var logic			= new Logic();
var query			= new logic.query();
var social			= new SocialMedia();
var carCode			= getQueryParameter( 'm' ) || false;

var addressObj;
var dealersObj;
var responsive;
var dashboard;
var postcodeTimer;

// Selectors for form fields

var form = {

	addresses:			'#addresses',
	address1:			'#address-1',
	address2:			'#address-2',
	address3:			'#address-3',
	addressChooser:		'#address-chooser',
	dealerChooser:		'#dealer-chooser',
	dealers:			'#dealers',

}

// Some not IE-friendly stuff

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) {

	// Preload images

	ui.preloadImages();

	// Make everything responsive

	responsive = new Responsive();

}

// Start dashboard

dashboard = new Dashboard();

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	// We need to update dashboard color once the SVGs have been loaded

	var color		= ( carCode ) ? logic.getCarByCode( carCode ).color : false;
	var dashColor	= ( color ) ? color : 'Electric Blue';

	dashboard.colors( carColors[ dashColor ] );

	// Initialize controls on the homepage

	if( $( '#dash' ).length ) dashboard.init();

	// Color switcher

	$.subscribe( 'colour-change', function( e, color ) { dashboard.colors( color ); } );

	// Show first panel on a page

	ui.showPanel( 'default' );

	// Validate forms

	$( 'form' ).validate();

	// Handle successful form submission
	
	$.subscribe( 'form-ajax-results', function( e, data ) {

		if( data.success ) { ui.showPanel( 'thanks' ); }

	} );

	// Render finance template

	if( $( '#tpl-finance' ).length > 0 ) {

		ui.getTpl( 'finance' ).then( function( tpl ) {

			$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, logic.getFinance( carCode ) ) );

		} );

	}


	// Execute search

	$( '#start' ).on( 'click', function( e ) {

		e.preventDefault();

		// Animate button

		TweenLite.from($( '#start' ), 0.5, {rotation: -360});

		// Scroll to top of page

		setTimeout( function() {

			$('#tablet-toggle').click();

			$('html, body').animate( {

				scrollTop: 0

			}, 600);

			return false;

		}, 400 );


		var userSelection = dashboard.values();

		store.set( 'miniInput', userSelection );

		// Remove rotten eggs

		$html.removeClassBeginningWith( 'egg' );

		// Check if there are any easter eggs being triggered

		var eggs = logic.eggs( userSelection );

		if(

			$.inArray( 'toy', eggs ) >= 0 ||
			$.inArray( 'rocket', eggs ) >= 0

		) {

			if( $.inArray( 'rocket', eggs ) >= 0 && $.inArray( 'toy', eggs ) >= 0 ) { ui.eggs( 'rocket', eggs ); }

			else if( $.inArray( 'toy', eggs ) >= 0 ) { ui.eggs( 'toy', eggs ); }

			else { ui.eggs( 'rocket', eggs ); }

			return;

		}

		// Display results!

		else {

			var search		= query.build( query.convert( dashboard.values() ) );
			var results		= logic.getCars( search );
			var cars		= results.data;

			if( cars.length > 0 ) {

				// Randomly choose a car

				var car		= cars[ _.random( cars.length - 1 ) ];

				// Easter eggs

				if(

					$.inArray( 'dog', eggs ) >= 0 ||
					$.inArray( 'cat', eggs ) >= 0 ||
					$.inArray( 'alien', eggs ) >= 0

				) {

					ui.eggs( 'creature', eggs );

					// Populate results

					ui.render( car );

				}

				else {

					// Populate results

					ui.render( car );
					
				}

			}
		}

	} );

	// Show alternative cars

	$body.on( 'click', '.car-changer', function( e ) {

		e.preventDefault();

		var link	= $( this ).attr( 'href' );
		var car		= logic.getCarByCode( link.substring( 1 ) );

		$( '.car-changer' ).removeClass( 'active' ).filter( this ).addClass( 'active' );

		ui.render( car, true );

	} );

} );

// Postcode lookup, dealers lookup

var formatAddress = function( addrObj, skip ) {

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

var handlePostcode = function( e ) {

	var postcode = $( '#postcode' ).val();

	// Enable fields

	$( '.disabled' ).removeClass( 'disabled' ).find( '[disabled]' ).prop( 'disabled', false );

	// Get home addresses

	logic.getAddresses( postcode ).then( function( addresses ) {

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

	logic.getDealers( postcode ).then( function( dealers ) {

		// Store addresses

		dealersObj = dealers;

		formattedDealers = [];

		// Remove existing addresses

		$( form.dealerChooser ).contents().remove();

		// Construct address strings

		$( dealers ).each( function( i, addr ) {

			var address = formatAddress( addr );

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

$( '#postcode' ).on( 'keyup', function( e ) {

	// Fire only when alphanumeric keys are pressed

	if( e.which <= 90 && e.which >= 48 ) {

		clearTimeout( postcodeTimer );

		postcodeTimer = setTimeout( handlePostcode, 600 );

	}

} );

$body.on( 'change', form.addresses, function( e ) {

	var address	= addressObj[ $( this ).val() ];

	if( ! _.isEmpty( $( this ).val() ) ) {

		$( form.address1 ).val( formatAddress( _.extend( {}, address ), [ 'County', 'Town', 'Postcode' ] ) );
		$( form.address2 ).val( address.Town );
		$( form.address3 ).val( address.County );

	}

	else {

		$( form.address1 ).val( null );
		$( form.address2 ).val( null );
		$( form.address3 ).val( null );

	}

} );

// Handle AJAX form results

var $thanks = $( '#thanks-left, #thanks-right' );
var $formContent = $( '.form-content' );

$thanks.hide();

$.subscribe( 'form-ajax-results', function( e, data ) {

	console.log( data );

	$formContent.slideUp( 600 );
	$thanks.slideDown( 600 );

	alert( 'Thanks! Data has been logged to the console.' );

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