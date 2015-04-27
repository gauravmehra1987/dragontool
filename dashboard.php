<!-- build:remove --><?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'header.php' ); } ?><!-- /build -->

	<div id="dash">

		<a id="tablet-toggle" class="tablet-only">Reveal dashboard</a>

		<div class="dash-overlay"></div>
		
		<div id="dash-left">
			
			<div class="top">

				<h5 id="t-bums" class="control-title"><span class="light"></span>Bums on seats</h5>

				<div id="c-bums" class="control-wrapper backline"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-bums.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.bums %>
				/build -->

				</div></div>

			</div><!-- end div.top -->

			<div class="middle">

				<div class="inner-left">

					<h5 id="t-mpg" class="control-title"><span class="light"></span>Mpg</h5>

					<div id="c-mpg" class="control-wrapper"><div class="control-inner">

					<!-- build:remove --><?php include( 'control-mpg.php' ); ?><!-- /build -->
					
					<!-- build:template
					<%= dashboard.mpg %>
					/build -->

					</div></div>

				</div><!-- end div.inner-left -->

				<div class="inner-right">

					<h5 id="t-lifestyle" class="control-title"><span class="light"></span>Lifestyle</h5>

					<div id="c-lifestyle" class="control-wrapper"><div class="control-inner">

					<!-- build:remove --><?php include( 'control-lifestyle.php' ); ?><!-- /build -->
					
					<!-- build:template
					<%= dashboard.lifestyle %>
					/build -->

					</div></div>

				</div><!-- end div.inner-right -->

			</div><!-- end div.middle -->

			<div class="bottom">

				<h5 id="t-luggage" class="control-title"><span class="light"></span>Luggage</h5>

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

				<h5 id="t-options" class="control-title"><span class="light"></span>Options</h5>

				<div id="c-options" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-options.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.options %>
				/build -->

				</div></div>

			</div><!-- end div.top -->

			<div class="bottom">

				<h5 id="t-speed" class="control-title"><span class="light"></span>Speed</h5>

				<div id="c-speed" class="control-wrapper">
					
					<div class="backline">
						
						<div class="control-inner">

						<!-- build:remove --><?php include( 'control-speed.php' ); ?><!-- /build -->
						
						<!-- build:template
						<%= dashboard.speed %>
						/build -->

						</div>
						
					</div><!-- end div.backline -->

				</div>

			</div><!-- end div.bottom -->

		</div><!-- end div#dash-middle -->

		<div id="dash-right">
			
			<div class="top">

				<h5 id="t-price" class="control-title"><span class="light"></span>£ per month</h5>

				<div id="c-price" class="control-wrapper"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-price.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.price %>
				/build -->

				</div></div>
				
			</div><!-- end div.top -->

			<div class="bottom">

				<h5 id="t-button" class="control-title"><span class="light"></span>Start</h5>

				<div id="c-button" class="control-wrapper dont-hide"><div class="control-inner">

				<!-- build:remove --><?php include( 'control-start.php' ); ?><!-- /build -->
				
				<!-- build:template
				<%= dashboard.start %>
				/build -->

				</div><!-- end div.bottom --></div>

			</div>

		</div><!-- end div#dash-right -->

	</div><!-- end div#dash -->

<!-- build:remove --><?php if( __FILE__ == $_SERVER['SCRIPT_FILENAME' ] ) { require( 'footer.php' ); } ?><!-- /build -->