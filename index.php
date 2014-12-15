<?php require( 'inc/header.inc.php' ); ?>

		<form id="sample-form" action="ajax.php">

			<div class="form-control full-width">

				<input type="text" id="field-name" name="name" placeholder="Name" />

			</div><!-- end div.form-control full-width -->

			<div class="form-control full-width">

				<input type="email" id="field-email" name="email" placeholder="E-mail address" />

			</div><!-- end div.form-control full-width -->

			<div class="form-control">

				<div class="checkbox checkbox-radio">

					<?php // First input, then label so we can use input + label in CSS styling ?>

					<input id="radio1" name="radio" type="radio" value="1" />
					<label for="radio1">Check me</label>

				</div><!-- end div.checkbox -->

				<div class="checkbox checkbox-radio">

					<?php // First input, then label so we can use input + label in CSS styling ?>
					
					<input id="radio2" name="radio" type="radio" value="2" />
					<label for="radio2">Check me</label>

				</div><!-- end div.checkbox -->

			</div><!-- end div.form-control -->

			<div class="form-control">

				<div class="select">

					<select id="field-subject" name="subject" required>

						<option value="">Choose a subject</option>

						<option>General enquiries</option>
						<option>Support</option>
						<option>Advertising</option>

					</select>

				</div><!-- end div.select -->

			</div><!-- end div.form-control -->

			<div class="form-control full-width">

				<textarea id="field-message" name="message" placeholder="Say something..." required></textarea>

			</div><!-- end div.form-control full-width -->

			<div class="form-control">
					
				<div class="checkbox">

					<?php // First input, then label so we can use input + label in CSS styling ?>

					<input id="checkbox" name="checkbox" type="checkbox" value="1" required />
					<label for="checkbox">I agree to the <a href="#terms">Terms &amp; Conditions</a></label>

				</div><!-- end div.checkbox -->

			</div><!-- end div.form-control -->

			<div class="form-control full-width">

				<button type="submit">Send message</button>

			</div><!-- end div.form-control full-width -->	

		</form><!-- end form#sample-form -->

<?php require( 'inc/footer.inc.php' ); ?>