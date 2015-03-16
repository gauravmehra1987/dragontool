<?php

	if( ! empty( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && strtolower( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) {

		header( 'Content-Type: application/json' );

		$message	= 'You just submitted a form with AJAX. Here are the fields you\'ve submitted:';
		$fields		= $_POST[ 'form' ];
		$car		= $_POST[ 'car' ];
		$input		= $_POST[ 'input' ];
		$dealer		= $_POST[ 'localDealer' ];

		echo json_encode(

			array(

				'success'			=> true,
				'message'			=> $message,
				'fields'			=> $fields,
				'car'				=> $car,
				'input'				=> $input,
				'localDealer'		=> $dealer

			)

		);	

	}
	else {

		header( 'Location: /' );

	}

?>