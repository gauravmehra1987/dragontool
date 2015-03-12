function UI( templates ) {

	var _this		= this;

	this.$panel		= $body.find( '.panel-results' );
	this.templates	= {};

	// Template loader

	var getTpl = function( name ) {

		var cached = store.get( 'miniTemplates' ) || {};

		if( cached.hasOwnProperty( name ) ) {

			console.log( 'template ' + name + '.mustache found in cache' );

			return cached[ name ];

		}
		
		else {

			console.log( 'requesting ' + name + '.mustache template via AJAX' );

			var tpl;

			$.ajax( {

				url: path.templates + '/' + name + '.mustache',
				async: false,
				success: function( data ) {

					tpl = data;

					var newTemplate = {};

					newTemplate[ name ] = data;

					// Cache template

					if( ! cached.hasOwnProperty( name ) ) store.set( 'miniTemplates', _.extend( cached, newTemplate ) )

				},
				error: function() { tpl = false; }

			} );

			return tpl;

		}

	}

	this.t = getTpl;

	// Template renderer

	this.renderTpl = function( tpl, data ) {

		console.log( 'rendering ' + tpl + '.mustache' );

		return Mustache.render( getTpl( tpl ), data );

	}

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

		var renderRelatedCars = function( car, related ) {

			var $cars		= _this.$panel.find( '.car-changer' );
			var related		= related || false;

			var alt_1 = logic.getCarByName( car.alt_1 );
			var alt_2 = logic.getCarByName( car.alt_2 );
			var alt_3 = logic.getCarByName( car.alt_3 );

			if( alt_1 === false || alt_2 === false || alt_3 === false ) {

				alert( 'John Cooper Works is missing - please update the dataset with that car.' )

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

				if( related ) {

					console.log( 'replacing only related cars' );

					$cars.not( '.active' ).eq( 0 ).attr( 'href', '#' + alt_1.code ).find( 'img' ).attr( 'src', path.assets + alt_1.code + '.png' );
					$cars.not( '.active' ).eq( 1 ).attr( 'href', '#' + alt_2.code ).find( 'img' ).attr( 'src', path.assets + alt_2.code + '.png' );
					$cars.not( '.active' ).eq( 2 ).attr( 'href', '#' + alt_3.code ).find( 'img' ).attr( 'src', path.assets + alt_3.code + '.png' );

				}

				else {

					console.log( 'replacing all cars' );

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

		$( '#tpl-results' ).contents().remove();
		$( '#tpl-results' ).append( _this.renderTpl( 'results', car ) );

		renderRelatedCars( car, related );

		// Change dashboard color

		dashboard.colors( carColors[ car.color ] );

		// Reveal results

		this.showPanel( 'results' );

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

	// Load templates upon initialization

	if( templates ) $.each( templates, function( i, tpl ) { getTpl( tpl ); } );

}