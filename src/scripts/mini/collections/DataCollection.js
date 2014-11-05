/**	@name			: Collection
*	@author			: 
*	@build			: 28.07.14
*	@description	: 
*					
*
*	@dependencies	: jquery, requirejs, underscore, backbone
*
********************************************/

define(['jquery', 'underscore', 'backbone', 'DataModel'], function ($, _, Backbone, Data) {
	'use strict';

	var DataCollection = Backbone.Collection.extend({

		/*MODEL
		*************************/
		model: Data,

		/*METHODS
		*************************/
		foobar: function(){
		}

	});
	
	return DataCollection;
});