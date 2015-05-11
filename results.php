<!-- build:remove --><?php include( 'header.php' ); ?><!-- /build -->

<!-- build:template
<%= results.model %>
/build -->

<!-- build:template
<%= results.variables %>
/build -->

<div id="page-results" class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout layout-default">

		<!-- build:template
		<%= results.details %>
		/build -->
		<!-- build:remove --><?php include( 'results-details.php' ); ?><!-- /build -->
		
	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->