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

<div class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout">
		
		<div class="column left">
			
			<!-- build:template
			<%= results.details %>
			/build -->

			<!-- build:remove --><?php include( 'details.php' ); ?><!-- /build -->

		</div><!-- end div.column left -->

		<div class="column right">

			<div id="default" class="panel" data-panel-name="default">

				<!-- build:template
				<%= results.form %>
				/build -->

				<!-- build:remove --><?php include( 'form-existing.php' ); ?><!-- /build -->

			</div><!-- end div#results.panel -->

		</div><!-- end div.column right -->

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->