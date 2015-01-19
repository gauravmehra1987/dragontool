<!-- build:template
<%= details.model %>
/build -->

<div class="car"><img src="assets/cars/5-door-Cooper-D.jpg" alt="car" class="img-responsive" /></div>

<div class="details">

	<div class="sticker">

		<span class="currency">&pound;</span>

		<span class="price">
		<!-- build:template
		<%= details.cost %>
		/build -->
		</span>

		<span class="">Per<br />month</span>
		
		<a class="btn"><i class="icon chev"></i>Go Back</a>

	</div>

	<div class="content">

		<h2>
		<!-- build:template
		<%= details.name %>
		/build -->
		</h2>

		<p>Terms and Conditions<br/>
		<!-- build:template
		<%= details.terms %>
		/build -->
		</p>

	</div>

</div>