var Iris = Iris || {};

// TODO:
// This is the prototype version for logic testing.
// A number of functions here concerned with DOM manipulation and templating will not be necessary in the final product
// There needs to be an interface built to accept the raw options chosen in the form and convert the data into a format acceptable to this service

"use strict";

// indexof polyfill for <ie9
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt /*, from*/) {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++) {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

Iris.testPage = {

	init: function () {
		var self = this;
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
		Iris.UILogic._query = userQuery;
		this.query(userQuery);

	},

	registerDataEvent: function(){
		var self = this;
		$.subscribe('data-ready', function(e, response){
			Iris.UILogic.carCollectionController(response);
		});
	},

	getData: function(){
		$.getJSON(Iris.UILogic._jsonUrl, function(data) {
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
		var results = Iris.UILogic._collection.all();
		$('#output').append( template( results.slice(-1).pop()) );
		$('#extras').html(Iris.UILogic._query.Eggs);
	},

	renderProgressItem: function(value){
		var panel = $('#panel');
		var html = $('<li/>', {'text': value});
		panel.find('ul').append(html);
	},

	renderFinalCount: function(count){
		var panel = $('#panel');
		panel.find('h3 span').text(count);
	},

	clearProgress: function(){
		$('#panel ul li').remove();
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

Iris.UILogic = {
	_query: null,
	_collection: null,
	_order: ['Capacity_scale', 'Luggage_scale', 'Options', 'Price_scale', 'Performance_scale', 'Economy_scale', 'Usage_scale' ],
	_jsonUrl: 'assets/data.v2.json',

	init: function(){
		this._collection = this.CarsFactory();
	},

	carCollectionController: function(response){
		var self = this;
		var cars = response;
		var settings = {
			minNoResults: 2,
			easterEggs : {
				'Performance_scale' : 5,
				'Price_scale' : 5
			}
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

				// console.log('we got a array')
				// console.log(array);
				// console.log(userArray);

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
				// attempt to match array values to target
				// else match single value to target
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
					Iris.testPage.renderProgressItem(queryProp + ' reduces data by : ' + (dataSet.length - this.reduced));
				} else {
					console.log('not reduced')
					Filter.store = dataSet;
				}
				console.log(Filter.store);
			},

			// accepts database value, query value, record
			// check: dataset & query value contains valid content
			// match: do any values in query match the values in the data
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

			matchSingleRecord: function(object){
				var record = this;
				for (var prop in object) {
					if(Helpers.isValueLegitimate(object[prop]) && object[prop]==record[prop]){
						return true;
					}
				}
			},

			addObjectToCollection: function(obj){
				console.log('added')
				Filter.store.push(obj);
				Filter.reduced++;
			},

			// requires array of objects, search order array
			// check: are the conditions right to break out of loop
			// recurse with next filter property or render final results
			haveWeReachedTheEnd: function(resultCollection, order) {

				var continueLoop = function(){
					counter.update();
					console.log('Dataset still large so next is > ' + order[counter.echo()]);
					filterObjectsWithProperty(resultCollection, order[counter.echo()]);
				}

				var endLoop = function(){
					console.log('Finished: Rendering results')
					self._collection.add(resultCollection);
					Iris.testPage.renderResultsToView();
					Iris.testPage.renderFinalCount(resultCollection.length);
				}

				return Helpers.isBreakCriteraUnsatisfied( resultCollection, order[(counter.echo()+1)]) ? continueLoop() : endLoop();
			},

			// requires dataset value attempt to match with queryValue
			// success adds this record to the collection 
			continueMasterLoop: function(record, prop){
				Filter.matchDatasetValueAgainstQueryValue(record[prop], self._query[prop], record);
			},

			endMasterLoop: function(dataSet, prop){
				console.log('end')
				// output console message
				Filter.outputDatasetMessages(prop, dataSet);

				// if endpoint not reached recurse
				// otherwise exit
				Filter.haveWeReachedTheEnd(Filter.store, self._order);
			},

			renderSingleRecordThenExit: function(record){
				console.log('Finished: Rendering results');
				Filter.addObjectToCollection(record[0]);
				self._collection.add(Filter.store);
				Iris.testPage.renderResultsToView();
				Iris.testPage.renderFinalCount(Filter.store.length);
			}
		}

		// accepts an array of objects & property string to match
		// match: success add parent object to collection
		// if break criteria is not met, call recursively
		function filterObjectsWithProperty(dataSet, prop){
			// reset values for this loop
			Filter.store = [];
			Filter.reduced = 0;

			console.log('This is ' + prop + ': ' + self._query[prop]);

			// Main loop through dataset
			for (var i=0; i<dataSet.length; i++) {
				var record = dataSet[i];

				// if last entry in set trigger end condition
				// else continue looping trough the data
				(i===dataSet.length-1) ? Filter.endMasterLoop(dataSet, prop) : Filter.continueMasterLoop(record, prop);

			};

			console.log('end of ' + prop);

		};

		// check: does query value match easter egg criteria
		function hasUserSelectedEasterEgg(query){
			// does the query prop/value match one in the basket
			for (var prop in query) {
				if(Helpers.isValueLegitimate(query[prop]) && query[prop]==settings.easterEggs[prop]){
					var obj = {}
					obj[prop] = query[prop];
					return  obj;
				}
			}
		};

		console.log(cars)
		console.log(cars.Models.length);

		var easterEgg = hasUserSelectedEasterEgg(self._query);

		// if the user has chosen an easter egg option render single record
		// otherwise begin the filter using the first property in the order collection
		if (easterEgg) {
			var record = cars.Models.filter(Filter.matchSingleRecord, easterEgg);
			Filter.renderSingleRecordThenExit(record);
		} else {
			filterObjectsWithProperty(cars.Models, self._order[(counter.echo())]);
		}

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
	}

};
