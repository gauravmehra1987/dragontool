<!-- build:template
<%= details.model %>
/build -->

<figure id="car" class="model-image">

	<img src="assets/cars/none.png" class="img-base" />

	<!-- build:template
	<img src="assets/cars/<%= details.code %>.png" id="results-car" class="img-content" />
	/build -->

	<!-- build:remove --><img src="assets/cars/<?= $_GET[ 'm' ]; ?>.png" id="results-car" class="img-content" /><!-- /build -->

	<figcaption>

		<div class="car-layout top">
			
			<ul class="actions">
			
				<li id="results-back"><a href="./">Go back</a></li>
				<li id="results-close"><a href="./">Close</a></li>

			</ul>
			
				<!-- build:template
				<h2 class="switch-color"><%= details.name %></h2>
				/build -->

				<!-- build:remove --><h2 class="switch-color">Car name</h2><!-- /build -->


			<!-- build:template
			<a href="<%= details.form_link %>" class="button transparent">Call to action</a>
			/build -->

			<!-- build:remove --><a href="form.php?<?= $_SERVER[ 'QUERY_STRING' ]; ?>" class="button transparent">Call to action</a><!-- /build -->

		</div>

		<div class="car-layout bottom">

			<div id="tpl-finance">Loading...</div>

		</div>

	</figcaption><!-- end figcaption.car-desc -->
	
</figure><!-- end figure#car -->