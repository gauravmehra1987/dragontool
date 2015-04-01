function Finance() {

	// Initalize vars
	var _this = this;	


	/**
	 * RENDER FINANCE TEMPLATE
	*/
	this.renderFinanceTpl = function() {
		//
		// Get the car finance data by passing in the car code to the getFinance function
		var carFinance = formLogic.getFinance( carCode );
		//
		// Get finance template
		ui.getTpl( 'finance' ).then( function( tpl ) {
			//
			// Replace the contents of the div, with the template contents...
			$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, carFinance ) );
			//
		} );
		//
		// Show the link for the form page
		$('#go-to-form').addClass('show');
	}


	/**
	 * DETECT FINANCE
	 * If it is a real car or an egg
	*/
	this.detectFinance = function() {
		//
		// If rocket car...
		if (carCode === 'RKT') {
			//
			// Hide finance T&Cs and link to the form
			$('#tpl-finance').hide();
		//
		// Else, if a real car...
		} else {
			//
			// render finance template for T&C's
			_this.renderFinanceTpl();
		}
	}


	/**
	 * INITIALIZE
	*/
	this.init = function() {
		//
		// If we are on the results page...
		if ( $( '#page-results' ).length > 0 ) {
			//
			// Detect for finance
			_this.detectFinance();
		}
	}

}