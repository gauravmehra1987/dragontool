<?php require( 'inc/header.inc.php' ); ?>

		<form id="debug">

			<input type="text" id="v_seats" placeholder="seats" />
			<input type="text" id="v_mpg" placeholder="mpg" />
			<input type="text" id="v_luggage" placeholder="luggage" />				
			<input type="text" id="v_options" placeholder="options" />
			<input type="text" id="v_speed" placeholder="speed" />
			<input type="text" id="v_price" placeholder="price" />

			<button id="get">Read values</button>

		</form><!-- end form#debug -->

		<div id="dashboard">

			<div id="bgcontrol">

				<span>Background color:	</span>
				
				<input id="b" type="radio" name="bg" value="blue" checked /><label for="b">Blue</label>
				<input id="r" type="radio" name="bg" value="red" /><label for="r">Red</label>
				<input id="y" type="radio" name="bg" value="yellow" /><label for="y">Yellow</label>
				<input id="l" type="radio" name="bg" value="lime" /><label for="l">Lime</label>
				<input id="w" type="radio" name="bg" value="white" /><label for="w">White</label>

			</div><!-- end div#bgcontrol -->

			<div id="dials_left">

				<div id="dial_s" class="dial-control">

					<h3 class="control-title">Bums on seats</h3><!-- end h3.control-title -->

					<div class="controls">
						
						<div class="control slot">

							<div class="wrap">

								<div class="control-bg"></div><!-- end div.control-bg -->

								<div class="slots">

									<div class="slot man"><span>Man</span></div><!-- end div.slot man -->
									<div class="slot woman"><span>Woman</span></div><!-- end div.slot woman -->

								</div><!-- end div.slots -->

							</div><!-- end div.wrap -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="wrap">

								<div class="control-bg"></div><!-- end div.control-bg -->

								<div class="slots">

									<div class="slot woman"><span>Woman</span></div><!-- end div.slot woman -->
									<div class="slot man"><span>Man</span></div><!-- end div.slot man -->									

								</div><!-- end div.slots -->

							</div><!-- end div.wrap -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="wrap">

								<div class="control-bg"></div><!-- end div.control-bg -->

								<div class="slots">
								
									<div class="slot empty"><span>Empty</span></div><!-- end div.slot boy -->
									<div class="slot boy"><span>Boy</span></div><!-- end div.slot boy -->
									<div class="slot girl"><span>Girl</span></div><!-- end div.slot girl -->
									<div class="slot infant"><span>Infant</span></div><!-- end div.slot infant -->
									<div class="slot man"><span>Man</span></div><!-- end div.slot man -->
									<div class="slot woman"><span>Woman</span></div><!-- end div.slot woman -->

								</div><!-- end div.slots -->

							</div><!-- end div.wrap -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="wrap">

								<div class="control-bg"></div><!-- end div.control-bg -->

								<div class="slots">
								
									<div class="slot empty"><span>Empty</span></div><!-- end div.slot boy -->
									<div class="slot girl"><span>Girl</span></div><!-- end div.slot girl -->
									<div class="slot boy"><span>Boy</span></div><!-- end div.slot boy -->									
									<div class="slot infant"><span>Infant</span></div><!-- end div.slot infant -->
									<div class="slot man"><span>Man</span></div><!-- end div.slot man -->
									<div class="slot woman"><span>Woman</span></div><!-- end div.slot woman -->

								</div><!-- end div.slots -->

							</div><!-- end div.wrap -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="wrap">

								<div class="control-bg"></div><!-- end div.control-bg -->

								<div class="slots">
								
									<div class="slot empty"><span>Empty</span></div><!-- end div.slot boy -->
									<div class="slot dog"><span>Dog</span></div><!-- end div.slot dog -->
									<div class="slot cat"><span>Cat</span></div><!-- end div.slot cat -->
									<div class="slot alien"><span>Alien</span></div><!-- end div.slot alien -->
									<div class="slot boy"><span>Boy</span></div><!-- end div.slot boy -->
									<div class="slot girl"><span>Girl</span></div><!-- end div.slot girl -->
									<div class="slot infant"><span>Infant</span></div><!-- end div.slot infant -->
									<div class="slot man"><span>Man</span></div><!-- end div.slot man -->
									<div class="slot woman"><span>Woman</span></div><!-- end div.slot woman -->

								</div><!-- end div.slots -->

							</div><!-- end div.wrap -->
							
						</div><!-- end div.control slot -->
						
					</div><!-- end div.controls -->

					<button id="rnd">Randomize</button>

				</div><!-- end div#dial_s -->

				<div id="dial_m" class="dial-control">

					<h3 class="control-title">MPG</h3><!-- end h3.control-title -->

					<div class="control mpg">
						
						<div class="scale">
							
							<div class="control-bg"></div><!-- end div.control-bg -->
							<div class="indicators"></div><!-- end div.indicators -->				
							<div class="knob"></div><!-- end div.knob -->				
							<div class="arrow"></div><!-- end div.arrow -->

						</div><!-- end div.scale -->

						<div id="mpg_value" class="value">0</div><!-- end div#mpg_value.value -->

					</div><!-- end div.control mpg -->

				</div><!-- end div#dial_m.dial -->

				<div id="dial_l" class="dial-control">

					<div class="control lifestyle">
						
						<div class="labels"></div><!-- end div.labels -->
						<div class="dial-wrapper"><div class="dial"></div><!-- end div.dial --></div><!-- end div.dial-wrapper -->
						<div class="bg bg-1"></div><!-- end div.bg -->
						<div class="mask"></div><!-- end div.mask -->

					</div><!-- end div.control lifestyle -->

				</div><!-- end div#dial_l.dial -->

				<div id="dial_b" class="dial-control">

					<h3 class="control-title">Luggage</h3><!-- end h3.control-title -->

					<div class="control luggage">
						
						<div class="base">
							
							<div class="control-bg"></div><!-- end div.control-bg -->
							<div class="dial minimalist"></div><!-- end div.dial -->
							<div class="arrows">

								<a href="#" id="left">left</a>
								<a href="#" id="right">right</a>

							</div><!-- end div.arrows -->

						</div><!-- end div.base -->

					</div><!-- end div#control.luggage -->

				</div><!-- end div#dial_b.dial -->
				
			</div><!-- end div#dials_left -->

			<div id="dials_middle">			

				<div id="dial_o" class="dial-control">

					<h3 class="control-title">Options</h3><!-- end h3.control-title -->

					<div class="control options">

						<div class="option">

							<input id="4wd" name="4wd" value="1" type="checkbox" />
							<label for="4wd"><span class="control-bg">4WD</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="hp" name="hp" value="2" type="checkbox" />
							<label for="hp"><span class="control-bg">High position</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="dt" name="dt" value="3" type="checkbox" />
							<label for="dt"><span class="control-bg">Drop top</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="tp" name="tp" value="4" type="checkbox" />
							<label for="tp"><span class="control-bg">Teleportation</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

					</div><!-- end div.control options -->

				</div><!-- end div#dial_o.dial -->

				<div id="dial_v" class="dial-control">

					<h3 class="control-title">Speed</h3><!-- end h3.control-title -->

					<div class="control slot slot-wide">

						<div class="wrap">

							<div class="slots">

								<div class="slot nippy" data-value="1"><span>Nippy</span></div><!-- end div.slot nippy -->
								<div class="slot nippier" data-value="2"><span>Nippier</span></div><!-- end div.slot nippier -->
								<div class="slot quick" data-value="3"><span>Quick</span></div><!-- end div.slot quick -->
								<div class="slot woohoo" data-value="4"><span>Woohoo</span></div><!-- end div.slot woohoo -->
								<div class="slot lightspeed" data-value="5"><span>Lightspeed</span></div><!-- end div.slot lightspeed -->

							</div><!-- end div.slots -->

						</div><!-- end div.wrap -->

					</div><!-- end div.control slot -->

				</div><!-- end div#dial_v.dial-control -->

			</div><!-- end div#dials_middle -->

			<div id="dials_right">

				<div id="dial_p" class="dial-control">

					<h3 class="control-title">£ per month</h3><!-- end h3.control-title -->
				
					<div class="control slider">
								
						<div class="bg"></div><!-- end div.bg -->
						<div class="wrapper">
						<div class="control-bg-wrapper">
							
							<div class="control-bg"></div><!-- end div.control-bg -->
							<div class="mask"></div><!-- end div.mask -->
							<div class="handle"></div><!-- end div.handle -->

						</div><!-- end div.control-bg-wrapper -->
						</div><!-- end div.wrapper -->

					</div><!-- end div.control slider -->

				</div><!-- end div#dial_p.dial-control -->

				<div id="dial_c" class="dial-control">
					
					<div class="control start">
						
						<span class="control-bg">Combobulate</span>

					</div><!-- end div.control start -->

				</div><!-- end div#dial_c.dial-control -->

			</div><!-- end div#dials_right -->

		</div><!-- end div#dashboard -->

<?php require( 'inc/footer.inc.php' ); ?>