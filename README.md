# Mini Combobulator

A car picker tool for Mini.

1. [Requirements](#requirements)
2. [Front End Project overview](#project-overview)
	1. [Scripts / libraries used in the project](#scripts-libraries-used-in-the-project)
	2. [Directory structure](#directory-structure)	
3. [Installation](#installation)
4. Grunt
	1. [Grunt tasks](#grunt-tasks)
	2. [OS X workflow](#os-x-workflow)
	3. [Windows workflow](#windows-workflow)
	4. [Rendering Razor views and copying assets](#rendering-razor-views-and-copying-assets)
5. [.NET integration](#net-integration)
6. [CSV data import](#csv-data-import)
6. [Troubleshooting](#troubleshooting)

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

## Front End Project overview

### Scripts / libraries used in the project

- [LESS Hat](http://lesshat.madebysource.com/)
- [jQuery](https://jquery.com/)
- [jQuery Validation](http://jqueryvalidation.org/)
- [Underscore](http://underscorejs.org/)
- [GreenSock Draggable](https://greensock.com/draggable) (used to create touch-friendly dials)
- [SVGInjector](https://github.com/iconic/SVGInjector)
- [Mustache](http://mustache.github.io/)
- [TaffyDB](http://www.taffydb.com/) (used to query JSON data in a SQL-like fashion)
- [store.js](https://github.com/marcuswestin/store.js/) (used to persist user selection across the screens)

### Directory structure

An asterisk denotes a directory created during the build process. Please see the table below to find out more information about some of the directories.

```
assets/
	cars/
	css/*
	fonts/
		icons/*
		mini/
	icons/
	img/
		sprites/*
	js/
		htc/*
		src/
		tpl/
	less/
		dials/
	sprites/
		svg/
bower_components/
dotnet/
grunt/
json/
landing-page/
node_modules/
prototype/
	assets/
razor_src/
razor_templates/*
```

Directory name  		| Information
------------------------|------------
`assets/cars/`			| Put all car images in here. Each car has a two-letter, two-digit code assigned to it, eg. *XM52*. The app will look for a matching image in this folder.
`assets/fonts/`			| This folder hosts all web-fonts. All generted fonts will be put in the root directory of the folder, except for the *icon* font, which has its own sub-directory.
`assets/icons/`			| All `*.svg` files in this folder will be converted into a web-font; original filenames will be used as LESS mixin name, for example `facebook.svg` will generate a mixin called `.icon-facebok`.
`assets/img/`			| Contains all images used in the project. Bear in mind, that the images are meant to be places in the *root* directory, and every sub-folder will be deleted when `grunt clean` is being run.
`assets/js/src/`		| Place all your custom JavaScript here.
`assets/js/tpl/`		| Stores `*.mustache` templates.
`assets/less/`			| LESS source-files, organised by function they serve.
`assets/sprites/svg/`	| SVG images used to generate CSS sprites for the dials. Those will be converted to PNGs by `grunt generate`.
`dotnet`				| Holds the entire .NET project.
`grunt/`				| Here you will find task definitions and settings for Grunt plugins.
`json/`					| This stores only one file - `data.json` which is meant to be used for front-end developement, when no .NET environment is available.
`landing-page/`			| A simple landing page, just in case anything goes wrong.
`prototype/`			| Contains the standalone logic prototype used for logic testing. Does not require compiling.
`razor_src`				| In this directory you will find `*.json` files with snippets of Razor code, which is used to generate *Views* in the `dotnet` folder. You can read more about it [here](#net-integration).
`razor_templates/`		| Temporary directory created by `grunt templates`. Nothing to see here. Running `grunt clean` will delete it.

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

Task				| Description
--------------------| -----------
`squeaky-clean` 	| this task removes all generated content such as `*.css` and minified `*.js` files, .NET views and temporary images. You **must** run this command before committing any changes to the repo.
`tidy` 				| same as above except it does not remove icon files - as they can't be generated on a Windows machine.
`generate` 			| generates web fonts, PNG fallbacks for SVGs, image sprites, icons, etc. This task references `tidy` at the very beginning, so running it will remove any generated content along with the .NET views.
`generate-windows` 	| same as above but does not generate icons.
`templates` 		| generates .NET views and copies them into the `dotnet/` folder.
`dotnet` 			| same as above but also copies the assets over to the `dotnet/` folder.
`compile` 			| compiles JavaScript and LESS files without minification.
`build-staging`		| compiles and runs `grunt dotnet` afterwards.
`build-live`		| compiles, then minifies JavaScript and LESS and runs `grunt dotnet` afterwards.

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

## CSV data import

Data comes from the client (via the PM and AM teams) in CSV format, exported from Excel. To import this there is an `ImportController` excluded from the C# project — simply follow these steps:

1. Open the CSV file in your text editor of choice.
1. There is more than one Price column in the source data; you may need to change `Price` to `Finance_Price`.
1. Save the file in `~/App_Data`, converting it to UTF-8.
1. In SQL against your "local" database (which should hopefully be our shared dev SQL server Justforkix):
   
   ```
   Delete From Cars;
   Delete From Finances;
   ```
1. In the C# project, include the `ImportController` back into the solution and Build or Debug so you can access it in a browser.
1. Go to [your local instance of `~/Import?type=csv`](http://localhost:1896/Import?type=csv), which currently provides no output. (We should fix this.)
1. **Make sure you re-exclude the `ImportController` from the solution**, so it never goes live!
1. From Visual Studio, generate `Insert` scripts for your "local" `Cars` and `Finance` tables.
1. Execute these `Insert` scripts (deleting first, if the scripts do not do so) on the Dev and QA database — database `MINI_FS_QA` on Rackspace Shared Windows Staging, then test on [Dev](http://minifs-dev.id-staging.com/).
1. Once you're happy with the content on Dev, check on [QA](http://minifs-qa.id-staging.com/), if the codebase differs.
1. Once you're happy with the content on QA, execute the scripts (or DTS the tables `Cars` and `Finance`) onto Staging — database `MINI_FS` on the same server, and test on [Staging](http://minifs.id-staging.com/).
1. When everything is finally signed off, deploy those changes to Production in the same manner.

## Troubleshooting

##### grunt-processhtml problems

`grunt-processhtml` is known to cause some problems when using the latest version - in particular it doesn't remove blocks of code between `<!-- build:remove -->` tags.

Installing `0.3.6` solves this issue:

```
npm install grunt-processhtml@0.3.6 -save
```

##### Windows problems

If you happen to run `grunt squeaky-clean` on a Windows machine, you will need to generate icons in order to compile the app.

> ##### <span style="color: firebrick">Warning</span>
> **Always** remember to revert back to `fontforge` in production.
> **Never** commit `settings.iconEngine` set to `node`. It will fail to generate proper fonts.

To do so, **change temporarily** the font-hinting engine used by `grunt-webfont`.

You can do it by changing `settings.iconEngine` to `node` in `combobulator.json`.

---

