<!-- build:template
<%= exCustomer.model %>
/build -->

<div id="formContainer">

<!-- build:template
<%= exCustomer.open %>
/build -->

	<header>

		<h1 class="title">Almost there.</h1>
		<p>You've found your dream MINI. Now pop in your details so your MINI Dealer can help you get your hands on it.</p>

	</header>

	<fieldset>

		<legend class="sr-only">Existing customer form</legend>       

		<!-- build:template
		<%= exCustomer.form_userid %>
		/build -->
		
		<div class="form-control">
			<div class="select">

				<!-- build:template
				<%= exCustomer.form_title %>
				/build -->

			</div>
			
			<!-- build:template
			<%= exCustomer.form_title_msg %>
			/build -->

		</div>

		<div class="form-control full-width">
			<div class="input-group">
				<span class="input-group-addon" id="">$</span>
				
				<!-- build:template
				<%= exCustomer.form_name %>
				/build -->

			</div>
			
			<!-- build:template
			<%= exCustomer.form_name_msg %>
			/build -->            

		</div>

		<div class="form-control full-width">
			<div class="input-group">
				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= exCustomer.form_surname %>
				/build -->

			</div>
			
			<!-- build:template
			<%= exCustomer.form_surname_msg %>
			/build -->            

		</div>

		<div class="form-control full-width">
		   <div class="input-group">
			   <span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= exCustomer.form_email %>
				/build -->

			</div>

			<!-- build:template
			<%= exCustomer.form_email_msg %>
			/build -->

		</div>

		<div class="form-control full-width">
		   <div class="input-group">
			   <span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= exCustomer.form_tel %>
				/build -->

			</div>
			
			<!-- build:template
			<%= exCustomer.form_tel_msg %>
			/build -->

		</div>

		<div class="form-control checkbox">

			<input type="hidden" value="false" name="RequestCallback">
			<input id="RequestCallback" type="checkbox" value="true" name="RequestCallback">

			<!-- build:template
			<%= exCustomer.form_callback %>
			/build -->            

		</div>

		<div class="form-control checkbox">

			<input type="hidden" value="false" name="RequestEarlyRedemption">
			<input id="RequestEarlyRedemption" type="checkbox" value="true" name="RequestEarlyRedemption">            

			<!-- build:template
			<%= exCustomer.form_redemption %>
			/build -->            

		</div>

		<div class="form-control checkbox">

			<input type="hidden" value="false" name="EmailResults">
			<input id="EmailResults" type="checkbox" value="true" name="EmailResults">            

			<!-- build:template
			<%= exCustomer.form_results %>
			/build -->            

		</div>

		<div class="form-control full-width"><input type="submit" value="Submit" /></div>

	</fieldset>

<!-- build:template
<%= exCustomer.close %>
/build -->

</div>