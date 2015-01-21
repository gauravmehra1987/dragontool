<!-- build:template
<%= home.variables %>
/build -->
<!-- build:remove --><?php require( 'header.php' ); ?><!-- /build -->

<div class="layout-wrapper">

	<header class="layout-header">
		
		<h2 id="logo"><a href="#">Mini</a></h2><!-- end h2#logo -->

		<ul class="social">

			<li class="facebook"><a href="#">Facebook</a></li><!-- end li.facebook -->
			<li class="twitter"><a href="#">Twitter</a></li><!-- end li.twitter -->
			
		</ul><!-- end ul.social -->

	</header><!-- end header.layout-header -->

	<main class="layout">
		
		<div class="column left">
			
			<!-- build:template
			<%= home.dashboard %>
			/build -->

			<!-- build:remove --><?php require( 'dashboard.php' ); ?><!-- /build -->

		</div><!-- end div.column left -->

		<div class="column right">

			<div id="welcome" class="panel" data-panel-name="welcome">

				<header class="header">
					
					<p class="ministry">Ministry of Finance</p>
					<p class="strike-through">Presents</p>
					
					<h1>The<br />Combobulator</h1>

				</header><!-- end header.header -->

				<!-- build:remove --><h3 class="title">Hi John</h3><!-- /build -->

				<!-- build:template
				<%= home.hi %>
				/build -->
				
				<p>Want a shiny new MINI finance deal, but don't know your APRs from your elbow? Let the Combobulator find you the perfect offer, at the touch of a button.</p>
				<p>Choose now much you'd like to spend, how turbo-charged you want your engine, and throw in an extra or two. Then hit Combobulate to get your tailor-made deal.</p>
				<p>Just use the control panel on the left to fire it up.<br/>Happy Combobulating.</p>

			</div><!-- end div#welcome.panel -->
			
			<div id="results" class="panel" data-panel-name="results">

				<div><h3 data-model-name>model name</h3></div>
				<div><span data-model-code>model code</span></div>

				<hr />

				<div>£<span data-model-price>price</span></div>
				<div><img src="http://placehold.it/300x200" data-model-image /></div>
				<div><span data-terms>terms</span></div>
				<div><a data-results-link>Show result</a></div>
				
			</div><!-- end div#results.panel -->
			
		</div><!-- end div.column right -->

	</main><!-- end main.layout -->

	<footer class="layout-footer">
			
		<p><a href="#">Terms and Conditions</a></p>

	</footer><!-- end footer.layout-footer -->

</div><!-- end div.layout-wrapper -->

<!-- build:template
<%= home.input %>
/build -->

<!-- build:remove --><?php require( 'footer.php' ); ?><!-- /build -->