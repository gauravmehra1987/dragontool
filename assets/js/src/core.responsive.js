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