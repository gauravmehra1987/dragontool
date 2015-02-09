function UI() {

	// Panels

	this.showPanel = function( panel ) {

		$body.find( '[data-panel-name]' ).removeClass( 'panel-active' );
		$body.find( '[data-panel-name="' + panel + '"]' ).addClass( 'panel-active' );

	}

	// SVG loader

	var loadSVGs = function() {

		var svgs = document.querySelectorAll( '.svg' );

		SVGInjector( svgs, {

			pngFallback: 'assets/sprites',

			each: function( svg ) { $( svg ).hide().fadeIn( 600 ); }

		} );

	}

	// Image preloader

	this.preloadImages = function() {

		loadSVGs();

		// Preload images to avoid nasty visual glitches

		sysMsg( 'Loading: 0%' );

		$.get( path.preload, { type: 'svg' }, function( images ){

			var loaded = 0;
			var $preloader = $( '<div>', { id: 'preloader' } );

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

					var unit = images.length / 100;
					var percentage = ( loaded / images.length ) * 100;
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

}