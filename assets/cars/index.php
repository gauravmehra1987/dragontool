<?php

foreach( array_filter( glob( "./*.png" ), "is_file" ) as $f ) rename ( $f, substr( $f, -8 ) );

?>