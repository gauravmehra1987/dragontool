<?php

	if( ! empty( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && strtolower( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) {

		header( 'Content-Type: application/json' );

		$addresses = array(

			array(

				'DealerId' => 8708,
				'Name' => 'Cooper Chelmsford',
				'Address' => 'Colchester Road',
				'Country' => 'United Kingdom',
				'County' => 'Essex',
				'Town' => 'Chelmsford',
				'Postcode' => 'CM2 5PG',
				'Latitude' => 51.74917,
				'Longitude' => 0.50937,
				'Url' => 'http://www.cooperchelmsfordbmw.co.uk/',
				'Phone' => '+44 (845) 1209251',
				'Fax' => '+44 (01245) 459223',
				'Distance' => 13.681462871857951,
				'Email' => 'mail@cooperchelmsford.bmw-net.co.uk',

			),

			array(

				'DealerId' => 8389,
				'Name' => 'Cooper Colchester',
				'Address' => 'Ipswich Road',
				'Country' => 'United Kingdom',
				'County' => 'Essex',
				'Town' => 'Colchester',
				'Postcode' => 'C04 9TD',
				'Latitude' => 51.9741,
				'Longitude' => 0.9868405,
				'Url' => 'http://www.coopercolchesterbmw.co.uk',
				'Phone' => '+44 (845) 1256934',
				'Fax' => '+44 (845) 751170',
				'Distance' => 28.90904855522391,
				'Email' => 'mail@coopercolchester.bmw-net.co.uk',

			),

			array(

				'DealerId' => 8703,
				'Name' => 'Elms Stansted',
				'Address' => 'Stansted Road',
				'Country' => 'United Kingdom',
				'County' => 'Hertfordshire',
				'Town' => 'Bishops Stortford',
				'Postcode' => 'CM23 2BT',
				'Latitude' => 51.8836298,
				'Longitude' => 0.1736102,
				'Url' => 'http://www.elmsstanstedbmw.co.uk',
				'Phone' => '+44 (844) 3267244',
				'Fax' => '+44 (1279) 508150',
				'Distance' => 37.80923124582324,
				'Email' => 'mail@elmsstansted.co.uk',

			),

		);

		echo json_encode( $addresses );

	}
	else {

		header( 'Location: /' );

	}

?>