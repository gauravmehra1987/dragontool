<?php

	function vdump( $var, $title = null ) {

		?>

		<?php if( isset( $title ) && ! empty( $title ) ): ?><span style="color: black; display: block; font: bold 14px/14px sans-serif; margin: 0 0 1em 0"><?php echo $title; ?></span><?php endif; ?>

		<pre style="background: snow; border: solid 1px linen; color: black; font: 14px/28px monospace; padding: 1em; white-space: pre;"><?php var_dump( $var ); ?></pre>

		<?php

	}

?>