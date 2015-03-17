<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open.new_user %>
/build -->

<!-- build:remove --><form action="ajax.php"><!-- /build -->

	<header>

		<h1 class="title">Almost there.</h1>
		<p>You've found your dream MINI. Now pop in your details so your MINI Dealer can help you get your hands on it.</p>

	</header>

	<!-- build:template
	<%= form.userid.new_user %>
	/build -->

	<!-- build:remove --><input type="hidden" id="uid" name="UserId" value="999" /><!-- /build -->

	<div class="form-control">

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

	<div class="form-control append mail full-width">

		<!-- build:template
		<%= form.field.email %>
		/build -->

		<!-- build:remove --><input type="email" id="field-email" name="email" placeholder="E-mail address" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

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

	<div id="address-type-chooser" class="form-control form-controfull-width">

		<div class="checkbox checkbox-radio">

			<input id="address-type-home" name="address-type" type="radio" value="home" checked="checked" />
			<!-- build:remove --><label for="address-type-home">Home</label><!-- /build -->

		</div>

		<div class="checkbox checkbox-radio">

			<input id="address-type-work" name="address-type" type="radio" value="work" />
			<!-- build:remove --><label for="address-type-work">Work</label><!-- /build -->

		</div>

	</div>

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.postcode %>
		/build -->

		<!-- build:remove --><input type="text" id="field-postcode" name="postcode" placeholder="Postcode" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

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

	<hr />

	<div class="form-control">
		
		<div class="checkbox">

			<input id="finance" name="finance" type="checkbox" value="1" checked="checked" />
			<!-- build:remove --><label for="finance">Please tick here if you are interested in MINI finance options.</label><!-- /build -->

			<!-- build:template
			<%= form.field.finance %>
			/build -->

		</div>

	</div>

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

		<button type="submit button">Submit</button>

	</div>

<!-- build:template
<%= form.close %>
/build -->

<!-- build:remove --></form><!-- /build -->