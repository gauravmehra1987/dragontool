/**	@name			: ResultsView
*	@author			: 
*	@build			: 28.07.14
*	@description	: 
*					
*
*	@dependencies	: jquery, underscore(lodash), requirejs, backbone
*
********************************************/

define(['jquery', 'underscore', 'backbone', 'DataCollection'], function ($, _, View, Data) {
	'use strict';

	var ResultsView = View.Model.extend({

		el: "#loadbay",

		tmpl: _.template( $("#tmpl").html() ),

		collection: Data,

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

			this.collection.on("change", this.patternMatching, this);
			this.collection.on("change:colour", this.changeColour, this);
			this.collection.view = this;
		},

		// ==================================================================
		//PATTERN MATCHING
		// ==================================================================
		//DEVNOTE: could be moved to a private method within the Collection object
		patternMatching: function(_model, x, y){

			var userdata = _model.toJSON();
			var minidata;


			var collection = this.collection;
			var test = cInventory.clone();

			//INPUTS
			for(var j=0, input; j<this.collection.size()-1;j++ ){
				input = this.collection.at(j);

				//CARS
				var test2 = [];
				var test3 = test.map(function(miniModel, i , _collection){

					//DEVNOTE: 1. validation check that params/attribute exists on inventory data, otherwise discard/bail
					var category = miniModel.get(input.get("id")) || false; //use promise.fail()?

					//DEVNOTE: 2. sanitize data format of mini inventory so that everything is in an array
					var minis = _.isArray( category ) ? category : _.chain( _.toArray( category.toString().match(/\d+/g) ) ).map(function(i){return Number(i) }).value();

					//DEVNOTE: 3. Filter function
					if( _.contains( minis, parseInt(input.get("value"), 10)) ){

						return miniModel;
					}else{
					}

				});
				var test3 = _.compact(test3);

				if( test3.length ){
					var test4 = test3;
					test.reset(test3);

				}else{
				}

			};

			var minidata = test.map(function(miniModel, i , _collection){

				return miniModel;
			});

			minidata = _.chain(minidata).compact().value();

			//make sure we have a mini to show
			if( minidata.length ){

				//DEVNOTE: 4. If more than one result randomize output
				//IF there is no new suggestion/ie. no filter match then do not randomize again
				var min = 0, max = minidata.length-1;
				var random = Math.floor(Math.random() * (max - min + 1)) + min;
				
				this.render( minidata[random].toJSON() );
			}else{
			//unsuccessfull match - we need to rollback

			}
		},

		render: function(_mini){

			if( _.isUndefined(_mini) ){
			};

			var html = this.tmpl(_mini);
			this.$el.html(html);

			return this;
		},

		changeEventHandler: function(){
		}
	});

	return ResultsView;
});