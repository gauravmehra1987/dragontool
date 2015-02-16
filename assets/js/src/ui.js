function UI() {

	this.$panel= $body.find( '.panel-results' );

	// Results URL generator

	var resultsPageUrl	= function( url, user, code, color ) {

		var color = btoa( color ); // pass the color

		return ( typeof user === 'undefined' ) ? url + 'm=' + code + '#' + color : url + 'c=' + user + '&m=' + code + '#' + color;

	};

	// SVG loader

	var loadSVGs = function() {

		var svgs = document.querySelectorAll( '.svg' );

		SVGInjector( svgs, {

			pngFallback: path.spriteFallback,

			each: function( svg ) { $( svg ).hide().fadeIn( 600 ); }

		} );

	}

	// Panels

	this.showPanel = function( panel ) {

		$body.find( '[data-panel-name]' ).removeClass( 'panel-active' );
		$body.find( '[data-panel-name="' + panel + '"]' ).addClass( 'panel-active' );

	}

	// Image preloader

	this.preloadImages = function() {

		loadSVGs();

		// Preload images to avoid nasty visual glitches

		sysMsg( 'Loading: 0%' );

		$.get( path.preload, { type: 'svg' }, function( images ){

			var loaded		= 0;
			var $preloader	= $( '<div>', { id: 'preloader' } );

			$body.append( $preloader );

			$.map( images, function( el ) {

				// Create SVG

				var imgPreload = document.createElementNS( 'http://www.w3.org/2000/svg','image' );
				
				imgPreload.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', el );
				imgPreload.setAttributeNS( null, 'height', 0 );
				imgPreload.setAttributeNS( null, 'width', 0 );

				// This is needed because of the SVGs - they need to be injected in to the DOM for the load event to work
				
				$preloader.append( imgPreload );

				imgPreload.addEventListener( 'load', function() {

					loaded++;

					var unit		= images.length / 100;
					var percentage	= ( loaded / images.length ) * 100;
					var progress;

					progress = Math.floor( percentage );

					// SVGs

					// console.debug( imgPreload.href.baseVal + ' preloaded sucessfully (' + progress + '%)' );

					sysMsg( 'Loading: '+ progress + '%' );

					if( progress === 100 ) {

						$sys.toggleClass( 'hidden' );

						$preloader.remove();

					}

				}, false );

			} );

		} );

	}

	// Render results

	this.render = function( car, user, animated ) {

		// Remove telpoert canvas

		$( '#car-teleport' ).remove();

		// Hide the dashboard on mobile

		if( Mini.browser.mobile ) setTimeout( function() {

			$( '.layout > .column.left' ).removeClass( 'open' );

		}, 0 );

		// Rengder actual results

		this.$panel.find( '[data-model-name]' ).html (car.name );
		this.$panel.find( '[data-model-code]' ).html( car.code );
		this.$panel.find( '[data-model-price]' ).html( car.cost );				
		this.$panel.find( '[data-terms]' ).html( car.terms );
		this.$panel.find( '[data-results-link]' ).attr( { href: resultsPageUrl( path.results, user, car.code, car.color ) } );
		
		if( animated ) {

			var carImg = new teleport( path.assets + car.code + '.png' );

			this.$panel.find( '[data-model-image]' ).hide().before( carImg );			

		}

		else {

			this.$panel.find( '[data-model-image]' ).hide().attr( { src: path.assets + car.code + '.png' } ).fadeIn( 200 );

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

			case 'teleport':

				ui.render( data.car, data.user, true );

			break;

		}

	}

}