<?php

	if( ! empty( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && strtolower( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) {

		header( 'Content-Type: application/json' );

		$addresses = array(

			array(

				'Address1'		=> 'Flat 107',
				'Address2'		=> 'Holly Court',
				'Address3'		=> 'John Harrison Way',
				'Town'			=> 'London',
				'County'		=> 'Greater London',
				'Postcode'		=> 'SW1 1AA',

			),

			array(

				'Address1'		=> 'Flat 108',
				'Address2'		=> 'Holly Court',
				'Address3'		=> 'John Harrison Way',
				'Town'			=> 'London',
				'County'		=> 'Greater London',
				'Postcode'		=> 'SW1 1AA',

			),

			array(

				'Address1'		=> 'Flat 109',
				'Address2'		=> 'Holly Court',
				'Address3'		=> 'John Harrison Way',
				'Town'			=> 'London',
				'County'		=> 'Greater London',
				'Postcode'		=> 'SW1 1AA',

			),

		);

		echo json_encode( $addresses );

	}
	else {

		header( 'Location: /' );

	}

?>