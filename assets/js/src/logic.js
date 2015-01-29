var Mini = Mini || {};

"use strict";

var path = ( location.href.indexOf( 'localhost' ) >= 0 ) ? system_paths.net : system_paths.php;

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

Mini.DOMCtrl = {

	_apiData: null,
	_$page: $(document),

	init: function () {
		var self = this;
		this.pubsub();

		// show the default panel
		this.panelControl('default');

		this.registerDataEvents();
		this.getData();

		// dev options
		//$.ajaxSetup({ cache:false });

	},

	// Set up listeners for async functions
	registerDataEvents: function(){
		var self = this;

		$.subscribe('data-ready', function(e, response){

			self._apiData = response;

			$.subscribe('combobulate-raw', function(e, response){
				console.log(response);
				var query = self.combobulateToQuery(response);
				Mini.UILogic._query = query;
				console.log(query);

				// trigger the search
				Mini.UILogic.carCollectionController(self._apiData);

			});

		});

	},

	panelControl: function(panel){
		this._$page.find('[data-panel-name]').removeClass( 'panel-active' );
		this._$page.find('[data-panel-name="' + panel + '"]').addClass( 'panel-active' );
	},

	// Contact the API and collect the data
	// Publish the results
	getData: function(){
		$.getJSON(Mini.UILogic._jsonUrl, function(response) {
			var obj = {};
			obj.Models = response;
			$.publish('data-ready', obj);
		}).error(function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR.responseText);
			console.log("failed");
		});
	},

	// Convert the raw combobulator data to search query format 
	combobulateToQuery: function(data){

		function mpg(mpg){
			var scale;
			if (mpg < 46) { scale = 1 } else
			if (mpg < 61) { scale = 2 } else
			if (mpg < 70) { scale = 3 } else
			if (mpg > 69) { scale = 4 } else {
				scale = 0;
			}
			return scale;
		};

		function price(pounds){
			console.log(pounds)
			var scale;
			if (pounds == 0) { scale = 0 } else
			if (pounds < 66) { scale = 6 } else
			if (pounds < 216) { scale = 1 } else
			if (pounds < 247) { scale = 2 } else
			if (pounds < 270) { scale = 3 } else
			if (pounds < 295) { scale = 4 } else
			if (pounds >= 295) { scale = 5 } else {
				scale = 0;
			}
			return scale;
		};

		function luggage(string){
			var options = {
				"minimalist" : 1,
				"light-packer": 2,
				"lugger" : 3,
				"big-loader" : 4
			}
			var output = options[string];
			if (typeof output === 'undefined') {
				output = 0;
			}
			return output;
		};

		function lifestyle(string){
			var options = {
				"urbanite" : 1,
				"beach-bum": 2,
				"mountain-ranger" : 3,
				"junglist" : 4
			}
			var output = options[string];
			if (typeof output === 'undefined') {
				output = 0;
			}
			return output;
		};

		// Build the easter egg array
		function easterEggs(arr1, arr2){

			// Possible values
			// ["Dog","Alien","Cat","teleportation"];

			var o = {};

			// Set the value of teleportation
			o.teleportation = arr2.indexOf("4") != -1;

			for (var i = 0; i < arr1.length; i++) {
				var string = arr1[i];
				if (typeof string === 'string' && string === 'Dog' || string === 'Alien' || string === 'Cat'){
					o[string] = 1;
				}
			}
			return o;
		}

		// Remove teleportation from the options array
		function carOptions(arr){
			function pin() {
				arr.pop()
				return arr;
			}
			return (arr.indexOf("4") != -1) ? pin() : arr;
		}

		function capacity(arr){

			// Possible values
			//["Woman", "Man", "Girl", "Boy", "Infant", "Dog","alien", "cat"]

			var o = {}
			o.people = 0;
			o.children = 0;
			o.infant = 0;
			var output;

			function seatArrayToObject(arr) {

				for (var i = 0; i < arr.length; i++) {
					var string = arr[i];
					//console.log(string);

					if (typeof string === 'string' && string == 'Man' || string == 'Woman'){
						o.people++;
					} else if (typeof string === 'string' && string == 'Girl' || string == 'Boy'){
						o.children++;
					} else if (typeof string === 'string' && string === 'Infant'){
						o.infant++;
					}

				};

				return o;

			};

			function peopleObjectToScale(o){

				o.family = o.people + o.children;

				//console.log(o);

				if (o.family <= 2 && o.infant === 0) {
					//console.log('o.family <= 2 && o.infant === 0')
					return 1;
				}

				if (o.people === 2 && (0 < o.children && o.children <= 2) && o.infant === 0) {
					//console.log('o.people === 2 && (0 < o.children && o.children <= 2) && o.infant === 0')
					return 3;
				}
				if (o.people === 1 && (0 < o.children && o.children <= 3) && o.infant === 0) {
					//console.log('o.people === 1 && (0 < o.children && o.children <= 3) && o.infant === 0')
					return 3;
				}

				if (o.family <= 4 && o.infant === 0){
					//console.log('o.family <= 4 && o.infant === 0')
					return 2;
				}
				if (o.family <= 3 && o.infant === 1){
					//console.log('o.family <= 3 && o.infant === 1')
					return 2;
				}

				if (o.family === 5) {
					//console.log('o.family === 5')
					return 4;
				}

				if (o.family === 4 && o.infant === 1) {
					//console.log('o.family === 4 && o.infant === 1')
					return 4;
				}

				if (o.family === 3 && o.infant === 2) {
					//console.log('o.family === 3 && o.infant === 2')
					return 4;
				}

			}

			return peopleObjectToScale( seatArrayToObject(arr) );

		};

		var query = {};
		query.CapacityScale = capacity(data.seats);
		query.EconomyScale = mpg(data.mpg);
		query.Eggs = easterEggs(data.seats, data.options);
		query.LuggageScale = luggage(data.luggage);
		query.Options = carOptions( data.options );
		query.PerformanceScale = data.speed;
		query.PriceScale = price(data.price);
		query.UsageScale = lifestyle(data.lifestyle);
		return query;
	},

	// Accepts the filtered car collection
	// Randomises the collection
	// Renders to the view
	resultsViewCtrl: function(resultsCollection){
		var self = this;

		var Helpers = {

			shuffle: function(array) {
				var m = array.length, t, i;
				// While there remain elements to shuffle…
				while (m) {
					// Pick a remaining element…
					i = Math.floor(Math.random() * m--);
					// And swap it with the current element.
					t = array[m];
					array[m] = array[i];
					array[i] = t;
				}
				return array;
			},

			isValueLegitimate: function(value){
				return value !== 'n/a' && typeof value !== 'undefined' && value !== null && value != 0;
			},

			determineColour: function(string){

				return (Helpers.isValueLegitimate(string)) ? carColors[string] : carColors[ 'Chili red' ];
			}

		};

		var Render = {

			finalCount: function(count){
				var panel = $('#tools');
				panel.find('h3').text('Debug tools - showing: ' + count);
			},

			carToView: function(car){

				var imageUrl = path.assets;
				var resultsUrl = path.results;
				var colour = Helpers.determineColour(car.Colour);
				var $customerId = self._$page.find('#uid').attr('value');
				var $panel = self._$page.find('.panel[data-panel-name=results]');

				function resultsPageUrl(cId, url, mCode){
					return (Helpers.isValueLegitimate(cId)) ? url + 'c=' + cId + '&m=' + mCode : url + 'm=' + mCode;
				}

				console.warn( $panel );

				$panel.find('[data-model-name]').html(car.Model);
				$panel.find('[data-model-code]').html(car.ModelCode);
				$panel.find('[data-model-price]').html(car.Cost);
				
				$panel.find('[data-model-image]').hide().attr( { src: imageUrl + car.ModelCode + '.jpg' } ).fadeIn( 200 );

				$panel.find('[data-terms]').html(car.TermsConditions);
				$panel.find('[data-results-link]').attr({href: resultsPageUrl($customerId, resultsUrl, car.ModelCode)});

				// Trigger the colour change function
				$.publish('colour-change', colour);

			}
		}

		// by default we store each search as a new array
		// latest is last array
		var resultToShow = resultsCollection.slice(-1).pop();

		// debug only - show the number of cars returned
		Render.finalCount(resultToShow.length);

		// More than one car we randomise
		if(resultToShow.length >=2) {
			// randomize the result
			resultToShow = Helpers.shuffle(resultToShow);
		}

		// show the results panel
		this.panelControl('results');

		Render.carToView(resultToShow[0]);

	},

	// jQuery Tiny Pub/Sub
	pubsub: function() {

		

	}

};

