<!-- build:template
<%= form.model %>
/build -->

<!-- build:template
<%= form.open.existing %>
/build -->

<!-- build:remove --><form action="ajax.php"><!-- /build -->

	<header>

		<h1 class="title">Almost there.</h1>
		<p>You've found your dream MINI. Now pop in your details so your MINI Dealer can help you get your hands on it.</p>

	</header>

	<!-- build:template
	<%= form.userid.existing %>
	/build -->

	<!-- build:remove --><input type="hidden" id="uid" name="UserId" value="999" /><!-- /build -->

	<div class="fields">

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

	</div><!-- end div.fields -->

	<div class="checkboxes">

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
				<%= form.field.redemption %>
				/build -->

				<input id="redemption" name="redemption" type="checkbox" value="1" />
				<!-- build:remove --><label for="redemption">Request early redemption</label><!-- /build -->

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

	</div><!-- end div.checkboxes -->

	<div class="form-control">

		<!-- build:template
		<%= form.field.submit %>
		/build -->

		<button id="form-submit" class="switch-bg" type="submit">Submit</button>

	</div>

<!-- build:template
<%= form.close %>
/build -->

<!-- build:remove --></form><!-- /build -->