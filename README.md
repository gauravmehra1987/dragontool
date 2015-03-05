# Mini Combobulator

<small>&copy; 2014-2015 by [John Przeslakowski](http://goodpixels.co.uk)</small>

A car picker tool for Mini.

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Grunt tasks](#grunt-tasks)
	1. OS X workflow
	2. Windows workflow
	3. Rendering Razor views and copying assets
4. [.NET integration](#net-integration)
5. [Addendum](#addendum)

> ##### Disclaimer
> This document assumes you're using a Mac. If you're on Windows, you will not be able to generate web fonts. For production, always build the project on an Apple machine.

## Requirements

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [FontForge](http://fontforge.github.io/en-US/) via [Homebrew](http://brew.sh/)

1. First, install *Node.js*.
2. Install *Grunt*:

	```
	npm install -g grunt-cli
	```

3. Install *Bower*:

	```
	npm install -g bower
	```

4. Install *Homebrew*.

	```
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	```

5. Install *FontForge* and *ttfautohint*.

	```
	brew install ttfautohint fontforge --with-python
	```

> ##### Note
> Steps 4 and 5 won't work if you're on a Windows machine. [Click here](#addendum) to read on how to compile the project in Windows.

## Installation

Once you've successfully installed all the required tools, it's time to install project dependencies.

1. `cd` into the project folder and install *Node.js* packages:

	```
	npm i
	```

2. Then install *Bower* packages:

	```
	bower install
	```

And you're done!

## Grunt tasks

This website makes extensive used of the *Grunt.js* build tool. There's a bunch of things happening in the background, but all you need to know, are just a few tasks:

Task			| Description
--------------------| -----------
`squeaky-clean` | this task removes all generated content such as `*.css` and minified `*.js` files, .NET views and temporary images. You **must** run this command before committing any changes to the repo.
`tidy` 			| same as above except it does not remove icon files - as they can't be generated on a Windows machine.
`generate` 		| generates web fonts, PNG fallbacks for SVGs, image sprites, icons, etc. This task references `tidy` at the very beginning, so running it will remove any generated content along with the .NET views.
`windows` 		| same as above but does not generate icons.
`templates` 	| generates .NET views and copies them into the `dotnet/` folder.
`dotnet` 		| same as above but also copies the assets over to the `dotnet/` folder.
`compile` 		| compiles JavaScript and LESS files without minification.
`build`			| compiles, then minifies JavaScript and LESS and runs `grunt dotnet` afterwards.

Typing `grunt` will run `grunt compile` and then `grunt watch`.

### OS X workflow

Running the following tasks will compile the front-end locally:

`grunt squeaky-clean`
`grunt generate`
`grunt` to compile & watch or just `grunt compile`

### Windows workflow

`grunt tidy`
`grunt windows`
`grunt` to compile & watch or just `grunt compile`

### Rendering Razor views and copying assets

Follow the Windows workflow and then type:

`grunt dotnet`

## .NET integration

To keep the front-end and the back-end separate, we're using `grunt-processhtml` to perform *search and replace* in the `*.php` files in order to convert them into *Razor views* which can then be copied into the `dotnet/` directory.

The basic idea is that we write two instances of the code inside the `*.php` file, one for the PHP version, and one for the .NET, like this:

```
<div class="form-control">

	// Razor version
	@Html.TextBoxFor( model => model.FirstName, new { id="field-name", name="name", placeholder="First name" } )​

	// Static HTML / PHP version
	<input type="text" id="field-name" name="name" placeholder="First name" />

</div>
```

For obvious reasons, PHP won't render *Razor* syntax and .NET won't render any PHP syntax, for example `<?php require( 'header.php' ); ?>`, therefore we must somehow get rid of one of them depending on the version we want to deploy. We can easily achieve this by using the `grunt-processhtml` plugin, which can manipulate blocks of HTML.

We will use it to make string replacements and to remove certain blocks of HTML.

Have a look at an upgraded version of the code we've seen before:

```
<div class="form-control">

	// Razor version
	<!-- build:template
	<%= form.field.name %>
	/build -->

	// Static HTML / PHP version
	<!-- build:remove --><input type="text" id="field-name" name="name" placeholder="First name" /><!-- /build -->

</div>
```

`grunt-processhtml` can process *lodash*-style [templates](https://lodash.com/docs/#template) using any data passed to it's `options` object, so we can easily define replacements for those template tags in `Gruntfile.js`, like this:

```
processhtml: {
		
	options: {
	
		data: {

			global:			grunt.file.readJSON( razor + '/global.json' ),
			form:			grunt.file.readJSON( razor + '/form.json' ),
			details:		grunt.file.readJSON( razor + '/results-details.json' ),
			results:		grunt.file.readJSON( razor + '/results.json' ),
			home:			grunt.file.readJSON( razor + '/home.json' ),
			dashboard:		grunt.file.readJSON( razor + '/dashboard.json' ),

		}

	}

}
```

Essentially, we're simply storing *Razor* syntax inside `*.json` files, so they can be processed by `grunt-processhtml`.

Here's a example of the `razor_src/dashboard.json` file:

```
{
	
	"bums":				"@Html.Partial(\"_ControlBums\")",
	"mpg":				"@Html.Partial(\"_ControlMpg\")",
	"lifestyle":		"@Html.Partial(\"_ControlLifestyle\")",
	"luggage":			"@Html.Partial(\"_ControlLuggage\")",
	"options":			"@Html.Partial(\"_ControlOptions\")",
	"speed":			"@Html.Partial(\"_ControlSpeed\")",
	"price":			"@Html.Partial(\"_ControlPrice\")",
	"start":			"@Html.Partial(\"_ControlStart\")"

}
``` 

Because it's defined in `options.data` as `dashboard`, we can acces it's JSON object by simply calling `<%= dashboard.bums %>` in the template.

The last thing we need to do, is to remove the static HTML / PHP code, by wrapping it in `<!-- build:remove -->` tags.

> ##### <span style="color: firebrick">Warning</span>
> **Never** make direct changes to any files in the `dotnet/Combobulator/Views/` as they will be removed each time `grunt generate` is run. Moreover, making changes inside that folder will make it difficult to keep both the front-end and the back-end in sync. Feel free to write and test *Razor* syntax in those files, but once you're finished, copy them over to a corresponding `*.json` file before committing your changes.

## Addendum

##### grunt-processhtml problems

`grunt-processhtml` is known to cause some problems when using the latest version - in particular it doesn't remove blocks of code between `<!-- build:remove -->` tags.

Installing `0.3.6` solves this issue:

```
npm install grunt-processhtml@0.3.6 -save
```

##### Windows problems

If you happen to run `grunt squeaky-clean` on a Windows machine, you will need to generate icons in order to compile the app.

To do so, **change temporarily** the font-hinting engine used by `grunt-webfont`.

You can do it by changing `settings.iconEngine` to `node` in `combobulator.json`.

> ##### <span style="color: firebrick">Warning</span>
> **Always** remember to revert back to `fontforge` in production.
> **Never** commit `settings.iconEngine` set to `node`. It will fail to generate proper fonts.