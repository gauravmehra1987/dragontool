/**	@name			: MiniCollection
*	@author			: 
*	@build			: 28.07.14
*	@description	: 
*					
*
*	@dependencies	: jquery, requirejs, underscore, backbone
*
********************************************/

//'mini/models/MiniModel'
define(['jquery', 'underscore', 'backbone', 'MiniModel'], function ($, _, Backbone, Mini) {
	'use strict';

	var MiniCollection = Backbone.Collection.extend({

		/*MODEL
		*************************/
		model: Mini,

		/*METHODS
		*************************/
		foobar: function(){

			//return;
		}
	});

	return MiniCollection;
});