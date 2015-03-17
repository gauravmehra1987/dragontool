<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open.new_user %>
/build -->

<div class="layout auto-height">

<!-- build:remove --><form action="ajax.php"><!-- /build -->

	<!-- build:template
	<%= form.userid.new_user %>
	/build -->

	<!-- build:remove --><input type="hidden" id="uid" name="UserId" value="999" /><!-- /build -->

	<div class="form-left">
		
		<header>

			<ul class="actions">
				
				<li id="results-back"><a href="./">Go back to results</a></li>

			</ul>

			<h3 class="title">Your details</h3>

		</header>

		<div class="form-control half-width">

			<div class="select">

				<!-- build:template
				<%= form.field.title %>
				/build -->

				<!-- build:remove -->
				<select id="field-title" name="title">

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

			<!-- build:remove --><input type="text" id="field-name" name="name" placeholder="First name" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="form-control append user full-width">

			<!-- build:template
			<%= form.field.surname %>
			/build -->

			<!-- build:remove --><input type="text" id="field-surname" name="surname" placeholder="Last name" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<p class="notice">Please give us your email address if you'd like to hear about MINI adventures from MINI UK, MINI Financial Services and approved MINI Retailers. From time to time you may also get news from other BMW Group companies, approved BMW Retailers, BMW agents and other suppliers of BMW or MINI branded products or services by email.</p>

		<div class="form-control append mail full-width">

			<!-- build:template
			<%= form.field.email %>
			/build -->

			<!-- build:remove --><input type="email" id="field-email" name="email" placeholder="E-mail address" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<p class="notice">Please give at least one phone number.</p>

		<div class="form-control append phone full-width">

			<!-- build:template
			<%= form.field.home %>
			/build -->

			<!-- build:remove --><input type="tel" id="field-home" name="home" placeholder="Home telephone" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="form-control append phone full-width">

			<!-- build:template
			<%= form.field.work %>
			/build -->

			<!-- build:remove --><input type="tel" id="field-work" name="work" placeholder="Work telephone" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="form-control append phone full-width">

			<!-- build:template
			<%= form.field.mobile %>
			/build -->

			<!-- build:remove --><input type="tel" id="field-mobile" name="mobile" placeholder="Mobile telephone" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="inline">

			<div class="form-control append home half-width">

				<!-- build:template
				<%= form.field.postcode %>
				/build -->

				<!-- build:remove --><input type="text" id="field-postcode" name="postcode" placeholder="Postcode" /><!-- /build -->
				<span class="field-icon"></span>

			</div>

			<div class="form-control half-width">
			
				<div id="address-type-chooser" class="form-control">

					<div class="checkbox checkbox-radio">

						<input id="address-type-home" name="address-type" type="radio" value="home" checked="checked" />
						<!-- build:remove --><label for="address-type-home">Home</label><!-- /build -->

					</div>

					<div class="checkbox checkbox-radio">

						<input id="address-type-work" name="address-type" type="radio" value="work" />
						<!-- build:remove --><label for="address-type-work">Work</label><!-- /build -->

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
			<%= form.field.address_1 %>
			/build -->

			<!-- build:remove --><input type="text" id="field-address-1" name="address-1" placeholder="Address line 1" disabled="disabled" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="form-control disabled append home full-width">

			<!-- build:template
			<%= form.field.address_2 %>
			/build -->

			<!-- build:remove --><input type="text" id="field-address-2" name="address-2" placeholder="Address line 2" disabled="disabled" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div class="form-control disabled append home full-width">

			<!-- build:template
			<%= form.field.address_3 %>
			/build -->

			<!-- build:remove --><input type="text" id="field-address-3" name="address-3" placeholder="Address line 3" disabled="disabled" /><!-- /build -->
			<span class="field-icon"></span>

		</div>

		<div id="dealer-chooser">
			
			<div class="form-control disabled">

				<div class="select disabled">

					<select disabled="disabled">

						<option value="">Choose your nearest dealer</option>

					</select>

				</div>

			</div>

		</div><!-- end div#dealer-chooser -->

	</div><!-- end div.form-left -->

	<div class="form-right">

		<figure id="form-car" class="model-image">

			<img src="assets/cars/none.png" class="img-base" />

			<!-- build:remove --><img src="assets/cars/<?= $_GET[ 'm' ]; ?>.png" id="car-image" class="img-content" /><!-- /build -->
			
		</figure><!-- end figure#car -->
		
		<div class="form-control">
			
			<div class="checkbox">

				<input id="finance" name="finance" type="checkbox" value="1" checked="checked" />
				<!-- build:remove --><label for="finance">Please tick here if you are interested in MINI finance options.</label><!-- /build -->

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

				<input id="optout-phone" name="optout" type="checkbox" value="phone" />
				<!-- build:remove --><label for="optout-phone">by phone</label><!-- /build -->

				<!-- build:template
				<%= form.field.optoutPhone %>
				/build -->

			</div>

			<div class="checkbox">

				<input id="optout-post" name="optout" type="checkbox" value="post" />
				<!-- build:remove --><label for="optout-post">by post</label><!-- /build -->

				<!-- build:template
				<%= form.field.optoutPost %>
				/build -->

			</div>

		</div>

		<div class="form-control">

			<button type="submit" class="button switch-bg">Submit</button>

		</div>

	</div><!-- end div.form-right -->

	<!-- build:template
	<%= form.close %>
	/build -->

<!-- build:remove --></form><!-- /build -->

</div><!-- end div.layout -->