# MINI Combobulator

## Front-end tech stack
* [Nodejs](http://nodejs.org/)

The following also used to be involved, but might be out of date:

* [Yeoman (Yo/Bower/Grunt)](http://yeoman.io/)
* [SASS](http://sass-lang.com/) / [Compass](http://compass-style.org/)
* [Jade](http://jade-lang.com/)
* [Requirejs](http://requirejs.org/)
* [Backbonejs](http://backbonejs.org/)
* [Underscore](http://underscorejs.org/) / [Lo-dash](https://lodash.com/)
* [Modernizr](http://modernizr.com/)  

## Instructions
Install Node and any relevant dependencies, then, from the Node command-line:

	npm i
	npm install -g bower
	bower install
	npm install -g grunt-cli
	npm install grunt-webfont --save-dev

To build the FE files

	grunt generate --force
	grunt build --force