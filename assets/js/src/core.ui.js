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

		// Hide link for rocket car
		if ( car.code === 'RKT' ) { $('.car-link').hide(); }

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
		//
		// Create an object containing data for the eggs
		var eggsData = {

			rocket: {
				'code':		'RKT',
				'color':	'Blazing Red',
				'name':		'Alpha Centura',
				'cost':		'n/a',
				'terms':	'A ro-ro-ro-rocket car!',
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