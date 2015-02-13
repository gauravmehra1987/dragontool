// TODO: Needs to use only one renderer to avoid WARNING: Too many active WebGL contexts. Oldest context will be lost.

function teleport( image ) {

	console.log( image );

	var carImage            = image;
	var displacementImage   = 'assets/img/teleport-scanlines.jpg';

	var maxDistortion       = 50;
	var minDistortion       = 2;

	var count				= 0;
	var skip				= false;

	var renderer            = PIXI.autoDetectRenderer();

	var stage               = new PIXI.Stage( 0x000000, true );
	var sceneContainer      = new PIXI.DisplayObjectContainer();

	var bg                  = PIXI.Sprite.fromImage( carImage );
	var displacementTexture	= PIXI.Texture.fromImage( displacementImage );

	var scanlines			= new PIXI.DisplacementFilter( displacementTexture );

	scanlines.scale.x = maxDistortion;
	scanlines.scale.y = _.random( minDistortion );

	stage.addChild( sceneContainer );

	sceneContainer.addChild( bg );
	sceneContainer.filters = [ scanlines ];

	requestAnimFrame( animate );

	function animate() {
		
		count += 1;

		if( count % 180 === 0 || count % 120 === 0 ) {

			scanlines.scale.x = maxDistortion;
			scanlines.scale.y = maxDistortion;

		}

		else {

			 if( scanlines.scale.x <= maxDistortion && scanlines.scale.x > minDistortion ) {

				scanlines.scale.x -= 10;
				scanlines.scale.y = _.random( minDistortion );

			}

		}

		scanlines.offset.y = count * 10;
		scanlines.offset.x = count * 10;
		
		renderer.render(stage);
		requestAnimFrame( animate );

	}

	renderer.view.id = 'car-teleport';

	return renderer.view;

}