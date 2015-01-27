<?php

$type		= isset( $_GET[ 'type' ] ) ? $_GET[ 'type' ] : 'jpg,jpeg,png,gif';
$imagesDir	= isset( $_GET[ 'type' ] ) ? 'assets/sprites/svg/' : 'assets/sprites/';
$images		= glob( $imagesDir . '*.{' . $type . '}', GLOB_BRACE );

header( 'Content-Type: application/json' );

echo json_encode( $images );

?>