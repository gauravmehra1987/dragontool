function DataLogic() {
	var self = this;
	this.query = null;
	this.oldQuery = null;
	this.activeCar = null;
	this.repeatSearch = null;
	this.selection = ['capacity', 'luggage','convertible', 'high', 'awd', 'price', 'speed', 'economy', 'lifestyle' ];

	this.carCollectionController = function(response){

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

			shuffle: function(array) {
				console.log('shuffling');
				console.log(typeof array)
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
					self._collection.add(resultCollection);

					// Get the latest search results object
					// Convert to array
					var carList = Array.prototype.slice.call(self._collection.latest());

					self.activeCar = carList[0];

					// Filering complete render a singe car
					dashboardLogic.publishCar( carList[0] );

				}

				return Helpers.shallWeContinueTheLoop( resultCollection, order[(counter.echo()+1)]) ? continueLoop() : endLoopThenRender();
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
				Filter.haveWeReachedTheEnd(Filter.store, self.selection);
			}
		}

		// accepts an array of objects & property string to match
		// match: success add parent object to collection
		// if break criteria is not met, call recursively
		function filterObjectsWithProperty(dataSet, prop){
			// reset values for this loop
			Filter.store = [];
			Filter.reduced = 0;

			var opt = {
				awd: 1,
				high: 3,
				convertible: 2
			}

			console.log(prop)

			console.log('This is ' + prop + ': ' + self.query[prop]);

			// Main loop through dataset
			for (var i=0; i<dataSet.length; i++) {
				var record = dataSet[i];

				// requires dataset value attempt to match with queryValue
				// success adds this record to the collection 
				Filter.matchDatasetValueAgainstQueryValue(record[prop], self.query[prop], record);

				// if last entry in set trigger end condition
				// else continue looping trough the data
				if(i===dataSet.length-1) { Filter.endMasterLoop(dataSet, prop) }

			};

			console.log('end of ' + prop);

		};

		console.log(cars)

		filterObjectsWithProperty(cars, self.selection[(counter.echo())]);


	}

	this.sendCarToRender = function(){

	}

	this.cycleThroughCarList = function(){
		var carList = Array.prototype.slice.call(self._collection.latest());
		var index = carList.indexOf(self.activeCar);
		console.log(carList);
		console.log(self.activeCar)

		if ((++index) <= carList.length-1 ) {
			console.log('next is ' + (index));
			self.activeCar = carList[index];
			dashboardLogic.publishCar( carList[index] );
		} else {
			console.log('restart');
			self.activeCar = carList[0];
			dashboardLogic.publishCar( carList[0] );
		}

	}

	// Seperate library service 
	function CarsFactory() {
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
			},
			latest: function(){
				return collection.slice(-1).pop();
			}
		}
	}

	/**
     * Initialize
    */
	this.init = function() {
		console.log('DataLogic')

		this._collection = CarsFactory();

		console.log(this)

		$.subscribe('data-ready', function(data){
			console.log(e)
			console.log(data)
		})

	}

}

