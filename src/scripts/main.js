/** @name           : main
*   @author         : 
*   @project        : MINI Matchmaker
*   @build          : 27.10.14
*   @description    :
*                   
*   @dependencies   : jquery, underscore(lodash), requirejs, backbone
*
********************************************/

require.config({
	
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/lodash/dist/lodash',
		App: 'mini/App',

		MiniModel: 'mini/models/MiniModel',
		DataModel: 'mini/models/DataModel',

		MiniCollection: 'mini/collections/MiniCollection',
		DataCollection: 'mini/collections/DataCollection',

		//ResultsView: 'mini/views/ResultsView',
		//ThemeView: 'mini/views/ThemeView'
	},

	//DEVNOTE: for non-AMD components/scripts
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		}
	}
});

require(['backbone', 'App'], function (Backbone){
	'use strict';

	Backbone.history.start();

	return '\'App started!';
});
