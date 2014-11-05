/**	@name			: DataModel
*	@author			: 
*	@build			: 28.07.14
*	@description	: 
*					
*
*	@dependencies	: jquery, underscore(lodash), requirejs, backbone
*
********************************************/

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	'use strict';

	var DataModel = Backbone.Model.extend({

		/*DEFAULT
		*************************/
		defaults: {
			"value": 0
		},

		/*INIT
		*************************/
		initialize: function(){

			//DEVNOTE: will have to guard against the persistance of form control states or autocomplete=false;

			this.on("change:value", function(){

			});
		},

		clear: function(){
			this.destroy();
			this.view.remove();
		}

	});
	
	return DataModel;
});