﻿<!-- build:template
<%= results.model %>
/build -->

<div class="car-result--layout">

	<ul class="actions">

		<li id="results_back"><a href="./">Recombobulate</a></li>

	</ul>

	<div class="car-result--left">

		<figcaption class="car-result--caption">
			<!-- build:template
			<h2 class="switch-color"><%= results.name %></h2>
			/build -->

			<!-- build:remove --><h2 class="switch-color">Car name</h2><!-- /build -->

			<!-- build:template
			<a href="<%= results.formLink %>" class="button transparent car-link">How to get your hands on it</a>
			/build -->

			<!-- build:remove --><a id="go-to-form" href="form.php?<?= $_SERVER[ 'QUERY_STRING' ]; ?>" class="button transparent car-link">How to get your hands on it</a><!-- /build -->
		</figcaption>

		<figure id="results-car" class="model-image">

			<img src="assets/cars/none.png" class="img-base" />

			<!-- build:template
			<img src="<%= results.carImage %>" id="car-image" class="img-content" />
			/build -->

			<!-- build:remove -->
			<a href="form.php?<?= $_SERVER[ 'QUERY_STRING' ]; ?>">
				<img src="assets/cars/<?= $_GET[ 'm' ]; ?>.jpg" id="car-image" class="img-content result-car" />
			</a>

			<!-- /build -->
		</figure><!-- end figure#car -->

	</div>

	<div class="car-result--right">

		<div id="tpl-finance">Loading...</div>

	</div>

</div>




