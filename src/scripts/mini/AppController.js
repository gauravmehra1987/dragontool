/**	@name			: AppController
*	@author			: 
*	@build			: 11.09.14
*	@description	: 
*					
*
*	@dependencies	: jquery, underscore
*
********************************************/

require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	'use strict';


	/*CLASS/MODULE VARS
	*************************/
	var _defaults = {
	}, _self;


	/*CLASS/MODULE CONSTRUCTOR
	*************************/
	var AppController = function(){

		_self = this;
		this.$deferred = [];

		var	$document = this.$document = $(document),
			$body = this.$body = $("body"),
			$form = this.$form = $("form");

		/* App Init
		*************************/
		//GET > INVENTORY ================================================
		var url = "content/json/inventory_simplified.json";
		var promise = $.getJSON(url);
		var data;

		promise.progress(function(){
			console.log(" :LOADING: ");
		}).done(function(_data){

			startApp(_data);

		}).fail(function(){
			console.log("FAIL WHALE");
		});


		/* Bind events
		*************************/
		registerEvents();
	};

	/*CLASS/MODULE METHODS - PRIVATE
	*************************/
	var foobar = function(){
	};

	/* Event Handlers
	*************************/
	var fooChangeHandler = function(event){
	};


	/*CLASS/MODULE METHODS - PUBLIC
	*************************/
	_.extend(AppController.prototype, {
	});

	return new AppController();
});