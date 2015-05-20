<!-- build:remove --><?php include( 'header.php' ); ?><!-- /build -->

<!-- build:template
<%= error.model %>
/build -->

<!-- build:template
<%= error.variables %>
/build -->

<div id="page-error" class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout layout-default">

		<ul class="actions">

			<li id="results_recombobulate"><a href="./">Combobulate</a></li>
			<li id="results_back"><a href="#" onClick="history.go(-1);return false;">Go back</a></li>

		</ul>

		<div id="notFound">

			<h1>404 - PAGE NOT FOUND</h1>

			<img class="not-found-img" src="assets/img/not_found.gif" />

			<p>Unfortunately, the address you selected is not available.<br />It's possible that the link or bookmark you used is no longer valid.</p>
			<p>Please check the URL. Otherwise, go to our <a href="./">home page</a> or go back to <a href="#" onClick="history.go(-1);return false;">previous page</a>


		</div>

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->