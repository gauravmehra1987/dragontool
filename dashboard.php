<?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'inc/header.inc.php' ); } ?>

	<div id="tools"><?php include( 'tools.php' ); ?></div>

	<div id="dash">
		
		<div id="dash-left">
			
			<div class="top">

				<h5 class="control-title">Bums on seats</h5>

				<div id="c-bums" class="control-wrapper"><div class="control-inner"><?php include( 'control-bums.php' ); ?></div></div>

			</div><!-- end div.top -->

			<div class="middle">

				<div class="inner-left">

					<h5 class="control-title">Mpg</h5>

					<div id="c-mpg" class="control-wrapper"><div class="control-inner"><?php include( 'control-mpg.php' ); ?></div></div>

				</div><!-- end div.inner-left -->

				<div class="inner-right">

					<h5 class="control-title">Lifestyle</h5>

					<div id="c-lifestyle" class="control-wrapper"><div class="control-inner"><?php include( 'control-lifestyle.php' ); ?></div></div>

				</div><!-- end div.inner-right -->

			</div><!-- end div.middle -->

			<div class="bottom">

				<h5 class="control-title">Luggage</h5>

				<div id="c-luggage" class="control-wrapper"><div class="control-inner"><?php include( 'control-luggage.php' ); ?></div></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-left -->

		<div id="dash-middle">
			
			<div class="top">

				<h5 class="control-title">Options</h5>

				<div class="control-wrapper"><div class="control-inner"><?php include( 'control-options.php' ); ?></div></div>

			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Speed</h5>

				<div id="c-speed" class="control-wrapper"><div class="control-inner"><?php include( 'control-speed.php' ); ?></div></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-middle -->

		<div id="dash-right">
			
			<div class="top">

				<h5 class="control-title">£ per month</h5>

				<div class="control-wrapper"><div class="control-inner"><?php include( 'control-price.php' ); ?></div></div>
				
			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Start</h5>

				<div class="control-wrapper"><div class="control-inner"><?php include( 'control-start.php' ); ?></div><!-- end div.bottom --></div>

			</div>

		</div><!-- end div#dash-right -->

	</div><!-- end div#dash -->

<?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'inc/footer.inc.php' ); } ?>