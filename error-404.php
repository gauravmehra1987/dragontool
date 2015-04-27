<!-- build:remove --><?php include( 'header.php' ); ?><!-- /build -->

<!-- build:template
<%= error.model %>
/build -->

<!-- build:template
<%= error.variables %>
/build -->

<div id="page-results" class="layout-wrapper">

	<!-- build:include top.php --><?php require( 'top.php' ); ?><!-- /build -->

	<main class="layout full-width">
	
	<div id="notFound">

	<img src="assets/img/not_found.gif" />
    
    <h1>404 - PAGE NOT FOUND</h1>
    
    <span class="redBox">
        <a class="arrow" href="/">MINI HOME PAGE</a>
        <a class="arrow" href="javascript:history.back();">BACK</a>
    </span>
    
    <p>Unfortunately, the address you selected is not available.<br />It's possible that the link or bookmark you used is no longer valid.</p>

</div>

	</main><!-- end main.layout -->

	<!-- build:include bottom.php --><?php require( 'bottom.php' ); ?><!-- /build -->

</div><!-- end div.layout-wrapper -->

<!-- build:remove --><?php include( 'footer.php' ); ?><!-- /build -->