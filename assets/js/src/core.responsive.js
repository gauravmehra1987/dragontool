// FastClick

if( 'addEventListener' in document ) { document.addEventListener('DOMContentLoaded', function() { FastClick.attach( document.body ); }, false ); }

// Media queries

function Responsive() {

	var mobile		= matchMedia( '( max-width: 767px )' );
	var tablet		= matchMedia( '( min-width: 768px ) and ( max-width: 1179px )' );
	var desktop		= matchMedia( '( min-width: 1180px )' );


	var handleMobile = function( mediaQuery ) {

		this.on = function() {
			//
			// Add mobile class to body
			$( 'body' ).addClass('mobile');

			// Toggling dial tabs
			//
			// Get the dial tabs trigger
			var $controlTitle = $( '.control-title' );
			//
			// On click of dial tab trigger
			$controlTitle.off( 'click' ).on( 'click', function( e ) {
				//
				// Prevent default event
				e.preventDefault();

				// Check if dial tab is already open...
				if ( $( this ).hasClass( 'open' ) ) {
					//
					// Close it
					$controlTitle.removeClass( 'open' );
				//
				// Else, if it is not open...
				} else {
					//
					// Close all the other tabs
					$controlTitle.removeClass( 'open' );
					//
					// And open the selected one
					$( this ).addClass( 'open' );
				}

				
				// Lighting up the dial tabs light
				//
				// Get the light
				var $light = $( this ).find( '.light' );
				//
				// Get the color
				var color = $( '.switch-bg' ).css( 'background-color' );
				//
				// Add a light class to the clicked tab to show the user has opened it
				$( this ).addClass('light');
				//
				// If the dial tab has the light class...
				if ( $( this ).hasClass( 'light' ) ) {
					//
					$light.addClass( 'switch-light' );
					$.publish( 'colour-change', color );
					//
				} else {
					//
					$light.removeClass( 'switch-light' );
					$light.removeAttr( 'style' );
				}

			} );

		};

		this.off = function() {

			// Remove mobile class from body
			$( 'body' ).removeClass('mobile');

			// Remove all appended classes and inline CSS

			$( '.control-title' ).removeClass( 'open' ).off();
			$( '.control-title' ).removeClass( 'light' ).off();
			$( '.control-title .light' ).removeAttr( 'style' ).removeClass( 'switch-light' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleTablet = function( mediaQuery ) {

		this.on = function() {
			//
			// Add tablet class to body
			$( 'body' ).addClass('tablet');

			// Handle toggle arrow

			$( '#tablet-toggle' ).off( 'click' ).on( 'click', function( e ) {

				e.preventDefault();

				// When the dashboard is in view

				$( '#layout-dash > .column.left' ).toggleClass( 'open' );
				$('#layout-dash').toggleClass('dash-open');

				// When the results screen is in view

				if ( !($('#layout-dash').hasClass('dash-open')) && $('#results').is(':visible') ) {

					var resultsHeight = $('#results').height() + 270 + 'px';
					$('#layout-dash').css('height', resultsHeight);

				} else {

					$('#layout-dash').removeAttr('style');

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
			//
			// Remove tablet class from body
			$( 'body' ).removeClass('tablet');

			// Unbind events and inline CSS

			$( '#tablet-toggle' ).off();

			$( '#layout-dash > .column.left' ).removeClass( 'open' );

			$( '#layout-dash, #dash' ).removeAttr( 'style' );

		};

		( mediaQuery.matches ) ? this.on() : this.off();

	};

	var handleDesktop = function( mediaQuery ) {

		this.on = function() {
			//
			// Add desktop class to body
			$( 'body' ).addClass('desktop');
		};

		this.off = function() {
			//
			// Remove desktop class from body
			$( 'body' ).removeClass('desktop');
		};

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