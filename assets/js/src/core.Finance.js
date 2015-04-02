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
				//
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