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

					<div class="controls">
						
						<div class="control slot">

							<div class="slots">

								<div class="slot adult"><span>M</span></div><!-- end div.slot adult -->
								<div class="slot adult"><span>W</span></div><!-- end div.slot adult -->

							</div><!-- end div.slots -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="slots">

								<div class="slot adult"><span>W</span></div><!-- end div.slot adult -->
								<div class="slot adult"><span>M</span></div><!-- end div.slot adult -->

							</div><!-- end div.slots -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="slots">
							
								<div class="slot child"><span>B</span></div><!-- end div.slot child -->
								<div class="slot child"><span>G</span></div><!-- end div.slot child -->
								<div class="slot adult"><span>M</span></div><!-- end div.slot adult -->
								<div class="slot adult"><span>W</span></div><!-- end div.slot adult -->								
								<div class="slot infant"><span>I</span></div><!-- end div.slot infant -->
								<div class="slot extra"><span>D</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>C</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>A</span></div><!-- end div.slot extra -->

							</div><!-- end div.slots -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="slots">
							
								<div class="slot child"><span>G</span></div><!-- end div.slot child -->
								<div class="slot child"><span>B</span></div><!-- end div.slot child -->
								<div class="slot adult"><span>M</span></div><!-- end div.slot adult -->
								<div class="slot adult"><span>W</span></div><!-- end div.slot adult -->
								<div class="slot infant"><span>I</span></div><!-- end div.slot infant -->
								<div class="slot extra"><span>D</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>C</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>A</span></div><!-- end div.slot extra -->

							</div><!-- end div.slots -->
							
						</div><!-- end div.control slot -->

						<div class="control slot">

							<div class="slots">
							
								<div class="slot infant"><span>I</span></div><!-- end div.slot infant -->
								<div class="slot adult"><span>M</span></div><!-- end div.slot adult -->
								<div class="slot adult"><span>W</span></div><!-- end div.slot adult -->
								<div class="slot child"><span>B</span></div><!-- end div.slot child -->
								<div class="slot child"><span>G</span></div><!-- end div.slot child -->								
								<div class="slot extra"><span>D</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>C</span></div><!-- end div.slot extra -->
								<div class="slot extra"><span>A</span></div><!-- end div.slot extra -->

							</div><!-- end div.slots -->
							
						</div><!-- end div.control slot -->
						
					</div><!-- end div.controls -->

					<button id="rnd">Randomize</button>

				</div><!-- end div#dial_s -->

				<div id="dial_m" class="dial-control">

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
					
					<div class="control options">
					
						<div class="option">

							<input id="4wd" name="4wd" value"4WD" type="checkbox" />
							<label for="4wd"><span class="control-bg">4WD</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="hp" name="hp" value="High driving position" type="checkbox" />
							<label for="hp"><span class="control-bg">High position</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="dt" name="dt" value="Drop top" type="checkbox" />
							<label for="dt"><span class="control-bg">Drop top</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div class="option">

							<input id="tp" name="tp" value="Teleportation" type="checkbox" />
							<label for="tp"><span class="control-bg">Teleportation</span></label>
							<div class="control-bg"></div><!-- end div.control-bg -->

						</div><!-- end div.option -->

						<div id="dial_v" class="dial-control">
							
							<div class="control slot slot-wide">

									<div class="slots">

										<div class="slot turtle"><span>turtle</span></div><!-- end div.slot adult -->
										<div class="slot slow"><span>slow</span></div><!-- end div.slot adult -->
										<div class="slot normal"><span>normal</span></div><!-- end div.slot adult -->
										<div class="slot quick"><span>quick</span></div><!-- end div.slot adult -->
										<div class="slot fast"><span>fast</span></div><!-- end div.slot adult -->
										<div class="slot rocket"><span>rocket</span></div><!-- end div.slot adult -->

									</div><!-- end div.slots -->
									
								</div><!-- end div.control slot -->

						</div><!-- end div#dial_v.dial-control -->

					</div><!-- end div.control options -->

				</div><!-- end div#dial_o.dial -->


			</div><!-- end div#dials_middle -->

			<div id="dials_right">

				<div id="dial_p" class="dial-control">
				
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

			</div><!-- end div#dials_right -->

		</div><!-- end div#dashboard -->

<?php require( 'inc/footer.inc.php' ); ?>