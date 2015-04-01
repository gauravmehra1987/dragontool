function Finance() {

	// Initalize vars
	var _this = this;	


	/**
	 * Render finance template
	*/
	this.renderFinanceTpl = function() {
		//
		// If finance template div exsists...
		if ( $( '#tpl-finance' ).length > 0 ) {
			//
			// 
			ui.getTpl( 'finance' ).then( function( tpl ) {

				$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, formLogic.getFinance( carCode ) ) );

			} );
		}
	}


	/**
	 * Initialize
	*/
	this.init = function() {
		_this.renderFinanceTpl();
	}

}