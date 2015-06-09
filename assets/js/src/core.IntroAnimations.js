
// Intro animations
function IntroAnimations() {

	// Initalize vars
	var _this = this;	

	/**
	 * BG COLOR
	*/
	this.bg = function() {
		//
		// Create an array of the colors in the order we want to animate (taking colours from the object in the config file)
		var colors = [
			carColors[ 'Electric Blue' ],
			carColors[ 'Pepper white' ],
			carColors[ 'Lightning Blue' ],
			carColors[ 'Volcanic Orange' ],
			carColors[ 'Jungle Green' ],
			carColors[ 'Blazing Red' ]
		];
		//
		// Set the iterator to 0
		var i = 0;
		//
		//
		var t;

		var increment = function() {

			$.publish('colour-change', colors[ i ]);

			( i < colors.length ) ? i++ : clearInterval( t );

		};

		t = setInterval( increment, 300 );
	};



	/**
	 * BUMS ON SEATS
	*/
	this.bums = function() {
		//
		// Get all the roller slots
		var $list = $( '#c-bums .roller .list' );
		var timeOut = 0;
		//
		// Iterate over all the slots...
		$list.each( function( i, val ) {
			//
			// Get the height of the slot
			var slotHeight = $(val).height() - 160;
			// 
			// 
			timeOut = timeOut + 100;

			setTimeout( function() {
				TweenMax.to( val, 0.4, {
					y: -slotHeight,
					repeat: 1,
					yoyo: true,
					repeatDelay: 0.5
				});
			}, timeOut );

		})
	};


	/**
	 * MPG
	*/
	this.mpg = function() {
		//
		// Get the elements to tween
		var $wrap = $('.control.mpg');
		var $arrow = $('.control.mpg .arrow');
		var $value = $('.control.mpg .value');

		// To tween the handle...
		// Tween the arrow rotation up and down
		TweenLite.to( $arrow, 0.5, {
			rotation: 120,
			onComplete: function() {
				this.reverse();
			}
		});

		// To animate the notches...
		// The notches are made up of a series of images which are swapped by giving a different class the the wrapper
		// The class we need to give is 'scale-x' and the 'x' would be a number from 1 to 13 to display each notch image
		//
		// Call the function to animate notches up (explained below)
		animateNotchesUp();
		//
		// First we need to set an iterator which will be animated up and down in the following functions
		var x = 0;
		//
		// Create a function to animate the notches up...
		function animateNotchesUp() {
			//
			// Set the counter from 1 to 13
			$({ Counter: 1 }).animate({ Counter: 13 }, {
				//
				// The duration needs to be in sync with the handle
				duration: 500,
				easing: 'swing',
				//
				// Each step...
				step: function () {
					//
					// Set our iterator to the number in the animation
					x = Math.ceil(this.Counter);
					//
					// And use the iterator to give the wrapper the correct class name
					$wrap.addClass('scale-' + x).removeClassExcept( 'control mpg scale-' + x);
				},
				//
				// Once the sequence is complete...
				complete: function() {
					//
					// We will call the animate down function which does the oposite sequence
					animateNotchesDown();
				}
			});
		};
		//
		// The following function is to animate the notches down...
		// It does the same as the animate up function above, but on complete it will remove the scale class completely
		function animateNotchesDown() {
			$({ Counter: 13 }).animate({ Counter: 1 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					x = Math.ceil(this.Counter);
					$wrap.addClass('scale-' + x).removeClassExcept( 'control mpg scale-' + x);
				},
				complete: function() {
					$wrap.removeClassExcept( 'control mpg' );
				}
			});
		};

		// To animate the value...
		// Very similar to the notches animations above
		//
		// Call the function to animate the value up (explained below)
		animateValueUp();
		//
		// First we need to set an iterator which will be animated up and down in the following functions
		var j = 0;
		//
		// Create a function to animate the value up...
		function animateValueUp() {
			//
			// Set the counter from 25 to 80
			$({ Counter: 25 }).animate({ Counter: 80 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					j = Math.ceil(this.Counter);
					// And use the iterator to give the correct value to the element
					$value.text(j);
				},
				complete: function() {
					animateValueDown();
				}
			});
		};
		//
		// The following function is to animate the value down...
		function animateValueDown() {
			$({ Counter: 80 }).animate({ Counter: 24 }, {
				duration: 500,
				easing: 'swing',
				step: function () {
					j = Math.ceil(this.Counter);
					$value.text(j);
				}
			});
		};

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
		TweenMax.to( $handle, 0.5, { 
			y: handleTopPosition,
			yoyo: true,
			repeat: 1
		});
		//
		// Tween the color behind
		TweenMax.to( $bgColor, 0.5, {
			height: bgColorMaxHeight,
			yoyo: true,
			repeat: 1
		});
	};



	/**
	 * LIFESTYLE
	*/
	this.lifestyle = function() {
		//
		// Get lifestyle dial to tween
		var $lifestyleDial = $( '.control.lifestyle .dial' );
		var $slickWrap = $( '.items-wrapper' );
		//
		// Animate slides
		var animateSlides = setInterval(function() {
			$slickWrap.slick( 'slickPrev' );
		}, 0);
		//
		// Stop the slides animating once it gets back to the beginning
		setTimeout(function() {
			clearInterval(animateSlides);
		}, 2000);	
	};


	/**
	 * SPEED
	*/
	this.speed = function() {
		//
		// Get all the roller slot
		var $list = $( '.control.speed .roller .list' );
		//
		// Get the height of the slot
		var slotHeight = $list.height() - 160;
		// 
		//
		TweenMax.to( $list, 0.5, {
			y: -slotHeight,
			repeat: 1,
			yoyo: true,
			repeatDelay: 0.5
		});
	};


	/**
	 * LUGGAGE
	*/
	this.luggage = function() {
		//
		// Get the luggage dial element
		var $luggageDial = $( '.control.luggage .dial' );
		//
		// Tween rotate it full circle
		TweenLite.from( $luggageDial, 2, {
			rotation: 360 }
		);
	};


	/**
	 * BUTTON
	*/
	this.button = function() {
		// Get the button element to rotate as well as the button element to be clicked (one is inside the other)
		var $button = $( '.control.start #start' );
		var $buttonInner = $button.find( '.button-inner' );
		//
		// Disable the user clicking the button to combobulate until the animation is complete
		$button.css('pointer-events', 'none');
		//
		// Tween the button to rotate 3 times full circle and on complete re-enable the button click
		TweenMax.from( $buttonInner, 2, {
			rotation: -1080,
			onComplete: function() {
				$button.css('pointer-events', 'auto');
			}
		});
	};



	this.startAnimations = function() {
		//
		// Show the dash overlay to prevent users from interacting with the intro animations
		$('.dash-overlay').removeClass('hide');
		//
		// Start some of the dials animating...
		_this.bums();
		_this.bg();
		_this.luggage();
		_this.button();
		_this.lifestyle();
		//
		// And set some timeouts before executing the rest of the animations
		setTimeout( function() {
			_this.mpg();
			_this.options();
			_this.speed();
		}, 500 );

		setTimeout( function() {
			_this.price();
		}, 1000 );

		// Hide overlay once all animations are complete
		setTimeout( function() {
			$('.dash-overlay').addClass('hide');
		}, 2500 );
	};


	/**
     * Initialize
    */
	this.init = function() {
		//
		// For modern browers only
		if ( ! ie.loadFallbacks() ) {
			//
			// If dashboard exsists...
			if ( $( '#dash' ).length ) {
				//
				// If desktop...
				if ( $( 'body' ).hasClass('desktop') ) {
					//
					// Start animations
					_this.startAnimations();
				//
				// Else if tablet...
				} else if ( $( 'body' ).hasClass('tablet') ) {
					//
					// set a timeout before starting animations
					setTimeout( function() {
						_this.startAnimations();
					}, 2000 );
				}
			}
		}
	};

}
