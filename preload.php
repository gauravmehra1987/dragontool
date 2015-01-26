<?php

$imagesDir = 'assets/sprites/';
$images = glob( $imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE );

header( 'Content-Type: application/json' );

echo json_encode( $images );

?>