function UI() {

	this.$panel= $body.find( '.panel-results' );

	// Results URL generator

	var resultsPageUrl	= function( url, user, code ) { return ( typeof user === 'undefined' ) ? url + 'm=' + code : url + 'c=' + user + '&m=' + code; };

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

	this.render = function( car, user, animated ) {

		var $cars = this.$panel.find( '#related' );

		// Hide the dashboard on mobile

		if( Mini.browser.mobile ) setTimeout( function() {

			$( '.layout > .column.left' ).removeClass( 'open' );

		}, 0 );

		// Rengder actual results

		this.$panel.find( '[data-model-name]' ).html (car.name );
		this.$panel.find( '[data-model-code]' ).html( car.code );
		this.$panel.find( '[data-results-link]' ).attr( { href: resultsPageUrl( path.results, user, car.code ) } );		
		this.$panel.find( '[data-model-image]' ).hide().attr( { src: path.assets + car.code + '.png' } ).fadeIn( 200 );

		// Render related cars

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

			$cars.find( '#related_1' ).attr( 'href', '#' + car.code ).find( 'img' ).attr( 'src', path.assets + car.code + '.png' );
			$cars.find( '#related_2' ).attr( 'href', '#' + alt_1.code ).find( 'img' ).attr( 'src', path.assets + alt_1.code + '.png' );
			$cars.find( '#related_3' ).attr( 'href', '#' + alt_2.code ).find( 'img' ).attr( 'src', path.assets + alt_2.code + '.png' );
			$cars.find( '#related_4' ).attr( 'href', '#' + alt_3.code ).find( 'img' ).attr( 'src', path.assets + alt_3.code + '.png' );

		}

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

}