open Js.Typed_array

let _generate = %raw(`
(width, height, widthSegments, heightSegments) =>{
  var vertices = [];
  var normals = [];
  var texCoords = [];
  var indices = [];

	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = Math.floor( widthSegments ) || 1;
	var gridY = Math.floor( heightSegments ) || 1;

	var gridX1 = gridX + 1;
	var gridY1 = gridY + 1;

	var segment_width = width / gridX;
	var segment_height = height / gridY;

	var ix, iy;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var texCoords = [];

	// generate vertices, normals and texCoords

	for ( iy = 0; iy < gridY1; iy ++ ) {

		var y = iy * segment_height - height_half;

		for ( ix = 0; ix < gridX1; ix ++ ) {

			var x = ix * segment_width - width_half;

			vertices.push( x, - y, 0 );

			normals.push( 0, 0, 1 );

			texCoords.push( ix / gridX );
			texCoords.push( 1 - ( iy / gridY ) );

		}

	}

	// indices

	for ( iy = 0; iy < gridY; iy ++ ) {

		for ( ix = 0; ix < gridX; ix ++ ) {

			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			// faces

			indices.push( a, b, d );
			indices.push( b, c, d );

		}
    }

    return [vertices, texCoords, normals, indices]
}

    `) // buffers

// generate vertices, normals and texCoords

// indices

// faces

let create = (data, width, height, widthSegments, heightSegments) =>
  _generate(width, height, widthSegments, heightSegments)
  ->ComputePointsGeometryService.addTangents
  ->CreateDefaultGeometryService.create(data, _)
