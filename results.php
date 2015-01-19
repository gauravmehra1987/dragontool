<!-- build:remove --><?php include( 'header.php' ); ?><!-- /build -->

<!-- build:template
<%= results.model %>
/build -->

<!-- build:template
<%= results.variables %>
/build -->

<!-- build:template
<%= results.scripts %>
/build -->

<div id="pageWrap">

	<div id="top-bar">
		<div class="mini-logo"><img src="Assets/img/mini_logo.png" alt="mini" class="img-responsive" /></div>
	</div>

	<main role="main" id="main" class="row">

		<div id="dashboard" class="column">

		<!-- build:remove --><?php include( 'details.php' ); ?><!-- /build -->
		<!-- build:template
		<%= results.details %>
		/build -->			 

		</div><!-- end div#dashboard -->

		<article class="panel framed column">
		
		<!-- build:remove --><?php include( 'existing-customer.php' ); ?><!-- /build -->
		<!-- build:template
		<%= results.form %>
		/build -->

		</article>

	</main>

</div>

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->