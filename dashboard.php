<!-- build:remove --><?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'header.php' ); } ?><!-- /build -->

	<div id="dash">
		
		<div id="dash-left">
			
			<div class="top">

				<h5 class="control-title">Bums on seats</h5>

				<div id="c-bums" class="control-wrapper backline"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-bums.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.bums %>
				/build -->

				</div></div>

			</div><!-- end div.top -->

			<div class="middle">

				<div class="inner-left">

					<h5 class="control-title">Mpg</h5>

					<div id="c-mpg" class="control-wrapper"><div class="control-inner">

					<!-- build:remove --><?php include( 'control-mpg.php' ); ?><!-- /build -->
					
					<!-- build:template
					<%= dashboard.mpg %>
					/build -->

					</div></div>

				</div><!-- end div.inner-left -->

				<div class="inner-right">

					<h5 class="control-title">Lifestyle</h5>

					<div id="c-lifestyle" class="control-wrapper"><div class="control-inner">

					<!-- build:remove --><?php include( 'control-lifestyle.php' ); ?><!-- /build -->
					
					<!-- build:template
					<%= dashboard.lifestyle %>
					/build -->

					</div></div>

				</div><!-- end div.inner-right -->

			</div><!-- end div.middle -->

			<div class="bottom">

				<h5 class="control-title">Luggage</h5>

				<div id="c-luggage" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-luggage.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.luggage %>
				/build -->

				</div></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-left -->

		<div id="dash-middle">
			
			<div class="top">

				<h5 class="control-title">Options</h5>

				<div id="c-options" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-options.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.options %>
				/build -->

				</div></div>

			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Speed</h5>

				<div id="c-speed" class="control-wrapper backline"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-speed.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.speed %>
				/build -->

				</div></div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-middle -->

		<div id="dash-right">
			
			<div class="top">

				<h5 class="control-title">£ per month</h5>

				<div id="c-price" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-price.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.price %>
				/build -->

				</div></div>
				
			</div><!-- end div.top -->

			<div class="bottom">

				<h5 class="control-title">Start</h5>

				<div id="c-button" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-start.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.start %>
				/build -->

				</div><!-- end div.bottom --></div>

			</div>

		</div><!-- end div#dash-right -->

	</div><!-- end div#dash -->

<!-- build:remove --><?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'footer.php' ); } ?><!-- /build -->