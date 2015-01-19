<!-- build:template
<%= newCustomer.model %>
/build -->

<!-- <script src="~/Scripts/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="~/Scripts/jquery.validate.min.js" type="text/javascript"></script>
<script src="~/Scripts/jquery.validate.unobtrusive.min.js" type="text/javascript"></script>
<script src="~/Scripts/jquery.unobtrusive-ajax.min.js" type="text/javascript"></script> -->

<div id="formContainer">

<!-- build:template
<%= newCustomer.open %>
/build -->

	<header>

		<h1 class="title">Almost there.</h1>
		<p>You've found your dream MINI. Now pop in your details so your MINI Dealer can help you get your hands on it.</p>

	</header>

	<fieldset>

		<legend class="sr-only">New customer form</legend>

		<!-- build:template
		<%= newCustomer.form_userid %>
		/build -->

		<div class="form-control">

			<div class="select">

				<!-- build:template
				<%= newCustomer.form_title %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_title_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_name %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_name_msg %>
			/build -->
			
		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_surname %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_surname_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

		   <div class="input-group">

			   <span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_email %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_email_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

		   <div class="input-group">

			   <span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_tel_home %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_tel_home_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_tel_work %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_tel_work_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_tel_mobile %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_tel_mobile_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_address_1 %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_address_1_msg %>
			/build -->

		</div>

		<div class="form-control full-width">
			
			<div class="input-group">
			
				<span class="input-group-addon" id="">$</span>
			
				<!-- build:template
				<%= newCustomer.form_address_2 %>
				/build -->
			
			</div>
			
			<!-- build:template
			<%= newCustomer.form_address_2_msg %>
			/build -->
		
		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_address_3 %>
				/build -->

			</div>

			<!-- build:template
			<%= newCustomer.form_address_3_msg %>
			/build -->

		</div>

		<div class="form-control full-width">

			<div class="input-group">

				<span class="input-group-addon" id="">$</span>

				<!-- build:template
				<%= newCustomer.form_address_4 %>
				/build -->
			
			</div>
			
			<!-- build:template
			<%= newCustomer.form_address_4_msg %>
			/build -->

		</div>

		<div class="form-control full-width">
			
			<div class="input-group">
				
				<span class="input-group-addon" id="">$</span>
				
				<!-- build:template
				<%= newCustomer.form_postcode %>
				/build -->
			
			</div>
			
			<!-- build:template
			<%= newCustomer.form_postcode_msg %>
			/build -->

		</div>

		<div class="form-control">
			
			<div class="select">
				
				<!-- build:template
				<%= newCustomer.form_dealer %>
				/build -->
				
				<!-- build:template
				<%= newCustomer.form_dealer_msg %>
				/build -->

			</div>

		</div>

		<div class="form-control checkbox">

			<input type="hidden" value="false" name="RequestCallback">
			<input id="RequestCallback" type="checkbox" value="true" name="RequestCallback">

			<!-- build:template
			<%= newCustomer.form_callback %>
			/build -->

		</div>

		<div class="form-control checkbox">

			<input type="hidden" value="false" name="EmailResults">
			<input id="EmailResults" type="checkbox" value="true" name="EmailResults">

			<!-- build:template
			<%= newCustomer.form_email_results %>
			/build -->

		</div>

		<div class="form-control full-width"><input type="submit" value="Submit" /></div>

	</fieldset>

<!-- build:template
<%= newCustomer.close %>
/build -->

</div>