<?php require( 'inc/header.inc.php' ); ?>

	<div id="tools"><?php include( 'tools.php' ); ?></div>

	<div id="dash">
		
		<div id="dash-left">
			
			<div class="top">

				<h5 class="control-title">Bums on seats</h5>

				<div id="c-bums" class="control-wrapper"><?php include( 'control-bums.php' ); ?></div>

			</div><!-- end div.top -->

			<div class="middle">

				<div class="inner-left">

					<h5 class="control-title">Mpg</h5>

					<div class="control-wrapper"><?php include( 'control-mpg.php' ); ?></div>

				</div><!-- end div.inner-left -->

				<div class="inner-right">

					<h5 class="control-title">Lifestyle</h5>

					<div class="control-wrapper"><?php include( 'control-lifestyle.php' ); ?></div>

				</div><!-- end div.inner-right -->

			</div><!-- end div.middle -->

			<div class="bottom">

				<h5 class="control-title">Luggage</h5>

				<div class="control-wrapper"><?php include( 'control-luggage.php' ); ?></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-left -->

		<div id="dash-middle">
			
			<div class="top">

				<h5 class="control-title">Options</h5>

				<div class="control-wrapper"><?php include( 'control-options.php' ); ?></div>

			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Speed</h5>

				<div id="c-speed" class="control-wrapper"><?php include( 'control-speed.php' ); ?></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-middle -->

		<div id="dash-right">
			
			<div class="top">

				<h5 class="control-title">£ per month</h5>

				<div class="control-wrapper"><?php include( 'control-price.php' ); ?></div>
				
			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Start</h5>

				<div class="control-wrapper"><?php include( 'control-start.php' ); ?></div><!-- end div.bottom -->

			</div>

		</div><!-- end div#dash-right -->

	</div><!-- end div#dash -->

<?php require( 'inc/footer.inc.php' ); ?>