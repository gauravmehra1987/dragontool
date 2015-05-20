function Dials() {


	// DIAL: ROLLERS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * ROLLERS
	 * @param {String} Slot selector
	 * @return {Object} Returns the slot_dial draggable object with some more useful properties added
	*/
	this.roller = function( slot ) {

		// SET VARIABLES
		///////////////////////////
		//
		// Compile a list from the siblings of the passed in slot (.fake-list)
		var $list = $( slot ).siblings( '.list' );
		//
		// Get the height of each slot
		var slotHeight = $list.find( '.item:nth-child( 2 )' ).height();
		//
		// Get the entire list height
		var listHeight = slotHeight * ( $list.find( '.item' ).length - 1 );


		/**
		 * RESET
		 * All the slots using Greensock tweenLite
		*/
		var reset = function() {
			//
			// '_this' is an instance of the draggable object
			var _this = this;
			//
			// Greensock tween to the first fake-list item, for 0.6 seconds
			TweenLite.to( _this.$slot.get( 0 ), 0.6, {
				//
				// Lock axis to 'y' direction
				y: 0,
				//
				// Once complete, update the draggable object
				onComplete: function() { _this.update(); }
			} );
			//
			//
			// Find the item inside the list and remove the active class
			_this.$list.find( '.item' ).removeClass( 'active' );
			//
			// Remove dragging class and the style attr from the list
			_this.$list.removeClass( 'dragging' ).removeAttr( 'style' );
			//
			// Update the draggable object
			_this.update();
		}


		/**
		 * GET SLOT VALUE
		 * @return {String} Returns the value of the active slot (Man, Woman, Boy, Girl etc)
		*/
		var getSlotValue = function() {
			//
			// Passes the draggable object values into getSlotState to return the active slot
			var activeSlot = getSlotState( this.y, slotHeight, 0 );
			//
			// To get the slot, we find the item in the list which matches the number of the active slot
			var $slot = $list.find( '.item' ).eq( activeSlot );
			//
			// To get the string value, we get the data-value attr or the slot text
			var value = $slot.data( 'value' ) || $slot.text();
			//
			// Returns the value of the slot, or 'empty' if there is no value
			return ( value === 'Empty' ) ? 0 : value;
		}


		/**
		 * GET SLOT STATE
		 * @param {Number} Position
		 * @param {Number} Height
		 * @param {Number} Padding
		 * @return {Number} Returns the active slot
		*/
		var getSlotState = function( pos, height, padding ) {
			//
			// Current Position returns the absolute value of the position
			var currentPosition = Math.abs( pos );
			//
			// Active Slot calculates the position and the height and rounds the number upwards
			var activeSlot = Math.ceil( currentPosition / height );
			//
			// Returns the active slot plus 1 (maybe because otherwise it would start at 0?)
			return Math.ceil( activeSlot ) + 1;
		}


		// Make fake list the same height as the real one
		$( slot ).height( listHeight );


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the slot dial
		var slot_dial = new Draggable( slot, {
			//
			// Lock axis to 'y' direction
			type: 'y',
			//
			// Make the bounds the slots parent (the list element that holds all the slots)
			bounds:	$( slot ).parent(),
			//
			// Setting edge resistance to '1' doesn't allow it to drag past it's set bounds
			edgeResistance:	1,
			//
			// Gets the momentum of the users drag, using the throwProps plugin
			throwProps:	true,
			//
			// Applies everytime the slot gets dragged...
			onDrag:	function() {
				//
				// Passes the draggable object values into getSlotState to return the active slot
				var activeSlot = getSlotState( this.y + 40, slotHeight, 0 );
				//
				// Remove active class from all the slots, but add it to the active slot
				var $active	= $list.find( '.item' ).removeClass( 'active' ).eq( activeSlot ).addClass( 'active' );
				//
				// Add dragging class to the list, and CSS transform position based on the value of the 'y' position of the slot
				$list.addClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.y + 'px, 0px )' } );
			},
			//
			// Applies when the user stops dragging...
			onDragEnd: function() {
				//
				// Remove dragging class from the list, and CSS transform position to the value of where the drag will end (endY gives you this figure)
				$list.removeClass( 'dragging' ).css( { 'transform': 'translate3d( 0px, ' + this.endY + 'px, 0px )' } );
				//
				// Google Analytics
				var triggeredEvent = $( slot ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );
			},
			//
			// Defines a rule for where the slot will snap to...
			snap: function( endValue ) {
				//
				// Calculates the snap position based on the slot height and rounds up
				return Math.round( endValue / slotHeight ) * slotHeight;
			}
		} );


		// ADD TO SLOT DIAL OBJECT
		///////////////////////////
		//
		// Using the slot_dial instance of the draggable object...
		// We will add some useful properties to it based on the above functions
		slot_dial.getValue	= getSlotValue;
		slot_dial.reset		= reset;
		slot_dial.$list		= $list;
		slot_dial.$slot		= $( slot );


		// And return the slot_dial draggable object with our properties added
		return slot_dial;
	}




	// DIAL: LUGGAGE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * LUGGAGE
	 * @return {Object} Returns the luggage_dial draggable object with some more useful properties added
	*/
	this.luggage = function() {

		// SET VARIABLES
		///////////////////////////
		//
		// Set luggage_end to be 0
		var luggage_end	= 0;
		//
		// Set luggage_el to be a DOM element
		var luggage_el = document.querySelector( '.control.luggage .dial' );
		//
		// Set the luggage_snap to be a circle divided in quarters as there are 4 options
		var luggage_snap = 360 / 4;


		/**
		 * GET LUGGAGE
		 * @return {Number} Returns the active slot
		*/
		var getLuggage = function() {
			//
			// Gets the class of the luggage element and gets rid of and other classes so it is only 'dial'
			return $( luggage_el ).attr( 'class' ).replace( 'dial', '' ).trim();
		}


		/**
		 * SPIN LUGGAGE DIAL
		 * @param {String} Direction (left or right)
		*/
		var spinLuggageDial = function( direction ) {
			//
			// Remove all classes from the luggage element, except 'dial'
			$( luggage_el ).removeClassExcept( 'dial' );
			//
			// Save the dial element
			var $dial = $( '.control.luggage .dial' );
			//
			// If direction is 'left'...
			// Add the luggage_end and luggage_snap together
			// Else, minus them from eachother
			var nr = ( direction === 'left' ) ? luggage_end + luggage_snap : luggage_end - luggage_snap;
			// Use Greensock Tween to move to the initial position
			// 
			TweenLite.to( luggage_el, 1, {
				//
				// Rotation is based on the direction of the user click
				rotation: nr,
				//
				// On complete, pass in the rotation value to the dialClass function
				onComplete: function( v ) {

					dialClass( nr );

					// Google Analytics
					var triggeredEvent = $( luggage_el ).closest('.control-wrapper').attr('id');
					trackDialEvents( triggeredEvent );

				}
			} );

			// Update rotation & value
			luggage_dial.update();
			//
			// Set luggage_end to be based on the user click direction
			luggage_end = nr;
			// alert('click');
		};


		/**
		 * LUGGAGE DIAL ARROW UP
		 * @param {Object} Target parent (arrows parent)
		 * @param {String} Direction (left or right)
		*/
		var dialArrowUp = function( $targetParent, direction ) {
			//
			// Remove classes 'left' and 'right' from the arrows element
			$targetParent.removeClass( 'right left' );
			//
			// Spin the dial!
			spinLuggageDial( direction );
		};


		/**
		 * LUGGAGE DIAL ARROW DOWN
		 * @param {Object} Target parent (arrows parent)
		 * @param {String} Direction (left or right)
		*/
		var dialArrowDown = function( $targetParent, direction ) {
			//
			// Classes added to the arrows parent element determine the button style to show user interaction (up or down)
			// Remove classes 'left' and 'right' from the arrows parent element, but then add the class of the direction
			$targetParent.removeClass( 'right left' ).addClass( direction );
		};


		/**
		 * BIND EVENTS
		*/
		var bindEvents = function() {
			//
			// On user interaction with the luggage arrows...
			$( '#left, #right' ).on( 'mousedown mouseup touchstart touchend', function( e ) {

				e.stopPropagation();
				e.preventDefault();
				//
				// Getting the direction and the target
				var $targetParent = $( this ).parent();
				var direction = e.target.id;
				//
				// This adds a class of 'left' or 'right' to the arrows element, depending on user interaction...
				if ( e.type === 'mousedown' || e.type === 'touchstart' ) {
					dialArrowDown( $targetParent, direction );
				} else {
					dialArrowUp( $targetParent, direction );
				};

			} );
		}


		/**
		 * DIAL CLASS
		 * Adds a class to the luggage dial element based on user selection
		 * @param {Number} The dials rotation value, everytime the user clicks
		*/
		var dialClass = function( r ) {
			//
			// Some calculation to turn the rotation value into a number from -1 to -4
			var dial_class = ( ( ( r / luggage_snap ) % luggage_snap ) % 4 );
			//
			// Some logic to set a string to each number of the dial and save as 'final_class' to be added to the element
			if ( dial_class === -1 || dial_class === 3 ) { final_class = 'light-packer'; } // light packer
			if ( dial_class === -2 || dial_class === 2 ) { final_class = 'lugger'; } // lugger
			if ( dial_class === -3 || dial_class === 1 ) { final_class = 'big-loader'; } // big loader
			if ( dial_class === 0 ) { final_class = 'minimalist'; } // minimalist
			//
			// Remove all other classes except 'dial' and add the class which determines the user selection
			$( luggage_el ).removeClassExcept( 'dial' ).addClass( final_class );
		}


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the slot dial
		var luggage_dial = new Draggable( luggage_el, {
			//
			// Set type to rotation
			type: 'rotation',
			//
			// Allow user throw with momentum
			throwProps: true,
			//
			// On throw complete...
			onThrowComplete: function() {
				//
				// Pass the end rotaion value to the dial class function
				dialClass( parseInt( this.endRotation ) );
			},
			//
			// On drag start...
			onDragStart: function( e ) {
				//
				// Remove all classes from the luggage element, except for 'dial'
				$( luggage_el ).removeClassExcept( 'dial' );
			},
			// On drag end...
			onDragEnd: function( e ) {
				//
				// Update luggage end
				luggage_end = parseInt( this.endRotation );
			},
			//
			// Calculate at what point to snap to...
			snap: function( endValue ) {
				//
				return Math.round( endValue / luggage_snap ) * luggage_snap;
			}
		} );


		// Call the bindEvents function to listen to user interaction
		bindEvents();

		// Set a property of getLuggage to the draggable instance, to be that of the function above
		luggage_dial.getLuggage = getLuggage;

		// Return the draggable object
		return luggage_dial;
	}




	// DIAL: OPTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * OPTIONS
	*/
	this.options = function() {

		/**
		 * Get options
		 * @param {Object} Returns an object with the values the user has selected (booleans values for each option)
		*/
		this.getOptions = function() {
			//
			// Save the elements of the options checkbox inputs
			var $inputs	= $( '.control.options input' );
			//
			// Set values to an empty object
			var values	= {};
			
			// Iterate over each input checkbox inputs...
			$inputs.each( function( i, el ) {
				//
				// Setting the property to be the ID of the input, and the value to a boolean for if it is checked or not
				values[ $( this ).attr( 'id' ) ] = $( this ).hasClass( 'checked' );
			} );
			//
			// Returns the values, which is an object with all the options as properties and the values of those set to true or false
			return values;
		}

		// Fallback on click for IE, and useful for google analytics...
		// Normally we wouldn't need it, because in all normal browsers we can just use input:checked + label, but because of the stupid IE we need to do a fallback on click...
		$( '.option' ).on( 'click', function( e ) {
			//
			// Prevent default event
			e.preventDefault();
			//
			// Find the input element
			var $input = $( this ).find( 'input' );
			//
			// And toggle a checked class
			$input.toggleClass( 'checked' );
			//
			// Google Analytics
			var triggeredEvent = $( e.target ).closest('.control-wrapper').attr('id');
			trackDialEvents( triggeredEvent );
			//
		} );
	}




	// DIAL: LIFESTYLE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * LIFESTYLE
	 * @return {Object} Returns the lifestyle_dial draggable object with some more useful properties added
	*/
	this.lifestyle = function() {

		/**
		 * GET LIFESTYLE
		 * @return {String} Returns a number string from the data-value attr of the active slide
		*/
		var getLifestyle = function() {
			//
			// Slick-slide is part of the slick.js slider plugin, which is used to show the lifestyle images
			return $( '#c-lifestyle .slick-slide.slick-active' ).attr( 'data-value' );
		}


		// SET VARIABLES
		///////////////////////////
		//
		// Get the dial element (the rotating draggable element)
		var lifestyle_el = document.querySelector( '.control.lifestyle .dial' );
		//
		// Set the lifestyle bounds to be the number of slides?? No idea why it's defined twice
		var lifestyle_bounds = 5;
		var lifestyle_bounds = 45;
		//
		// Set an empty variable for the direction
		var lifestyle_direction;


		// SLICK.JS
		///////////////////////////
		//
		// For modern browsers, load slick.js slider
		if ( ! ie.loadFallbacks() ) {
			//
			// Set the wrapper of the slider
			var $slick = $( '.items-wrapper' ).slick( {
				//
				// Don't include arrows, infinate sliding (looping), and define the selector for the slides
				arrows:	false,
				infinite: true,
				slide: '.item',
				//
				// After slide change...
				onAfterChange: function() {
					//
					// Enable lifestyle_dial. Not sure where this function is??
					lifestyle_dial.enable();
				}
			} );
		}


		// GREENSOCK DRAGGABLE
		///////////////////////////
		//
		// Create new instance of draggable for the lifestyle dial
		var lifestyle_dial = new Draggable( lifestyle_el, {

			type:			'rotation',
			bounds:			{ minRotation: -lifestyle_bounds, maxRotation: lifestyle_bounds },
			throwProps:		true,
			snap:			function( endValue ) { return true; },
			onDragStart:	function() { lifestyle_direction = Math.abs( this.y ); },
			onDragEnd:		function() {

				// Determine direction

				var direction = ( Math.abs( this.y ) > lifestyle_direction ) ? 'right' : 'left';

				slideContent( direction );

			}

		} );


		// Move content in the window
		function slideContent( direction ) {

			if ( ie.loadFallbacks() ) {

				( direction === 'right' ) ? ie.lifestyle.prev() : ie.lifestyle.next();

			} else {

				( direction === 'right' ) ? $slick.slick( 'slickPrev' ) : $slick.slick( 'slickNext' );

			}

			// Google Analytics
			var triggeredEvent = $slick.closest('.control-wrapper').attr('id');
			trackDialEvents( triggeredEvent );

		}


		// Listen to click...
		$('.control.lifestyle').off('click').on('click', function( e ) {
			//
			// Get width of clicked element
			var width = $(this).width();
			//
			// Get offset of clicked element
			var posX = $(this).offset().left;
			//
			// Calculate clicked position from offset
			var clickedPos = e.pageX - posX;
			//
			// Calculate the half way position
			var halfWay = width / 2;

			// Set direction variable to be updated
			var direction;

			// If clicked position is less than half way...
			if ( clickedPos < halfWay ) {
				//
				// Direction is left
				direction = 'left';
			//
			// More than half way...
			} else {
				//
				// Direction is right
				direction = 'right';
			}
			//
			// Pass the position to the slideContent func
			slideContent( direction );
		});


		lifestyle_dial.getLifestyle = getLifestyle;

		return lifestyle_dial;

	}




	// DIAL: MPG
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * MPG
	 * @return {}
	*/
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

				// Google Analytics
				var triggeredEvent = $( mpg_el ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );

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


	// DIAL: PRICE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * PRICE
	 * @return {}
	*/

	this.price = function() {

		var getPrice = function() {

			var height		= getHeight( dialPrice ) || 0;
			var min			= 190;
			var max			= 300;				
			var range		= max - min;

			return parseInt( ( range / 100 ) * height ) + min;

		}


		var getHeight = function( v ) {

			var position = Math.abs( parseInt( v.endY ) );	

			var height = Math.abs( ( position / v.minY ) * 100 );

			return height;

		}


		var getbgColorHeight = function( v ) {

			var position = Math.abs( parseInt( v.endY ) );	

			var height = position + 13 + 'px';

			return height;

		}


		var dialPrice = new Draggable( '.control.price .handle', {

			type: 'y',

			edgeResistance:	1,

			bounds:	'.control.price .bounds',

			throwProps: false,

			onDragStart: function() { priceChanged = true; },

			onDrag:	function() {

				$( '.control.price .switch-bg' ).css( 'height', getbgColorHeight(this) );

				// Google Analytics
				var triggeredEvent = $( '.control.price' ).closest('.control-wrapper').attr('id');
				trackDialEvents( triggeredEvent );

			},

		} );

		dialPrice.getPrice = getPrice;

		return dialPrice;

	}

}

