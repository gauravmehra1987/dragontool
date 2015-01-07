<?php require( 'inc/header.inc.php' ); ?>

	<div id="dash">
		
		<div id="dash-left">
			
			<div class="top">

				<h5>Bums on seats</h5>

				<?php include( 'control-bums.php' ); ?>

			</div><!-- end div.top -->

			<div class="middle">

				<div class="inner-left">

					<h5>Mpg</h5>

					<?php include( 'control-mpg.php' ); ?>

				</div><!-- end div.inner-left -->

				<div class="inner-right">

					<h5>Lifestyle</h5>

					<?php include( 'control-lifestyle.php' ); ?>

				</div><!-- end div.inner-right -->

			</div><!-- end div.middle -->

			<div class="bottom">

				<h5>Luggage</h5>

				<?php include( 'control-luggage.php' ); ?>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-left -->

		<div id="dash-middle">
			
			<div class="top">

				<h5>Options</h5>

				<?php include( 'control-options.php' ); ?>

			</div><!-- end div.top -->

			<div class="bottom">

				<h5>Speed</h5>

				<?php include( 'control-speed.php' ); ?>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-middle -->

		<div id="dash-right">
			
			<div class="top">

				<h5>£ per month</h5>

				<?php include( 'control-price.php' ); ?>
				
			</div><!-- end div.top -->

			<div class="bottom"><?php include( 'control-start.php' ); ?></div><!-- end div.bottom -->

		</div><!-- end div#dash-right -->

	</div><!-- end div#dash -->

<?php require( 'inc/footer.inc.php' ); ?>