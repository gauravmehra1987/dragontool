function Finance() {

	// Initalize vars
	var _this = this;	


	/**
	 * RENDER FINANCE TEMPLATE
	*/
	this.renderFinanceTpl = function() {
		//
		// If we are on the results page...
		if ( $( '#page-results' ).length > 0 ) {
			//
			// Get the car finance data by passing in the car code to the getFinance function
			var carFinance = formLogic.getFinance( carCode );
			//
			// Get finance template
			ui.getTpl( 'finance' ).then( function( tpl ) {
				//
				// Replace the contents of the div, with the template contents...
				$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, carFinance ) );

				// When payment plan table exsists (meaning the template has been rendered), manipulate the finance template
				runWhenElementExsists( $('#finance-template'), manipulateFinanceTpl );
				//
				function manipulateFinanceTpl() {
					//
					// Check if contibution is 0 and if so, hide it and hide the customer deposit
					if ( parseInt(carFinance.contribution) === 0 ) {
						//
						$('.retailer-deposit-contribution--row').addClass('hide');
						$('.customer-deposit--row').addClass('hide');
					}
					//
					// Slide up T&Cs to start
					$('.terms-toggle .hide-terms').addClass('hide');
					$('.terms').slideUp(1, function() {
						//
						// Once slide is complete, fade in the entire template
						$('#finance-template').addClass('fadeIn');
					});
					//
					// Bind a click event to toggle the terms
					$('.terms-toggle').on('click', function() {

						if ( $('.terms-toggle').hasClass('open') ) {

							$('.terms').slideUp();
							$('.terms-toggle').removeClass('open');
							$('.terms-toggle .hide-terms').addClass('hide');
							$('.terms-toggle .show-terms').removeClass('hide');

						} else {

							$('.terms').slideDown();
							$('.terms-toggle').addClass('open');
							$('.terms-toggle .show-terms').addClass('hide');
							$('.terms-toggle .hide-terms').removeClass('hide');

						}



					})
				}

			} );
		}
	}


	/**
	 * INITIALIZE
	*/
	this.init = function() {
		_this.renderFinanceTpl();
	}

}