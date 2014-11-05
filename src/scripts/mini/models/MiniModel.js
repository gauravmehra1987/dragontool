/**	@name			: MiniModel
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

	var MiniModel = Backbone.Model.extend({

		/*DEFAULT
		*************************/
		defaults: {
			_active: true,
			model: "Cooper S",
			performance: 5,
			colour: "red"
		},

		/*INIT
		*************************/
		initialize: function(){
		},

		clear: function(){
			this.destroy();
			this.view.remove();
		}
	});
	
	return MiniModel;
});