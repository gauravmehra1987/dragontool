<!-- build:template
<%= details.model %>
/build -->

<div class="car"><img src="assets/cars/5-door-Cooper-D.jpg" alt="car" class="img-responsive" /></div>

<div class="details">

	<div class="sticker">
		
		<!-- build:remove --><span class="currency">&pound;</span><span class="price">999</span><!-- /build -->

		<!-- build:template
		<span class="currency">&pound;</span><span class="price"><%= details.cost %></span>
		/build -->

		<span class="">Per<br />month</span>
		
		<a class="btn"><i class="icon chev"></i>Go Back</a>

	</div>

	<div class="content">

		<!-- build:remove --><h2>John</h2><!-- /build -->

		<h2>
		<!-- build:template
		<%= details.name %>
		/build -->
		</h2>
		
		<!-- build:remove --><p>Terms and Conditions<br/> terms details.</p><!-- /build -->

		<!-- build:template
		<p>Terms and Conditions<br/><%= details.terms %></p>
		/build -->

	</div>

</div>