Mini.UILogic = {
	_query: null,
	_collection: null,
	_order: ['CapacityScale', 'LuggageScale', 'Options', 'PriceScale', 'PerformanceScale', 'EconomyScale', 'UsageScale' ],
	_jsonUrl: path.api,

	init: function(){
		this._collection = this.CarsFactory();
	},

	carCollectionController: function(response){
		var self = this;
		var cars = response;
		var settings = {
			minNoResults: 2,
			easterEggs : {
				'PerformanceScale' : 5,
				'PriceScale' : 6
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

				// console.log('we got an array')
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

			shallWeContinueTheLoop: function(array, nextProperty){
				// console.log(array.length)
				// console.log(settings.minNoResults)
				// console.log(array.length > settings.minNoResults)
				// console.log(nextProperty)
				// console.log(typeof nextProperty !== 'undefined')
				// console.log(!!(array.length > settings.minNoResults && typeof nextProperty !== 'undefined'))
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
				} else {
					console.log('not reduced')
				}
				console.log(Filter.store);
			},

			// accepts database value, query value, record
			// check: dataset & query value contains valid content
			// match: do any values in query match the values in the data
			matchDatasetValueAgainstQueryValue: function(dValue, qValue, obj){

				// convert the dataset value into an array
				var numberArray = Helpers.convertValueToArray(dValue);

				// ensure the query number is a string for matching
				qValue = qValue.toString();

				var matchAccept = function(){
					Filter.addObjectToCollection(obj);
					return true;
				}

				var matchReject = function(){
					//console.log('skipped value');
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
				//console.log('added')
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

				var endLoopThenRender = function(){
					// console.log('endLoopThenRender')
					// console.log('Finished: Rendering results!')
					self._collection.add(resultCollection);

					// Filering complete return result to view controller
					Mini.DOMCtrl.resultsViewCtrl( Mini.UILogic._collection.all() );
				}

				return Helpers.shallWeContinueTheLoop( resultCollection, order[(counter.echo()+1)]) ? continueLoop() : endLoopThenRender();
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

				if(this.reduced === 0) {
					Filter.store = dataSet;
				}

				// if endpoint not reached recurse
				// otherwise exit
				Filter.haveWeReachedTheEnd(Filter.store, self._order);
			},

			renderSingleRecordThenExit: function(record){
				//console.log('renderSingleRecordThenExit')
				//console.log('Finished: Rendering results');
				console.log(record);
				Filter.addObjectToCollection(record[0]);
				self._collection.add(Filter.store);

				// Filering complete return result to view controller
				Mini.DOMCtrl.resultsViewCtrl( Mini.UILogic._collection.all() );
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

				Filter.continueMasterLoop(record, prop)

				// if last entry in set trigger end condition
				// else continue looping trough the data
				if(i===dataSet.length-1) { Filter.endMasterLoop(dataSet, prop) }

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

( function( Mini ) {

// need a better solution for triggering JS on correct page

if ( $('#dash').length > 0 ){
	Mini.DOMCtrl.init()
	Mini.UILogic.init()
}

	// Write your stuff here. Before doing so, have a look at config.js.

} ( Mini ) );