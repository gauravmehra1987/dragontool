<?php require( 'header.php' ); ?>

	<div id="page-form" class="layout-wrapper">

		<?php require( 'top.php' ); ?>

			<div class="layout auto-height">


				<div id="thanks_right" class="column right">

					<div id="thanks" class="panel panel-framed panel-active" data-panel-name="default">

						<header class="header">
							
							<p class="ministry">Ministry of Finance</p>
							
							<h3>Nice one.</h3>

							<p>A friendly MINI Dealer will be in contact soon. (We’ve sent an email to your inbox with all the info.) Until then, why not make your MINI one in a million with our configurator?</p>

						</header><!-- end header.header -->

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

						<footer class="footer">

							<a href="#" class="button switch-bg">Configure my Mini</a>
														
						</footer><!-- end header.header -->

					</div><!-- end div#welcome.panel -->

				</div><!-- end div#thanks_right -->


				<div id="thanks_left" class="column left">

					<form action="ajax.php">

						<input type="hidden" id="uid" name="UserId" value="999" />

						<figure id="form_car" class="model-image">

							<img src="assets/cars/none.png" class="img-base" />	

							<img src="assets/cars/MR92.png" id="car-image" class="img-content" />

						</figure><!-- end figure#car -->


						<div class="footer">

						<hr/>

							<p>&pound;20p <span>per <br/>month</span></p>

							<ul class="actions">

								<li id="results_back"><a href="#" onClick="history.go(-1);return false;">Go back</a></li>

							</ul>

						</div>

					</form>

				</div><!-- end div#thanks_left -->
	

			</div><!-- end div.layout -->

		<?php require( 'bottom.php' ); ?>

	</div><!-- end div#page-form.layout-wrapper -->

<?php require( 'footer.php' ); ?>

