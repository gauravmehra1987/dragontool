<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open.new_user %>
/build -->

<!-- build:remove --><form><!-- /build -->

	<header>

		<h1 class="title">Almost there.</h1>
		<p>You've found your dream MINI. Now pop in your details so your MINI Dealer can help you get your hands on it.</p>

	</header>

	<!-- build:template
	<%= form.userid.new_user %>
	/build -->

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

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.address_1 %>
		/build -->

		<!-- build:remove --><input type="text" id="field-address-1" name="address-1" placeholder="Address line 1" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.address_2 %>
		/build -->

		<!-- build:remove --><input type="text" id="field-address-2" name="address-2" placeholder="Address line 2" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.address_3 %>
		/build -->

		<!-- build:remove --><input type="text" id="field-address-3" name="address-3" placeholder="Address line 3" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.address_4 %>
		/build -->

		<!-- build:remove --><input type="text" id="field-address-4" name="address-4" placeholder="Address line 4" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

	<div class="form-control append home full-width">

		<!-- build:template
		<%= form.field.postcode %>
		/build -->

		<!-- build:remove --><input type="text" id="field-postcode" name="postcode" placeholder="Postcode" /><!-- /build -->
		<span class="field-icon"></span>

	</div>

	<div class="form-control">

		<div class="select">

			<!-- build:template
			<%= form.field.dealer %>
			/build -->

			<!-- build:remove -->
			<select id="field-dealer" name="dealer">

				<option value="">Dealer</option>

			</select>
			<!-- /build -->

		</div>

	</div>

	<div class="form-control">
		
		<div class="checkbox">

			<!-- build:template
			<%= form.field.callback %>
			/build -->

			<input id="callback" name="callback" type="checkbox" value="1" checked="checked" />
			<!-- build:remove --><label for="callback">Request callback</label><!-- /build -->

		</div>

	</div>

	<div class="form-control">
		
		<div class="checkbox">

			<!-- build:template
			<%= form.field.results %>
			/build -->

			<input id="results" name="results" type="checkbox" value="1" />
			<!-- build:remove --><label for="results">E-mail me my results</label><!-- /build -->

		</div>

	</div>

	<div class="form-control">

		<button type="submit">Submit</button>

	</div>

<!-- build:template
<%= form.close %>
/build -->

<!-- build:remove --></form><!-- /build -->