<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open %>
/build -->



<div class="form-sumbitting-overlay">

	<div class="v-center-wrap">
		<div class="v-center-content">
	
			<div class="combobulate-spinning">
		
				<img src="assets/img/tpl-button.gif" class="img-base">

					<div class="control start">
			
						<div id="start">
				
							<div class="button-inner switch-bg">Combobulate</div><!-- end div.button-inner -->

						</div>

					<div class="shape"></div><!-- end div.shape -->

				</div><!-- end div.control start -->
		
			</div><!-- end div.res-wrap -->

			<p><br/>Form submitting...</p>
		</div>
	</div>

</div>




<div id="page_form" class="layout layout-default">

	<ul class="actions">

		<li id="results_recombobulate"><a href="./">Recombobulate</a></li>
		<li id="results_back"><a href="#" onClick="history.go(-1);return false;">Go back</a></li>

	</ul>

<!-- build:remove --><form action="ajax.php" autocomplete="off" id="form-car"><!-- /build -->

	<!-- build:template
	<%= form.field.user %>
	/build -->

	<!-- build:remove --><input type="hidden" id="uid" name="UserId" value="999" /><!-- /build -->

	<div class="form-left">

		<!-- ****************************************************************************** -->
		<!-- FORM CONTENT -->

		<div class="form-content">

			<h3 class="title">ALMOST THERE</h3>
			<p>Think this MINI might be for you? Let your preferred MINI Centre work out how you can get your hands on it. Just pop in your details, and they'll be in touch with everything you need to know.</p>

			<div class="form-control form-control-select half-width">

				<div class="select">

					<!-- build:template
					<%= form.field.title %>
					/build -->

					<!-- build:remove -->
					<select id="title" name="title">

						<option value="">Title</option>

						<option value="Mr">Mr</option>
						<option value="Mrs">Mrs</option>
						<option value="Miss">Miss</option>
						<option value="Ms">Ms</option>
						<option value="Dr">Dr</option>

					</select>
					<!-- /build -->

				</div>

			</div>

			<div class="form-control form-control-input append user full-width">

				<!-- build:template
				<%= form.field.name %>
				/build -->

				<!-- build:remove --><input type="text" id="name" name="name" placeholder="First name" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input append user full-width">

				<!-- build:template
				<%= form.field.surname %>
				/build -->

				<!-- build:remove --><input type="text" id="surname" name="surname" placeholder="Last name" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input append mail full-width">

				<!-- build:template
				<%= form.field.email %>
				/build -->

				<!-- build:remove --><input type="email" id="email" name="email" placeholder="E-mail address" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input append phone full-width">

				<!-- build:template
				<%= form.field.tel.home %>
				/build -->

				<!-- build:remove --><input type="tel" id="tel_home" name="tel_home" placeholder="Telephone" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="inline">

				<div class="form-control form-control-input append home half-width">

					<!-- build:template
					<%= form.field.address.postcodesearch %>
					/build -->

					<!-- build:remove --><input type="text" id="postcode_search" name="postcode_search" placeholder="Postcode" /><!-- /build -->
					<span class="field-icon"></span>

				</div>

				<div class="form-control half-width">

					<div id="address_type_chooser" class="form-control form-control-input-checkbox">

						<div class="checkbox checkbox-radio">

							<!-- build:remove --><input id="address_type_home" name="address_type" type="radio" value="home" checked="checked" /><!-- /build -->

							<!-- build:template
							<%= form.field.address.home %>
							/build -->
							<label for="address_type_home">Home</label>

						</div>

						<div class="checkbox checkbox-radio">

							<!-- build:remove --><input id="address_type_work" name="address_type" type="radio" value="work" /><!-- /build -->

							<!-- build:template
							<%= form.field.address.work %>
							/build -->
							<label for="address_type_work">Work</label>

						</div>

					</div>

				</div><!-- end div.form-control half-width -->

			</div><!-- end div.inline -->

			<div class="form-control form-control-button">
				
				<a href="#" id="address_lookup" class="button cta">Address lookup</a><span class="loader-inline">Searching</span>

			</div>

			<div id="address_chooser">

				<div class="form-control form-control-select disabled">

					<div class="select disabled">

						<select disabled="disabled">

							<option value="">Choose your address</option>

						</select>

					</div>

				</div>

			</div><!-- end div#address_chooser -->

			<div class="form-control form-control-input disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address1 %>
				/build -->

				<!-- build:remove --><input type="text" id="address_1" name="address_1" placeholder="Address line 1" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address2 %>
				/build -->

				<!-- build:remove --><input type="text" id="address_2" name="address_2" placeholder="Address line 2" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address3 %>
				/build -->

				<!-- build:remove --><input type="text" id="address_3" name="address_3" placeholder="Address line 3" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control form-control-input disabled append home full-width">

				<!-- build:template
				<%= form.field.address.postcode %>
				/build -->

				<!-- build:remove --><input type="text" id="postcode" name="postcode" placeholder="Postcode" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div id="dealer_chooser">

				<div class="form-control form-control-select disabled">

					<div class="select disabled">

						<select disabled="disabled">

							<option value="">Choose your preferred MINI Centre</option>

						</select>

					</div>

				</div>

			</div><!-- end div#dealer_chooser -->


			<div id="optout_chooser" class="form-control form-control-checkbox">

				<p class="notice">By providing your email address you agree to hear from BMW Group companies, authorised BMW or 
					MINI Centres, BMW i agents and other suppliers of BMW or MINI branded products and services about the latest 
					news on our vehicles and and other products and services by email. We may occasionally ask for your assistance 
					in market research to help improve our service to customers. Further details are available in our
					<a href="http://www.mini.co.uk/privacy-policy/?_ga=1.57454506.1480298000.1427200403" target="_blank">privacy 
					policy</a>.
				</p>
				<p class="notice">You can tell us at any time if you would prefer NOT to receive marketing communications;
					please call us free on 0800 561 0666, or write to us at BMW Customer Information Centre, Selectapost 51,
					Sheffield S97 3FZ.
				</p>

				<p class="notice">Just pop a tick in the box to opt-in for future communications.</p>
				
				<div class="checkbox">

					<!-- build:remove --><input id="optout_email" name="optout" type="checkbox" value="email" /><!-- /build -->
					<!-- build:template
					<%= form.field.optout.email %>
					/build -->
					<label for="optout_email">by email</label>

				</div>
				
				<div class="checkbox">

					<!-- build:remove --><input id="optout_phone" name="optout" type="checkbox" value="phone" /><!-- /build -->
					<!-- build:template
					<%= form.field.optout.phone %>
					/build -->
					<label for="optout_phone">by phone</label>

				</div>

				<div class="checkbox">

					<!-- build:remove --><input id="optout_post" name="optout" type="checkbox" value="post" /><!-- /build -->
					<!-- build:template
					<%= form.field.optout.post %>
					/build -->
					<label for="optout_post">by post</label>

				</div>

			</div>

			<div class="form-control form-control-submit">

				<button type="submit" class="button switch-bg">Submit</button>

			</div>


		</div><!-- end div.form-content -->

		<!-- ****************************************************************************** -->
		<!-- END: FORM CONTENT -->




		<!-- ****************************************************************************** -->
		<!-- START: THANKS CONTENT -->

		<div class="thanks-content">

			<div class="panel panel-framed panel-active">


				<header class="header centred">
							
					<p class="ministry">Ministry of Finance</p>
							
					<h3>Nice one.</h3>

					<p>Your MINI Centre will be in contact soon. (We're sending you an email to your inbox with all the info.) Until then, see what else we’ve got up our sleeve.</p>

				</header><!-- end header.header -->


				<div class="thanks-links">

					<hr />

					<h4 class="item switch-color">

						<!-- build:template
						<a href="<%= form.url %>" target="_blank">TAKE A CLOSER LOOK.</a>
						/build -->

						<!-- build:remove --><a href="http://www.mini.co.uk/model-range/2014-hatch/connected" target="_blank">TAKE A CLOSER LOOK.</a><!-- /build -->

					</h4>
					<p>Find out more about your MINI and the rest of family.</p>

					<hr />


					<h4 class="item switch-color">
						<a href="http://www.mini.co.uk/offers-and-finance" target="_blank">OFFERS FOR EVERY POCKET.</a>
					</h4>
					<p>Find the right deal for you with our latest finance packages.</p>

					<hr />


					<h4 class="item switch-color">
						<a href="http://www.mini.co.uk/offers-and-finance/insurance" target="_blank">KEEPING MINIS MOLLYCODDLED.</a>
					</h4>
					<p>All you need to know about optional MINI Insurance cover.</p>


				</div>

			</div>

		</div><!-- end div.thanks -->

		<!-- ****************************************************************************** -->
		<!-- END: THANKS CONTENT -->



	</div><!-- end div.form-left -->


	<div class="form-right">
		
		<div id="form_car_wrap">

			<!-- build:template
			<h2 class="switch-color model-name"><%= form.brand %> <br/> <%= form.engine_name %> <br/> <%= form.model_name %></h2>
			/build -->

			<!-- build:remove --><h2 class="switch-color model-name">MINI <br/> ENGINE <br/> MODEL</h2><!-- /build -->

			<figure id="form_car" class="model-image">

				<img src="assets/cars/none.png" class="img-base" />

				<!-- build:template
					<img src="<%= form.carImage %>" id="results-car" class="img-content" />
				/build -->

				<!-- build:remove --><img src="assets/cars/<?= $_GET[ 'm' ]; ?>.jpg" id="car-image" class="img-content" /><!-- /build -->

			</figure><!-- end figure#car -->

		</div>

	</div><!-- end div.form-right -->

	<!-- build:remove --></form><!-- /build -->

</div><!-- end div.layout -->

<!-- build:template -->
<%= form.close %>
<!-- /build -->
