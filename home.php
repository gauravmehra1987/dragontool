<!-- build:template
<%= home.variables %>
/build -->

<!-- build:remove --><?php require( 'header.php' ); ?><!-- /build -->

<div id="page-home" class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout">
		
		<div class="column right">
			
			<!-- build:include home-panels.php --><?php require( 'home-panels.php' ); ?><!-- /build -->

		</div><!-- end div.column left -->

		<div class="column left">

			<!-- build:template
			<%= home.dashboard %>
			/build -->

			<!-- build:remove --><?php require( 'dashboard.php' ); ?><!-- /build -->

		</div><!-- end div.column right -->

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:template
<%= home.input %>
/build -->

<!-- build:remove --><?php require( 'footer.php' ); ?><!-- /build -->