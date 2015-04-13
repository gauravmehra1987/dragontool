( function( Mini ) {
	
} )( Mini );

// Intro animations

function animate() {

	// this.bg = function() {

	// 	var colors = [

	// 		'#f7941d',
	// 		'#30b6e8',
	// 		'#1164ac',
	// 		'#426046',
	// 		'#d71d24',
	// 		'#d71d24',
	// 		'#e4dfce'

	// 	];

	// 	var i = 0;

	// 	var t;

	// 	var increment = function() {

	// 		$.publish('colour-change', colors[ i ]);

	// 		( i < colors.length ) ? i++ : clearInterval( t );

	// 	};

	// 	t = setInterval( increment, 100 );

	// };

	// this.bums = function() {

	// 	setSlotValue( _.random( 0, $( slot_1 ).find( '.slot' ).length - 1 ), slot_1 );
	// 	setSlotValue( _.random( 0, $( slot_2 ).find( '.slot' ).length - 1 ), slot_2 );
	// 	setSlotValue( _.random( 0, $( slot_3 ).find( '.slot' ).length - 1 ), slot_3 );
	// 	setSlotValue( _.random( 0, $( slot_4 ).find( '.slot' ).length - 1 ), slot_4 );
	// 	setSlotValue( _.random( 0, $( slot_5 ).find( '.slot' ).length - 1 ), slot_5 );

	// };

	this.mpg = function() {
		//
		// Get the elements to tween
		var $wrap = $('.control.mpg');
		var $arrow = $('.control.mpg .arrow');
		//
		// Set the initial position of the arrow to the beginning
		TweenLite.to( $arrow, 0.01, { rotation: -120 } );

		// Set an iterator that the below function will update
		var x = 0;

		// function animateScaleDown() {
		// 	console.log('animate down called');
		// 	//
		// 	// We are changing the class depending on which notch we want to show, and using the iterations to create the class number eg. scale-13
		// 	$( '.control.mpg' ).removeClassExcept( 'control mpg' ).addClass( 'control mpg scale-' + x );
		// 	//
		// 	// It will repeat the function 13 times (which is how many markers notches there are on the scale)
		// 	if ( x-- < 0 ) {
		// 		x
		// 		//
		// 		// And setting a timeout each time and repeating the function
		// 		setTimeout(animateScaleDown, 30);
		// 	}
		// }

		// Set a really short timeout to begin the animation...
		setTimeout( function() {
			//
			// Tween the arrow rotation
			TweenLite.to( $arrow, 0.4, { rotation: 120 } );

			//
			// Create a function which will animate the colored notches
			function animateScaleUp() {
				//
				// We are changing the class depending on which notch we want to show, and using the iterations to create the class number eg. scale-13
				$( '.control.mpg' ).removeClassExcept( 'control mpg' ).addClass( 'control mpg scale-' + x );
				//
				// It will repeat the function 13 times (which is how many markers notches there are on the scale)
				if ( x++ < 13 ) {
					//
					// And setting a timeout each time and repeating the function
					setTimeout(animateScaleUp, 30);
					//
					// When it gets to the end (ie if x is 13)
					if ( x === 13 ) {
						//
						// Call the function to reverse the animation
						// animateScaleDown();
					}
				}
			}
			// Call the function initially
			animateScaleUp();
			//
		}, 0.1 );




	};



	/**
	 * OPTIONS
	*/
	this.options = function() {
		//
		// Get the number of input fields (and minus one due to the 0 indexing)
		var inputsLength = $( '.control.options input' ).length - 1;
		//
		// Set up a function to animate the checkboxes on and off
		var animateOptions = function() {
			//
			// Iterate over input fields...
			$( '.control.options input' ).each( function( i, el ) {
				//
				// Add a class of checked to the input
				setTimeout( function() {
					$( el ).addClass('checked');
				}, (i * 100) );
				//
				// Remove the 'checked' class
				setTimeout( function() {
					$( el ).removeClass('checked');
				}, ( i * 100 ) + 400 );
			} );
		}
		//
		// Call the checkboxes animation
		animateOptions();
		//
		// And call again once the animation is complete
		setTimeout( function() {
			animateOptions();
		}, (inputsLength * 100) + 500 );
	};


	/**
	 * PRICE
	*/
	this.price = function() {
		//
		// Get the elements we are going to tween
		var $handle = $( '.control.price .handle' );
		var $bgColor = $( '.control.price .switch-bg' );
		//
		// Set the max height and top position for the elements to tween to
		var handleTopPosition = "-390px";
		var bgColorMaxHeight = "403px";
		//
		// Tween the handle
		TweenMax.to( $handle, 0.4, { 
			y: handleTopPosition,
			yoyo: true,
			repeat: 3
		});
		//
		// Tween the color behind
		TweenMax.to( $bgColor, 0.4, {
			height: bgColorMaxHeight,
			yoyo: true,
			repeat: 3
		});
	};

	// this.lifestyle = function() {

	// 	TweenLite.to( lifestyle_el, 0.6, {

	// 		rotation: lifestyle_dial.minRotation,
	// 		onComplete: function() { updateLifestyleDial(); }

	// 	} ); // left

	// 	setTimeout( function() { TweenLite.to( lifestyle_el, 0.6, { rotation: 0 } ); }, 600 ); // right

	// };

	// this.speed = function() {

	// 	setSlotValue( $( speed_control ).find( '.slot' ).length - 2, speed_control );

	// };

	// this.luggage = function() {

	// 	TweenLite.to( luggage_el, 2, { rotation: 360 } );

	// };

	// Set a timeout before executing the functions, so the page has a chance to load
	setTimeout( function() {

		// this.bums();
		this.mpg();
		this.options();
		this.price();
		// this.lifestyle();
		// this.speed();
		// this.luggage();
		// this.bg();

	}, 1000 );

}

animate();