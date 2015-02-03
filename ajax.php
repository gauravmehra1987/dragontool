<?php

	if( ! empty( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && strtolower( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) {

		header( 'Content-Type: application/json' );

		$message = 'You just submitted a form with AJAX. Here are the fields you\'ve submitted:';
		$fields = $_POST;

		echo json_encode( array( 'success' => true, 'message' => $message, 'fields' => $fields ) );	

	}
	else {

		$homeURL = project_dir();

		header( 'Location: ' . $homeURL );

	}

?>