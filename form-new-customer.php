﻿<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open %>
/build -->

<div class="layout auto-height">

	<!-- build:remove --><form action="ajax.php"><!-- /build -->

	<!-- build:template
	<%= form.field.user %>
	/build -->

	<!-- build:remove --><input type="hidden" id="uid" name="UserId" value="999" /><!-- /build -->

	<div class="form-left">
		
		<header>

			<ul class="actions">
				
				<li id="results-back"><a href="./">Go back to results</a></li>

			</ul>

			<h3 class="title">ALMOST THERE</h3>
			<p class="notice">You've found your dream MINI. Now pop in your details so your local MINI Retailer can help you get your hands on it. </p>

		</header>

		<div class="form-content">

			<div class="form-control half-width">

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
						<option value="Prof">Prof</option>
						<option value="Rev">Rev</option>
						<option value="Lady">Lady</option>
						<option value="Sir">Sir</option>
						<option value="Lord">Lord</option>

					</select>
					<!-- /build -->

				</div>

			</div>

			<div class="form-control append user full-width">

				<!-- build:template
				<%= form.field.name %>
				/build -->

				<!-- build:remove --><input type="text" id="name" name="name" placeholder="First name" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control append user full-width">

				<!-- build:template
				<%= form.field.surname %>
				/build -->

				<!-- build:remove --><input type="text" id="surname" name="surname" placeholder="Last name" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<p class="notice">Please tick the relevant box if you'd prefer NOT to be contacted</p>

			<div class="form-control append mail full-width">

				<!-- build:template
				<%= form.field.email %>
				/build -->

				<!-- build:remove --><input type="email" id="email" name="email" placeholder="E-mail address" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<p class="notice">By providing your email address you agree to hear from BMW Group companies, authorised BMW or MINI Retailers, BMW i agents and other suppliers of BMW or MINI branded products and services about the latest news on our vehicles and and other products and services by email. We may occasionally ask for your assistance in market research to help improve our service to customers. Have a look at our privacy policy for more information.  </p>

			<div class="form-control append phone full-width">

				<!-- build:template
				<%= form.field.tel.home %>
				/build -->

				<!-- build:remove --><input type="tel" id="tel-home" name="tel-home" placeholder="Home telephone" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control append phone full-width">

				<!-- build:template
				<%= form.field.tel.work %>
				/build -->

				<!-- build:remove --><input type="tel" id="tel-work" name="tel-work" placeholder="Work telephone" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control append phone full-width">

				<!-- build:template
				<%= form.field.tel.mobile %>
				/build -->

				<!-- build:remove --><input type="tel" id="tel-mobile" name="tel-mobile" placeholder="Mobile telephone" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="inline">

				<div class="form-control append home half-width">

					<!-- build:template
					<%= form.field.address.postcode %>
					/build -->

					<!-- build:remove --><input type="text" id="postcode" name="postcode" placeholder="Postcode" /><!-- /build -->
					<span class="field-icon"></span>

				</div>

				<div class="form-control half-width">
				
					<div id="address-type-chooser" class="form-control">

						<div class="checkbox checkbox-radio">

							<!-- build:remove --><input id="address-type-home" name="address-type" type="radio" value="home" checked="checked" /><!-- /build -->
							<label for="address-type-home">Home</label>

							<!-- build:template
							<%= form.field.address.home %>
							/build -->

						</div>

						<div class="checkbox checkbox-radio">

							<!-- build:remove --><input id="address-type-work" name="address-type" type="radio" value="work" /><!-- /build -->
							<label for="address-type-work">Work</label>

							<!-- build:template
							<%= form.field.address.work %>
							/build -->

						</div>				

					</div>
					
				</div><!-- end div.form-control half-width -->

			</div><!-- end div.inline -->

			<div id="address-chooser">
				
				<div class="form-control disabled">

					<div class="select disabled">

						<select disabled="disabled">

							<option value="">Choose your address</option>

						</select>

					</div>

				</div>

			</div><!-- end div#address-chooser -->

			<div class="form-control disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address1 %>
				/build -->

				<!-- build:remove --><input type="text" id="address-1" name="address-1" placeholder="Address line 1" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address2 %>
				/build -->

				<!-- build:remove --><input type="text" id="address-2" name="address-2" placeholder="Address line 2" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control disabled append home full-width">

				<!-- build:template
				<%= form.field.address.address3 %>
				/build -->

				<!-- build:remove --><input type="text" id="address-3" name="address-3" placeholder="Address line 3" disabled="disabled" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div id="dealer-chooser">
				
				<div class="form-control disabled">

					<div class="select disabled">

						<select disabled="disabled">

							<option value="">Choose your preferred MINI Centre</option>

						</select>

					</div>

				</div>

			</div><!-- end div#dealer-chooser -->

		</div><!-- end div.form-content -->

		<div id="thanks-left">
			
			<h3>Nice one.</h3>
				
			<p>A friendly MINI Dealer will be in contact soon. (We’ve sent an email to your inbox with all the info.) Until then, why not make your MINI one in a million with our configurator?</p>

		</div><!-- end div#thanks-left -->

	</div><!-- end div.form-left -->

	<div class="form-right">

		<figure id="form-car" class="model-image">

			<img src="assets/cars/none.png" class="img-base" />

			<!-- build:remove --><img src="assets/cars/<?= $_GET[ 'm' ]; ?>.png" id="car-image" class="img-content" /><!-- /build -->
			
		</figure><!-- end figure#car -->
		
		<div class="form-content">

			<div class="form-control">
				
				<div class="checkbox">

					<!-- build:remove --><input id="finance" name="finance" type="checkbox" value="1" checked="checked" /><!-- /build -->
					<label for="finance">Please tick here if you are interested in MINI finance options.</label>

					<!-- build:template
					<%= form.field.finance %>
					/build -->

				</div>

			</div>

			<p class="notice">Here at MINI, we'd like to get in touch with you to share news on our latest MINI adventures and other products and services you might be interested in. We may also contact you for market research reasons, so we can find out what you think of MINI, and in turn we can learn a bit more about you.</p>
			<p class="notice">Your personal details are only shared with other BMW Group companies, authorised BMW and MINI Retailers, BMW i agents and other suppliers of BMW or MINI branded products or services for these reasons. Have a look at our privacy policy for more information. </p>

			<div id="optout-chooser" class="form-control">

				<p>Just pop a tick in the relevant box if you'd prefer NOT to be contacted</p>
				
				<div class="checkbox">

					<!-- build:remove --><input id="optout-phone" name="optout" type="checkbox" value="phone" /><!-- /build -->
					<label for="optout-phone">by phone</label>				

					<!-- build:template
					<%= form.field.optout.phone %>
					/build -->

				</div>

				<div class="checkbox">

					<!-- build:remove --><input id="optout-post" name="optout" type="checkbox" value="post" /><!-- /build -->
					<label for="optout-post">by post</label>
					

					<!-- build:template
					<%= form.field.optout.post %>
					/build -->

				</div>

			</div>

			<div class="form-control">

				<button type="submit" class="button switch-bg">Submit</button>

			</div>

		</div><!-- end div.form-content -->

		<div id="thanks-right">

			<h4 class="item switch-color">Mollycoddle your Mini.</h4>
			<p>Keep your MINI cotton-wool wrapped with MINI Insurance.</p>

			<hr />

			<h4 class="item switch-color">Keep it covered.</h4>
			<p>Protect your MINI’s working parts with a MINI Warranty.</p>

			<hr />

			<h4 class="item switch-color">Get connected.</h4>
			<p>Enjoy your beats, tweets and calendar meets on screen with MINI Connected.</p>

		</div><!-- end div#thanks-right -->

	</div><!-- end div.form-right -->

	<!-- build:template
	<%= form.close %>
	/build -->

	<!-- build:remove --></form><!-- /build -->

</div><!-- end div.layout -->