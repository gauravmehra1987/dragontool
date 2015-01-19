<!-- build:template
<%= index.variables %>
/build -->
<!-- build:remove --><?php require( 'header.php' ); ?><!-- /build -->

<div id="pageWrap">

	<div id="top-bar">

		<div class="mini-logo"><img src="assets/img/mini_logo.png" alt="mini" class="img-responsive" /></div>

		<div class="social">
		
			<a href="#" title="facebook">Facebook</a>
			<a href="#" title="twitter">Twitter</a>

		</div>

	</div>

	<main role="main" id="main" class="row">

		<div id="dashboard" class="column"><?php require( 'dashboard.php' ); ?></div><!-- end div#dashboard -->

		<article class="panel welcome framed column" data-panel-name="welcome">

			<header>

				<div class="ministry-logo"><img src="assets/img/ministry_of_finance.png" alt="ministry of finance" class="img-responsive" /></div>
				<div class="hr text presents"><span>Presents</span><hr/></div>
				<h2 class="title">The<br/>Combobulator</h2>
				<div class="hr"><hr/></div>
			

			</header>

			<!-- build:remove --><h3 class="title">Hi John</h3><!-- /build -->

			<!-- build:template
			<%= index.hi %>
			/build -->
			
			<p>Want a shiny new MINI finance deal, but don't know your APRs from your elbow? Let the Combobulator find you the perfect offer, at the touch of a button.</p>
			<p>Choose now much you'd like to spend, how turbo-charged you want your engine, and throw in an extra or two. Then hit Combobulate to get your tailor-made deal.</p>
			<p>Just use the control panel on the left to fire it up.<br/>Happy Combobulating.</p>

		</article>

		<article class="panel results column" data-panel-name="results">

			<header>

				<h2 class="title" data-model-name="true">model name</h2>
				<h3 class="title" data-model-code="true">model code</h3>

				<div class="sticker">

					<span class="currency">£</span>
					<span class="price" data-model-price="true">model price</span>
					<span class="">Per<br />month</span>

				</div>

				<a class="btn" href="#" data-results-link="true"><i class="icon chev"></i>Go see</a>

				<div class="hr"><hr/></div>

			</header>

			<div class="car"><img data-model-image="true" src="assets/cars/5-door-Cooper-D.jpg" alt="car" class="img-responsive" /></div>

			<div class="hr"><hr/></div>

			<div class="related-cars">

				<h2 class="title">Or for £200... You could buy <span class="highlight">102 watermelons</span></h2>

				<ul class="nav-list">

					<li><a href="#" data-alt1-name="true" title="Alt Car 1"><img src="assets/cars/5-door-Cooper-D.jpg" class="img-responsive" alt="" /></a></li>
					<li class="active"><a href="#" data-alt2-name="true" title="Alt Car 2"><img src="assets/cars/5-door-Cooper-D.jpg" class="img-responsive" alt="" /></a></li>
					<li><a href="#" data-alt3-name="true" title="Alt Car 3"><img src="assets/cars/5-door-Cooper-D.jpg" class="img-responsive" alt="" /></a></li>
					<li><a href="#" data-alt4-name="true" title="Alt Car 4"><img src="assets/cars/5-door-Cooper-D.jpg" class="img-responsive" alt="" /></a></li>

				</ul>

			</div>

			<div class="extras">

				<div class="terms" data-terms="true"></div>

			</div>

		</article>

	</main>

	<footer id="footer">

		<a><i class="icon chevron"></i>Terms and Conditions</a>

	</footer>

</div>

<!-- build:template
<%= index.input %>
/build -->

<!-- build:remove --><?php require( 'footer.php' ); ?><!-- /build -->