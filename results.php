<!-- build:remove --><?php include( 'header.php' ); ?><!-- /build -->

<!-- build:template
<%= results.model %>
/build -->

<!-- build:template
<%= results.variables %>
/build -->

<!-- build:template
<%= results.scripts %>
/build -->

<div class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout animated fadeInRightBig">
		
		<div class="column left">
			
			<!-- build:template
			<%= results.details %>
			/build -->

			<!-- build:remove --><?php include( 'results-details.php' ); ?><!-- /build -->

		</div><!-- end div.column left -->

		<div class="column right">

			<div id="form" class="panel panel-framed" data-panel-name="default">

				<!-- build:template
				<%= results.form %>
				/build -->

				<!-- build:remove --><?php include( 'form-existing.php' ); ?><!-- /build -->

			</div><!-- end div#form.panel -->

			<div id="thanks" class="panel panel-framed" data-panel-name="thanks">

				<header>

					<p class="ministry">Ministry of Finance</p>

					<h3>Nice one.</h3>
					
					<p>A friendly MINI Dealer will be in contact soon. (We’ve sent an email to your inbox with all the info.) Until then, why not make your MINI one in a million with our configurator?</p>

				</header>

				<hr />

				<h4 class="item switch-color">Mollycoddle your Mini.</h4>
				<p>Keep your MINI cotton-wool wrapped with MINI Insurance.</p>

				<hr />

				<h4 class="item switch-color">Keep it covered.</h4>
				<p>Protect your MINI’s working parts with a MINI Warranty.</p>

				<hr />

				<h4 class="item switch-color">Get connected.</h4>
				<p>Enjoy your beats, tweets and calendar meets on screen with MINI Connected.</p>

				<hr />

				<footer>

					<div class="form-control full-width">

						<a href="#" class="button switch-bg">Configure my Mini</a>

					</div>

				</footer>

			</div><!-- end div#thanks.panel -->

		</div><!-- end div.column right -->

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->