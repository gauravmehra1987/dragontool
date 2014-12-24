var Iris = Iris || {};

"use strict";

Iris.miniDashboard = {

	_query: null,
	_collection: null,
	_order: ['Capacity_scale', 'Luggage_scale', 'Options', 'Price_scale', 'Performance_scale', 'Economy_scale', 'Usage_scale' ],
	_jsonUrl: 'assets/data.json',

	init: function () {
		var self = this;
		this._collection = this.CarsFactory();
		this.pubsub();
		this.submitData();
		this.registerDataEvent();

		// dev options
		console.log(this);
		$.ajaxSetup({ cache:false });
	},

	getFormValues: function () {

		var self = this;
		var userQuery = {};

		$('.output-cont').remove();

		userQuery.Capacity_scale = $('#capacity').val();
		userQuery.Options = ( $("form input[name=options]:checkbox:checked").length >0 ) ? $("form input[name=options]:checkbox:checked").map(function(){return $(this).val();}).toArray() : "0";
		userQuery.Luggage_scale = $('#luggage').val();
		userQuery.Price_scale = $('#price_scale').val();
		userQuery.Performance_scale = $('#performance').val();
		userQuery.Economy_scale = $('#economy').val();
		userQuery.Usage_scale = $('#useofcar').val();
		userQuery.Eggs = $('#eggs').val();

		// store search
		this._query = userQuery;
		this.query(userQuery);

	},

	registerDataEvent: function(){
		var self = this;
		$.subscribe('data-ready', function(e, response){
			self.carCollectionController(response);
		});
	},

	getData: function(){
		$.getJSON(this._jsonUrl, function(data) {
			$.publish('data-ready', data);
		}).error(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText);
			console.log("failed");
		});
	},

	query: function(obj){
		var self = this;
		console.log(obj);
		this.getData();
	},

	submitData: function() {
		var self = this
		$("#submit").on('click', function(e) {
			e.preventDefault();
			self.clearProgress();
			self.getFormValues();
		});
	},

	renderResultsToView: function(){
		var template = Handlebars.compile( $('#template').html() );
		var copy = this._collection.all();
		$('#output').append( template( copy.slice(-1).pop()) );
	},

	renderProgressItem: function(value){
		panel = $('#panel');
		var html = $('<li/>', {'text': value});
		panel.find('ul').append(html);
	},

	renderFinalCount: function(count){
		panel = $('#panel');
		panel.find('h3 span').text(count);
	},

	clearProgress: function(){
		$('#panel ul li').remove();
	},

	carCollectionController: function(response){
		var self = this;

		var cars = response;
		var settings = {
			minNoResults: 2
		}
		var counter = {
			count:0,
			update: function(){
				this.count++;
			},
			echo: function(){
				return this.count;
			}
		}

		var Helpers = {

			convertValueToArray: function(value){
				if(typeof value === 'number') {
					value = value.toString();
				}
				if(typeof value === 'string' && value.length > 1) {
					value = value.split('');
				}
				return value;
			},

			matchSingleValueInArrary: function(array, userProp){
				return array.indexOf(userProp) != -1;
			},

			matchArrayValuesInArrary: function(array, userArray){
				var len=userArray.length;
				var count=0;

				if (typeof userArray !== 'object') {return false;}

				console.log('we got a array')
				console.log(array);
				console.log(userArray);

				// Match all userArray values to pass
				for (var i=0; i<len;i++) {
					if(!Helpers.matchSingleValueInArrary(array, userArray[i])) {
						return false;
					}
					count++;
					if (len===count){
						return true;
					}
				};
			},

			areValuesValid: function(dValue, qValue){
				return Helpers.isValueLegitimate(dValue) && Helpers.isValueLegitimate(qValue);
			},

			doValuesMatch: function(numberArray, qValue) {
				return Helpers.matchArrayValuesInArrary(numberArray, qValue) || Helpers.matchSingleValueInArrary(numberArray, qValue)
			},

			isValueLegitimate: function(value){
				return value !== 'n/a' && value !== 'TBC' && typeof value !== 'undefined' && value !== null && value != 0;
			},

			isBreakCriteraUnsatisfied: function(array, nextProperty){
				console.log(!!(array.length > settings.minNoResults && typeof nextProperty !== 'undefined'))
				return !!(array.length > settings.minNoResults && typeof nextProperty !== 'undefined');
			}
		}

		var Filter = {
			store : [],
			reduced : 0,

			outputDatasetMessages: function(queryProp, dataSet){
				console.log(this.reduced)
				if(this.reduced !== 0) {
					console.log('reduced by : ' + (dataSet.length - this.reduced));
					self.renderProgressItem(queryProp + ' reduces data by : ' + (dataSet.length - this.reduced));
				} else {
					console.log('not reduced')
					Filter.store = dataSet;
				}
				console.log(Filter.store);
			},

			// accepts database value, query value, record
			matchDatasetValueAgainstQueryValue: function(dValue, qValue, obj){

				// convert the dataset value into an array
				var numberArray = Helpers.convertValueToArray(dValue);

				var matchAccept = function(){
					Filter.addObjectToCollection(obj);
					return true;
				}

				var matchReject = function(){
					console.log('skipped value');
				}

				return !!Helpers.areValuesValid(dValue, qValue) && ( Helpers.doValuesMatch(numberArray, qValue) ? matchAccept() : matchReject() );
			},

			// UNFINISHED
			killerMatch: function(object, thing, more){

				var qProp = this.toString();

				for (var prop in object) {
					console.log(prop);
					console.log(object)

					if(Helpers.isValueLegitimate(object[qProp])){
						console.log('yup')
						return true;
					}
				}


				// convert the dataset value into an array
				//	var numberArray = Helpers.convertValueToArray(dValue);

				var matchAccept = function(){
					Filter.addObjectToCollection(obj);
					return true;
				}

				var matchReject = function(){
					console.log('skipped value');
				}

				//return !!Helpers.areValuesValid(dValue, qValue) && ( Helpers.doValuesMatch(numberArray, qValue) ? matchAccept() : matchReject() );
			},

			addObjectToCollection: function(obj){
				console.log('added')
				Filter.store.push(obj);
				Filter.reduced++;
			},

			hasUserSelectedEasterEgg: function(query){
				var basket = {
					'Performance_scale' : 5,
					'Price_scale' : 5
				}
				// does the query prop/value match one in the basket
				for (var prop in query) {
					if(Helpers.isValueLegitimate(query[prop]) && query[prop]==basket[prop]){
						var obj = {}
						obj[prop] = query[prop];
						return  obj;
					}
				}
			},

			matchSingleRecord: function(object){
				var record = this;
				for (var prop in object) {
					if(Helpers.isValueLegitimate(object[prop]) && object[prop]==record[prop]){
						return true;
					}
				}
			},

			haveWeReachedTheEnd: function(array, order) {

				var continueLoop = function(){
					counter.update();
					console.log('Dataset still large so next is > ' + order[counter.echo()]);
					filterObjectsWithProperty(array, order[counter.echo()]);
				}

				var endLoop = function(){
					console.log('Finished: Rendering results')
					self._collection.add(array);
					self.renderResultsToView();
					self.renderFinalCount(array.length);
				}

				return Helpers.isBreakCriteraUnsatisfied( array, order[(counter.echo()+1)]) ? continueLoop() : endLoop();
			}
		}

		console.log(cars)
		console.log(cars.Models.length);

		// takes an array of objects & property to match
		// on match success add parent object to collection
		// if break criteria is not met, call recursively
		function filterObjectsWithProperty(dataSet, prop){
			// reset values for this loop
			Filter.store = [];
			Filter.reduced = 0;
			Filter.easterEgg = Filter.hasUserSelectedEasterEgg(self._query);

			console.log('This is ' + prop + ': ' + self._query[prop]);

			var continueLoop = function(record){
				// take dataset value attempt to match with queryValue
				// success adds this record to the collection 
				Filter.matchDatasetValueAgainstQueryValue(record[prop], self._query[prop], record);
			}

			var endLoop = function(){
				console.log('end')
				// output console message
				Filter.outputDatasetMessages(prop, dataSet);

				// if endpoint not reached recurse
				// otherwise exit
				Filter.haveWeReachedTheEnd(Filter.store, self._order);
			}

			var renderSingleRecordThenExit = function(record){
				Filter.addObjectToCollection(record[0]);
				console.log('Finished: Rendering results');
				self._collection.add(Filter.store);
				self.renderResultsToView();
				self.renderFinalCount(Filter.store.length);
			}

			if (Filter.easterEgg) {
				var single = dataSet.filter(Filter.matchSingleRecord, Filter.easterEgg);
				renderSingleRecordThenExit(single);
			} else {

				//Main loop through dataset
				for (var i=0; i<dataSet.length; i++) {
					var record = dataSet[i];

					// if last entry in set
					(i===dataSet.length-1) ? endLoop() : continueLoop(record);

				};

				console.log('end of ' + prop);
			}

		};

		filterObjectsWithProperty(cars.Models, self._order[(counter.echo())]);

	},

	CarsFactory: function() {
		var collection = [];

		return {
			size: function() {
				return collection.length;
			},
			add: function(item){
				collection.push(item);
			},
			all: function(){
				return collection;
			}
		}
	},

	pubsub: function() {

		var o = $({});

		$.subscribe = function() {
			o.on.apply(o, arguments);
		};

		$.unsubscribe = function() {
			o.off.apply(o, arguments);
		};

		$.publish = function() {
			o.trigger.apply(o, arguments);
		};

	}

};
