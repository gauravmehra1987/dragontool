/**	@name			: App
*	@author			: 
*	@build			: 11.09.14
*	@description	: 
*					
*
*	@dependencies	: jquery, underscore
*
********************************************/

require(['jquery', 'underscore', 'backbone', 'MiniModel', 'MiniCollection', 'DataModel', 'DataCollection'], function ($, _, Backbone, Mini, MiniRange, Field, Fieldset) {
	'use strict';


	/*CLASS/MODULE VARS
	*************************/
	var _defaults = {
	}, _self;


	/*CLASS/MODULE CONSTRUCTOR
	*************************/
	var App = function(){

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

		var startApp = function(_data){

			// ==================================================================
			//MODEL > INVENTORY
			// ==================================================================
			var miniArr = [];
			$.each(_data.mini, function(i, item, list){

				miniArr.push( new Mini(this) );
			});

			//==========> COLLECTION
			var cInventory = new MiniRange( miniArr );


			// ==================================================================
			//MODEL > USER ENTRY
			// ==================================================================
			var $form = $("form"),
				$field = $form.find(".field");

			var mFields = {}, mFieldsArr = [];
			$field.each(function(i, el){

				//create a new model instance for each field mapped to the fields

				//TODO: IF WE HAVE A CONTROL GROUP THEN USER INPUT NEEDS TO BE REPRESENTED BY AN ARRAY OF VALUES

				//console.log(" :: ", $(this).find(".control :input, .control-group :input") );
				var key = $(this).find(".control :input, .control-group :input")[0].name;
				mFields[key] = new Field({
					"id": key
				});
				mFieldsArr.push( mFields[key] );
			});

			//==========> COLLECTION
			var cFieldset = new Fieldset(mFieldsArr); //new Fieldset(fields);

			// ==================================================================
			//VIEW > RESULTS
			// ==================================================================
			var Result = Backbone.View.extend({

				//1b
				el: "#loadbay",

				tmpl: _.template( $("#tmpl").html() ),

				events: {
				},

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

						console.log(" :RESULT: ", test);
					};//);

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

						console.log(minidata[random], " :MATCHED MINI: >>", minidata[random].get("model") );
						
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

			var vResult = new Result({
				model: mFields,
				collection: cFieldset
			});


			// ==================================================================
			//VIEW > THEME
			// ==================================================================
			var Theme = Backbone.View.extend({

				el: "#app-content",

				palette: ["", "cyan", "orange", "indigo", "white", "red", "blue", "green", "black", "yellow", "cream", "silver", "crimson", "peach", "brown", "grey"],

				events: {
				},

				initialize: function(){

					//this.render();

					this.model.on("change", this.render, this);
					this.model.view = this;
				},

				render: function(_model){

					this.$el.removeClass().addClass(this.palette[ this.model.get("value") ]);
				}
			});

			var vTheme = new Theme({
				model: mFields["colour"]
			});

			//EVENTS
			$form.on("change", function(event){

				var $target = $(event.target);
				
				if( $target.is(":checkbox") ){
					var value = $("input[name="+event.target.name+"]:checked").map(function(){
						return this.value;
					}).get();

					value = value.length ? value : 0;
				}else{
					var value = $target.val();
				}
				
				var bbmodel = mFields[event.target.name];
				bbmodel.set({
					"value": value
				})
			});
		};
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
	_.extend(App.prototype, {
	});

	return new App();
});