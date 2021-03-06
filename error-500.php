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

			<h1>500 - INTERNAL SERVER ERROR</h1>

			<img class="not-found-img" src="assets/img/not_found.gif" />

			<p>Sorry, an error has occured.<br/>
			Please try again. Otherwise, go to our <a href="./">home page</a> or go back to <a href="#" onClick="history.go(-1);return false;">previous page</a>


		</div>

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->