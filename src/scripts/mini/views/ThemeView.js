/**	@name			: ThemeView
*	@author			: 
*	@build			: 28.07.14
*	@description	: 
*					
*
*	@dependencies	: jquery, underscore(lodash), requirejs, backbone
*
********************************************/

define(['jquery', 'underscore', 'backbone', 'DataModel'], function ($, _, View, Data) {
	'use strict';

	var ThemeView = View.Model.extend({

		//model: Data,

		el: "#app-content",

		palette: ["", "cyan", "orange", "indigo", "white", "red", "blue", "green", "black", "yellow", "cream", "silver", "crimson", "peach", "brown", "grey"],

		/*DEFAULT
		*************************/
		defaults:{
		},

		/*EVENTS
		*************************/
		events:{
		},

		/*INIT
		*************************/
		initialize: function(){
			
			//this.render();

			this.model.on("change", this.render, this);
			this.model.view = this;
		},

		render: function(){

			this.$el.removeClass().addClass(this.palette[ this.model.get("value") ]);
		},

		foobar: function(){

		}

	});
	
	return ThemeView;
});