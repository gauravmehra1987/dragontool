<!-- build:template
<%= details.model %>
/build -->

<figure id="car" class="model-image">

	<img src="assets/cars/none.png" class="img-base" />

	<!-- build:template
	<img src="assets/cars/<%= details.model %>.png" id="results-car" class="img-content" />
	/build -->

	<!-- build:remove --><img src="assets/cars/<?= $_GET[ 'm' ]; ?>.png" id="results-car" class="img-content" /><!-- /build -->

	<figcaption>

		<div class="car-layout top">
			
			<ul class="actions">
			
				<li><a href="#">Go back</a></li>
				<li><a hred="#">Close</a></li>

			</ul>
			
			<h2 class="switch-color">Mini Countryman Cooper SD ALL4</h2>

			<a href="#" class="button transparent">Call to action</a>

		</div>

		<div class="car-layout bottom">

			<p>MINI Select Representative example including extras of PEPPER Pack and †MINI tlc service cover. *Terms and Conditions apply.</p>

			<div id="tpl-finance">Loading...</div>

			<p class="terms">Finance example is for a MINI Select agreement for a new MINI XXXXXX with optional XXXXX, with a contract mileage of XX, XXX miles and excess mileage charge of X.XXp per mile. Applies for vehicles ordered between XXXXX and XXXXX and registered by XXXXX, (subject to availability) at participating MINI retailers. Retail customers only. *On the road cash price is based on manufacturer’s recommended retail price and includes 3 year MINI Retailer Warranty,  MINI Emergency Service, 12 months’ road fund licence, vehicle first registration fee, delivery, number plates and VAT. ^ Optional final payment and option to purchase fee not payable if you opt to return the vehicle at the end of the agreement (vehicle condition, excess mileage and other charges may be payable). Finance available subject to credit acceptance to UK residents aged 18 or over. Guarantees and indemnities may be required. Terms and conditions apply. Optional final payment and option to purchase fee not payable if you opt to return the vehicle at the end of the agreement (vehicle condition, excess mileage  and other charges may be payable).Offer may be varied, withdrawn or extended at any time. ‘MINI Select’ is a form of hire-purchase agreement provided by MINI Financial Services, a trading name of BMW Financial Services (GB) Limited, Bartley Way, Hook, Hampshire RG27 9UF. You will have a 14 day statutory right to withdraw from the agreement.</p>

		</div>

	</figcaption><!-- end figcaption.car-desc -->
	
</figure><!-- end figure#car -->