function Combobulate() {
	//
	// Save 'this' to refer to this object later
	var _this = this;	


	/**
     * Do some animation
     * @param {Object} Button click event
    */
	this.animateCombobulate = function( e ) {
		//
		// prevent default of button
		e.preventDefault();
		//
		// Get the clicked button
		var $button = $(e.target).parent();
		//
		// Disable users clicking the button again
		$button.css('pointer-events', 'none');
		//
		// Animate the combobulate button
		TweenMax.from($( '#start .button-inner' ), 0.5, {
			//
			overwrite: true,
			//
			// Roatate all the way round
			rotation: -360,
			//
			// On complete...
			onComplete: function() {
				//
				// Call the scroll to top of the page function
				scrollToTop();
				//
				// And allow the user to click the button again
				$button.css('pointer-events', 'auto');
				//
				setTimeout( function() {
					$('#tablet-toggle').click();
				}, 600);
			}
		});
		//
		// Scroll to top of page
		function scrollToTop() {
			//
			$('html, body').animate({
			    scrollTop: 0
			}, 600);
			//
			return false;
		}
	};


	/**
     * Execute the search of the cars based on the user input from the dashboard
     * Pass results to ui.eggs function
    */
	this.executeSearch = function() {
		//
		// Save the values of the dashboard as 'userSelection'
		var userSelection = dashboard.values();
		//
		// Set miniInput to have the value of the userSelection
		store.set( 'miniInput', userSelection );
		//
		// On the html, remove all classes beginning with 'egg'
		$html.removeClassBeginningWith( 'egg' );
		//
		// The function dashboardLogic.eggs will return an array of eggs based on the user input (if there are any eggs)
		var eggs = dashboardLogic.eggs( userSelection );

		// If there is a toy or rocket in the array...
		// Pass the name as a string, and the array itelf to the UI.eggs function
		if ( $.inArray( 'toy', eggs ) >= 0 || $.inArray( 'rocket', eggs ) >= 0 ) {
			//
			if ( $.inArray( 'rocket', eggs ) >= 0 && $.inArray( 'toy', eggs ) >= 0 ) {
				//
				ui.eggs( 'rocket', eggs );
			//
			} else if ( $.inArray( 'toy', eggs ) >= 0 ) {
				//
				ui.eggs( 'toy', eggs );
			//
			} else {
				//
				ui.eggs( 'rocket', eggs );
			//
			}
			//
			return;
		}
		//
		// Else... if there is not a toy or rocket...
		else {
			// 
			// Convert user input values to an appropriate structure
			var search = query.build( query.convert( dashboard.values() ) );
			//
			// Get the car results using the dashboardLogic.getCars function and passing in the above search structure from user input
			var results	= dashboardLogic.getCars( search );
			//
			// Get an array of all the cars data from the results object
			var cars = results.data;
			//
			// If the cars array has anything in...
			if ( cars.length > 0 ) {
				//
				// Randomly choose a car
				var car	= cars[ _.random( cars.length - 1 ) ];
				//
				// If the car array contains eggs...
				// Pass 'creature' and the array itself to the UI.eggs function
				if ( $.inArray( 'dog', eggs ) >= 0 || $.inArray( 'cat', eggs ) >= 0 || $.inArray( 'alien', eggs ) >= 0 ) {
					// 
					ui.eggs( 'creature', eggs );
					//
					// Populate results
					ui.render( car );
				}
				//
				else {
					//
					// Populate results
					ui.render( car );
				}
			}
		}
	}


	/**
     * Show alternative cars
     * @param {Object} Button clicked event
    */
	this.showAlternateCars = function( e ) {
		//
		// Prevent button event default
		e.preventDefault();
		//
		// Get the clicked on elements thumbnail
		var $targetLink = $(e.target).parent();
		//
		// Get link of the clicked thumbnail
		var link = $targetLink.attr( 'href' );
		//
		// Get the car name from the link
		var car	= dashboardLogic.getCarByCode( link.substring( 1 ) );
		//
		// Remove active classes from all the thumbnails, but add active class to the thumbnail clicked
		$( '.car-changer' ).removeClass( 'active' ).filter( $targetLink ).addClass( 'active' );
		//
		// Pass to the UI render function, the clicked on car name and whether it has related cars
		ui.render( car, true );
	}


	/**
     * Event listeners
    */
	this.eventListeners = function() {
		//
		// On click of the car changer
		$body.on( 'click', '.car-changer', function( e ) {
			_this.showAlternateCars( e );
		});

		// On click of the combobulate button
		$( '#start' ).on( 'click', function( e ) {
			_this.animateCombobulate( e );
			_this.executeSearch();
		});
	}


	/**
     * Initialize
    */
	this.init = function() {
		//
		// Listen to events
		_this.eventListeners();
	}

}