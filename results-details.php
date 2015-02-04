<!-- build:template
<%= details.model %>
/build -->

<figure id="car">

	<img src="assets/img/mini-sample.png" />

	<figcaption class="car-desc">
		
		<section class="car-price">

			<!-- build:template
			<p class="price-span"><span class="currency">£</span><span class="price" data-model-price><%= details.cost %></span><span class="permonth">per<br />month</span></p>
			/build -->

			<!-- build:remove --><p class="price-span"><span class="currency">£</span><span class="price" data-model-price>0</span><span class="permonth">per<br />month</span></p><!-- /build -->

			<div><a href="./" class="button gray">Go back</a></div>
			
		</section><!-- end section.car-price -->

		<section class="car-details">

			<!-- build:template
			<h1 class="switch-color"><%= details.name %></h1>
			/build -->

			<!-- build:remove --><h1 class="switch-color">Mini Cooper S</h1><!-- /build -->

			<div class="terms">
				
				<p>Terms and Conditions</p>
				
				<!-- build:template
				<p><%= details.terms %></p>
				/build -->

				<!-- build:remove --><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis aspernatur, sint architecto, hic iste veniam necessitatibus, adipisci nam consectetur provident quidem similique dignissimos magnam explicabo incidunt corrupti suscipit distinctio a!</p><!-- /build -->

			</div>
			
		</section><!-- end section.car-details -->

	</figcaption><!-- end figcaption.car-desc -->
	
</figure><!-- end figure#car -->